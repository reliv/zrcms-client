import eventListeners from "./EventListeners";
import buildEventChain from "./buildEventChain";

/**
 * @param {String} blockVersionId
 * @param {String} context
 * @return {Promise<Object>}
 */
export default function (blockVersionId, context) {
    let listeners = eventListeners.find('blockRemove');
    return buildEventChain(
        'blockRemove',
        listeners,
        {
            blockVersionId: blockVersionId,
            context: context
        }
    );
}
