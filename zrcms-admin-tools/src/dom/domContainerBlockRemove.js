import domContainerBlockFind from './domContainerBlockFind'

/**
 * @deprecated
 * @param {BlockVersionData} blockVersionData
 * @return {boolean}
 */
export default function domContainerBlockRemove(blockVersionData) {
    let blockElm = domContainerBlockFind(blockVersionData);

    if (!blockElm) {
        return false;
    }

    blockElm.remove();

    return true;
}
