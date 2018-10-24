import loading from '../../zrcms-admin-tools/src/action/loading'

let registered = false;

/**
 * @param method
 * @param id
 */
export default function (method, id) {
    if (registered) {
        return;
    }
    registered = true;
    window.rcmLoading.onLoadingStart(
        () => {
            loading(true);
        }
    );

    window.rcmLoading.onLoadingComplete(
        () => {
            loading(true);
        }
    );
}
