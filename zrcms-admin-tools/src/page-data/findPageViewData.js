import findCurrentPageViewDataCachable from "../http/findCurrentPageViewDataCachable";

/**
 * @return {Promise<any> | Promise<Object>}
 */
export default function () {
    return findCurrentPageViewDataCachable()
}
