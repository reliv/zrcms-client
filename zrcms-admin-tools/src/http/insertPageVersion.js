import parseResponseData from "../../../zrcms-http/parseResponseData";

const insertUrl = '/zrcms/api/content-version/page/insert';

/**
 * @param {*} pageVersionData
 * @return {Promise<Response>}
 */
export default function (pageVersionData) {
    return fetch(
        insertUrl,
        {
            body: JSON.stringify(pageVersionData),
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
