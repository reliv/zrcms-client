import domBlockLinksDisable from "./domBlockLinksDisable";
import domPrepareBlockElement from "./domPrepareBlockElement";
import domBlockEditableButtonsCreate from "./domBlockEditableButtonsCreate";

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {Object} eventParams
 * @return {Promise<[HTMLElement]>}
 */
export default function (eventName, eventId, eventResults, eventParams) {
    return domPrepareBlockElement(eventParams.blockVersionData).then(
        () => {
            domBlockEditableButtonsCreate(eventParams.blockVersionData).then(
                () => {
                    return domBlockLinksDisable(eventParams.blockVersionData)
                }
            );
        }
    );
}
