import error from './error'

export default function parseResponse(response) {
    return new Promise(
        (resolve, reject) => {
            try {
                let json = response.json()
            } catch (err) {
                console.error('Invalid JSON received', response);
                reject('Invalid JSON received');
                return;
            }

            switch (response.status) {
                case 200:
                    resolve(json);
                    break;
                case 401:
                    console.error('Unauthorized. Please ensure you are logged in.', response);
                    reject(json);
                    break;
                default:
                    error(
                        'An error occurred while talking to server (' + response.status + ').'
                        + ' Check your internet connection',
                        response
                    );
                    reject(json);
            }
        }
    );
}
