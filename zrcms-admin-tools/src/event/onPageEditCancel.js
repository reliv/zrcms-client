import eventListeners from "./EventListeners";
import buildEventChain from "./buildEventChain";

/**
 * @param {object} applicationState
 * @return {Promise<Object>}
 */
export default function (applicationState) {
    let listeners = eventListeners.find('pageEditCancel');
    return buildEventChain(
        'pageEditCancel',
        listeners,
        {
            applicationState: applicationState
        }
    );
}
