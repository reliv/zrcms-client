import onPageEditInit from "../event/onPageEditInit";
import catchEventPromise from "../event/catchEventPromise";

export const PAGE_EDIT_INIT = 'PAGE_EDIT_INIT';

let state = {};
let initialized = false;

/**
 * @param {Boolean} value
 * @return {*[]}
 */
export function setInitialized(value) {
    initialized = value;
}

/**
 * @return {boolean}
 */
export function isInitialized() {
    return initialized;
}

/**
 * @param {Object} applicationState
 * @return {*}
 */
export default function (applicationState) {
    // Spam and duplicate call protection
    if (isInitialized()) {
        return (dispatch) => {
            return Promise.resolve(
                dispatch(
                    {
                        type: PAGE_EDIT_INIT,
                        payload: state,
                    }
                )
            )
        }
    }

    setInitialized(true);

    return (dispatch) => {
        return onPageEditInit(applicationState).then(
            (results) => {
                setInitialized(true);
                state = results;
                dispatch(
                    {
                        type: PAGE_EDIT_INIT,
                        payload: results
                    }
                )
            }
        ).catch(catchEventPromise);
    }
}
