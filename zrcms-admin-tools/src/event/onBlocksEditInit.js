import eventListeners from "./EventListeners";
import buildEventChain from "./buildEventChain";

/**
 * @param {string} context
 * @return {Promise<Object>}
 */
export default function (context) {
    let listeners = eventListeners.find('blocksEditInit');
    return buildEventChain(
        'blocksEditInit',
        listeners,
        {
            context: context
        }
    );
}
