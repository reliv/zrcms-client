import getName from './getName'
import registerLoadingListener from './registerLoadingListener'
import setLoading from './setLoading'

/**
 * @param {String} eventName
 * @param {String} eventId
 */
export default function (eventName, eventId) {
    registerLoadingListener();

    let name = getName(eventName, eventId);

    setLoading(name, 0);

    return Promise.resolve(
        {
            name: name,
            loading: true
        }
    );

}
