import onBlocksGetSaveData from "../event/onBlocksSaveDataGet";
import ContextList from "../block-data/ContextList";
import catchEventPromise from "../event/catchEventPromise";

export const BLOCKS_SAVE_DATA_GET = 'BLOCKS_SAVE_DATA_GET';

export const contextList = new ContextList();
export const contextListReady = new ContextList();

/**
 * @param {string} context
 * @return {*}
 */
export default function (context) {
    // Spam and duplicate call protection
    if (contextList.has(context)) {
        return (dispatch) => {
            return Promise.resolve(
                dispatch(
                    {
                        type: BLOCKS_SAVE_DATA_GET,
                        contextList: contextList.getCopy(),
                        contextListReady: contextListReady.getCopy(),
                    }
                )
            )
        }
    }

    contextList.add(context);

    return (dispatch) => {
        return onBlocksGetSaveData(context).then(
            (results) => {
                contextListReady.add(context);
                dispatch(
                    {
                        type: BLOCKS_SAVE_DATA_GET,
                        contextList: contextList.getCopy(),
                        contextListReady: contextListReady.getCopy(),
                        payload: results
                    }
                )
            }
        ).catch(catchEventPromise);
    };
}
