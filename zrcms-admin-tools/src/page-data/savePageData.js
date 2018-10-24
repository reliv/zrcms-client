import {getInstance as getInstanceCurrentPageVersionData} from '../page-data/CurrentPageVersionDataFactory'
import logger from "../debug/Logger";
import createPageDraftCmsResource from "../http/createPageDraftCmsResource";
import insertPageVersion from "../http/insertPageVersion";

const CREATED_REASON = "AdminTools: Save new page version";
export const STATUS_PAGE_NO_CHANGE = 'no-change';
export const STATUS_PAGE_SAVED = 'saved';

/**
 * @return {Promise<*>}
 */
export default function () {
    let currentPageVersionData = getInstanceCurrentPageVersionData();

    if (!currentPageVersionData.hasDataChanged()) {
        return Promise.resolve(
            {
                status: STATUS_PAGE_NO_CHANGE,
                newPageVersionId: null,
                newPageDraftCmsResourceId: null
            }
        );
    }

    let pageVersionData = currentPageVersionData.toSaveNewData(CREATED_REASON);

    logger.info(
        '[save-page-data] Saving page version',
        pageVersionData
    );

    return insertPageVersion(pageVersionData).then(
        (pageVersion) => {
            logger.info(
                '[save-page-data] Saved page version: ' + pageVersion.id,
                pageVersionData
            );
            return createCmsResource(pageVersion).then(
                (pageDraftCmsResource) => {
                    logger.info(
                        '[save-page-data] Created page draft resource: ' + pageDraftCmsResource.id,
                        pageDraftCmsResource
                    );
                    return Promise.resolve(
                        {
                            status: STATUS_PAGE_SAVED,
                            newPageVersionId: pageVersion.id,
                            newPageDraftCmsResourceId: pageDraftCmsResource.id
                        }
                    );
                }
            );
        }
    );
}

/**
 * @deprecated
 * @param contentVersion
 * @return {Promise<{pageDraftCmsResource}>}
 */
function createCmsResource(contentVersion) {
    let pageDraftCmsResourceData = {
        id: null,
        published: true,
        contentVersionId: contentVersion.id,
        createdByUserId: null,
        createdReason: CREATED_REASON,
        createdDate: null
    };

    logger.info(
        '[save-page-data] Creating page draft resource',
        pageDraftCmsResourceData
    );
    return createPageDraftCmsResource(pageDraftCmsResourceData)
}
