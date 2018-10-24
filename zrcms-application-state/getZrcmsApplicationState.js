/**
 * Returns the ZRCMS application state. Allows for this to be async if needed in future.
 */
export default function getZrcmsApplicationState() {
    return Promise.resolve(window['zrcmsApplicationState']);
};
