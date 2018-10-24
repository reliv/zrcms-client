import domBlockGetSelector from './domBlockGetSelector'

/**
 * @param {BlockVersionData} blockVersionData
 * @return {*}
 */
export default function domBlockFind(blockVersionData) {
    return jQuery(domBlockGetSelector(blockVersionData))
}
