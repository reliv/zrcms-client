import BlockComponentsAvailable from './BlockComponentsAvailable'

/**
 * @param {array} blockComponentList
 * @return {BlockComponentsAvailable}
 */
export default function build(blockComponentList) {
    return new BlockComponentsAvailable(
        blockComponentList
    );
}
