export const ATTRIBUTE = 'data-block-available-name';

/**
 * @param {String} blockAvailableName
 * @return {HTMLElement}
 */
export default function (blockAvailableName) {
    return jQuery("[" + ATTRIBUTE + "='" + blockAvailableName + "']");
}
