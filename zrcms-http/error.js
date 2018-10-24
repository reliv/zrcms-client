/**
 * @param {String} message
 * @param {*} context
 */
export default function error(message, context) {
    window.alert(message + ' : ' + JSON.stringify(context));
    console.error(message, context);
}
