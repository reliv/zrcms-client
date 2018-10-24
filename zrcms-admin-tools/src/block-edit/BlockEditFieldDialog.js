import {ProceduralFormDialog} from "../../../../field-rat-singleton";
import getBlockComponentsAvailable from '../../../zrcms-admin-tools/src/block-component/getBlockComponentsAvailable'
import {getInstance as getBlockVersionDataCollection} from "../../../zrcms-admin-tools/src/block-data/BlockVersionDataCollectionFactory";
import domBlockInnerGetSelector from '../dom/domBlockInnerGetSelector';
import domBlockRenderPreview from '../dom/domBlockRenderPreview'
// import jquery from 'jquery'

export function getAvailableBlockComponentFromStateByName(blockName) {
    return getBlockComponentsAvailable().find(blockName);
}

export default class BlockEditFieldDialog {
    /**
     * @param {String} id
     * @param {Object} config
     */
    constructor(id, config) {
        this._id = id;
        this._config = config;
        this._blockVersionData = getBlockVersionDataCollection().find(id);
        this._name = this._blockVersionData.getName();
        this._containerSelector = domBlockInnerGetSelector(this._blockVersionData);
        this._fields = getAvailableBlockComponentFromStateByName(this._name).properties.fields;
        this._showEditDialog = this._showEditDialog.bind(this);
        this._attachEditUiListeners = this._attachEditUiListeners.bind(this);
    }

    _showEditDialog() {
        const dialog = new ProceduralFormDialog(
            'Properties',
            this._fields,
            this._config,
            {},
            (newInstanceConfig) => {
                this._config = newInstanceConfig;
                //re-render the plugin with it's new instance config
                domBlockRenderPreview(this._id, this._config);
                dialog.close();
            });
    }

    _attachEditUiListeners() {
        const container = jQuery(this._containerSelector);

        //Double clicking will show properties dialog
        container.unbind('dblclick');//Prevent multiple click handlers from being added
        container.dblclick(this._showEditDialog);

        //Disabled the a tag while we are editing
        container.find('a').attr('href', 'javascript:void(0)');

        //Add right click menu
        jQuery.contextMenu(
            {
                selector: this._containerSelector,
                //Here are the right click menu options
                items: {
                    edit: {
                        name: 'Edit Properties',
                        icon: 'edit',
                        callback: function () {
                            this._showEditDialog();
                        }
                    }
                }
            }
        );
    }

    /**
     * @return {Promise<boolean>}
     */
    async initEdit() {
        this._attachEditUiListeners();
        return true;
    }

    /**
     * @return {Promise<object>}
     */
    async getSaveData() {
        return this._config;
    }
}
