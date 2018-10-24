import {getInstance as getInstanceCurrentSiteContainerVersionCollection} from "./CurrentSiteContainerVersionCollectionFactory";
import insertSiteContainerVersion from "../http/insertSiteContainerVersion";
import logger from "../debug/Logger";
import updateSiteContainerCmsResource from "../http/updateSiteContainerCmsResource";

const CREATED_REASON = "AdminTools: Save site container block versions";
export const STATUS_SITE_CONTAINERS_NO_CHANGE = 'no-change';
export const STATUS_SITE_CONTAINERS_SAVED = 'saved';

/**
 * @return {Promise<*>}
 */
export default function () {
    let currentSiteContainerVersionCollection = getInstanceCurrentSiteContainerVersionCollection();

    if (!currentSiteContainerVersionCollection.hasDataChanged()) {
        return Promise.resolve(
            {
                status: STATUS_SITE_CONTAINERS_NO_CHANGE,
                newSiteContainerVersionData: []
            }
        );
    }

    let currentSiteContainerVersionList = currentSiteContainerVersionCollection.getList();
    let promisesInsertSiteContainerVersion = [];
    let index;

    for (index in currentSiteContainerVersionList) {
        promisesInsertSiteContainerVersion[index] = insertSiteContainerVersion(
            currentSiteContainerVersionList[index].toSaveNewData(CREATED_REASON)
        ).then(
            (siteContainerVersion) => {
                logger.info(
                    '[save-site-containers] Saved site container version: ' + siteContainerVersion.id,
                    siteContainerVersion
                );
                return Promise.resolve(siteContainerVersion);
            }
        );
    }

    return Promise.all(
        promisesInsertSiteContainerVersion
    ).then(
        (insertSiteContainerVersionResults) => {
            let promisesUpdateCmsResource = [];
            let index;
            for (index in currentSiteContainerVersionList) {
                promisesUpdateCmsResource.push(
                    updateCmsResource(
                        currentSiteContainerVersionList[index].getCmsResourceId(),
                        insertSiteContainerVersionResults[index].id
                    )
                );
            }
            return Promise.all(promisesUpdateCmsResource).then(
                (promisesUpdateCmsResourceResults) => {
                    let results = [];
                    let index;
                    for (index in currentSiteContainerVersionList) {
                        results.push(
                            {
                                // @todo we can also return previous ids here
                                siteContainerVersionId: insertSiteContainerVersionResults[index].id,
                                siteContainerCmsResourceId: promisesUpdateCmsResourceResults[index].id
                            }
                        );
                    }

                    return Promise.resolve(
                        {
                            status: STATUS_SITE_CONTAINERS_SAVED,
                            results: results
                        }
                    );
                }
            );
        }
    );
}

/**
 * @param {string} siteContainerCmsResourceId
 * @param {string} siteContainerVersionId
 * @return {Promise<{siteContainerCmsResource}>}
 */
function updateCmsResource(siteContainerCmsResourceId, siteContainerVersionId) {
    let siteContainerCmsResourceData = {
        id: siteContainerCmsResourceId,
        published: true,
        contentVersionId: siteContainerVersionId,
        createdByUserId: null,
        createdReason: CREATED_REASON,
        createdDate: null
    };

    logger.info(
        '[save-site-containers] Updating site container resource: ' + siteContainerCmsResourceData.id,
        siteContainerCmsResourceData
    );
    return updateSiteContainerCmsResource(siteContainerCmsResourceData).then(
        (siteContainerCmsResource) => {
            return new Promise(
                (resolve, reject) => {
                    logger.info(
                        '[save-site-containers] Updated site container resource: ' + siteContainerCmsResource.id,
                        siteContainerCmsResource
                    );
                    resolve(siteContainerCmsResource);
                }
            );
        }
    );
}
