import BlockVersionData, {CONTEXT_PAGE, CONTEXT_SITE} from './BlockVersionData'
import BlockVersionDataCollection from './BlockVersionDataCollection'
import PageVersionData from "../page-data/CurrentPageVersionData";

let blockVersionDataCollection = new BlockVersionDataCollection();

/**
 * @param containerCmsResources
 * @param {BlockVersionDataCollection} blockVersionDataCollection
 * @return {BlockVersionDataCollection}
 */
function buildContainerCmsResources(
    containerCmsResources,
    blockVersionDataCollection
) {
    for (let i = 0, len = containerCmsResources.length; i < len; i++) {
        blockVersionDataCollection = buildContainerData(
            CONTEXT_SITE,
            containerCmsResources[i].contentVersion.properties,
            blockVersionDataCollection
        );
    }

    return blockVersionDataCollection;
}

/**
 * @param pageCmsResource
 * @param {BlockVersionDataCollection} blockVersionDataCollection
 * @return {BlockVersionDataCollection}
 */
function buildPageCmsResource(
    pageCmsResource,
    blockVersionDataCollection
) {
    return buildContainersData(
        CONTEXT_PAGE,
        pageCmsResource.contentVersion.properties.containersData,
        blockVersionDataCollection
    );
}

/**
 * @param {string} context
 * @param {array} containersData
 * @param {BlockVersionDataCollection} blockVersionDataCollection
 * @return {BlockVersionDataCollection}
 */
export function buildContainersData(
    context,
    containersData,
    blockVersionDataCollection
) {
    for (let i = 0, len = containersData.length; i < len; i++) {
        blockVersionDataCollection = buildContainerData(
            context,
            containersData[i],
            blockVersionDataCollection
        );
    }

    return blockVersionDataCollection;
}

/**
 * @param {string} context
 * @param {array} containerData
 * @param {BlockVersionDataCollection} blockVersionDataCollection
 * @return {BlockVersionDataCollection}
 */
export function buildContainerData(
    context,
    containerData,
    blockVersionDataCollection
) {
    return buildBlockVersions(
        context,
        containerData['name'],
        containerData['blockVersions'],
        blockVersionDataCollection
    );
}

/**
 * @param {string}    context
 * @param {string}    containerName
 * @param {array}     blockVersions
 * @param {BlockVersionDataCollection} blockVersionDataCollection
 * @return {BlockVersionDataCollection}
 */
export function buildBlockVersions(
    context,
    containerName,
    blockVersions,
    blockVersionDataCollection
) {
    for (let i = 0, len = blockVersions.length; i < len; i++) {
        blockVersionDataCollection.add(
            new BlockVersionData(
                context,
                containerName,
                blockVersions[i],
                false,
                true,
                'Created by buildBlockVersions'
            )
        );
    }

    return blockVersionDataCollection;
}

/**
 * @return {BlockVersionDataCollection}
 */
export function getInstance() {
    return blockVersionDataCollection;
}

/**
 * @return {BlockVersionDataCollection}
 */
export function buildEmpty() {
    return blockVersionDataCollection;
}

/**
 * @return {BlockVersionDataCollection}
 */
export default function build(pageViewData) {
    if (!pageViewData) {
        throw new Error(
            'Missing pageViewData in BlockVersionDataCollectionFactory.build'
        );
    }

    let blockVersionDataCollection = getInstance();

    if (!pageViewData) {
        return blockVersionDataCollection;
    }

    if (!pageViewData.properties) {
        console.error('Missing pageViewData properties: ', pageViewData);
        throw new Error('Missing pageViewData properties')
    }

    blockVersionDataCollection = buildPageCmsResource(
        pageViewData.properties.pageCmsResource,
        blockVersionDataCollection
    );

    blockVersionDataCollection = buildContainerCmsResources(
        pageViewData.properties.siteContainerCmsResources,
        blockVersionDataCollection
    );

    return blockVersionDataCollection;
}
