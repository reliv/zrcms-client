import {getInstance} from '../../../zrcms-admin-tools/src/block-data/BlockVersionDataCollectionFactory'
import domEnableBlockEdit from "./domEnableBlockEdit"

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {Object} eventParams
 * @return {Promise<[HTMLElement]>}
 */
export default function (eventName, eventId, eventResults, eventParams) {
    let blockVersionDataCollection = getInstance();

    let promises = blockVersionDataCollection.findListByContext(eventParams.context).map(
        /**
         * @param {BlockVersionData} blockVersionData
         */
        (blockVersionData) => {
            return domEnableBlockEdit(eventName, eventId, eventResults, {blockVersionData: blockVersionData})
        }
    );

    return Promise.all(promises);
}
