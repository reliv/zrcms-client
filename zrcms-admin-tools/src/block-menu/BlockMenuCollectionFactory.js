import BlockMenuCollection from './BlockMenuCollection'

let blockMenuCollection = new BlockMenuCollection();

/**
 * @return {BlockMenuCollection}
 */
export default function getInstance() {
    return blockMenuCollection;
}
