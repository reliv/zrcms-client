import parseResponseData from "../../../zrcms-http/parseResponseData";

const blockComponentUrl = '/zrcms/api/component/block/find/';

/**
 * @return {Promise<{Object}>}
 */
export default function (blockComponentName) {
    let url = blockComponentUrl + blockComponentName;
    return fetch(
        url,
        {credentials: 'include'}
    ).then(
        parseResponseData
    ).then(
        (data) => {
            if (data) {
                return Promise.resolve(
                    data
                )
            }
            return Promise.reject(
                'Block Component not found: ' + blockComponentName
            )
        }
    );
}
