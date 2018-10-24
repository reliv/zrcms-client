import getName from './getName'
import setLoading from './setLoading'

/**
 * @param {String} eventName
 * @param {String} eventId
 * @return {Promise<{name: *, loading: boolean}>}
 */
export default function (
    eventName,
    eventId
) {
    let name = getName(eventName, eventId);

    setLoading(name, 1);

    return Promise.resolve(
        {
            name: name,
            loading: false
        }
    );
}
