import domBlockInnerGetSelectorById, {ATTRIBUTE as selectorAttribute} from './domBlockInnerGetSelectorById'

export const ATTRIBUTE = selectorAttribute;

/**
 * @param {BlockVersionData} blockVersionData
 * @return {string}
 */
export default function domBlockInnerGetSelector(blockVersionData) {
    return domBlockInnerGetSelectorById(blockVersionData.getId());
}
