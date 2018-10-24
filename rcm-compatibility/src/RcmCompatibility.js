import domBlockInnerGetSelector from "../../zrcms-admin-tools/src/dom/domBlockInnerGetSelector";
import {getInstance} from "../../zrcms-admin-tools/src/block-data/BlockVersionDataCollectionFactory";

let blockVersionDataCollection = getInstance();

/**
 * @deprecated
 */
class RcmCompatibility {

    constructor(document) {
        this.moduleDepenencies = [];
        this.config = {};
        this.init(document);
    }

    init = function (document) {
        let angularModule = angular.module('rcm', this.moduleDepenencies);

        angular.element(document).ready(
            function () {
                angular.bootstrap(
                    document,
                    ['rcm']
                );

                this.app = angularModule;

                this.compile = angular.element(document).injector().get('$compile');

                this.scope = angular.element(document).scope();

                let rootScope = angular.element(document).injector().get('$rootScope');

                rootScope.safeApply = function (fn) {
                    let phase = this.rootScope.$$phase;
                    if (phase == '$apply' || phase == '$digest') {
                        if (fn && (typeof(fn) === 'function')) {
                            fn();
                        }
                    } else {
                        rootScope.$apply(fn);
                    }
                };

                let safeApply = function (scope, fn) {
                    let phase = scope.$root.$$phase;
                    if (phase === '$apply' || phase === '$digest') {
                        if (fn && (typeof(fn) === 'function')) {
                            fn();
                        }
                    } else {
                        scope.$apply(fn);
                    }
                };

                this.angularCompile = function (elm, fn) {

                    console.warn('rcm.angularCompile can cause problems for other angular directives!');

                    let content = elm.contents();

                    angular.element(document).injector().invoke(
                        function ($compile) {
                            let scope = angular.element(content).scope();
                            $compile(content)(scope);
                            safeApply(scope, fn);
                            //this.rootScope.safeApply(fn);
                        }
                    );
                };
            }
        );
    };

    getConfigValue = function (configKey, defaultValue) {

        if (this.config[configKey]) {
            return this.config[configKey]
        }

        return defaultValue;
    };

    getPluginContainerSelector(blockVersionId) {
        return domBlockInnerGetSelector(
            blockVersionDataCollection.find(blockVersionId)
        );
    }

    getPluginContainer(instanceId) {
        return jQuery(this.getPluginContainerSelector(instanceId));
    };

    /**
     * @param moduleName
     */
    pushModuleName(moduleName) {
        if (!this.hasModule(moduleName)) {
            this.moduleDepenencies.push(moduleName);
        }
    }

    /**
     *
     * @param moduleName
     * @returns {boolean}
     */
    hasModule(moduleName) {
        return (this.moduleDepenencies.indexOf(moduleName) > -1);
    }

    /**
     * @param {String} moduleName
     */
    addAngularModule(moduleName) {
        if (this.hasModule(moduleName)) {
            return;
        }

        if (!this.app) {
            this.pushModuleName(moduleName);
            return;
        }

        console.error('Module: ' + moduleName + ' registered too late.');
    };
}

const rcmCompatibility = new RcmCompatibility(window.document);

if (!window.rcm) {
    window.rcm = rcmCompatibility;
}

export default rcmCompatibility;
