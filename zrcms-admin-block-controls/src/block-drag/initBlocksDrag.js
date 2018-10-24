import {init} from './BlockDrag'
import domContainersContextFind from "../../../zrcms-admin-tools/src/dom/domContainersContextFind";
import '../../css/block-arrange.css'

let hasClass = {};

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {Object} eventResults
 * @param {Object} eventParams
 * @return {Promise<void>}
 */
export default function initBlocksDrag(eventName, eventId, eventResults, eventParams) {
    let context = eventParams.context;
    let containerElements = domContainersContextFind(context);

    if (!hasClass[context]) {
        containerElements.addClass('admin-tools-block-arranging');
        hasClass[context] = true;
    }

    return init(context, 1);
}

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {Object} eventParams
 * @return {Promise<void>}
 */
export function initBlockDrag(eventName, eventId, eventResults, eventParams) {
    let context = null;
    if (eventParams.context) {
        context = eventParams.context;
    }

    if (eventParams.blockVersionData) {
        context = eventParams.blockVersionData.getContext();
    }

    if (!context) {
        return Promise.reject('initBlocksDrag requires context to be set in eventParams');
    }

    return initBlocksDrag(eventName, eventId, eventResults, {context: context});
}
