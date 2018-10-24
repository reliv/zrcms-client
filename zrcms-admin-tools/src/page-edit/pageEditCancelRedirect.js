import setLoading from "../../../loading/src/setLoading";

/**
 * @return {Promise<boolean>}
 */
export default function () {
    setLoading('pageEditCancelRedirect', 0);

    window.location.replace(window.location.pathname);

    return Promise.resolve(true);
}
