import eventListeners from "./EventListeners";
import buildEventChain from "./buildEventChain";

/**
 * @param {string} context
 * @return {Promise<Object>}
 */
export default function (context) {
    let listeners = eventListeners.find('blocksSaveDataGet');
    return buildEventChain(
        'blocksSaveDataGet',
        listeners,
        {
            context: context
        }
    );
}
