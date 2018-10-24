import {getInstance} from "../../zrcms-admin-tools/src/block-data/BlockVersionDataCollectionFactory";
import blockRichEditEditInit from './blockRichEditEditInit'

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {Object} eventParams
 * @return {Promise<any>}
 */
export default function (eventName, eventId, eventResults, eventParams) {
    let blockVersionDataCollection = getInstance();
    let blockVersionList = blockVersionDataCollection.findListByContext(eventParams.context);

    let index, len, blockVersionData, blockElement, editorElements, editorData;
    let promises = [];
    for (index = 0, len = blockVersionList.length; index < len; index++) {
        blockVersionData = blockVersionList[index];
        promises.push(
            {
                blockVersionId: blockVersionData.getId(),
                initialized: blockRichEditEditInit(
                    eventName,
                    eventId,
                    eventResults,
                    {blockVersionData: blockVersionData}
                )
            }
        );
    }

    return Promise.all(promises);
}
