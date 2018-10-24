import getStore from '../redux/getStore'
import pageUpdateData from '../action/pageUpdateData';

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {Object} eventParams
 * @return {Promise<boolean>}
 */
export default function (eventName, eventId, eventResults, eventParams) {
    let store = getStore();
    let initialPageUpdateId = store.getState().pageUpdateData.pageUpdateId;

    let result = store.dispatch(pageUpdateData(eventParams.applicationState));

    return new Promise(
        (resolve) => {
            let ready;

            // We hold on resolve until pageUpdateId changes
            function waitReady() {
                ready = getStore().getState().pageUpdateData.pageUpdateId !== initialPageUpdateId;
                if (!ready) {
                    window.setTimeout(waitReady, 50);
                    return false;
                }
                resolve(true);
                return true;
            }

            waitReady();
        }
    );
}
