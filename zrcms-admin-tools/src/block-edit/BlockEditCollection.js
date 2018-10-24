import {getInstance} from '../block-data/BlockVersionDataCollectionFactory'

/**
 * {BlockEditCollection}
 */
export default class BlockEditCollection {
    /**
     *
     */
    constructor() {
        this.list = [];
        this._indexBlockVersionId = {};
        this._listBlockVersionId = {};
        this._indexBlockVersionIdInitialized = {};
        this._listBlockVersionIdInitialized = {};
    }

    /**
     * @param {string} blockVersionId
     * @param {int} index
     * @param {boolean} initialized
     * @private
     */
    _createIndexBlockVersionId(blockVersionId, index, initialized = false) {
        this._indexBlockVersionId[blockVersionId] = index;
        this._listBlockVersionId[index] = blockVersionId;
        this._indexBlockVersionIdInitialized[blockVersionId] = initialized;
        this._listBlockVersionIdInitialized[index] = initialized;
    }

    /**
     * @param {string} blockVersionId
     * @param {BlockEdit} blockEdit
     * @param {boolean} initialized
     * @private
     */
    add(blockVersionId, blockEdit, initialized = false) {
        let existingIndex = this.findIndex(blockVersionId);

        if (existingIndex !== null) {
            //console.warn('Can not add same block edit twice for id: ' + blockVersionId);
            return;
        }

        this.list.push(
            blockEdit
        );

        let index = (this.list.length - 1);

        this._createIndexBlockVersionId(blockVersionId, index, initialized);
    }

    /**
     * @param {string} blockVersionId
     * @return {BlockEdit|null}
     */
    find(blockVersionId) {
        if (typeof this._indexBlockVersionId[blockVersionId] === "undefined") {
            return null;
        }

        return this.list[this._indexBlockVersionId[blockVersionId]];
    }

    /**
     * @param {string} blockVersionId
     * @return {boolean}
     */
    has(blockVersionId) {
        return (typeof this._indexBlockVersionId[blockVersionId] !== "undefined")
    }

    /**
     * @param {string} blockVersionId
     * @return {int|null}
     */
    findIndex(blockVersionId) {
        if (typeof this._indexBlockVersionId[blockVersionId] === "undefined") {
            return null;
        }

        return this._indexBlockVersionId[blockVersionId];
    }

    /**
     * @param {int} index
     * @return {String|null}
     */
    findBlockVersionId(index) {
        if (typeof this._listBlockVersionId[index] === "undefined") {
            return null;
        }

        return this._listBlockVersionId[index];
    }

    /**
     * @param {int} index
     * @param {boolean} initialized
     * @return {*}
     */
    setInitialized(index, initialized) {
        if (typeof this._listBlockVersionIdInitialized[index] === "undefined") {
            return false;
        }

        this._listBlockVersionIdInitialized[index] = true;

        return true;
    }

    /**
     * @param index
     * @return {boolean|null}
     */
    isInitialized(index) {
        if (typeof this._listBlockVersionIdInitialized[index] === "undefined") {
            return null;
        }

        return this._listBlockVersionIdInitialized[index];
    }

    /**
     * @param {string} context
     * @return {Promise<boolean>}
     */
    initEdit(context) {
        let blockVersionDataCollection = getInstance();
        let blockVersionDataList = blockVersionDataCollection.findListByContext(context);
        let promiseList = [];
        let promiseBlockIdList = [];
        let promiseBlockEditIndexList = [];
        let blockVersionData;
        let blockVersionId;
        let blockEdit;
        let blockEditIndex;
        let result1;
        let self = this;

        let index = 0, len = 0;
        for (index = 0, len = blockVersionDataList.length; index < len; index++) {
            blockVersionData = blockVersionDataList[index];
            blockVersionId = blockVersionData.getId();
            blockEditIndex = self.findIndex(blockVersionId);
            blockEdit = self.find(blockVersionId);

            if (blockEdit === null) {
                console.error('BlockEdit is not built for initEdit: ' + blockVersionId);
                continue;
            }

            if (self.isInitialized(blockEditIndex)) {
                continue;
            }

            result1 = blockEdit.initEdit();

            // @todo @bc Old block edits do not return anything from initEdit, so we assume true
            if (typeof result1 === 'undefined') {
                result1 = true;
            }

            promiseList.push(
                // This is used in case the return result is NOT a promise
                Promise.resolve(result1)
            );

            promiseBlockIdList.push(
                blockVersionId
            );

            promiseBlockEditIndexList.push(
                blockEditIndex
            );
        }

        return Promise.all(promiseList).then(
            (results) => {
                let result, index = 0, len = 0;
                for (index = 0, len = results.length; index < len; index++) {
                    result = (results[index] === true);
                    self.setInitialized(promiseBlockEditIndexList[index], result);
                    blockVersionId = promiseBlockIdList[index];
                    blockVersionDataCollection.setEditInitialized(blockVersionId, result);
                }

                return new Promise(
                    (resolve, reject) => {
                        if (results.indexOf(false) !== -1) {
                            resolve(false);
                            return;
                        }

                        resolve(true);
                    }
                );
            }
        );
    }

    /**
     * @param {string} context
     * @return {Promise<Object>}
     */
    getSaveData(context) {
        let blockVersionDataCollection = getInstance();
        let blockVersionDataList = blockVersionDataCollection.findListByContext(context);
        let promiseList = [];
        let promiseBlockIdList = [];
        let promiseBlockEditIndexList = [];
        let blockVersionData;
        let blockVersionId;
        let blockEdit;
        let blockEditIndex;
        let self = this;

        let index, len;
        for (index = 0, len = blockVersionDataList.length; index < len; index++) {
            blockVersionData = blockVersionDataList[index];
            blockVersionId = blockVersionData.getId();
            blockEditIndex = self.findIndex(blockVersionId);
            blockEdit = self.find(blockVersionId);
            if (blockEdit === null) {
                console.error('BlockEdit is not built for getSaveData: ' + blockVersionId);
                continue;
            }

            promiseList.push(
                // This is used in case the return result is NOT a promise
                Promise.resolve(blockEdit.getSaveData())
            );

            promiseBlockIdList.push(
                blockVersionId
            );

            promiseBlockEditIndexList.push(
                blockEditIndex
            );
        }

        return Promise.all(promiseList).then(
            (saveDataList) => {
                let saveDataResult = {};
                let saveData, index, len;
                for (index = 0, len = saveDataList.length; index < len; index++) {
                    saveData = saveDataList[index];
                    blockVersionId = promiseBlockIdList[index];
                    saveDataResult[blockVersionId] = saveData;
                    // NOTE: This will over-write any changes, make sure other mutations happen after this
                    blockVersionDataCollection.setConfig(blockVersionId, saveData);
                }

                return new Promise(
                    (resolve, reject) => {
                        resolve(saveDataResult, blockVersionId);
                    }
                );
            }
        );
    }
}
