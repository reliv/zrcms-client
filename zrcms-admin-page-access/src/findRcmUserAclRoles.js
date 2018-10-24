import parseResponseData from "../../zrcms-http/parseResponseData";

let url = '/api/admin/rcmuser-acl-role';

export default function () {
    return fetch(
        url,
        {
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET',
        }
    ).then(parseResponseData);
}
