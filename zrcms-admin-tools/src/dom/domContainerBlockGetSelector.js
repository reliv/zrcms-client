import domContainerGetSelector from './domContainerGetSelector'
import domBlockGetSelector from './domBlockGetSelector'

/**
 * @param {BlockVersionData} blockVersionData
 * @return {string}
 */
export default function domContainerBlockGetSelector(blockVersionData) {
    return domContainerGetSelector(blockVersionData) + ' ' + domBlockGetSelector(blockVersionData);
}
