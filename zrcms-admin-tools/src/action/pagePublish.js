import onPagePublish from "../event/onPagePublish";
import catchEventPromise from "../event/catchEventPromise";

export const PAGE_PUBLISH = 'PAGE_PUBLISH';

/**
 * @param {String} pageVersionId
 * @param {String} targetPageCmsResourceId
 * @return {function(*)}
 */
export default function (
    pageVersionId,
    targetPageCmsResourceId
) {
    return (dispatch) => {
        return onPagePublish(pageVersionId, targetPageCmsResourceId).then(
            (results) => {
                dispatch(
                    {
                        type: PAGE_PUBLISH,
                        payload: results
                    }
                )
            }
        ).catch(catchEventPromise);
    }
}
