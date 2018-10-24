import {getInstance as getInstanceCurrentPageVersionData} from '../page-data/CurrentPageVersionDataFactory'
import {getInstance as getInstanceBlockVersionDataCollection} from "./BlockVersionDataCollectionFactory";
import {CONTEXT_PAGE} from "./BlockVersionData";
import ContainerSaveDataCollection from "./ContainerSaveDataCollection";

/**
 * @return {Promise<*>}
 */
export default function () {
    /**
     * @type {BlockVersionDataCollection}
     */
    let blockVersionDataCollection = getInstanceBlockVersionDataCollection();
    let currentPageVersionData = getInstanceCurrentPageVersionData();

    if (!blockVersionDataCollection.hasContextBlocksChanged(CONTEXT_PAGE)) {
        return Promise.resolve(
            {status: 'no-change'}
        );
    }

    let containerSaveDataCollection = new ContainerSaveDataCollection(
        CONTEXT_PAGE,
        currentPageVersionData.findProperty('siteCmsResourceId'),
        blockVersionDataCollection.findListByContext(CONTEXT_PAGE),
        blockVersionDataCollection.findContainerNameListByContext(CONTEXT_PAGE)
    );

    currentPageVersionData.putProperty('containersData', containerSaveDataCollection.getContainersData());

    return Promise.resolve(
        {status: 'update-property-containersData'}
    );
}
