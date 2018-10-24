import domContainerBlockTypeFind from '../../../zrcms-admin-tools/src/dom/domContainerBlockTypeFind'

const checkInterval = 50;
const maxWait = 5000;

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {Object} eventParams
 * @return {Promise<void>}
 */
export default function (eventName, eventId, eventResults, eventParams) {
    let time = 0;

    return new Promise(
        (resolve, reject) => {
            let ready;
            let blockElement = null;

            // We hold on resolve until blockVersionData has dom element
            function waitReady() {
                if (time > maxWait) {
                    reject(
                        'Waited more than ' + maxWait + 'ms'
                        + ' for block element for blockVersionId: ' + eventParams.blockVersionData.getId()
                    );
                    return false;
                }
                blockElement = domContainerBlockTypeFind(eventParams.blockVersionData);

                ready = (blockElement.length && blockElement.length > 0);

                if (!ready) {
                    time = time + checkInterval;
                    window.setTimeout(waitReady, checkInterval);
                    return false;
                }

                resolve(true);
                return true;
            }

            waitReady();
        }
    );
}
