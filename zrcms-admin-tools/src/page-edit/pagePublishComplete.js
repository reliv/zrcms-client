/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {String} pageVersionId
 * @param {String} targetPageCmsResourceId
 * @param {Object} pagePublishResults
 * @return {Promise<string>}
 */
export default function (
    eventName,
    eventId,
    eventResults,
    pageVersionId,
    targetPageCmsResourceId,
    pagePublishResults
) {
    window.location.replace(window.location.pathname);

    return new Promise(
        (resolve, reject) => {
            resolve(window.location.pathname);
        }
    );
}
