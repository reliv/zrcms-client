import parseResponse from './parseResponse'

/**
 * @param response
 * @return {Promise<*>}
 */
export default function parseResponseData(response) {
    return parseResponse(response).then(
        (responseJson) => {
            return new Promise(
                (resolve, reject) => {
                    if (responseJson === null) {
                        resolve(responseJson);
                        return;
                    }

                    if (typeof responseJson.data === 'undefined') {
                        resolve(responseJson);
                        return;
                    }
                    resolve(responseJson.data);
                }
            );
        }
    );
}
