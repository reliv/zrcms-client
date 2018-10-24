import eventListeners from "./EventListeners";
import buildEventChain from "./buildEventChain";

/**
 * @param {object} applicationState
 * @return {Promise<Object>}
 */
export default function (applicationState) {
    let listeners = eventListeners.find('pageEditInit');
    return buildEventChain(
        'pageEditInit',
        listeners,
        {
            applicationState: applicationState
        }
    );
}
