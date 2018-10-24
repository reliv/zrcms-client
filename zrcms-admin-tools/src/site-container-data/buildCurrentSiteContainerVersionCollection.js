import findCurrentPageViewDataCachable from "../http/findCurrentPageViewDataCachable";
import build, {buildEmpty} from "./CurrentSiteContainerVersionCollectionFactory";
import canEditPage from "../page-data/canEditPage";

/**
 * @return {Promise<any> | Promise<Object>}
 */
export default function () {
    if (!canEditPage()) {
        buildEmpty();
        return Promise.resolve(
            {
                status: 'empty',
                ids: []
            }
        );
    }

    return findCurrentPageViewDataCachable().then(
        (pageViewData) => {
            let currentSiteContainerVersionCollection = build(pageViewData);
            return Promise.resolve(
                {
                    status: 'ready',
                    ids: currentSiteContainerVersionCollection.getIds()
                }
            );
        }
    )
}
