import domBlockGetSelector from './domBlockGetSelector'

/**
 * @param {BlockVersionData} blockVersionData
 * @return {*}
 */
export default function domBlockInnerFind(blockVersionData) {
    return jQuery(domBlockGetSelector(blockVersionData))
}
