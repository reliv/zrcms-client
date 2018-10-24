import contextBuildBlockEdit from "./contextBuildBlockEdit";

let state = {};

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {Object} eventParams
 * @return {Promise<boolean>}
 */
export default function (eventName, eventId, eventResults, eventParams) {
    return contextBuildBlockEdit(eventParams.context).initEdit(eventParams.context).then(
        (result) => {
            state[eventParams.context] = result;
            return Promise.resolve(state);
        }
    );
}
