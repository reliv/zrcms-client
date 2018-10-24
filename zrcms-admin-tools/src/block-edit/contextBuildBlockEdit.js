import {getInstance as getInstanceBlockVersionDataCollection} from "../block-data/BlockVersionDataCollectionFactory";
import blockVersionBuildBlockEdit from "./blockVersionBuildBlockEdit";
import getInstanceBlockEditCollection from "./BlockEditCollectionFactory";

/**
 * @param {string} context
 * @return {BlockEditCollection}
 */
export default function (context) {
    let blockVersionDataCollection = getInstanceBlockVersionDataCollection();
    let blockVersions = blockVersionDataCollection.findListByContext(context);
    let index, len;
    for (index = 0, len = blockVersions.length; index < len; index++) {
        blockVersionBuildBlockEdit(blockVersions[index]);
    }

    return getInstanceBlockEditCollection();
}


