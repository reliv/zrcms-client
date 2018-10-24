import extend from 'extend';
import angularCompile from "../../angular-utilities/src/angularCompile";
import domBlockInnerGetSelector from "../../zrcms-admin-tools/src/dom/domBlockInnerGetSelector";
import domBlockFind from "../../zrcms-admin-tools/src/dom/domBlockFind";
import {getInstance} from "../../zrcms-admin-tools/src/block-data/BlockVersionDataCollectionFactory";
import getInstanceBlockEditCollection from "../../zrcms-admin-tools/src/block-edit/BlockEditCollectionFactory";
import logger from '../../zrcms-admin-tools/src/debug/Logger'
import getDefaultConfigPrepared from '../../zrcms-admin-tools/src/block-component/getDefaultConfigPrepared'
import findBlockComponentCached from '../../zrcms-admin-tools/src/http/findBlockComponentCached'
import getStore from "../../zrcms-admin-tools/src/redux/getStore";
import blockAdd from "../../zrcms-admin-tools/src/action/blockAdd";
import domBlockRenderPreview from "../../zrcms-admin-tools/src/dom/domBlockRenderPreview"
import setLoading from "../../loading/src/setLoading";

let blockVersionDataCollection = getInstance();
let blockEditCollection = getInstanceBlockEditCollection();

/**
 * @param {Object} defaultConfig
 * @param {Object} blockConfig
 */
function mergeConfig(defaultConfig, blockConfig) {
    if (!defaultConfig) {
        defaultConfig = {};
    }

    if (!blockConfig) {
        blockConfig = {};
    }
    return extend(true, {}, defaultConfig, blockConfig)
}

/**
 * @deprecated Replaces {RcmAdminPlugin} /rcm/admin/public/rcm-page-admin/rcm-admin-plugin.js
 *
 * @param {*} defaultConfig
 * @param {BlockVersionData} blockVersionData
 * @constructor
 */
export default function PluginHandlerBc(defaultConfig, blockVersionData) {
    let self = this;

    self.instanceConfig = blockVersionData.getConfig();
    let blockName = blockVersionData.getName();

    self.getInstanceId = function () {
        logger.warn('@deprecated RcmAdminPlugin.getInstanceId', {blockName: blockName});
        return blockVersionData.getId();
    };

    self.getName = function () {
        logger.warn('@deprecated RcmAdminPlugin.getName', {blockName: blockName});
        return blockVersionData.getName();
    };

    self.getInstanceConfig = function (onComplete) {
        logger.warn('@deprecated RcmAdminPlugin.getInstanceConfig', {blockName: blockName});
        // This loading prevents the loading flickering
        setLoading('@deprecated RcmAdminPlugin.getInstanceConfig.' + blockName , 0);
        let config = blockVersionData.getConfig();
        return findBlockComponentCached(blockName).then(
            (blockComponent) => {
                //logger.log('RcmAdminPlugin.getInstanceConfig.blockComponent', blockComponent);
                let defaultConfig = getDefaultConfigPrepared(
                    blockComponent.properties.fields, blockComponent.properties.defaultConfig
                );
                // This expects merged config
                config = mergeConfig(defaultConfig, config);
                if (typeof onComplete === 'function') {
                    onComplete(config, defaultConfig);
                }

                return new Promise(
                    (resolve) => {
                        setLoading('@deprecated RcmAdminPlugin.getInstanceConfig.' + blockName , 1);
                        resolve(config, defaultConfig);
                    }
                );
            }
        );
    };

    self.getElm = function () {
        logger.warn('@deprecated RcmAdminPlugin.getElm', {blockName: blockName});
        return domBlockFind(blockVersionData);
    };

    self.model = {
        getPluginContainerSelector: function (instanceId) {
            logger.warn('@deprecated RcmAdminPlugin.model.getPluginContainerSelector', {blockName: blockName});
            return domBlockInnerGetSelector(
                blockVersionDataCollection.find(instanceId)
            );
        }
    };

    self.addPluginMenu = function (optionId, title, method) {
        logger.warn('@deprecated RcmAdminPlugin.addPluginMenu', {blockName: blockName});
        logger.error('@todo tie to block-menu', optionId, title, method);
        // @todo this might tie to block-menu
        //let blockMenu = new BlockMenu();
        //getInstanceBlockMenuCollection.has()
    };

    self.preview = function (onComplete) {
        logger.warn('@deprecated RcmAdminPlugin.preview', {blockName: blockName});

        let blockEdit = blockEditCollection.find(blockVersionData.getId());

        if (null === blockEdit) {
            throw new Error('Block edit not found for blockVersionId: ' + blockVersionData.getId())
        }

        blockEdit.getSaveData().then(
            (blockConfig) => {
                domBlockRenderPreview(blockVersionData.getId(), blockConfig);
            }
        );

        /** OLD
         var pluginElm = self.getElm();

         var name = self.model.getName(pluginElm);
         var pluginContainer = self.model.getPluginContainer(pluginElm);
         self.getSaveData().then(
         function (pluginData) {
                self.instanceConfig = pluginData.saveData;
                // @todo This should be in a model
                jQuery.post(
                    '/rcm/core/rpc/render-plugin-instance-preview',
                    {
                        pluginType: name,
                        instanceId: id,
                        instanceConfig: self.instanceConfig
                    },
                    function (data) {
                        pluginContainer.html(data.html);
                        self.updateView(
                            pluginContainer, function () {
                                self.initEdit(onComplete, true);
                            }
                        );
                    }
                );
            }
         );
         */
    };

    self.updateView = function (blockInnerElm, onComplete) {
        logger.warn('@deprecated RcmAdminPlugin.updateView', {blockName: blockName});

        // Call block add to update view
        getStore().dispatch(blockAdd(blockVersionData));
        window.setTimeout(
            () => {
                angularCompile(
                    blockInnerElm,
                    () => {
                    }
                );
            }
        );

        /** OLD
         self.prepareEditors(
         function (plugin) {

                if (!elm) {
                    elm = plugin.getElm()
                }

                self.angularCompile(
                    elm,
                    function () {
                        self.page.events.trigger('updateView', plugin);
                    }
                );

                if (typeof onComplete === 'function') {
                    onComplete(plugin);
                }
            }
         );
         */
    };
}
