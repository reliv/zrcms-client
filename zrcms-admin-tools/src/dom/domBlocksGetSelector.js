export const ATTRIBUTE = 'data-block-id';
/**
 * @return {string}
 */
export default function domBlocksGetSelector() {
    return "[" + ATTRIBUTE + "]";
}
