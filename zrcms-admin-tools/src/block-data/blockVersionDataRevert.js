import {getInstance} from "./BlockVersionDataCollectionFactory"

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {Object} eventParams
 * @return {Promise<BlockVersionData>}
 */
export default function (eventName, eventId, eventResults, eventParams) {
    let blockVersionDataCollection = getInstance();

    return Promise.resolve(
        blockVersionDataCollection.revertByContext(eventParams.context)
    );
}
