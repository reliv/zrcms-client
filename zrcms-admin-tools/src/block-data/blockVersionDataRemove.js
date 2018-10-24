import {getInstance} from "./BlockVersionDataCollectionFactory"

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {Object} eventParams
 * @return {Promise<Boolean>}
 */
export default function (eventName, eventId, eventResults, eventParams) {
    let result = {
        blockVersionId: eventParams.blockVersionId,
        context: eventParams.context,
        removed: true,
        message: 'removed'
    };

    let blockVersionDataCollection = getInstance();

    let blockVersionData = blockVersionDataCollection.find(eventParams.blockVersionId);

    if (!blockVersionData) {
        result.message = 'nothing to remove';
        return Promise.resolve(result);
    }

    blockVersionDataCollection.remove(eventParams.blockVersionId);

    result.removed = !blockVersionData.canSave();

    return Promise.resolve(result);
}
