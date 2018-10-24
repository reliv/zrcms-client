import parseResponseData from "../../../zrcms-http/parseResponseData";

const blockComponentsUrl = '/zrcms/api/components/find-by?where[type]="block"';

/**
 * @return {Promise<Response>}
 */
export default function () {
    return fetch(blockComponentsUrl, {credentials: 'include'})
        .then(parseResponseData);
}
