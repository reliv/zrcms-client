import extend from 'extend';
import domContainersGetSelector, {ATTRIBUTE as ATTRIBUTE_CONTAINER_ID} from '../../../zrcms-admin-tools/src/dom/domContainersGetSelector'
import {ATTRIBUTE as ATTRIBUTE_CONTAINER_CONTEXT} from "../../../zrcms-admin-tools/src/dom/domContainersContextGetSelector";
import {ATTRIBUTE as ATTRIBUTE_CONTAINER_NAME} from "../../../zrcms-admin-tools/src/dom/domContainerNameGetSelector";
import blockAdd from "../../../zrcms-admin-tools/src/action/blockAdd";
import getStore from "../../../zrcms-admin-tools/src/redux/getStore";
import {getInstance} from "../../../zrcms-admin-tools/src/block-data/BlockVersionDataCollectionFactory";
import domBlocksGetSelector, {ATTRIBUTE as ATTRIBUTE_BLOCK_ID} from "../../../zrcms-admin-tools/src/dom/domBlocksGetSelector";
import domContainersContextFind from "../../../zrcms-admin-tools/src/dom/domContainersContextFind";
import logger from "../../../zrcms-admin-tools/src/debug/Logger";
import './block-drag.css'

/**
 * Sets up everything to do with block dragging
 *
 * @param {String} context
 * @param {int} extraRowCount send 0 or 1
 * @return {Promise<any>}
 */
export function init(context, extraRowCount = 1) {
    let containerElements = domContainersContextFind(context);

    return updateRowContainers(containerElements, extraRowCount).then(
        (results) => {
            return makeBlocksSortable(context).then(
                (sortable) => {
                    return Promise.resolve(results);
                }
            );
        }
    );
}

/**
 * Sets the number of extra empty rows in each container
 *
 * @param {HTMLElement[]} containerElements
 * @param {int} extraRowCount send 0 or 1
 * @return {Promise<any>}
 */
export function updateRowContainers(containerElements, extraRowCount = 1) {
    let promises = [];

    jQuery.each(
        containerElements,
        function () {
            let containerElement = jQuery(this);
            promises.push(updateRowContainer(containerElement, extraRowCount));
        }
    );

    return Promise.all(promises);
}

/**
 * @todo empty must be last one
 *
 * @param {HTMLElement}containerElement
 * @param {int} extraRowCount send 0 or 1
 * @return {Promise<any>}
 */
export function updateRowContainer(containerElement, extraRowCount = 1) {
    let rowClass = getRowClass();
    let rowElements = getRowElements(containerElement);

    jQuery.each(
        rowElements,
        function () {
            let row = jQuery(this);
            //If row is empty
            if (row.children().length === 0) {
                row.remove();
            }
        }
    );

    jQuery.each(
        containerElement,
        function () {
            for (let i = 0; i < extraRowCount; i++) {
                // do not add extra row at the bottom if has attr singlerowonly
                if (jQuery(this).closest('[singlerowonly]').length === 0) {
                    containerElement.append(jQuery('<div class="' + rowClass + '"></div>'));
                }
            }
        }
    );

    return updateRowNumbers(containerElement).then(
        () => {
            return Promise.resolve(containerElement);
        }
    );
}

/**
 * @param {HTMLElement} containerElement
 * @return {Promise<any>}
 */
export function updateRowNumbers(containerElement) {
    let rowNumber = 0;
    let rowElements = getRowElements(containerElement);
    jQuery.each(
        rowElements,
        function () {
            let row = jQuery(this);
            row.attr('data-row-number', rowNumber);
            rowNumber++;
        }
    );

    return updateContainerBlocksRenderOrder(containerElement);
}

/**
 * @param {HTMLElement} containerElement
 * @return {Promise<any>}
 */
export function updateContainerBlocksRenderOrder(containerElement) {
    let promises = [];
    let rowElements = getRowElements(containerElement);
    let blockElements;
    let rowNumber;
    jQuery.each(
        rowElements,
        function () {
            let row = jQuery(this);
            blockElements = row.find(domBlocksGetSelector());
            rowNumber = Number(row.attr('data-row-number'));
            promises.push(updateBlocksRenderOrder(blockElements, rowNumber));
        }
    );
    return Promise.all(promises);
}

