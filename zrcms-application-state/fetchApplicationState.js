import parseResponseData from "../zrcms-http/parseResponseData";

let applicationStateUrl =' /zrcms/api/application-state';

export default function () {
    let url = applicationStateUrl + '/' + window.location.hostname + window.location.pathname;

    return fetch(url, {credentials: 'include'})
        .then(parseResponseData);
}
