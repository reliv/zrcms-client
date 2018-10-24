import getCurrentSiteId from '../site-current/getCurrentSiteId'
import parseResponseData from "../../../zrcms-http/parseResponseData";

const findByUrl = '/zrcms/api/cms-resources/site-container/find-by';

export default function() {
    let url = findByUrl + '?where[siteCmsResourceId]="' + getCurrentSiteId() + '"';

    return fetch(url, {credentials: 'include'})
        .then(parseResponseData);
}
