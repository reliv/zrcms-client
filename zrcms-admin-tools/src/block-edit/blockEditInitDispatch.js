import getStore from '../redux/getStore'
import blocksEditInit from '../action/blocksEditInit';

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {Object} eventParams
 * @return {Promise<boolean>}
 */
export default function (eventName, eventId, eventResults, eventParams) {
    let store = getStore();
    let result = store.dispatch(blocksEditInit(eventParams.context));
    return new Promise(
        (resolve) => {
            let ready;

            // We hold on resolve until blocksEditInit.contextListReady has context
            function waitReady() {
                ready = getStore().getState().blocksEditInit.contextListReady.has(eventParams.context);
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
