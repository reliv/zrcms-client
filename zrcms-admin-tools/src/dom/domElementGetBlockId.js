import {ATTRIBUTE} from './domBlockGetSelector'
import {ATTRIBUTE as ATTRIBUTE_INNER} from './domBlocksInnerGetSelector'

/**
 * @param {HTMLElement} domElement
 * @return {string|null}
 */
export default function (domElement) {
    domElement = jQuery(domElement);
    let blockId = domElement.attr(ATTRIBUTE);

    if (!blockId) {
        blockId = domElement.attr(ATTRIBUTE_INNER);
    }

    if (!blockId) {
        console.error('blockId not found', domElement);
    }

    return blockId;
}
