export const ATTRIBUTE = "data-container-context";
/**
 * @return {string}
 */
export default function (context) {
    return "[" + ATTRIBUTE + "='" + context + "']";
}
