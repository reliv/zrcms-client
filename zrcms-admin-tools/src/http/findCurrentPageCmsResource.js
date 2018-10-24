import getCurrentPageId from '../page-data/getCurrentPageId'
import findPageCmsResource from "./findPageCmsResource";

/**
 * @return {Promise<Response>}
 */
export default function() {
    return findPageCmsResource(
        getCurrentPageId()
    );
}
