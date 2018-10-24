import objectDiff from "../../../object-diff/object-diff";

export default class CurrentSiteContainerVersionCollection {

    constructor(siteContainerVersionDataList) {
        this.siteContainerVersionDataList = siteContainerVersionDataList;
        this._initialSiteContainerVersionDataList = siteContainerVersionDataList;
        this._initialLength = siteContainerVersionDataList.length;
    }

    getList() {
        return this.siteContainerVersionDataList;
    }

    getIds() {
        return this.siteContainerVersionDataList.map(
            /** @param {CurrentSiteContainerVersionData} siteContainerVersionData */
            (siteContainerVersionData) => {
                return siteContainerVersionData.getId();
            }
        );
    }

    findById(id) {
        return this.siteContainerVersionDataList.find(
            /** @param {CurrentSiteContainerVersionData} siteContainerVersionData */
            (siteContainerVersionData) => {
                return (siteContainerVersionData.getId() === id);
            }
        );
    }

    findByName(name) {
        return this.siteContainerVersionDataList.find(
            /** @param {CurrentSiteContainerVersionData} siteContainerVersionData */
            (siteContainerVersionData) => {
                return (siteContainerVersionData.findProperty('name') === name);
            }
        );
    }

    revert() {
        this.siteContainerVersionDataList = this._initialSiteContainerVersionDataList;
        let index;
        for (index in this.siteContainerVersionDataList) {
            this.siteContainerVersionDataList[index].revert();
        }
    }

    hasDataChanged() {
        if (this._initialLength !== this.siteContainerVersionDataList.length) {
            return true;
        }

        let index;
        for (index in this.siteContainerVersionDataList) {
            if (this.siteContainerVersionDataList[index].hasDataChanged()) {
                return true;
            }
        }

        return false;
    }


    status() {
        // @todo include this._initialLength
        return this.siteContainerVersionDataList.map(
            /** @var {CurrentSiteContainerVersionData} */
            (currentSiteContainerVersionData) => {
                return currentSiteContainerVersionData.status();
            }
        );
    }
}
