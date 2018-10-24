/**
 * {BlockLayoutEdit} <interface>
 */
export default class BlockLayoutEdit {
    /**
     * @param {String} id
     * @param {Object} config
     */
    constructor(id, config) {
        this.id = id;
        this.config = config;
        this.initEdit = this.initEdit.bind(this);
        this.getSaveData = this.getSaveData.bind(this);
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
