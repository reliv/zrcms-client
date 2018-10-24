import extend from 'extend';
import getBlockComponentsAvailable from "../../../zrcms-admin-tools/src/block-component/getBlockComponentsAvailable";
import domContainersGetSelector from "../../../zrcms-admin-tools/src/dom/domContainersGetSelector";
import findRenderedBlockHtml from "../../../zrcms-admin-tools/src/http/findRenderedBlockHtml";
import domBlocksGetSelector, {ATTRIBUTE} from "../../../zrcms-admin-tools/src/dom/domBlocksGetSelector";
import BlockVersionData from "../../../zrcms-admin-tools/src/block-data/BlockVersionData";
import {getInstance} from '../../../zrcms-admin-tools/src/block-data/BlockVersionDataCollectionFactory'
import domBlockAvailableFind from './domBlockAvailableFind'
import {getBlockElementFromElement, wrapBlockElement} from "../block-drag/BlockDrag"
import {defaultClass} from "../block-resize/ColumnSizeBootstrap";

/**
 * @return {String}
 */
function generateGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    let guid = function () {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };

    return guid();
}

/**
 * BlocksAvailable
 * Make blocks in the layout editor menu draggable
 *
 * @return {boolean}
 */
export function makeBlocksAvailableDraggable() {
    let blockComponentsAvailable = getBlockComponentsAvailable();
    let blockComponentList = blockComponentsAvailable.getList();

    blockComponentList.map(
        (blockComponent) => {
            makeBlocksAvailableItemDraggable(blockComponent);
        }
    );

    return true;
}

let style = null;
let css = null;

/**
 * BlocksAvailable
 * @param {*} blockComponent
 */
export function makeBlocksAvailableItemDraggable(blockComponent) {
    let blockAvailableElement = domBlockAvailableFind(blockComponent.name);
    try {
        blockAvailableElement.draggable('destroy');
    } catch (e) {
        //No problem
    }

    blockAvailableElement.draggable(
        {
            cursorAt: {
                left: 10,
                top: 5
            },
            // Allows for a helper element to be used for dragging display.
            helper: function () {
                return blockAvailableDraggableHelper(this, blockComponent)
            },
            // @todo there is a strange position issue during drag, the plugin suddenly jumps far away
            // drag: function (event, ui) {
            //     let newStyle = ui.helper.attr('style');
            //     let newCss = ui.helper.attr('class');
            //     if(newStyle != style || newCss != css) {
            //         console.log('-style-', newStyle, '-css-', newCss);
            //     }
            // },
            stop: function (event, ui) {
                blocksAvailableDragStop(event, ui, this);
            },
            revert: 'invalid',
            connectToSortable: domContainersGetSelector() + ' > .row',
            appendTo: 'body'
        }
    );
}

/**
 * Callback for Draggable - Helper
 *
 * @param {HTMLElement} blockAvailableElement
 * @param {*} blockComponent
 * @return {*|jQuery|HTMLElement}
 */
export function blockAvailableDraggableHelper(blockAvailableElement, blockComponent) {
    let blockTempElement = jQuery(blockAvailableElement).find(domBlocksGetSelector()).clone(false);

    let newBlockId = generateGuid();
    // set new id
    blockTempElement.attr(ATTRIBUTE, newBlockId);

    let wrappedBlockTempElement = wrapBlockElement(blockTempElement);

    // @todo We may add a default block render API that takes the block-component
    // Convert the BlockComponent to a new block
    let requestBlockVersion = {
        blockComponentName: blockComponent.name,
        config: blockComponent.defaultConfig,
        layoutProperties: {
            "renderOrder": 0,
            "rowNumber": 0,
            "columnClass": defaultClass
        },
        containerVersionId: 'TEMP-NEW-BLOCK'
    };

    let tempBlockVersion = extend({}, requestBlockVersion, {id: newBlockId});

    let blockVersionData = new BlockVersionData(
        'TEMP-NEW-BLOCK-CONTEXT',
        'TEMP-NEW-BLOCK-CONTAINER-NAME',
        tempBlockVersion,
        false,
        false, // we set save to false because this might not get dropped, so we don't want to allow save yet
        'Created ew block from BlocksAvailableDrag'
    );

    let blockVersionDataCollection = getInstance();

    blockVersionDataCollection.add(blockVersionData);

    findRenderedBlockHtml(requestBlockVersion, newBlockId).then(
        function (renderHtml) {
            /*
             * Must re-find helper like by id rather than just using the element from above to prevent a
             * race condition that happens when people drag slow-to-load blocks on the page too quickly
             */
            let blockElement = jQuery("[" + ATTRIBUTE + "='" + newBlockId + "']");
            blockElement.replaceWith(jQuery(renderHtml));
        }
    );

    return wrappedBlockTempElement;
}

/**
 * @param {Event} event
 * @param {Object} ui
 */
export function blocksAvailableDragStop(event, ui, blockAvailableElement) {
    let helper = jQuery(ui.helper);

    let blockElement = getBlockElementFromElement(ui.helper);

    // @todo Fix the draggable going to the bottom
    //blockAvailableElement.draggable("destroy")
    //ui.helper = blockElement;
    //helper.before(blockElement)
    helper.replaceWith(blockElement);
}

/**
 * Fix for containers that have no current blocks.
 *
 * @param container
 */
export function blockDragPlaceHolder(container, event, ui) {
}
