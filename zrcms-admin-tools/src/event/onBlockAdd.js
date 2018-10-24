import eventListeners from "./EventListeners";
import buildEventChain from "./buildEventChain";

/**
 * @param {BlockVersionData} blockVersionData
 * @return {Promise<Object>}
 */
export default function (blockVersionData) {
    let listeners = eventListeners.find('blockAdd');
    return buildEventChain(
        'blockAdd',
        listeners,
        {
            blockVersionData: blockVersionData
        }
    );
}
