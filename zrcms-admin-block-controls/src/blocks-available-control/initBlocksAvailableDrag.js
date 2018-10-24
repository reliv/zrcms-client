import {makeBlocksAvailableDraggable} from './BlocksAvailableDrag'

let rendered = false;

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {Object} eventParams
 * @return {Promise<void>}
 */
export default function (eventName, eventId, eventResults, eventParams) {
    if (rendered) {
        return Promise.resolve(true);
    }
    rendered = true;

    return Promise.resolve(makeBlocksAvailableDraggable());
}
