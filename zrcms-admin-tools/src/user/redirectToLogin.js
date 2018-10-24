import setLoading from '../../../loading/src/setLoading'

let redirecting = false;

export default function () {
    if (redirecting) {
        return;
    }

    redirecting = true;
    window.alert('Your session has expired, please log in again.');
    let currentPage = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = '/login?redirect-from=' + currentPage
}
