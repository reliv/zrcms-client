export const ATTRIBUTE = "data-container-name";
/**
 * @return {string}
 */
export default function (containerName) {
    return "[" + ATTRIBUTE + "='" + containerName + "']";
}
