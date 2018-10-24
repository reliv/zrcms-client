import {getInstance} from "../../zrcms-admin-tools/src/block-data/BlockVersionDataCollectionFactory";
import domBlockFind from "../../zrcms-admin-tools/src/dom/domBlockFind";
import getEditorElements from './getEditorElements'

/**
 *
 * @param  {jQuery.element[]} editorElements
 * @return {{}}
 */
function getEditorData(editorElements) {
    let data = {};

    jQuery.each(
        editorElements,
        function (key, elm) {
            data[key] = jQuery(elm).html();
        }
    );

    return data;
}

/**
 * Listener
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {Object} eventParams
 * @return {Promise<any>}
 */
export default function (eventName, eventId, eventResults, eventParams) {
    /**
     * @type {BlockVersionDataCollection}
     */
    let blockVersionDataCollection = getInstance();

    let blockVersionList = blockVersionDataCollection.findListByContext(eventParams.context);
    let editorsData = {};

    let index, len, blockVersionData, blockElement, editorElements, editorData;
    for (index = 0, len = blockVersionList.length; index < len; index++) {
        blockVersionData = blockVersionList[index];
        blockElement = domBlockFind(blockVersionData);
        editorElements = getEditorElements(blockElement);
        editorData = getEditorData(editorElements);
        editorsData[blockVersionData.getId()] = editorData;

        // NOTE: We merge to be safe
        blockVersionDataCollection.mergeConfig(
            blockVersionData.getId(),
            editorData
        );
    }

    return Promise.resolve(editorsData);
}

