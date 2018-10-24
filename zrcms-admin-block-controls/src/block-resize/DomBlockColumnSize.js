import ColumnSizeBootstrap from './ColumnSizeBootstrap'
import '../../css/block-column-size.css'

import {getInstance} from "../../../zrcms-admin-tools/src/block-data/BlockVersionDataCollectionFactory"
import domElementGetBlockId from "../../../zrcms-admin-tools/src/dom/domElementGetBlockId"

/**
 * {DomBlockColumnSize}
 */
export default class DomBlockColumnSize {
    constructor(columnSizer = null) {
        this.columnSizer = columnSizer;
        if (!this.columnSizer) {
            this.columnSizer = new ColumnSizeBootstrap();
        }
        this.totalWidthColumns = this.columnSizer.totalWidthColumns;
        this.defaultClass = this.columnSizer.defaultClass;
    }

    /**
     * @param domElement
     * @return {BlockVersionData}
     */
    getBlockVersion(domElement) {
        let blockVersionId = domElementGetBlockId(domElement);
        let blockVersionDataCollection = getInstance();
        let blockVersion = blockVersionDataCollection.find(blockVersionId);
        if (!blockVersion) {
            console.error('BlockVersion not found with ID:' + blockVersionId);
        }

        return blockVersion;
    }

    getLayoutProperties(domElement) {
        let blockVersion = this.getBlockVersion(domElement);
        // @todo what if not blockVersion
        return blockVersion.getLayoutProperties();
    }

    setLayoutProperties(domElement, layoutProperties) {
        let blockVersion = this.getBlockVersion(domElement);
        return blockVersion.setLayoutProperties(layoutProperties);
    }

    getColumnClass(domElement) {
        let layoutProperties = this.getLayoutProperties(domElement);

        return layoutProperties['columnClass']
    }

    setColumnClass(domElement, columnClass) {
        let layoutProperties = this.getLayoutProperties(domElement);

        layoutProperties['columnClass'] = columnClass;
        this.setLayoutProperties(domElement, layoutProperties);
    }

    /**
     * getMediaView
     * @returns {string}
     */
    getMediaView() {
        // @todo Make this work by getting the data from some source
        return 'sm'
    };

    /**
     *
     * @param domElement
     * @param widthCols
     */
    setWidth(domElement, widthCols) {
        let mediaView = this.getMediaView();

        let columnData = this.getDomElementColumnData(domElement);

        let maxWidthColumns = this.totalWidthColumns - columnData[mediaView].offset;

        if (widthCols > maxWidthColumns) {
            widthCols = maxWidthColumns;
        }

        if (widthCols < 1) {
            widthCols = 1;
        }

        let widthAndOffset = widthCols + columnData[mediaView].offset;

        if (widthAndOffset > this.totalWidthColumns) {
            columnData[mediaView].offset = this.totalWidthColumns - widthCols;
        }

        columnData[mediaView].width = widthCols;

        this.updateColumnClass(
            domElement,
            columnData
        );
    };

    /**
     * setOffset in columns
     * @param domElement
     * @param offsetCols
     */
    setOffset(domElement, offsetCols) {
        let mediaView = this.getMediaView();

        let columnData = this.getDomElementColumnData(domElement);

        let maxOffsetColumns = this.totalWidthColumns - 1; //columnData[mediaView].width;

        if (offsetCols > maxOffsetColumns) {
            offsetCols = maxOffsetColumns;
        }

        if (offsetCols < 0) {
            offsetCols = 0;
        }

        let widthAndOffset = offsetCols + columnData[mediaView].width;

        if (widthAndOffset > this.totalWidthColumns) {
            columnData[mediaView].width = this.totalWidthColumns - offsetCols;
        }

        columnData[mediaView].offset = offsetCols;

        this.updateColumnClass(
            domElement,
            columnData
        );
    };

    /**
     * setVisible
     * @param domElement
     * @param visible
     */
    setVisible(domElement, visible) {
        let mediaView = this.getMediaView();

        let columnData = this.getDomElementColumnData(domElement);
        columnData[mediaView].visible = visible;

        this.updateColumnClass(
            domElement,
            columnData
        );
    };

    /**
     * getVisible
     * @param domElement
     */
    getVisible(domElement) {
        let columnData = this.getDomElementColumnData(domElement);

        let mediaView = this.getMediaView();

        return columnData[mediaView].visible;
    };

