import buildBlockEditLegacy from "../../../rcm-compatibility/src/BlockEditLegacyFactory";
import buildBlockEditNoop from "./BlockEditNoopFactory";
import buildBlockEditCustomGlobal from "./BlockEditCustomGlobalFactory";
import buildBlockEditFieldDialog from "./BlockEditFieldDialogFactory";

let defaultStrategies = {
    'noop': buildBlockEditNoop,
    'custom-global': buildBlockEditCustomGlobal,
    'rcm-plugin-bc': buildBlockEditLegacy,
    // 'field-dialog': buildBlockEditFieldDialogLegacy,
    'field-dialog': buildBlockEditFieldDialog,
    'react-field-dialog': buildBlockEditFieldDialog,
};

class BlockEditStrategies {
    /**
     * @param {Object} strategies
     */
    constructor(strategies = {}) {
        this.strategies = strategies;
    }

    /**
     * @param {String} name
     * @param {function} blockEditFactory
     */
    add(name, blockEditFactory) {
        this.strategies[name] = blockEditFactory;
    }

    /**
     * @return {Object|*}
     */
    getAll() {
        return this.strategies;
    }
}

window.zrcmsAdminToolsBlockEditStrategies = new BlockEditStrategies(defaultStrategies);

export default window.zrcmsAdminToolsBlockEditStrategies;
