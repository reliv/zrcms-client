import Tag from '../../html-tag/src/Tag'
import PageRevisionLinkList from './PageRevisionLinkList'

// @todo Clean this code up

/**
 *
 * @param {string} dateString
 * @return {string}
 */
function formatDateString(dateString) {
    // @todo find best date solution
    // let dateString = new Date(dateString).toISOString().replace('T', ' ').split('.')[0]
    return new Date(dateString).toLocaleString();
}

let testModel = {
    rendered: {},
    published: {},
    drafts: [],
};

function getLabel(
    isPublished,
    isDraft,
    isRendered
) {
    if (isPublished) {
        return 'Published';
    }

    if (isRendered && isDraft) {
        return 'Unpublished';
    }

    if (isDraft) {
        return 'Draft';
    }

    return 'Unknown';
}

/**
 * @param {*} applicationState
 * @param {PageRevisionLinkList} pageRevisionLinkList
 * @return {PageRevisionLinkList}
 */
function buildRendered(
    applicationState,
    pageRevisionLinkList
) {
    let selectedLabel = 'Unpublished';
    let href = window.location.pathname + '?view-page-version-id=' + applicationState.view.page.contentVersionId;

    if (applicationState.view.page.contentVersionId === applicationState.view.pageRequested.contentVersionId) {
        selectedLabel = 'Published';
        href = window.location.pathname;
    }

    pageRevisionLinkList.setRendered(
        applicationState.view.page.contentVersionId,
        new Tag(
            'a',
            selectedLabel + ' - created: ' + formatDateString(applicationState.view.page.contentVersionCreatedDate),
            {
                href: href,
                title: 'VersionId: '
                + applicationState.view.page.contentVersionId
                + ' - Created: ' + applicationState.view.page.contentVersionCreatedDate
            }
        )
    );

    return pageRevisionLinkList;
}

/**
 * @param {*} applicationState
 * @param {*} pageDraftCmsResources
 * @param {int} limit
 * @return {PageRevisionLinkList}
 */
export default function buildPageRevisionLinkList(
    applicationState,
    pageDraftCmsResources,
    limit = 5
) {
    if (!applicationState || !applicationState.view.page || applicationState.view.pageRequested.id === null) {
        return null;
    }

    let pageRevisionLinkList = new PageRevisionLinkList();

    if (!limit) {
        limit = 5
    }

    pageRevisionLinkList = buildRendered(
        applicationState,
        pageRevisionLinkList
    );

    // Filter out displayed version
    let displayList = pageDraftCmsResources.filter(
        (pageDraftCmsResource) => {
            return (pageDraftCmsResource.contentVersionId !== applicationState.view.page.contentVersionId);
        }
    );

    // Add current published to list
    pageRevisionLinkList.addAvailable(
        applicationState.view.pageRequested.contentVersionId,
        new Tag(
            'a',
            'Published - created: '
            + formatDateString(
            applicationState.view.pageRequested.contentVersionCreatedDate
            ),
            {
                href: window.location.pathname,
                title: 'VersionId: ' + applicationState.view.pageRequested.contentVersionId
                + ' - Created: ' + applicationState.view.pageRequested.contentVersionCreatedDate
            }
        )
    );


    for (let index = 0; index < displayList.length; ++index) {
        if (index + 1 > limit) {
            break;
        }
        let pageDraftCmsResource = displayList[index];

        let label = 'Draft';
        let href = window.location.pathname + '?view-page-version-id=' + pageDraftCmsResource.contentVersionId;

        if (applicationState.view.pageRequested.contentVersionId === pageDraftCmsResource.contentVersionId) {
            label = 'Published';
            href = window.location.pathname;
        }

        pageRevisionLinkList.addAvailable(
            pageDraftCmsResource.contentVersionId,
            new Tag(
                'a',
                label + ' - created: ' + formatDateString(pageDraftCmsResource.contentVersion.createdDate),
                {
                    href: href,
                    title: 'VersionId: ' + pageDraftCmsResource.contentVersionId
                    + ' - ModifiedDate: ' + pageDraftCmsResource.modifiedDate
                    + ' - ModifiedByUserId: ' + pageDraftCmsResource.modifiedByUserId
                }
            )
        );
    }

    return pageRevisionLinkList;
}
