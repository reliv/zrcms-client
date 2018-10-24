import updatePageCmsResource from '../http/updatePageCmsResource'

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {object} eventParams
 * @return {Promise<Response>}
 */
export default function publishPage(
    eventName,
    eventId,
    eventResults,
    eventParams
) {
    let data = {
        id: eventParams.targetPageCmsResourceId,
        published: true,
        contentVersionId: eventParams.pageVersionId,
        createdByUserId: null,
        createdReason: 'AdminTools: Publish page version',
        createdDate: null
    };

    return updatePageCmsResource(data);
}
