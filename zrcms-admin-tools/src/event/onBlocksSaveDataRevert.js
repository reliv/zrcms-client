import eventListeners from "./EventListeners";
import buildEventChain from "./buildEventChain";

/**
 * @param {string} context
 * @return {Promise<Object>}
 */
export default function (context) {
    let listeners = eventListeners.find('blocksSaveDataRevert');
    return buildEventChain(
        'blocksSaveDataRevert',
        listeners,
        {
            context: context
        }
    );
}
