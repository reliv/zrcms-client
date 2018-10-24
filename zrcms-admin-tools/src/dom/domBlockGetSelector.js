export const ATTRIBUTE = 'data-block-id';

/**
 * @param {BlockVersionData} blockVersionData
 * @return {string}
 */
export default function domBlockGetSelector(blockVersionData) {
    return "[" + ATTRIBUTE + "='" + blockVersionData.getId() + "']";
}
