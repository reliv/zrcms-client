import domBlockFind from "../../../zrcms-admin-tools/src/dom/domBlockFind";

/**
 * @param {BlockVersionData} blockVersionData
 * @return {Promise<element>}
 */
export default function domBlockLinksDisable(blockVersionData) {
    let blockElm = domBlockFind(blockVersionData);

    // Disable normal events
    let donDoIt = function () {
        if (!jQuery(this).hasClass('admin-tools-keep-enabled')) {
            return false;
        }
    };

    blockElm.find('button').unbind();
    blockElm.find('[role="button"]').unbind();
    blockElm.find('button').click(donDoIt);
    blockElm.find('a').click(donDoIt);
    blockElm.find('form').submit(donDoIt);
    blockElm.find('form').unbind();

    return new Promise(
        (resolve, reject) => {
            resolve(blockElm);
        }
    );
}
