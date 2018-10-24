import parseResponseData from "../../../zrcms-http/parseResponseData";

const createUrl = '/zrcms/api/cms-resource/page-draft/create';

/**
 * @param {*} pageDraftCmsResourceData
 * @return {Promise<Response>}
 */
export default function(
    pageDraftCmsResourceData
) {
    return fetch(
        createUrl,
        {
            body: JSON.stringify(pageDraftCmsResourceData),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
        }
    ).then(parseResponseData);
}
