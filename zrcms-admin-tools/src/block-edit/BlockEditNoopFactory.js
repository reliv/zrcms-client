import BlockEditNoop from './BlockEditNoop'

/**
 * @param {BlockVersionData} blockVersionData
 * @return {*}
 */
export default function build(blockVersionData) {
    return new BlockEditNoop(blockVersionData.getId(), blockVersionData.getConfig());
};
