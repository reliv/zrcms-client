import getInstanceBlockEditCollection from "./BlockEditCollectionFactory";
import build from "./BlockEditStrategyFactory";

/**
 * @param {BlockVersionData} blockVersionData
 * @return {BlockEditCollection}
 */
export default function(blockVersionData) {
    let blockEditCollection = getInstanceBlockEditCollection();

    let blockVersionId = blockVersionData.getId();

    if (blockEditCollection.has(blockVersionId)) {
        // Already has it
        return blockEditCollection;
    }

    let blockEdit = build(
        blockVersionId
    );

    blockEditCollection.add(blockVersionId, blockEdit, false);

    return blockEditCollection
}
