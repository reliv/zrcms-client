import getInstanceBlockEditCollection from "./BlockEditCollectionFactory";
import build from "./BlockEditStrategyFactory";
import {getInstance as getInstanceBlockVersionDataCollection} from "../block-data/BlockVersionDataCollectionFactory";

/**
 * @return {BlockEditCollection}
 */
export default function () {
    let blockVersionDataCollection = getInstanceBlockVersionDataCollection();
    let blockEditCollection = getInstanceBlockEditCollection();
    let blockVersionDataList = blockVersionDataCollection.list;

    let blockVersionId;
    let blockEdit;
    let index, len;
    for (index = 0, len = blockVersionDataList.length; index < len; index++) {
        blockVersionId = blockVersionDataList[index].getId();
        if (blockEditCollection.has(blockVersionId)) {
            // Already has it
            continue;
        }

        blockEdit = build(
            blockVersionId
        );

        blockEditCollection.add(blockVersionId, blockEdit, false)
    }

    return blockEditCollection;
}