/**
 * @param {HTMLElement} blockElements
 * @param {Number} rowNumber
 * @return {Promise<BlockVersionData[]>}
 */
export function updateBlocksRenderOrder(blockElements, rowNumber) {
    let renderOrder = 0;
    let promises = [];
    jQuery.each(
        blockElements,
        function () {
            let blockElement = jQuery(this);
            promises.push(updateBlockRenderOrder(blockElement, rowNumber, renderOrder));
            renderOrder++;
        }
    );
    return Promise.all(promises);
}

/**
 * @param {HTMLElement} blockElement
 * @param {Number} rowNumber
 * @param {Number} renderOrder
 * @return {Promise<BlockVersionData>}
 */
export function updateBlockRenderOrder(blockElement, rowNumber, renderOrder) {
    let blockVersionId = blockElement.attr(ATTRIBUTE_BLOCK_ID);
    let blockVersionDataCollection = getInstance();
    let blockVersionData = blockVersionDataCollection.find(blockVersionId);

    if (!blockVersionData) {
        console.error("BlockDrag.updateBlocksRenderOrder: block version not found: " + blockVersionId);
        return Promise.resolve(null);
    }

    let layoutProperties = blockVersionData.getLayoutProperties();

    layoutProperties['rowNumber'] = rowNumber;
    layoutProperties['renderOrder'] = renderOrder;

    blockVersionData.setLayoutProperties(layoutProperties);

    return Promise.resolve(blockVersionData);
}

/**
 * @return {string}
 */
export function getRowClass() {
    return 'row';
}

/**
 * @param {HTMLElement} containerElement
 */
export function getRowElements(containerElement) {
    return containerElement.children('.' + getRowClass());
}

/**
 * @param {string} context
 * @return {string}
 */
export function getSortableSelector(context) {
    // @todo data-container-context
    return domContainersGetSelector() + ' > .' + getRowClass();
}

/**
 * @return {string}
 */
export function getSortablePlaceholderClass() {
    return 'admin-tools-block-sort-place-holder';
}

/**
 * @return {string}
 */
export function getSortablePlaceholderSelector() {
    return '.' + getSortablePlaceholderClass();
}

/**
 * @param {Object} ui
 */
export function getPlaceholderElement(ui) {
    let blockElement = getBlockElementFromUi(ui);

    let placeholderElement = blockElement.clone(false);

    placeholderElement.addClass(getSortablePlaceholderClass());

    // For some reason the placeholders are set to display:none, so we fix
    placeholderElement.css('display', 'block');

    return placeholderElement;
}

/**
 * @param {Object} ui
 */
export function buildPlaceholderElement(ui) {
    if (ui.placeholder.length && !ui.placeholder.html().length) {
        ui.placeholder.html(getPlaceholderElement(ui));
    }
}

/**
 * @param {Object} ui
 * @return {HTMLElement} blockElement
 */
export function getBlockElementFromUi(ui) {
    if (!ui.item) {
        console.warn('ui.item not defined and is required');
        return null;
    }

    return getBlockElementFromElement(ui.item);
}

/**
 * @param {HTMLElement} element
 * @return {HTMLElement} blockElement
 */
export function getBlockElementFromElement(element) {
    element = jQuery(element);
    if (element.attr(ATTRIBUTE_BLOCK_ID)) {
        // already unwrapped
        return element;
    }

    let blockElement = element.find(domBlocksGetSelector());

    if (!blockElement.length) {
        console.error('element does not contain not a proper block with attribute: ' + ATTRIBUTE_BLOCK_ID, element);
        return null;
    }

    return blockElement;
}

/**
 * @param {HTMLElement} blockElement
 */
export function wrapBlockElement(blockElement) {
    if (blockElement.attr('data-block-drag-helper-id')) {
        // we already wrapped it, so return
        return blockElement;
    }

    let blockId = blockElement.attr(ATTRIBUTE_BLOCK_ID);

    if (!blockId) {
        throw "Block ID attribute (" + ATTRIBUTE_BLOCK_ID + ") must set be on block element"
    }

    blockElement = blockElement.clone(false);

    let helperElement = jQuery('<div></div>');

    // Find element with block id

    helperElement.addClass('block-drag-helper');
    helperElement.attr('data-block-drag-helper-id', blockId);


    // for some reason these are getting set to display: none;
    blockElement.attr('style', null);

    helperElement.append(blockElement);

    return helperElement;
}

