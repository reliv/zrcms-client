import logger from '../../zrcms-admin-tools/src/debug/Logger'
import getBlockComponentsAvailable from '../../zrcms-admin-tools/src/block-component/getBlockComponentsAvailable'
import buildBlockEditNoop from '../../zrcms-admin-tools/src/block-edit/BlockEditNoopFactory'
import domBlockInnerFind from '../../zrcms-admin-tools/src/dom/domBlockInnerFind'
import PluginHandlerBc from "./PluginHandlerBc";

/**
 * @deprecated
 *
 * @param {BlockVersionData} blockVersionData
 * @return {*}
 */
export default function build(blockVersionData) {
    /**
     * @var {BlockComponentsAvailable}
     */
    let blockComponentsAvailable = getBlockComponentsAvailable();
    let defaultConfig = blockComponentsAvailable.findDefaultConfig(blockVersionData.getName());

    let className = blockVersionData.getName() + 'Edit';

    let messageWarn = "@deprecated Using legacy block edit: " + className + " for id: " + blockVersionData.getId();

    let editClass = window[className];

    let blockInnerElm = domBlockInnerFind(blockVersionData);

    let pluginHandler = new PluginHandlerBc(defaultConfig, blockVersionData);

    if (editClass) {
        logger.warn(messageWarn);
        // @todo Wrap with existing methods promises?
        return new editClass(blockVersionData.getId(), blockInnerElm, pluginHandler);
    }

    messageWarn += " -  Legacy block edit not found, using 'noop': " + className + ' for id: ' + blockVersionData.getId();

    logger.warn(messageWarn);

    return buildBlockEditNoop(
        blockVersionData
    );
};
