import onBlockRemove from "../event/onBlockRemove";
import catchEventPromise from "../event/catchEventPromise";

export const BLOCK_REMOVE = 'BLOCK_REMOVE';

/**
 * @param {String} blockVersionId
 * @param {String} context
 * @return {function(*)}
 */
export default function (blockVersionId, context) {
    return (dispatch) => {
        return onBlockRemove(blockVersionId, context).then(
            (results) => {
                dispatch(
                    {
                        type: BLOCK_REMOVE,
                        payload: results,
                    }
                )
            }
        ).catch(catchEventPromise);
    };
}
