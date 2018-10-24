

/**
 * {BlockLayoutEditRichEdit}
 */
export default class BlockLayoutEditRichEdit {
    /**
     * @param {String} id
     * @param {Object} config
     */
    constructor(id, config) {
        this.id = id;
        this.config = config;
        this.initEdit = this.initEdit.bind(this);
        this.getSaveData = this.getSaveData.bind(this);
        // @todo data-richedit="html" setup editor then create layout data
    }

    /**
     * @return {Promise<boolean>}
     */
    async initEdit() {
        return true;
    }

    /**
     * @return {Promise<object>}
     */
    async getSaveData() {
        return {};
    }
}
