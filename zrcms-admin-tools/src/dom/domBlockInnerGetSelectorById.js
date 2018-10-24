export const ATTRIBUTE = 'data-inner-for-block-id';
/**
 * @param {String} blockVersionId
 * @return {string}
 */
export default function(blockVersionId) {
    return "[" + ATTRIBUTE + "='" + blockVersionId + "']";
}
