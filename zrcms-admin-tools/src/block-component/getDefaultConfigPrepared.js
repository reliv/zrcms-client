
/**
 * @todo @BC this contains BC logic
 * @param {Array|null} fields
 * @param {Object|null} defaultConfig
 * @return {*}
 */
export default function(fields, defaultConfig) {
    if (!Array.isArray(fields)) {
        return defaultConfig;
    }

    if (fields.length < 1 && defaultConfig) {
        return defaultConfig;
    }

    let defaultConfig = {};

    for (let i = 0, len = fields.length; i < len; i++) {
        defaultConfig[fields[i]['name']] = fields[i]['default'];
    }

    return defaultConfig;
}
