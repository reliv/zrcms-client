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
    let blockVersionData = eventParams.blockVersionData;

    if (blockVersionDataCollection.has(blockVersionData.getId())) {
        console.warn('blockVersionDataAdd blockVersionDataCollection already has ' + blockVersionData.getId());
        return Promise.resolve(blockVersionData);
    }

    blockVersionDataCollection.add(blockVersionData);

    return Promise.resolve(blockVersionData);
}
