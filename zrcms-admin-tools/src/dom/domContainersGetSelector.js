export const ATTRIBUTE = 'data-container-id';
/**
 * @return {string}
 */
export default function domContainersGetSelector() {
    return "[" + ATTRIBUTE + "]";
}
