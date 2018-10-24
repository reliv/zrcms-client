import parseResponseData from "../../../zrcms-http/parseResponseData";

const renderBlockUrl = '/zrcms/api/content-version/block/render';

/**
 * @param {*} blockProperties
 * @param {null|String} blockId
 * @param {Boolean} contentOnly
 * @return {Promise<Response>}
 */
export default function (blockProperties, blockId, contentOnly = false) {

    let url = renderBlockUrl;

    if (blockId) {
        url = renderBlockUrl + '?block-id=' + blockId + '&contentOnly=' + Number(contentOnly)
    }

    return fetch(
        url,
        {
            body: JSON.stringify(blockProperties),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
        }
    ).then(parseResponseData);
}
