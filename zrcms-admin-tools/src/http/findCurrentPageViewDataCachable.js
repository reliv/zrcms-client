import findCurrentPageViewData from "./findCurrentPageViewData";

let _pageViewData = null;

/**
 * @return {Promise<Object>}
 */
export default function () {
    if (_pageViewData) {
        return Promise.resolve(_pageViewData)
    }

    return findCurrentPageViewData().then(
        (pageViewData) => {
            _pageViewData = pageViewData;
            return Promise.resolve(pageViewData)
        }
    )
}
