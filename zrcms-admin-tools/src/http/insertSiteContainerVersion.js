import parseResponseData from "../../../zrcms-http/parseResponseData";

const insertUrl = '/zrcms/api/content-version/site-container/insert';

/**
 * @param {*} siteContainerVersionData
 * @return {Promise<Response>}
 */
export default function (siteContainerVersionData) {
    return fetch(
        insertUrl,
        {
            body: JSON.stringify(siteContainerVersionData),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
        }
    ).then(
        parseResponseData
    ).catch(
        (data) => {
            console.error(data);
        }
    );
}
