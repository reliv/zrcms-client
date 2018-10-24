import parseResponseData from "../../../zrcms-http/parseResponseData";

const findUr = '/zrcms/api/cms-resource/site-container/find/';

/**
 * @param id
 * @return {Promise<Response>}
 */
export default function(id) {
    let url = findUr + id;

    return fetch(url, {credentials: 'include'})
        .then(parseResponseData);
}
