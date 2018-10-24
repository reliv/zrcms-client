import onBlocksInitEdit from "../event/onBlocksEditInit";
import ContextList from "../block-data/ContextList";
import catchEventPromise from "../event/catchEventPromise";

export const BLOCKS_EDIT_INIT = 'BLOCKS_EDIT_INIT';

export const contextList = new ContextList();
export const contextListReady = new ContextList();
let state = {};

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
                        type: BLOCKS_EDIT_INIT,
                        contextList: contextList.getCopy(),
                        contextListReady: contextListReady.getCopy(),
                        payload: state,
                    }
                )
            )
        }
    }

    contextList.add(context);

    return (dispatch) => {
        return onBlocksInitEdit(context).then(
            (results) => {
                contextListReady.add(context);
                state = results;
                dispatch(
                    {
                        type: BLOCKS_EDIT_INIT,
                        contextList: contextList.getCopy(),
                        contextListReady: contextListReady.getCopy(),
                        payload: results,
                    }
                )
            }
        ).catch(catchEventPromise);
    };
}
