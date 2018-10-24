import domContainerGetSelector from './domContainerGetSelector'

/**
 * @param {BlockVersionData} blockVersionData
 * @return {HTMLElement}
 */
export default function domContainerFind(blockVersionData) {
    return jQuery(domContainerGetSelector(blockVersionData))
}
