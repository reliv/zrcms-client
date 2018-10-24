import logger from "../debug/Logger";
import {INFO} from "../debug/LogLevels";

/**
 * {ContainerSaveDataCollection}
 */
export default class ContainerSaveDataCollection {
    /**
     * @param {String} context
     * @param {String} siteCmsResourceId
     * @param {BlockVersionData[]} blockVersionList
     * @param {String[]} containerNames
     */
    constructor(
        context,
        siteCmsResourceId,
        blockVersionList,
        containerNames
    ) {
        this.context = context;
        this.siteCmsResourceId = siteCmsResourceId;
        this.blockVersionList = blockVersionList;
        this.containerNames = containerNames;

        this._build();
    }

    /**
     * @private
     */
    _build() {
        this._containersData = [];
        this._containersDataIndex = {};
        this._containersDataChangedIndex = {};

        let i, len, containerData, containerName, containerDataIndex;

        for (i = 0, len = this.containerNames.length; i < len; i++) {
            containerData = {
                name: this.containerNames[i],
                context: this.context,
                blockVersions: [],
                siteCmsResourceId: this.siteCmsResourceId
            };
            this._containersData.push(
                containerData
            );

            this._containersDataIndex[this.containerNames[i]] = i;
        }

        for (i = 0, len = this.blockVersionList.length; i < len; i++) {
            containerName = this.blockVersionList[i].getContainerName();
            containerDataIndex = this._containersDataIndex[containerName];

            if (this.blockVersionList[i].canSave()) {
                this._containersData[containerDataIndex].blockVersions.push(
                    this.blockVersionList[i].getBlockVersion()
                );
            }

            if (this.blockVersionList[i].hasDataChanged()) {
                // We wrap this because status() is an expensive call
                if (logger.isLevel(INFO)) {
                    logger.info('Block version changed: ', this.blockVersionList[i].status());
                }

                this._containersDataChangedIndex[containerName] = containerDataIndex;
            }
        }
    }

    /**
     * @return {Array}
     */
    getContainersData() {
        return this._containersData;
    }

    /**
     * @return {Array}
     */
    getChangedContainersData() {
        let list = [];
        let containerName;
        for (containerName in this._containersDataChangedIndex) {
            list.push(
                this._containersData[this._containersDataChangedIndex[containerName]]
            )
        }

        return list;
    }
}
