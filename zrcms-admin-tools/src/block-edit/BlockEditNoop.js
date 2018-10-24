import BlockEdit from './BlockEdit'

export default class BlockEditNoop extends BlockEdit{
    /**
     * @param {String} id
     * @param {Object} config
     */
    constructor(id, config) {
        super(id, config);
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
