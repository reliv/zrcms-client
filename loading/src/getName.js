/**
 * @param {String} eventName
 * @param {String} eventId
 * @return {string}
 */
export default function (eventName, eventId,) {
    return 'zrcms-' + eventName + ':' + eventId;
}
