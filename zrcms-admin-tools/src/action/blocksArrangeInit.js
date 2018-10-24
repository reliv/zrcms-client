import onBlocksInitArranging from "../event/onBlocksArrangeInit";
import ContextList from "../block-data/ContextList";
import catchEventPromise from "../event/catchEventPromise";

export const BLOCKS_ARRANGE_INIT = 'BLOCKS_ARRANGE_INIT';

let state = {};
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
                        type: BLOCKS_ARRANGE_INIT,
                        contextList: contextList.getCopy(),
                        contextListReady: contextListReady.getCopy(),
                        payload: state
                    }
                )
            )
        }
    }

    contextList.add(context);

    return (dispatch) => {
        return onBlocksInitArranging(context).then(
            (results) => {
                contextListReady.add(context);
                state = results;
                dispatch(
                    {
                        type: BLOCKS_ARRANGE_INIT,
                        contextList: contextList.getCopy(),
                        contextListReady: contextListReady.getCopy(),
                        payload: results
                    }
                )
            }
        ).catch(catchEventPromise);
    };
}
