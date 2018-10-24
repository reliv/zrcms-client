export const ATTRIBUTE = 'data-inner-for-block-id';

/**
 * @return {string}
 */
export default function domBlocksInnerGetSelector() {
    return "[" + ATTRIBUTE + "]";
}
