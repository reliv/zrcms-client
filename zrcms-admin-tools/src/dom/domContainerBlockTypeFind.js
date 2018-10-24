import domContainerBlockTypeGetSelector from './domContainerBlockTypeGetSelector'

/**
 * @param {BlockVersionData} blockVersionData
 * @return {string}
 */
export default function(blockVersionData) {
    return jQuery(domContainerBlockTypeGetSelector(blockVersionData))
}
