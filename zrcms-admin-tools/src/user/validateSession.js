import fetchApplicationState from '../../../zrcms-application-state/fetchApplicationState'
import redirectToLogin from './redirectToLogin'
import setLoading from "../../../loading/src/setLoading";

/**
 * @return {Promise}
 */
export default function () {
    setLoading('validateSession', 0);
    return fetchApplicationState().then(
        function (data) {
            if (data.adminTools.allowed) {
                setLoading('validateSession', 1);
                return Promise.resolve('OK');
            }

            redirectToLogin();

            return Promise.reject('Invalid user session');
        }
    ).catch(
        function (err) {
            redirectToLogin();

            return Promise.reject('An error occurred');
        }
    )
}
