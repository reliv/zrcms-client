import BlockEditCollection from './BlockEditCollection'

const blockEditCollection = new BlockEditCollection();

/**
 * Singleton so we may have a shared state
 *
 * @return {BlockEditCollection}
 */
export default function getInstance() {
    return blockEditCollection;
}
