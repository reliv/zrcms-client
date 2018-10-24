import setLoading from "../../../loading/src/setLoading";
import {STATUS_PAGE_SAVED} from "../page-data/savePageData"
import {STATUS_SITE_CONTAINERS_SAVED} from "../site-container-data/saveSiteContainersData"

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {Object} eventResults
 * @param {Object} eventParams
 * @return {Promise<boolean>}
 */
export default function (eventName, eventId, eventResults, eventParams) {
    if (!eventResults.savePageData || !eventResults.saveSiteContainersData) {
        console.error('eventResults.save not received in eventResults: ', eventResults);
        return Promise.reject('eventResults.save not received in eventResults');
    }

    setLoading('pageDraftSaveCompleteRedirect', 0);

    let pageSaveStatus = eventResults.savePageData.status;
    let newPageVersionId = eventResults.savePageData.newPageVersionId;
    let siteContainersSaveStatus = eventResults.saveSiteContainersData.status;

    if (pageSaveStatus !== STATUS_PAGE_SAVED && siteContainersSaveStatus !== STATUS_SITE_CONTAINERS_SAVED) {
        // nothing has changed
        alert('No changes made');
        // Must redirect always because save data is only gotten once.
        window.location.replace(window.location.pathname + window.location.search);
        return Promise.resolve(false);
    }

    if (pageSaveStatus !== STATUS_PAGE_SAVED && siteContainersSaveStatus === STATUS_SITE_CONTAINERS_SAVED) {
        // Save site only, not page revision to create
        window.location.replace(window.location.pathname + window.location.search);
        return Promise.resolve(true);
    }

    if (!newPageVersionId) {
        console.error('Can not redirect to new page, data not received in eventResults: ', eventResults);
        return Promise.reject('Can not redirect to new page, data not received');
    }

    window.location.replace(window.location.pathname + '?view-page-version-id=' + newPageVersionId);

    return Promise.resolve(true);
}
