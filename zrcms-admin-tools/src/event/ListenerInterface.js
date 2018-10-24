/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {Object} eventResults
 * @param {Object} eventParams
 * @returns {Promise<Object>}
 */
export default function (
    eventName,
    eventId,
    eventResults,
    eventParams
) {
    return Promise.resolve({example: true});
}
