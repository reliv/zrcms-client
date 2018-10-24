import getCurrentPagePath from '../page-data/getCurrentPagePath'
import getCurrentSiteId from '../site-current/getCurrentSiteId'
import parseResponseData from "../../../zrcms-http/parseResponseData";

const findByUrl = '/zrcms/api/cms-resources/page-draft/find-by';

/**
 *
 * @return {Promise<Response>}
 */
export default function () {
    let url = findByUrl
        + '?where[path]="' + getCurrentPagePath() + '"'
        + '&where[siteCmsResourceId]="' + getCurrentSiteId() + '"'
        + '&orderby[createdDate]="DESC"';

    return fetch(url, {credentials: 'include'})
        .then(parseResponseData);
}
