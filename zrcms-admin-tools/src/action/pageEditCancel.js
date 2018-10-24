import onPageEditCancel from "../event/onPageEditCancel";
import catchEventPromise from "../event/catchEventPromise";

export const PAGE_EDIT_CANCEL = 'PAGE_EDIT_CANCEL';
let state = {};

/**
 * @param {Object} applicationState
 * @return {function(*)}
 */
export default function (applicationState) {
    return (dispatch) => {
        return onPageEditCancel(applicationState).then(
            (results) => {
                state = results;
                dispatch(
                    {
                        type: PAGE_EDIT_CANCEL,
                        payload: results
                    }
                )
            }
        ).catch(catchEventPromise);
    };
}
