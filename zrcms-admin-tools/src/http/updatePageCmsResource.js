import parseResponseData from "../../../zrcms-http/parseResponseData";

const updateUrl = '/zrcms/api/cms-resource/page/update';

/**
 * @param {*} pageCmsResourceData
 * @return {Promise<Response>}
 */
export default function(
    pageCmsResourceData
) {
    return fetch(
        updateUrl,
        {
            body: JSON.stringify(pageCmsResourceData),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT',
        }
    ).then(parseResponseData);
}
