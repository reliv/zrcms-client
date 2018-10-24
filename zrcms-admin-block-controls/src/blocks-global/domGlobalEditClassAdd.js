import '../../css/block-edit.css'

let done = false;

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {Object} eventParams
 * @return {Promise<bool>}
 */
export default function (eventName, eventId, eventResults, eventParams) {
    let promise = new Promise(
        (resolve, reject) => {
            resolve(true);
        }
    );

    if (done) {
        return promise;
    }

    done = true;

    jQuery('html').addClass('admin-tools-blocks-editing');

    return promise;
}
