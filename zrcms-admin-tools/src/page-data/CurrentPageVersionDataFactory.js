import PageVersionData from "./CurrentPageVersionData";

let pageVersionData = null;

function assertValidPageData(pageViewData) {
    if (!pageViewData) {
        throw new Error(
            'Missing pageViewData in PageVersionDataFactory'
        );
    }

    if (!pageViewData.properties) {
        console.error('Missing pageViewData.properties: ', pageViewData);
        throw new Error('Missing pageViewData.properties')
    }

    if (!pageViewData.properties.pageCmsResource) {
        console.error('Missing pageViewData.properties.pageCmsResource: ', pageViewData);
        throw new Error('Missing pageViewData.properties.pageCmsResource')
    }

    if (!pageViewData.properties.pageCmsResource.contentVersion) {
        console.error('Missing pageViewData.properties.pageCmsResource.contentVersion: ', pageViewData);
        throw new Error('Missing pageViewData.properties.pageCmsResource.contentVersion')
    }

    if (!pageViewData.properties.pageCmsResource.contentVersion.properties) {
        console.error('Missing pageViewData.properties.pageCmsResource.contentVersion.properties: ', pageViewData);
        throw new Error('Missing pageViewData.properties.pageCmsResource.contentVersion.properties')
    }
}

/**
 * @return {boolean}
 */
export function hasInstance() {
    return (pageVersionData !== null);
}

/**
 * @return {CurrentPageVersionData}
 */
export function getInstance() {
    if (!pageVersionData) {
        throw new Error(
            'pageVersionData not build'
        );
    }
    return pageVersionData;
}

export function buildEmpty() {
    pageVersionData = new PageVersionData(
        null,
        {},
        null,
        null,
        null
    );

    return pageVersionData;
}

/**
 * @return {CurrentPageVersionData}
 */
export default function build(pageViewData) {
    assertValidPageData(pageViewData);

    pageVersionData = new PageVersionData(
        pageViewData.properties.pageCmsResource.contentVersion.id,
        pageViewData.properties.pageCmsResource.contentVersion.properties,
        pageViewData.properties.pageCmsResource.contentVersion.createdByUserId,
        pageViewData.properties.pageCmsResource.contentVersion.createdReason,
        pageViewData.properties.pageCmsResource.contentVersion.createdDate,
        pageViewData.properties.pageCmsResource.id
    );

    return pageVersionData;
}
