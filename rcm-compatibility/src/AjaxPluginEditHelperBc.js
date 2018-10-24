import logger from '../../zrcms-admin-tools/src/debug/Logger'
import domBlockInnerGetSelectorById from '../../zrcms-admin-tools/src/dom/domBlockInnerGetSelectorById'

import PluginHandlerBc from './PluginHandlerBc'

/**
 * @deprecated  Replaces {AjaxPluginEditHelper} vendor/rcm/admin/public/plugin-admin/ajax-plugin-edit-helper.js
 *
 * @param instanceId
 * @param container
 * @param {PluginHandlerBc} pluginHandler
 * @constructor
 */
export default function AjaxPluginEditHelperBc(
    instanceId,
    container,
    pluginHandler
) {
    let self = this;

    let blockName = pluginHandler.getName();

    logger.warn('@deprecated AjaxPluginEditHelper', {blockName: blockName});

    self.ajaxGetInstanceConfigs = function (callback) {
        logger.warn('@deprecated AjaxPluginEditHelper.ajaxGetInstanceConfigs', {blockName: blockName});
        pluginHandler.getInstanceConfig(callback);
    };

    /**
     * @deprecated
     *
     * An input group is an array of text inputs, useful for html selects.
     * This function builds an array of input groups.
     * @param groupDataKeyNames
     * @param data
     * @param defaultData
     * @return {Object}
     */
    self.buildInputGroups = function (groupDataKeyNames, data, defaultData) {
        logger.warn('@deprecated AjaxPluginEditHelper.buildInputGroups', {blockName: blockName});
        let inputGroups = {};
        jQuery.each(
            groupDataKeyNames, function () {
                inputGroups[this] = self.buildInputGroup(
                    data[this],
                    defaultData[this]
                );
            }
        );
        return inputGroups;
    };

    /**
     * @deprecated
     *
     * An input group is an array of text inputs, useful for html selects.
     * This function transfers the data from html text boxes to the data array
     * @param inputGroups
     * @param data
     * @return {*}
     */
    self.captureInputGroups = function (inputGroups, data) {
        logger.warn('@deprecated AjaxPluginEditHelper.captureInputGroups', {blockName: blockName});
        jQuery.each(
            inputGroups, function (inputGroupName, inputGroup) {
                data = self.captureInputGroup(inputGroupName, inputGroup, data);
            }
        );
        return data;
    };

    /**
     * @deprecated
     *
     * An input group is an array of text inputs, useful for html selects.
     * This function builds a single input group
     * @param currentTranslations
     * @param defaultTranslations
     * @return {Object}
     */
    self.ajaxGetInstanceConfigs = function (currentTranslations, defaultTranslations) {
        logger.warn('@deprecated AjaxPluginEditHelper.ajaxGetInstanceConfigs', {blockName: blockName});
        let inputs = {};
        jQuery.each(
            defaultTranslations, function (key, value) {
                inputs[key] = jQuery.dialogIn('text', value, currentTranslations[key]);
            }
        );
        return inputs
    };

    /**
     * @deprecated
     * An input group is an array of text inputs, useful for html selects.
     * This function transfers the data from html text boxes to the data array
     * @param inputGroupName
     * @param inputGroup
     * @param instanceConfig AKA data
     * @return {*}
     */
    self.captureInputGroup = function (inputGroupName, inputGroup, instanceConfig) {
        logger.warn('@deprecated AjaxPluginEditHelper.captureInputGroup', {blockName: blockName});
        jQuery.each(
            instanceConfig[inputGroupName], function (key) {
                if (inputGroup[key]) {
                    instanceConfig[inputGroupName][key] = inputGroup[key].val()
                }
            }
        );
        return instanceConfig;
    };

    /**
     * @deprecated
     *
     * @param emailGroupData
     * @return {{fromEmail: *, fromName: *, subject: *, body: *}}
     */
    self.buildEmailInputGroup = function (emailGroupData) {
        logger.warn('@deprecated AjaxPluginEditHelper.buildEmailInputGroup', {blockName: blockName});
        emailGroupData = angular.extend(
            {
                fromEmail: null,
                fromName: null,
                subject: null,
                body: null
            },
            emailGroupData
        );
        return {
            fromEmail: jQuery.dialogIn('text', 'From Email', emailGroupData['fromEmail']),
            fromName: jQuery.dialogIn('text', 'From Name', emailGroupData['fromName']),
            subject: jQuery.dialogIn('text', 'Subject', emailGroupData['subject']),
            body: jQuery.dialogIn('richEdit', 'Body', emailGroupData['body'])
        };
    };

    /**
     * @deprecated Use RcmAdminPlugin.addPluginMenu()
     *
     * @param showMainPropertiesCallback
     */
    this.attachPropertiesDialog = function (showMainPropertiesCallback) {
        logger.warn('@deprecated AjaxPluginEditHelper.attachPropertiesDialog', {blockName: blockName});
        //Double clicking will show properties dialog
        container.delegate(
            'div', 'dblclick', function (event) {
                event.stopPropagation();
                showMainPropertiesCallback();
            }
        );

        //Add right click menu
        jQuery.contextMenu(
            {
                selector: domBlockInnerGetSelectorById(instanceId),
                //Here are the right click menu options
                items: {
                    edit: {
                        name: 'Edit Properties',
                        icon: 'edit',
                        callback: showMainPropertiesCallback
                    }
                }
            }
        );

        pluginHandler.addPluginMenu(
            'editproperties',
            'Edit Properties',
            showMainPropertiesCallback
        );
    }
};

