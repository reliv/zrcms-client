import logger from "../debug/Logger";
import {DEBUG} from "../debug/LogLevels";

let isDebug = logger.isLevel(DEBUG);

/**
 * @param {Error|String}error
 */
export default function (error) {
    let message = 'Something went wrong, please refresh page and try again.';
    let errorMessage = '';

    if (typeof error === 'string') {
        errorMessage = error
    }

    if (typeof error === 'object' && typeof error.message === 'string') {
        errorMessage = error.message
    }

    if (isDebug) {
        logger.error(error);
        throw error;
    }

    message += ' ' + errorMessage;
    window.alert(message);
}
