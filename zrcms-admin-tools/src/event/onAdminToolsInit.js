import eventListeners from "./EventListeners";
import buildEventChain from "./buildEventChain";

/**
 * @return {Promise<Object>}
 */
export default function () {
    let listeners = eventListeners.find('adminToolsInit');
    return buildEventChain(
        'adminToolsInit',
        listeners,
        {}
    );
}
