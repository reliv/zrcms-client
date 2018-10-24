import getStore from '../../../zrcms-admin-tools/src/redux/getStore'
import domBlockFind from '../../../zrcms-admin-tools/src/dom/domBlockFind';
import getInstanceBlockMenuCollection from '../../../zrcms-admin-tools/src/block-menu/BlockMenuCollectionFactory'
import {getInstance as getInstanceBlockVersionDataCollection} from '../../../zrcms-admin-tools/src/block-data/BlockVersionDataCollectionFactory'
import getInstanceDomBlockColumnSize from '../block-resize/DomBlockColumnSizeFactory'
import './block-edit-controls.css'
import blockRemove from "../../../zrcms-admin-tools/src/action/blockRemove";

const blockMenuCollection = getInstanceBlockMenuCollection();
const blockVersionDataCollection = getInstanceBlockVersionDataCollection();
const blockContainersWithArrange = {};

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {Object} eventParams
 * @return {Promise<any[]>}
 */
export default function (eventName, eventId, eventResults, eventParams) {
    let blockVersionList = blockVersionDataCollection.findListByContext(eventParams.context);
    let promises = [];
    let id;
    blockVersionList.map(
        (blockVersionData) => {
            id = blockVersionData.getId();
            if (blockContainersWithArrange[id]) {
                // skip, already has controls
                return false;
            }
            blockContainersWithArrange[id] = true;
            promises.push(buildDomControls(blockVersionData));
            return true;
        }
    );

    return Promise.all(promises);
}

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {Object} eventResults
 * @param {Object} eventParams
 * @return {Promise<element>}
 */
export function domBlockControlsCreate(eventName, eventId, eventResults, eventParams) {
    return buildDomControls(eventParams.blockVersionData);
}

/**
 * @param {BlockVersionData} blockVersionData
 * @return {Promise<element>}
 */
export function buildDomControls(blockVersionData) {
    //console.log('>>> buildDomControls', blockVersionData.getName(), blockVersionData.getId());
    let blockElm = domBlockFind(blockVersionData);

    let hasLayoutHelper = blockElm.find('.admin-tools-block-controls').length;

    if (hasLayoutHelper) {
        return new Promise(
            (resolve, reject) => {
                resolve(blockElm);
            }
        );
    }
    let id = blockVersionData.getId();
    let context = blockVersionData.getContext();

    let displayName = blockVersionData.getName();

    let menu = jQuery(
        '<div id="admin-tools-block-controls ' + id + '" class="admin-tools-block-controls">' +
        '</div>'
    );

    let sortableMenu = jQuery(
        ' <div class="admin-tools-block-controls-handle sortable-menu" title="Move Plugin">' +
        '   <div class="icon"></div>' +
        ' </div>'
    );

    let containerMenu = jQuery(
        ' <div class="admin-tools-block-controls-handle block-menu" title="Block Menu">' +
        '   <div class="icon"></div>' +
        ' </div>'
    );

    let containerMenuList = jQuery(
        ' <div>' +
        '  <div class="block-component-name">' + displayName + '</div>' +
        '  <ul>' +
        '   <li><a href="#" class="admin-tools-block-menu-item-delete">Delete Plugin</a> </li>' +
        '   <li><a href="#" class="admin-tools-block-menu-item-reset-size">Reset Size</a> </li>' +
        '  </ul>' +
        ' </div>'
    );

    let topContainerMenu = jQuery(
        ' <div class="container-menu" title="Container Menu">' +
        ' </div>'
    );

    let blockMenu = blockMenuCollection.get(blockVersionData.getName());

    if (blockMenu) {
        let menuOptionsAElm = null;
        let menuOptionsElm = null;
        jQuery.each(
            blockMenu.items,
            function (index, value) {
                menuOptionsAElm = jQuery(
                    '<a href="#" class="admin-tools-block-menu-item-custom ' + index + '">' + value.title + '</a>'
                );
                menuOptionsElm = jQuery('<li></li>');
                menuOptionsAElm.click(
                    function () {
                        topContainerMenu.hide();
                        value.method();
                    }
                );
                menuOptionsElm.append(
                    menuOptionsAElm
                );
                containerMenuList.find('ul').append(
                    menuOptionsElm
                );
            }
        );
    }

    topContainerMenu.append(
        containerMenuList
    );

    topContainerMenu.hide();

    topContainerMenu.hover(
        function () {
            topContainerMenu.show();
        },
        function () {
            topContainerMenu.hide();
        }
    );
    containerMenu.hover(
        function () {
            topContainerMenu.show();
        },
        function () {
            topContainerMenu.hide();
        }
    );

    menu.append(sortableMenu);

    menu.append(containerMenu);

    menu.append(topContainerMenu);

    blockElm.append(menu);

    blockElm.hover(
        function () {
            jQuery(this).find(".admin-tools-block-controls").each(
                function () {
                    jQuery(this).show();
                }
            );
        },
        function () {
            jQuery(this).find(".admin-tools-block-controls").each(
                function () {
                    jQuery(this).hide();
                }
            )
        }
    );

    blockElm.find(".admin-tools-block-menu-item-delete").click(
        function (e) {
            return getStore().dispatch(blockRemove(id, context));
            e.preventDefault();
        }
    );

    blockElm.find(".admin-tools-block-menu-item-reset-size").click(
        function (e) {
            let domBlockColumnSize = getInstanceDomBlockColumnSize();
            domBlockColumnSize.setClass(
                blockElm,
                domBlockColumnSize.defaultClass
            );
            e.preventDefault();
        }
    );

    return new Promise(
        (resolve, reject) => {
            resolve(blockElm);
        }
    );
}
