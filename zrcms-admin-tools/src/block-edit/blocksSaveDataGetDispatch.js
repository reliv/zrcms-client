import getStore from '../redux/getStore'
import blocksSaveDataGet from '../action/blocksSaveDataGet';
import getAvailableContexts from "../block-data/getAvailableContexts";

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {Object} eventParams
 * @return {Promise<boolean>}
 */
export default function (eventName, eventId, eventResults, eventParams) {
    let store = getStore();
    let availableContexts = getAvailableContexts();
    availableContexts.map(
        (context) => {
            store.dispatch(blocksSaveDataGet(context));
        }
    );

    return new Promise(
        (resolve) => {
            let ready;

            // We hold on resolve until blocksSaveDataGet.contextListReady has all context
            function waitReady() {
                ready = getStore().getState().blocksSaveDataGet.contextListReady.hasAll();
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
