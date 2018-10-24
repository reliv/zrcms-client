import {CONTEXT_SITE} from "./BlockVersionData";
import {getInstance as getInstanceBlockVersionDataCollection} from "./BlockVersionDataCollectionFactory";
import ContainerSaveDataCollection from "./ContainerSaveDataCollection";
import getCurrentSiteId from "../site-current/getCurrentSiteId";
import {getInstance as getInstanceCurrentSiteContainerVersionCollection} from "../site-container-data/CurrentSiteContainerVersionCollectionFactory";

/**
 * @return {Promise<*>}
 */
export default function () {
    let blockVersionDataCollection = getInstanceBlockVersionDataCollection();

    if (!blockVersionDataCollection.hasContextBlocksChanged(CONTEXT_SITE)) {
        return Promise.resolve(
            {
                status: 'no-change',
                containerNames: []
            }
        );
    }
    let currentSiteContainerVersionCollection = getInstanceCurrentSiteContainerVersionCollection();

    let containerSaveDataCollection = new ContainerSaveDataCollection(
        CONTEXT_SITE,
        getCurrentSiteId(),
        blockVersionDataCollection.findListByContext(CONTEXT_SITE),
        blockVersionDataCollection.findContainerNameListByContext(CONTEXT_SITE)
    );

    let siteContainerDataList = containerSaveDataCollection.getChangedContainersData();
    let containerNames = [];
    let index, siteContainerData, currentSiteContainerVersion;

    for (index in siteContainerDataList) {
        siteContainerData = siteContainerDataList[index];
        // @todo @future this is would be better by id
        currentSiteContainerVersion = currentSiteContainerVersionCollection.findByName(
            siteContainerData.name
        );

        if (!currentSiteContainerVersion) {
            throw new Error(
                'currentSiteContainerVersion could not be found with name: ' + siteContainerData.name
            );
        }

        currentSiteContainerVersion.putProperty('blockVersions', siteContainerData.blockVersions);

        containerNames.push(siteContainerData.name);
    }

    return Promise.resolve(
        {
            status: 'update-property-blockVersions',
            containerNames: containerNames
        }
    );
}
