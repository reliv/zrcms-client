import extend from 'extend'
import objectDiff from '../../../object-diff/object-diff'

export const CONTEXT_PAGE = 'page';
export const CONTEXT_SITE = 'site';

export default class BlockVersionData {
    /**
     * @param {string} context
     * @param {string} containerName
     * @param {object} blockVersion
     * @param {boolean} editInitialized
     * @param {boolean} save For new blocks, set this initially to false, so it my be reverted
     * @param {string} constructContext Tracking message for debugging
     */
    constructor(
        context,
        containerName,
        blockVersion,
        editInitialized = false,
        save = true,
        constructContext = 'not set'
    ) {
        save = (save === true);
        this.context = context;
        this.containerName = containerName;
        this.blockVersion = null;
        this.editInitialized = (editInitialized === true);
        this.save = save;
        this.constructContext = constructContext;
        this.setBlockVersion(blockVersion);
        this._initialContext = context;
        this._initialContainerName = containerName;
        this._initialBlockVersion = extend(true, {}, blockVersion);
        this._initialSave = save;
    }

    /**
     * @param {object} blockVersion
     */
    setBlockVersion(blockVersion) {
        this.blockVersion = extend(true, {}, blockVersion);
    }

    /**
     * @return {object}
     */
    getBlockVersion() {
        return extend(true, {}, this.blockVersion);
    }

    /**
     * @return {String}
     */
    getId() {
        return this.blockVersion.id;
    }

    /**
     * @return {String}
     */
    getName() {
        return this.blockVersion.blockComponentName;
    }

    /**
     * @return {String}
     */
    getConfig() {
        return extend(true, {}, this.blockVersion.config);
    }

    /**
     * @param {object} config AKA: saveData
     */
    setConfig(config) {
        this.blockVersion.config = extend(true, {}, config);
    }

    /**
     * @param {object} config AKA: saveData
     */
    mergeConfig(config) {
        this.blockVersion.config = extend(true, {}, this.blockVersion.config, config);
    }

    /**
     * @return {String}
     */
    getLayoutProperties() {
        return extend(true, {}, this.blockVersion.layoutProperties);
    }

    /**
     * @param {object} layoutProperties
     */
    setLayoutProperties(layoutProperties) {
        this.blockVersion.layoutProperties = extend(true, {}, layoutProperties);
    }

    /**
     * @param {object} layoutProperties
     */
    mergeLayoutProperties(layoutProperties) {
        this.blockVersion.layoutProperties = extend(true, {}, this.blockVersion.layoutProperties, layoutProperties);
    }

    /**
     * @param {String} context
     */
    setContext(context) {
        this.context = context;
    }

    /**
     * @return {String}
     */
    getContext() {
        return this.context;
    }

    /**
     * @param {String} containerName
     */
    setContainerName(containerName) {
        this.containerName = containerName;
    }

    /**
     * @return {String}
     */
    getContainerName() {
        return this.containerName;
    }

    /**
     * @param {String} containerVersionId
     */
    setContainerId(containerVersionId) {
        this.blockVersion.containerVersionId = containerVersionId;
    }

    /**
     * @return {String}
     */
    getContainerId() {
        return this.blockVersion.containerVersionId;
    }

    /**
     * @return {boolean}
     */
    setEditInitialized(editInitialized) {
        this.editInitialized = (editInitialized === true);
    }

    /**
     * @return {boolean}
     */
    isEditInitialized() {
        return (this.editInitialized === true);
    }

    /**
     * remove
     */
    remove() {
        this.save = false;
    }

    /**
     * @param save
     */
    setSave(save) {
        this.save = (save === true);
    }

    /**
     * @return {boolean}
     */
    canSave() {
        return (this.save === true);
    }

    revert() {
        this.setContext(this._initialContext);
        this.setContainerName(this._initialContainerName);
        this.setSave(this._initialSave);
        this.setBlockVersion(this._initialBlockVersion);
    }

    /**
     * @return {boolean}
     */
    hasDataChanged() {
        let initial = {
            context: this._initialContext,
            containerName: this._initialContainerName,
            save: this._initialSave,
            blockVersion: this._initialBlockVersion
        };
        let current = {
            context: this.context,
            containerName: this.containerName,
            save: this.save,
            blockVersion: this.blockVersion
        };

        return objectDiff.asBool(initial, current);
    }

    status() {
        let initial = {
            context: this._initialContext,
            containerName: this._initialContainerName,
            save: this._initialSave,
            blockVersion: this._initialBlockVersion
        };
        let current = {
            context: this.context,
            containerName: this.containerName,
            save: this.save,
            blockVersion: this.getBlockVersion()
        };

        return {
            name: this.getName(),
            id: this.getId(),
            initial: initial,
            current: current,
            changed: objectDiff.asBool(initial, current),
            changedData: objectDiff.asFlatObject(
                initial,
                current,
                '[' + this.getName() + ':' + this.getId() + ']'
            ),
            editInitialized: this.isEditInitialized(),
            isNewlyAdded: (!this._initialSave)
        };
    }

    /**
     * immutable copy
     *
     * @return {Object}
     */
    state() {
        return {
            context: this.getContext(),
            containerName: this.getContainerName(),
            blockVersion: this.getBlockVersion(),
            editInitialized: this.isEditInitialized(),
            save: this.save,
            constructContext: this.constructContext,
        }
    }
}
