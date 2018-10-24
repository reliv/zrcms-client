export const ATTRIBUTE = 'data-container-context';

/**
 * @param {BlockVersionData} blockVersionData
 * @return {string}
 */
export default function domContainerGetSelector(blockVersionData) {
    return "[" + ATTRIBUTE + "='" + blockVersionData.getContext() + "']";
}
