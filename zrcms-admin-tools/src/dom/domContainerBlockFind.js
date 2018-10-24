import domContainerBlockGetSelector from './domContainerBlockGetSelector'

/**
 * @param {BlockVersionData} blockVersionData
 * @return {string}
 */
export default function domContainerBlockFind(blockVersionData) {
    return jQuery(domContainerBlockGetSelector(blockVersionData))
}
