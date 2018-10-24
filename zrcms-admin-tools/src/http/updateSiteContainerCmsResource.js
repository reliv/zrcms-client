import parseResponseData from "../../../zrcms-http/parseResponseData";

const updateUrl = '/zrcms/api/cms-resource/site-container/update';

/**
 * @param {*} siteContainerCmsResourceData
 * @return {Promise<Response>}
 */
export default function(
    siteContainerCmsResourceData
) {
    return fetch(
        updateUrl,
        {
            body: JSON.stringify(siteContainerCmsResourceData),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT',
        }
    ).then(parseResponseData);
}
