import {isInitialized, setInitialized} from "./EditorInitializedTracking"
import getEditorElements from "./getEditorElements";
import buildEditors from "./buildEditors"
import domBlockFind from "../../zrcms-admin-tools/src/dom/domBlockFind";

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {Object} eventParams
 * @return {Promise<any>}
 */
export default function (eventName, eventId, eventResults, eventParams) {
    let blockVersionData = eventParams.blockVersionData;
    let context = blockVersionData.getContext();
    if (isInitialized(context, blockVersionData.getId())) {
        // Skip it already done... spam protection
        Promise.resolve(true);
    }

    setInitialized(context, blockVersionData.getId());

    let blockElement = domBlockFind(blockVersionData);
    let editorElements = getEditorElements(blockElement);

    return Promise.resolve(buildEditors(blockVersionData, editorElements));
}
