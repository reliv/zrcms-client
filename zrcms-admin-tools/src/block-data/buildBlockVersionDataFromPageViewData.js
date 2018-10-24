import findCurrentPageViewDataCachable from "../http/findCurrentPageViewDataCachable";
import build, {buildEmpty} from "./BlockVersionDataCollectionFactory"
import canEditPage from "../page-data/canEditPage";

/**
 * @return {Promise<any> | Promise<Object>}
 */
export default function () {
    if (!canEditPage()) {
        buildEmpty();
        return Promise.resolve(
            {status: 'empty'}
        );
    }
    return findCurrentPageViewDataCachable().then(
        (pageViewData) => {
            build(pageViewData);
            return Promise.resolve(
                {status: 'ready'}
            );
        }
    )
}
