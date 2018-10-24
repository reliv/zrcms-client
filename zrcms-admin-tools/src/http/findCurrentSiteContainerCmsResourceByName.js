import findSiteContainerCmsResourceBySiteName from './findSiteContainerCmsResourceBySiteName'
import getCurrentSiteId from "../site-current/getCurrentSiteId";

/**
 * @param {String} name
 * @return {Promise<Response>}
 */
export default function (name) {
    return findSiteContainerCmsResourceBySiteName(
        getCurrentSiteId(),
        name
    );
}
