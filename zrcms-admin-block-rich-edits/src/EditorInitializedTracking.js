let initialized = {};

/**
 * @param {String} context
 * @param {String} blockVersionId
 * @return {boolean}
 */
export function isInitialized(context, blockVersionId) {
    if (!initialized[context]) {
        return false
    }

    if (!initialized[context][blockVersionId]) {
        return false;
    }

    return true;
}

/**
 * @param {String} context
 * @param {String} blockVersionId
 */
export function setInitialized(context, blockVersionId) {
    if (!initialized[context]) {
        initialized[context] = {};
    }

    initialized[context][blockVersionId] = true;
}
