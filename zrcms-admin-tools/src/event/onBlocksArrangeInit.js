import eventListeners from "./EventListeners";
import buildEventChain from "./buildEventChain";
/**
 * @param {String} context
 * @return {Promise<Object>}
 */
export default function (context) {
    let listeners = eventListeners.find('blocksArrangeInit');
    return buildEventChain(
        'blocksArrangeInit',
        listeners,
        {
            context: context
        }
    );
}
