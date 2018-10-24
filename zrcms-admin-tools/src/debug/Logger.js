import moduleConfig from "../moduleConfig"
import {DEBUG, ERROR, INFO, WARN} from "./LogLevels"

let logLevel = moduleConfig["zrcms-admin-tools-debug"];

function buildContext(context) {
    if (typeof context === 'undefined') {
        return '---';
    }

    return context;
}

export default {
    isLevel: function (level = 1) {
        return (logLevel && logLevel >= level);
    },
    level: function () {
        return logLevel;
    },
    log: function (message, context) {
        if (logLevel && logLevel >= DEBUG) {
            console.log('>> DEBUG: ', message, buildContext(context));
        }
    },
    info: function (message, context) {
        if (logLevel && logLevel >= INFO) {
            console.info('>> INFO: ', message, buildContext(context));
        }
    },
    warn: function (message, context) {
        if (logLevel && logLevel >= WARN) {
            console.warn('>> WARN: ', message, buildContext(context));
        }
    },
    error: function (message, context) {
        if (logLevel && logLevel >= ERROR) {
            console.error('>> ERROR: ', message, buildContext(context));
        }
    }
}
