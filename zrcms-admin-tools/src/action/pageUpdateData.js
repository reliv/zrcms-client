import onPageUpdateData from "../event/onPageUpdateData";
import catchEventPromise from "../event/catchEventPromise";
export const PAGE_UPDATE_DATA = 'PAGE_UPDATE_DATA';

/**
 * @param applicationState
 * @return {function(*)}
 */
export default function (applicationState) {
    return (dispatch) => {
        return onPageUpdateData(applicationState).then(
            (results) => {
                dispatch(
                    {
                        type: PAGE_UPDATE_DATA,
                        payload: results
                    }
                )
            }
        ).catch(catchEventPromise);
    };
}
