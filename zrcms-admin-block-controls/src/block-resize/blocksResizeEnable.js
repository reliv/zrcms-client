import getInstance from "./DomBlockColumnSizeFactory"
import {getInstance as getBlockVersionDataCollectionInstance} from "../../../zrcms-admin-tools/src/block-data/BlockVersionDataCollectionFactory"

import domBlockFind from "../../../zrcms-admin-tools/src/dom/domContainerBlockFind"

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {Object} eventParams
 * @return {Promise<Object[]>}
 */
export default function (eventName, eventId, eventResults, eventParams) {
    let blockVersionDataCollection = getBlockVersionDataCollectionInstance();

    let blockVersionDataList = blockVersionDataCollection.findListByContext(eventParams.context);

    let promises = [];

    blockVersionDataList.map(
        (blockVersionData) => {
            promises.push(
                blockResizeEnable(
                    eventName,
                    eventId,
                    eventResults,
                    {
                        blockVersionData: blockVersionData,
                        context: eventParams.context
                    }
                )
            )
        }
    );

    return Promise.all(promises);
}

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {Object} eventParams
 * @return {Promise<Object>}
 */
export function blockResizeEnable(eventName, eventId, eventResults, eventParams) {
    let domBlockColumnSize = getInstance();
    let domElement = domBlockFind(eventParams.blockVersionData);
    domBlockColumnSize.addControls(domElement);

    return Promise.resolve(
        {
            blockVersionId: eventParams.blockVersionData.getId(),
            result: true
        }
    );
}
