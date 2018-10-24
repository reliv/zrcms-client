import objectDiff from "../../../object-diff/object-diff";

/**
 * {BlockVersionDataCollection}
 */
export default class BlockVersionDataCollection {
    /**
     * @param {Array|null} list
     */
    constructor(list) {
        this.list = [];

        if (Array.isArray(list)) {
            let index, len;
            for (index = 0, len = list.length; index < len; index++) {
                this.add(list[index]);
            }
        }
    }

    /**
     * @param {BlockVersionData} blockVersionData
     */
    add(blockVersionData) {
        if (this.has(blockVersionData.getId())) {
            console.warn(
                'Tried to add the same block version with id: ' + blockVersionData.getId()
            );
            return;
        }
        this.list.push(
            blockVersionData
        );
    }

    /**
     * @param {string} blockVersionId
     */
    has(blockVersionId) {
        if (this.find(blockVersionId)) {
            return true;
        }

        return false;
    }

    /**
     * @param {string} blockVersionId
     */
    remove(blockVersionId) {
        let blockVersionData = this.find(blockVersionId);

        if (blockVersionData) {
            blockVersionData.remove();
        }
    }

    /**
     * @param {string} blockVersionId
     * @return {BlockVersionData|null}
     */
    find(blockVersionId) {
        let result = this.list.find(
            /**
             * @param {BlockVersionData} blockVersionData
             * @return {boolean}
             */
            (blockVersionData) => {
                // @todo This must be loose compare due to some ids may be integers
                return (blockVersionData.getId() == blockVersionId);
            }
        );

        return (typeof result === 'undefined' ? null : result);
    }

    /**
     * This
     * @param {string} blockVersionId
     * @param {object} config
     * @return {*}
     */
    setConfig(blockVersionId, config) {
        let blockVersionData = this.find(blockVersionId);

        if (!blockVersionData) {
            console.error('Could not set config for blockVersionId: ' + blockVersionId);
            return;
        }

        blockVersionData.setConfig(config);
    }

    /**
     * @param {string} blockVersionId
     * @param {object} config
     * @return {*}
     */
    mergeConfig(blockVersionId, config) {
        let blockVersionData = this.find(blockVersionId);

        if (!blockVersionData) {
            console.error('Could not merge config for blockVersionId: ' + blockVersionId);
            return;
        }

        blockVersionData.mergeConfig(config);
    }

    /**
     * @param {string} blockVersionId
     * @return {*}
     */
    findConfig(blockVersionId) {
        return this.findProperty(blockVersionId, 'config', {});
    }

    /**
     * @param {string} blockVersionId
     * @return {*}
     */
    findComponentName(blockVersionId) {
        return this.findProperty(blockVersionId, 'blockComponentName', null);
    }

    /**
     *
     * @param {string} blockVersionId
     * @param {string} property
     * @param {mixed} def
     * @return {*}
     */
    findProperty(blockVersionId, property, def) {
        let blockVersion = this.find(blockVersionId);
        if (!blockVersion) {
            return def;
        }

        if (typeof blockVersion[property] === "undefined") {
            return def;
        }

        return blockVersion[property];
    }

    /**
     * @param {string} containerName
     * @param {string} blockVersionId
     * @return {BlockVersionData|null}
     */
    findByContainer(containerName, blockVersionId) {
        let result = this.list.find(
            /**
             * @param {BlockVersionData} blockVersionData
             * @return {boolean}
             */
            (blockVersionData) => {
                if (blockVersionData.getContainerName() !== containerName) {
                    return false;
                }

                return (blockVersionData.getId() === blockVersionId);
            }
        );

        return (typeof result === 'undefined' ? null : result);
    }

    /**
     * Find list of container names
     *
     * @param {String} context
     * @return {String[]}
     */
    findContainerNameListByContext(context) {
        let list = [];
        let containerName;

        this.list.map(
            (blockVersionData) => {
                if (blockVersionData.getContext() !== context) {
                    return false;
                }
                containerName = blockVersionData.getContainerName();
                if (list.indexOf(containerName) === -1) {
                    list.push(containerName);
                    return true;
                }
                return false;
            }
        );

        return list;
    }

