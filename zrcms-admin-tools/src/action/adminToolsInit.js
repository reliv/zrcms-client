import onAdminToolsInit from "../event/onAdminToolsInit";
import catchEventPromise from "../event/catchEventPromise";
export const INIT = 'INIT';

let initialized = false;
let state = {};

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
 * @return {*}
 */
export default function () {
    // Spam and duplicate call protection
    // @todo This needs to be smarter
    if (isInitialized()) {
        return (dispatch) => {
            return Promise.resolve(
                dispatch(
                    {
                        type: INIT,
                        payload: state,
                    }
                )
            )
        }
    }

    setInitialized();

    return (dispatch) => {
        return onAdminToolsInit().then(
            (results) => {
                setInitialized();
                state = results;
                dispatch(
                    {
                        type: INIT,
                        payload: results
                    }
                )
            }
        ).catch(catchEventPromise);
    };
}
