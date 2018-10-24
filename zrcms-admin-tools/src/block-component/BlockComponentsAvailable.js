import getDefaultConfigPrepared from './getDefaultConfigPrepared'

/**
 * {BlockComponentsAvailable}
 */
export default class BlockComponentsAvailable {
    constructor(blockComponentList) {
        this.list = blockComponentList;
        this._indexBlockName = {};
        this._createIndexBlockName(blockComponentList)
    }

    _createIndexBlockName(blockComponentList) {
        let index, len;
        for (index = 0, len = blockComponentList.length; index < len; index++) {
            this._indexBlockName[blockComponentList[index].name] = index;
        }
    }

    /**
     * @return {[]}
     */
    getList() {
        return this.list;
    }

    /**
     * @param {string} blockName
     * @return {*}
     */
    find(blockName) {
        if (typeof this._indexBlockName[blockName] === "undefined") {
            return null;
        }

        // @todo (immutable) return copy
        return this.list[this._indexBlockName[blockName]];
    }

    /**
     * @param {string} blockName
     * @return {*}
     */
    findDefaultConfig(blockName) {
        return getDefaultConfigPrepared(
            this.findProperty(blockName, 'fields', null),
            this.findProperty(blockName, 'defaultConfig', {})
        );
    }

    /**
     * @param {String} blockName
     * @return {String|null}
     */
    findBlockEditName(blockName) {
        let blockEditName = this.findProperty(blockName, 'editor', null);
        if (!blockEditName) {
            return null;
        }

        // This is for schema style names
        return blockEditName.split(':')[0];
    }

    /**
     * @param {String} blockName
     * @return {String|null}
     */
    findBlockEditData(blockName) {
        let blockEditName = this.findProperty(blockName, 'editor', null);

        if (!blockEditName) {
            return null;
        }

        let parts = blockEditName.split(':');

        if (!parts[1]) {
            return null;
        }

        // This is for schema style names
        return parts[1];
    }

    /**
     *
     * @param {string} blockName
     * @param {string} property
     * @param {mixed} def
     * @return {*}
     */
    findProperty(blockName, property, def) {
        let blockComponent = this.find(blockName);
        if (!blockComponent) {
            return def;
        }

        if (typeof blockComponent['properties'] === "undefined") {
            return def;
        }

        if (typeof blockComponent['properties'][property] === "undefined") {
            return def;
        }

        // @todo (immutable) return copy
        return blockComponent['properties'][property];
    }
}
