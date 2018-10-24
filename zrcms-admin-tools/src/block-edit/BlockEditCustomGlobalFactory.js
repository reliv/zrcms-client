import getBlockComponentsAvailable from "../block-component/getBlockComponentsAvailable";

/**
 * @param {BlockVersionData} blockVersionData
 * @return {*}
 */
export default function build(blockVersionData) {
    let blockComponentsAvailable = getBlockComponentsAvailable();
    let blockEditName = blockComponentsAvailable.findBlockEditName(blockVersionData.getName());
    let blockEditData = blockComponentsAvailable.findBlockEditData(blockVersionData.getName());

    if (!blockEditData) {
        console.warn("No custom global block edit for: " + blockVersionData.getName());
        return null;
    }

    if (!window[blockEditData]) {
        console.warn("No custom global var found for: " + blockVersionData.getName() + ' block edit name: ' + blockEditData);
        return null;
    }

    return new window[blockEditData](
        blockVersionData.getId(),
        blockVersionData.getConfig()
    );
};