    /**
     * setHidden
     * @param domElement
     * @param hidden bool
     */
    setHidden(domElement, hidden) {
        let mediaView = this.getMediaView();

        let columnData = this.getDomElementColumnData(domElement);
        columnData[mediaView].hidden = hidden;

        this.updateColumnClass(
            domElement,
            columnData
        );
    };

    /**
     * getHidden
     * @param domElement
     */
    getHidden(domElement) {
        let columnData = this.getDomElementColumnData(domElement);

        let mediaView = this.getMediaView();

        return columnData[mediaView].hidden;
    };

    /**
     * @param domElement
     * @return {{xs: {width: number, offset: number, visible: string, hidden: boolean}, sm: {width: number, offset: number, visible: string, hidden: boolean}, md: {width: number, offset: number, visible: string, hidden: boolean}, lg: {width: number, offset: number, visible: string, hidden: boolean}}}
     */
    getDomElementColumnData(domElement) {
        let currentClass = this.getCurrentClass(domElement);
        // @todo what if not current class
        return this.columnSizer.getColumnData(currentClass)
    }

    /**
     * Destroy resize bits
     * @param domElement
     */
    destroy(domElement) {
        domElement.parent().unbind('mousemove');
        let controls = domElement.find('.admin-tools-block-column-size-control');
        controls.unbind('mousedown');
        controls.remove();
    };

    /**
     * Add draggy controls
     * @param domElement
     */
    addControls(domElement) {
        let self = this;
        domElement = jQuery(domElement);

        try {
            // prevent duplicate create
            this.destroy(domElement);
        } catch (e) {
            // nothing
        }

        let controlOffset = jQuery('<div class="admin-tools-block-column-size-control offset"><div>&nbsp;</div></div>');

        let controlWidth = jQuery('<div class="admin-tools-block-column-size-control width"><div>&nbsp;</div></div>');

        domElement.prepend(controlWidth);
        domElement.prepend(controlOffset);

        controlOffset.mousedown(
            function (e) {
                e.preventDefault();
                domElement.currentColumnData = self.getDomElementColumnData(domElement);
                domElement.offsetStartPositonX = e.pageX;

                domElement.parent().mousemove(
                    function (e) {
                        let changePx = e.pageX - domElement.offsetStartPositonX;

                        let changeCols = self.columnSizer.getPartWidthColumns(
                            domElement.parent().width(),
                            changePx
                        );

                        let mediaView = self.getMediaView();

                        let cols = domElement.currentColumnData[mediaView].offset + changeCols;

                        self.setOffset(domElement, cols);
                    }
                );
            }
        );

        controlWidth.mousedown(
            function (e) {
                e.preventDefault();
                domElement.currentColumnData = self.getDomElementColumnData(domElement);
                domElement.widthStartPositonX = e.pageX;

                domElement.parent().mousemove(
                    function (e) {
                        let changePx = e.pageX - domElement.widthStartPositonX;

                        let changeCols = self.columnSizer.getPartWidthColumns(
                            domElement.parent().width(),
                            changePx
                        );

                        let mediaView = self.getMediaView();

                        let cols = domElement.currentColumnData[mediaView].width + changeCols;

                        self.setWidth(domElement, cols);
                    }
                );
            }
        );

        jQuery(document).mouseup(
            function (e) {
                domElement.parent().unbind('mousemove');
            }
        );
    };

    /**
     * updateColumnClass
     * @param domElement
     * @param columnData
     */
    updateColumnClass(domElement, columnData) {
        let newClass = this.columnSizer.buildClass(columnData);
        this.setClass(domElement, newClass);
    };

    /**
     * clearClass
     * @param domElement
     */
    clearClass(domElement) {
        this.setClass(domElement, this.defaultClass);
    };

    /**
     *
     * @param domElement
     * @returns {*}
     */
    getCurrentClass(domElement) {
        return this.getColumnClass(domElement);
    };

    /**
     * Set Class
     * @param domElement
     * @param newClass
     */
    setClass(domElement, newClass) {
        this.setColumnClass(domElement, newClass);
        let defaultClass = domElement.attr('default-class');
        let value = defaultClass + ' ' + newClass;

        domElement.attr('class', value);

        jQuery(window).trigger('resize');
    };
}
