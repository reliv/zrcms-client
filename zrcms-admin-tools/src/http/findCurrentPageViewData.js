import parseResponseData from "../../../zrcms-http/parseResponseData";

const pageViewDataUrl = '/zrcms/api/view/';

/**
 * @return {Promise<Response>}
 */
export default function () {
    // Note: window.location.search allows us to pass ?view-page-version-id={some-id} for rendering if it is set
    let url = pageViewDataUrl + window.location.hostname + window.location.pathname + window.location.search;

    return fetch(
        url,
        {credentials: 'include'}
    ).then(parseResponseData);
}
