import blockVersionBuildBlockEdit from "./blockVersionBuildBlockEdit";

let state = {};

/**
 *
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {Object} eventParams
 * @return {Promise<boolean> | Promise<any>}
 */
export default function (eventName, eventId, eventResults, eventParams) {
    let context = eventParams.blockVersionData.getContext();

    return blockVersionBuildBlockEdit(eventParams.blockVersionData).initEdit(context).then(
        (result) => {
            state[context] = result;
            return Promise.resolve(state);
        }
    );
}
