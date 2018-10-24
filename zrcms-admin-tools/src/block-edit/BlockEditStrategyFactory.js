import logger from '../debug/Logger'
import getBlockComponentsAvailable from '../block-component/getBlockComponentsAvailable'
import {getInstance} from '../block-data/BlockVersionDataCollectionFactory'
import blockEditStrategies from "./BlockEditStrategies";

/**
 * @param {String} blockVersionId
 * @return {BlockEdit|null}
 */
export default function build(blockVersionId) {
    let blockComponentsAvailable = getBlockComponentsAvailable();

    if (!blockComponentsAvailable) {
        logger.error('blockComponentsAvailable not built');
        return null;
    }

    let blockVersionDataCollection = getInstance();

    let blockVersionData = blockVersionDataCollection.find(blockVersionId);

    if (!blockVersionData) {
        logger.error('blockVersionData not found: ' + blockVersionId);
        return null;
    }

    let blockComponent = blockComponentsAvailable.find(blockVersionData.getName());

    if (!blockComponent) {
        logger.error('blockComponent not found: ' + blockVersionData.getName());
        return null;
    }

    logger.info(
        'BlockEdit build for: ' + blockComponent.name + ' with id: ' + blockVersionData.getId(),
        blockVersionData
    );

    let blockEdit = getBlockEdit(blockVersionData);

    // @todo @bc Force properties
    blockEdit.id = blockVersionData.getId();
    blockEdit.config = blockVersionData.getConfig();

    return blockEdit;
}

/**
 * @param {BlockVersionData} blockVersionData
 * @return {*}
 */
function getBlockEdit(blockVersionData) {
    let strategies = blockEditStrategies.getAll();
    let blockComponentsAvailable = getBlockComponentsAvailable();
    let blockEditName = blockComponentsAvailable.findBlockEditName(blockVersionData.getName());

    // @todo @bc Force bc editor
    if (!blockEditName) {
        blockEditName = 'rcm-plugin-bc';
    }

    let blockEdit = strategies[blockEditName](blockVersionData);

    if (!blockEdit) {
        logger.warn("No block edit config found, using 'noop' for: " + blockVersionData.getName());
        blockEditName = 'noop';
        blockEdit = strategies[blockEditName](blockVersionData);
    }

    return blockEdit;
}
