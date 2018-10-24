import domContainerGetSelector from './domContainerGetSelector'
import domBlockGetSelector from './domBlockGetSelector'

/**
 * @param {BlockVersionData} blockVersionData
 * @return {string}
 */
export default function(blockVersionData) {
    return domContainerGetSelector(blockVersionData)
        + ' ' + domBlockGetSelector(blockVersionData)
        + "[block-name='" + blockVersionData.getName() + "']";
}
