import findAvailableBlocks from "../http/findAvailableBlocks"
import build from './BlockComponentsAvailableFactory'

let _blockComponentsAvailable = null;

/**
 * @return {Promise<BlockComponentsAvailable>}
 */
export default function () {
    if (_blockComponentsAvailable) {
        return Promise.resolve(_blockComponentsAvailable)
    }

    return findAvailableBlocks().then(
        (blockComponentList) => {
            _blockComponentsAvailable = build(blockComponentList)
            return Promise.resolve(_blockComponentsAvailable)
        }
    )
}