/**
 * Makes blocks sortable.
 *
 * @param context
 */
export function makeBlocksSortable(context) {
    let domSelector = getSortableSelector(context);
    let containerRow = jQuery(domSelector);
    try {
        containerRow.sortable('destroy');
    } catch (e) {
        //No problem
    }

    containerRow.sortable(
        {
            cursorAt: {
                left: 10,
                top: 5
            },
            connectWith: domSelector,
            dropOnEmpty: true,
            //helper: "clone",
            // Allows for a helper element to be used for dragging display.
            helper: function (event, blockElement) {
                return blockSortableHelper(event, blockElement)
            },
            tolerance: 'pointer',
            //revert: 'invalid',
            placeholder: getSortablePlaceholderClass(),
            forcePlaceholderSize: false,
            handle: '.admin-tools-block-controls-handle.sortable-menu',
            start: function (event, ui) {
                blockSortableStart(event, ui);
            },
            change: function (event, ui) {
                blockSortableChange(ui);
            },
            receive: function (event, ui) {
                return updateBlock(event, ui);
            },
            update: function (event, ui) {
                return updateBlock(event, ui);
            }
        }
    );

    return Promise.resolve(containerRow);
}

/**
 * @param {Event} event
 * @param {HTMLElement} blockElement
 * @return {HTMLElement}
 */
export function blockSortableHelper(event, blockElement) {
    return wrapBlockElement(blockElement);
}

/**
 * blockSortableStart
 * @param {Event} event
 * @param {Object} ui
 */
export function blockSortableStart(event, ui) {
    buildPlaceholderElement(ui);
}

/**
 * Block Sortable Change event, add Ghost Image
 *
 * @param {Object} ui
 */
export function blockSortableChange(ui) {
    buildPlaceholderElement(ui)
}

/**
 * @param {Event} event
 * @param {Object} ui
 * @return {Boolean} must return true or sort breaks ordering
 */
export function updateBlock(event, ui) {
    let containerElement = jQuery(event.target.parentElement);

    let blockElement = getBlockElementFromUi(ui);

    if (!blockElement) {
        logger.warn('******* blockElement not found', {
            event: event,
            ui: ui
        });
        return true;
    }

    let blockVersionId = blockElement.attr(ATTRIBUTE_BLOCK_ID);
    if (!blockVersionId || blockVersionId === undefined || blockVersionId === "" || blockVersionId.length === 0) {
        logger.warn('******* blockVersionId not set', event, ui);
        return true;
    }

    let containerName = containerElement.attr(ATTRIBUTE_CONTAINER_NAME);
    let context = containerElement.attr(ATTRIBUTE_CONTAINER_CONTEXT);
    let containerId = containerElement.attr(ATTRIBUTE_CONTAINER_ID);
    let updateContexts = [context];

    let blockVersionDataCollection = getInstance();

    let blockVersionData = blockVersionDataCollection.find(blockVersionId);

    logger.info('>>> Before:', extend(true, {}, blockVersionData));

    if (!blockVersionData) {
        console.error("Block version not found: " + blockVersionId);
        return true;
    }

    let originalContext = blockVersionData.getContext();
    if (originalContext !== context) {
        updateContexts.push(originalContext);
    }

    blockVersionData.setContext(context);
    blockVersionData.setContainerName(containerName);
    blockVersionData.setContainerId(containerId);
    blockVersionData.mergeLayoutProperties(
        {
            "renderOrder": 0, // set on updateRowNumbers(containerElement)
            "rowNumber": 0, // set on updateRowNumbers(containerElement)
        }
    );
    blockVersionData.setSave(true);

    logger.info('>>> Updated:', blockVersionData);

    // logger.info('>>> FINAL:', blockVersionDataCollection.find(blockVersionId));

    getStore().dispatch(blockAdd(blockVersionData));

    return true;
}
