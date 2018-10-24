import parseResponseData from "../../../zrcms-http/parseResponseData";

const findByUrl = '/zrcms/api/cms-resources/site-container/find-by';

/**
 * @param {String} siteCmsResourceId
 * @param {String} name
 * @return {Promise<Response>}
 */
export default function (siteCmsResourceId, name) {
    let url = findByUrl
        + '?where[siteCmsResourceId]="' + siteCmsResourceId + '"'
        + '&where[name]="' + name + '"';

    return fetch(url, {credentials: 'include'})
        .then(parseResponseData).then(
            (data) => {
                let result = (data.length >= 1 ? data[0] : null);
                return new Promise(
                    (resolve, reject) => {
                        resolve(result);
                    }
                );
            }
        );
}
