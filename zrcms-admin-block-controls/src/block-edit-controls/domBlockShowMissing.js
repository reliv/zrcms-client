/**
 * @return {Promise<bool>}
 */
export default function domBlockShowMissing() {
    jQuery('.block-missing-not-rendered').css('display', 'block');

    return new Promise(
        (resolve, reject) => {
            resolve(true);
        }
    );
}
