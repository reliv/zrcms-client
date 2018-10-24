import onBlockAdd from "../event/onBlockAdd";
import catchEventPromise from "../event/catchEventPromise";

export const BLOCK_ADD = 'BLOCK_ADD';

/**
 * @param {BlockVersionData} blockVersionData
 * @return {function(*)}
 */
export default function (blockVersionData) {
    return (dispatch) => {
        return onBlockAdd(blockVersionData).then(
            (results) => {
                dispatch(
                    {
                        type: BLOCK_ADD,
                        payload: results,
                    }
                )
            }
        ).catch(catchEventPromise);
    };
}
