export const LOADING = 'LOADING';

/**
 * @param {Boolean} value
 */
export default function (value) {
    return {
        type: LOADING,
        payload: (value === true),
    };
}
