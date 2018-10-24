let cache = null;

/**
 * Returns an array of page URLs
 *
 * @return {Promise<{array}>}
 */
export default async function () {
    if (cache === null) {
        cache = Object.keys(await(await fetch('/rcm-page-search/title', {credentials: 'same-origin'})).json());
    }
    return cache;
}
