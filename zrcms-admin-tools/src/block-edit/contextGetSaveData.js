import contextBuildBlockEdit from "./contextBuildBlockEdit";

let state = {};

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {Object} eventParams
 * @return {Promise<any>}
 */
export default function (eventName, eventId, eventResults, eventParams) {
    return contextBuildBlockEdit(eventParams.context).getSaveData(eventParams.context).then(
        (saveData) => {
            state[eventParams.context] = saveData;
            return Promise.resolve(state);
        }
    );
}
