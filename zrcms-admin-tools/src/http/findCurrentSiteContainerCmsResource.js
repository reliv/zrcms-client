import getCurrentSiteId from '../site-current/getCurrentSiteId'
import findPageCmsResource from "./findPageCmsResource";

/**
 * @return {Promise<Response>}
 */
export default function(containerName) {
    return findPageCmsResource(
        getCurrentPageId()
    );
}
