import domBlockFind from "../../../zrcms-admin-tools/src/dom/domBlockFind";
import domBlockGetSelector from "../../../zrcms-admin-tools/src/dom/domBlockGetSelector";

export default function domPrepareBlockElement(blockVersionData) {
    let blockElm = domBlockFind(blockVersionData);

    let id = blockVersionData.getId();

    blockElm.removeClass('rcmPluginLocked');
    blockElm.removeClass('admin-tools-plugin-locked');
    blockElm.unbind('dblclick');
    blockElm.attr('editing', true);

    jQuery.contextMenu('destroy', domBlockGetSelector(blockVersionData));

    return new Promise(
        (resolve, reject) => {
            resolve(blockElm);
        }
    );
}
