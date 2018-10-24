import findCurrentPageViewDataCachable from "../http/findCurrentPageViewDataCachable";
import build, {buildEmpty} from "./CurrentPageVersionDataFactory"
import canEditPage from "./canEditPage";

/**
 * @return {Promise<any> | Promise<Object>}
 */
export default function () {
    if (!canEditPage()) {
        buildEmpty();
        return Promise.resolve(
            {
                status: 'empty',
                id: null
            }
        );
    }

    return findCurrentPageViewDataCachable().then(
        (pageViewData) => {
            let currentPageVersionData = build(pageViewData);
            return Promise.resolve(
                {
                    status: 'ready',
                    id: currentPageVersionData.getId()
                }
            );
        }
    )
}
