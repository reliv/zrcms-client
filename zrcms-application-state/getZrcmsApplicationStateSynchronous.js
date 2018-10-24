const WINDOW_KEY = 'zrcmsApplicationState';

/**
 * Returns the ZRCMS application state. Allows for this to be async if needed in future.
 * @param {string} key If present and non-null, return this state key, else return whole application state.
 * @param {Object} def Default value to return if app state or key not available. By default this be an empty object.
 */
export default function getZrcmsApplicationStateSynchronous(key = null, def = undefined) {
    def = (typeof def !== 'undefined') ? def : {};
    if (!window.hasOwnProperty(WINDOW_KEY)) {
        return def;
    }
    const state = window[WINDOW_KEY];
    if (key == null) {
        return state;
    }
    if (!state.hasOwnProperty(key)) {
        return def;
    }
    return state[key];
};
