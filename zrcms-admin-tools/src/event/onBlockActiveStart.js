import buildEventChain from "./buildEventChain";
import eventListeners from "./EventListeners";

/**
 * @param {BlockVersionData} blockVersionData
 * @return {Promise<{BlockVersionData}>}
 */
export default async function (blockVersionData) {
    let listeners = eventListeners.find('blockActiveStart');
    return buildEventChain(
        'blockActiveStart',
        listeners,
        {
            blockVersionData: blockVersionData
        }
    );
}
