import eventListeners from "./EventListeners";
import buildEventChain from "./buildEventChain";

/**
 * @param {object} applicationState
 * @return {Promise<Object>}
 */
export default function (applicationState) {
    let listeners = eventListeners.find('pageDraftSave');
    return buildEventChain(
        'pageDraftSave',
        listeners,
        {
            applicationState: applicationState
        }
    );
}
