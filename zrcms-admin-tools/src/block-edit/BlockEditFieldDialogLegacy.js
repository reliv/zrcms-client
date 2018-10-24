// import domBlockInnerGetSelector from '../dom/domBlockInnerGetSelector';
// import getBlockComponentsAvailable from '../block-component/getBlockComponentsAvailable'
// import {getInstance as getBlockVersionDataCollection} from "../../../zrcms-admin-tools/src/BlockVersionDataCollectionFactory";
// import jquery from 'jquery'
//
// export function getAvailableBlockComponentFromStateByName(blockName) {
//     return getBlockComponentsAvailable().find(blockName);
// }
//
// function RcmBlockEditorFieldDialogDialog() {
//     let self = this;
//
//     let form = $('<form class="simple"></form>');
//
//     self.show = function (instanceConfig, fields, callback) {
//         form.html('<span></span>');//Clear any html from previous usage of the form;
//         let inputElements = {};
//         fields.forEach(function (field) {
//                 inputElements[field.name] = jQuery.dialogIn(
//                     field.type,
//                     field.label,
//                     instanceConfig[field.name],
//                     field.options
//                 );
//                 form.append(inputElements[field.name]);
//             }
//         );
//         form.dialog({
//                 title: 'Properties',
//                 modal: true,
//                 width: 620,
//                 buttons: {
//                     Cancel: function () {
//                         $(this).dialog("close");
//                     },
//                     Ok: function () {
//                         fields.forEach(
//                             function (field) {
//                                 instanceConfig[field.name] = inputElements[field.name].val();
//                             }
//                         );
//
//                         callback(instanceConfig);
//
//                         $(this).dialog('close');
//                     }
//                 }
//             }
//         );
//     };
// }
//
// export default class BlockEditFieldDialogLegacy {
//     /**
//      * @param {String} id
//      * @param {Object} config
//      */
//     constructor(id, config) {
//         this._id = id;
//         this._config = config;
//         this._blockVersionData = getBlockVersionDataCollection().find(id);
//         this._name = this._blockVersionData.getName();
//         this._containerSelector = domBlockInnerGetSelector(this._blockVersionData);
//         this._fields = getAvailableBlockComponentFromStateByName(this._name).properties.fields;
//         this._showEditDialog = this._showEditDialog.bind(this);
//         this._attachEditUiListeners = this._attachEditUiListeners.bind(this);
//     }
//
//     _showEditDialog() {
//         const dialog = new RcmBlockEditorFieldDialogDialog();
//         dialog.show(
//             this._config,
//             this._fields,
//             function (newInstanceConfig) {
//                 this._config = newInstanceConfig;
//                 //re-render the plugin with it's new instance config
//                 // pluginHandler.preview();//@TODO FIX THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//             }
//         )
//     }
//
//     _attachEditUiListeners() {
//         const container = jQuery(this._containerSelector);
//
//         //Double clicking will show properties dialog
//         container.unbind('dblclick');//Prevent multiple click handlers from being added
//         container.dblclick(this._showEditDialog);
//
//         //Disabled the a tag while we are editing
//         container.find('a').attr('href', 'javascript:void(0)');
//
//         //Add right click menu
//         jquery.contextMenu(
//             {
//                 selector: this._containerSelector,
//                 //Here are the right click menu options
//                 items: {
//                     edit: {
//                         name: 'Edit Properties',
//                         icon: 'edit',
//                         callback: function () {
//                             this._showEditDialog();
//                         }
//                     }
//                 }
//             }
//         );
//     }
//
//     /**
//      * @return {Promise<boolean>}
//      */
//     async initEdit() {
//         this._attachEditUiListeners();
//         return true;
//     }
//
//     /**
//      * @return {Promise<object>}
//      */
//     async getSaveData() {
//         return this._config;
//     }
// }
//
//
//
//
//
//
//
//
//
//
//
//
// //
// //
// // /**
// //  *
// //  * @param {RcmAdminPlugin} pluginHandler
// //  * @param {Array} fields
// //  * @constructor
// //  */
// // let RcmBlockEditorFieldDialog = function (pluginHandler, fields) {
// //
// //     let self = this;
// //
// //     let instanceId = pluginHandler.getInstanceId();
// //
// //     //instanceConfig gets filled in via AJAX call below
// //     let instanceConfig;
// //
// //     let dialog = new RcmBlockEditorFieldDialogDialog();
// //
// //     function showEditDialog() {
// //         dialog.show(
// //             instanceConfig,
// //             fields,
// //             function (newInstanceConfig) {
// //                 instanceConfig = newInstanceConfig;
// //                 //re-render the plugin with it's new instance config
// //                 pluginHandler.preview();
// //             }
// //         )
// //     }
// //
// //     function attachEditUiListeners() {
// //         let container = jQuery(rcm.getPluginContainerSelector(instanceId));
// //
// //         //Double clicking will show properties dialog
// //         container.unbind('dblclick');//Prevent multiple click handlers from being added
// //         container.dblclick(showEditDialog);
// //
// //         //Disabled the a tag while we are editing
// //         container.find('a').attr('href', 'javascript:void(0)');
// //
// //         //Add right click menu
// //         $.contextMenu(
// //             {
// //                 selector: rcm.getPluginContainerSelector(instanceId),
// //                 //Here are the right click menu options
// //                 items: {
// //                     edit: {
// //                         name: 'Edit Properties',
// //                         icon: 'edit',
// //                         callback: function () {
// //                             showEditDialog();
// //                         }
// //                     }
// //                 }
// //             }
// //         );
// //     }
// //
// //     self.initEdit = function () {
// //         pluginHandler.getInstanceConfig(
// //             function (instanceConfigFromServer) {
// //                 instanceConfig = instanceConfigFromServer;
// //                 attachEditUiListeners();
// //             }
// //         );
// //     };
// //
// //     self.getSaveData = function () {
// //         return instanceConfig;
// //     };
// // };
//