    /**
     * @param {string} context
     * @param {string} blockVersionId
     * @return {BlockVersionData|null}
     */
    findByContext(context, blockVersionId) {
        let result = this.list.find(
            /**
             * @param {BlockVersionData} blockVersionData
             * @return {boolean}
             */
            (blockVersionData) => {
                if (blockVersionData.getContext() !== context) {
                    return false;
                }

                return (blockVersionData.getId() === blockVersionId);
            }
        );

        return (typeof result === 'undefined' ? null : result);
    }

    /**
     * @param context
     * @return {BlockVersionData[]}
     */
    findListByContext(context) {
        return this.list.filter(
            (blockVersionData) => {
                return (blockVersionData.getContext() === context);
            }
        );
    }

    /**
     * @param {String} context
     * @return {boolean[]}
     */
    revertByContext(context) {
        return this.list.map(
            /**
             * @param {BlockVersionData} blockVersionData
             */
            (blockVersionData) => {
                let blockVersionId = blockVersionData.getId();
                if (blockVersionData.getContext() === context) {
                    blockVersionData.revert();
                    return {
                        blockVersionId: blockVersionId,
                        reverted: true
                    };
                }

                return {
                    blockVersionId: blockVersionId,
                    reverted: false
                };
            }
        );
    }

    /**
     * @param context
     * @return {boolean}
     */
    hasContextBlocksChanged(context) {
        let blockVersionList = this.findListByContext(context);
        let i, len;
        for (i = 0, len = blockVersionList.length; i < len; i++) {
            if (blockVersionList[i].hasDataChanged()) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param {string} context
     * @param {string} containerName
     * @param {string} blockVersionId
     * @return {BlockVersionData|null}
     */
    findByContextContainer(context, containerName, blockVersionId) {
        let result = this.list.find(
            /**
             * @param {BlockVersionData} blockVersionData
             * @return {boolean}
             */
            (blockVersionData) => {
                if (blockVersionData.getContext() !== context) {
                    return false;
                }

                if (blockVersionData.getContainerName() !== containerName) {
                    return false;
                }

                return (blockVersionData.getId() === blockVersionId);
            }
        );

        return (typeof result === 'undefined' ? null : result);
    }

    /**
     * @param {String} blockVersionId
     * @param {boolean} editInitialized
     */
    setEditInitialized(blockVersionId, editInitialized) {
        let blockVersionData = this.find(blockVersionId);

        if (!blockVersionData) {
            console.error('Block not found to set initialized: ' + blockVersionId, blockVersionData);
            return;
        }

        blockVersionData.setEditInitialized(editInitialized);
    }

    /**
     * @return {boolean}
     */
    hasEditInitialized() {
        let result = this.list.find(
            /**
             * @param {BlockVersionData} blockVersionData
             * @return {boolean}
             */
            (blockVersionData) => {
                return (blockVersionData.isEditInitialized() === true);
            }
        );

        return (typeof result !== 'undefined');
    }

    /**
     * @param {boolean} editInitialized
     * @return {BlockVersionData[]}
     */
    findListByEditInitialized(editInitialized = true) {
        return this.list.filter(
            /**
             * @param {BlockVersionData} blockVersionData
             * @return {boolean}
             */
            (blockVersionData) => {
                return (blockVersionData.isEditInitialized() === editInitialized);
            }
        );
    }

    /**
     * @return {boolean}
     */
    hasContextEditInitialized(context) {
        let list = this.findListByContext(context);

        let result = list.find(
            /**
             * @param {BlockVersionData} blockVersionData
             * @return {boolean}
             */
            (blockVersionData) => {
                return (blockVersionData.isEditInitialized() === true);
            }
        );

        return (typeof result !== 'undefined');
    }

    status() {
        return this.list.map(
            /** @var {BlockVersionData} */
            (blockVersionData) => {
                return blockVersionData.status();
            }
        );
    }

    /**
     * immutable copy
     *
     * @return {Object}
     */
    state() {
        return this.list.map(
            /** @var {BlockVersionData} */
            (blockVersionData) => {
                return blockVersionData.state();
            }
        );
    }
}
