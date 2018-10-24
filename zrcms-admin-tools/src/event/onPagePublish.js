import eventListeners from "./EventListeners";
import buildEventChain from "./buildEventChain";

/**
 * @param {String} pageVersionId
 * @param {String} targetPageCmsResourceId
 * @return {Promise<Object>}
 */
export default function (
    pageVersionId,
    targetPageCmsResourceId
) {
    let listeners = eventListeners.find('pagePublish');
    return buildEventChain(
        'pagePublish',
        listeners,
        {
            pageVersionId: pageVersionId,
            targetPageCmsResourceId: targetPageCmsResourceId
        }
    );
}
