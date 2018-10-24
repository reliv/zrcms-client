import domBlockFind from './domBlockFind'
import {getInstance} from "../block-data/BlockVersionDataCollectionFactory";

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults

 * @param {Object} eventParams
 * @return {*}
 */
export default function (eventName, eventId, eventResults, eventParams) {
    let blockVersionDataCollection = getInstance();
    let blockVersionData = blockVersionDataCollection.find(eventParams.blockVersionId);

    let result = {
        blockVersionId: eventParams.blockVersionId,
        context: eventParams.context,
        removed: true
    };

    if (!blockVersionData) {
        //console.info('block version data gone: ' + blockVersionId);
        return Promise.resolve(result);
    }

    let blockElm = domBlockFind(blockVersionData);

    if (!blockElm) {
        return Promise.resolve(result);
    }

    blockElm.remove();

    return Promise.resolve(result);
}
