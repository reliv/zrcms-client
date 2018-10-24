import logger from "./Logger"
import {INFO} from "./LogLevels"

let isDebug = logger.isLevel(INFO);

let colors = [
    "#8c0000",
    "#d68e00",
    "#adad00",
    "#18af00",
    "#0014af",
    "#6000af"
];

let index = 0;

let colorContext = {};

/**
 * @return {string}
 */
function nextColor() {
    index++;
    if (index >= (colors.length - 1)) {
        index = 0;
    }

    return colors[index];
}

/**
 * @param {String} context
 * @return {*}
 */
function getColor(context) {
    if (!colorContext[context]) {
        colorContext[context] = nextColor();
    }

    return colorContext[context];
}

/**
 * @param {String} context
 * @param {String} message
 */
export function start(context, message) {
    if (!isDebug) {
        return;
    }
    console.info('%c+[' + context + '] ' + message, 'font-weight: bold;color: ' + getColor(context));
}

/**
 * @param {String} context
 * @param {String} message
 * @param {*} arg1
 * @param {*} arg2
 */
export function log(context, message, arg1, arg2) {
    if (!isDebug) {
        return;
    }
    console.info('%c  [' + context + '] ' + message, 'color: ' + getColor(context), arg1, arg2);
}

/**
 * @param {String} context
 * @param {String} message
 */
export function end(context, message) {
    if (!isDebug) {
        return;
    }
    console.info('%c -[' + context + '] ' + message, 'color: ' + getColor(context));
}
