import onBlocksSaveDataRevert from "../event/onBlocksSaveDataRevert";
import ContextList from "../block-data/ContextList";
import catchEventPromise from "../event/catchEventPromise";

export const BLOCKS_SAVE_DATA_REVERT = 'BLOCKS_SAVE_DATA_REVERT';

export const contextList = new ContextList();
export const contextListReady = new ContextList();

/**
 * @param {string} context
 * @return {*}
 */
export default function (context) {
    return (dispatch) => {
        return onBlocksSaveDataRevert(context).then(
            (results) => {
                dispatch(
                    {
                        type: BLOCKS_SAVE_DATA_REVERT,
                        payload: results
                    }
                )
            }
        ).catch(catchEventPromise);
    };
}
