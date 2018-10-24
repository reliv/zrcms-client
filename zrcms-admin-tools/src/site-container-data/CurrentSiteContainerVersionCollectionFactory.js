import CurrentSiteContainerVersionCollection from "./CurrentSiteContainerVersionCollection"
import CurrentSiteContainerVersionData from './CurrentSiteContainerVersionData'

let currentSiteContainerVersionCollection = null;

/**
 * @return {boolean}
 */
export function hasInstance() {
    return (currentSiteContainerVersionCollection !== null);
}

/**
 * @return {CurrentSiteContainerVersionCollection}
 */
export function getInstance() {
    if (!currentSiteContainerVersionCollection) {
        throw new Error(
            'currentSiteContainerVersionCollection not build'
        );
    }
    return currentSiteContainerVersionCollection;
}

/**
 * @return {CurrentSiteContainerVersionCollection}
 */
export function buildEmpty() {
    currentSiteContainerVersionCollection = new CurrentSiteContainerVersionCollection();

    return currentSiteContainerVersionCollection;
}

/**
 * @return {CurrentSiteContainerVersionCollection}
 */
export default function build(pageViewData) {
    // @todo assert data valid
    let siteContainerVersionDataList = pageViewData.properties.siteContainerCmsResources.map(
        (siteContainerCmsResource, index) => {
            return new CurrentSiteContainerVersionData(
                siteContainerCmsResource.contentVersion.id,
                siteContainerCmsResource.contentVersion.properties,
                siteContainerCmsResource.contentVersion.createdByUserId,
                siteContainerCmsResource.contentVersion.createdReason,
                siteContainerCmsResource.contentVersion.createdDate,
                siteContainerCmsResource.id
            )
        }
    );

    currentSiteContainerVersionCollection = new CurrentSiteContainerVersionCollection(
        siteContainerVersionDataList
    );

    return currentSiteContainerVersionCollection;
}
