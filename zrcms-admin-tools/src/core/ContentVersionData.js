import extend from "extend";
import objectDiff from "../../../object-diff/object-diff";

export const NAME_PROPERTIES = 'properties';
export const PRIVATE_SUFFIX = '_';

export default class ContentVersionData {
    /**
     * @param {string} id
     * @param {object} properties
     * @param {string} createdByUserId
     * @param {string} createdReason
     * @param {string} createdDate
     */
    constructor(
        id,
        properties,
        createdByUserId,
        createdReason,
        createdDate,
    ) {
        this._id = (id ? id : null);
        this._properties = extend(true, {}, properties);
        this._createdByUserId = createdByUserId;
        this._createdReason = createdReason;
        this._createdDate = createdDate;

        this._initialId = (id ? id : null);
        this._initialProperties = extend(true, {}, properties);
        this._initialCreatedByUserId = createdByUserId;
        this._initialCreatedReason = createdReason;
        this._initialCreatedDate = createdDate;
    }

    isExisting() {
        return (typeof this._initialId !== null)
    }

    /**
     * @return {string}
     */
    getId() {
        return this._id;
    }

    /**
     * @return {object}
     */
    getProperties() {
        return extend(true, {}, this._properties);
    }

    /**
     * @param {object} properties
     */
    setProperties(properties) {
        // @todo make sure is object
        this._properties = extend(true, {}, properties);
    }

    /**
     * @param {string} name
     * @param {*} def
     *
     * @return {*}
     */
    findProperty(
        name,
        def = null
    ) {
        if (this.hasProperty(name)) {
            return this._properties[name];
        }

        return def;
    }

    /**
     * @param {string} name
     * @param {*} value
     */
    putProperty(
        name,
        value = null
    ) {
        this._properties[name] = value;
    }

    /**
     * @param {string} name
     */
    unsetProperty(
        name
    ) {
        delete this._properties[name];
    }

    /**
     * @param {string} name
     *
     * @return {boolean}
     */
    hasProperty(
        name
    ) {
        return (typeof this._properties[name] !== 'undefined');
    }

    /**
     * @param {string} name
     * @param {*} def
     */
    findDefaultIfEmptyProperty(
        name,
        def = null
    ) {
        if (!this._properties[name]) {
            return def;
        }

        return this._properties[name];
    }

    getCreatedByUserId() {
        return this._createdByUserId;
    }

    getCreatedReason() {
        return this._createdReason;
    }

    getCreatedDate() {
        return this._createdDate;
    }

    toSaveNewData(createdReason = null) {
        return {
            id: null,
            properties: this.getProperties(),
            createdByUserId: null,
            createdReason: createdReason,
            createdDate: null,
        };
    }

    revert() {
        this._id = this._initialId;
        this.setProperties(this._initialProperties);
        this._createdByUserId = this._initialCreatedByUserId;
        this._createdReason = this._initialCreatedReason;
        this._createdDate = this._initialCreatedDate;
    }

    /**
     * @return {boolean}
     */
    hasPropertyChanged(name) {
        return objectDiff.asBool(
            this._initialProperties[name],
            this._properties[name]
        );
    }

    /**
     * @return {boolean}
     */
    hasDataChanged() {
        let initial = {
            id: this._initialId,
            properties: this._initialProperties,
            createdByUserId: this._initialCreatedByUserId,
            createdReason: this._initialCreatedReason,
            createdDate: this._initialCreatedDate,
        };
        let current = {
            id: this._id,
            properties: this._properties,
            createdByUserId: this._createdByUserId,
            createdReason: this._createdReason,
            createdDate: this._createdDate,
        };

        return objectDiff.asBool(initial, current);
    }

    status() {
        let initial = {
            id: this._initialId,
            properties: this._initialProperties,
            createdByUserId: this._initialCreatedByUserId,
            createdReason: this._initialCreatedReason,
            createdDate: this._initialCreatedDate,
        };
        let current = {
            id: this._id,
            properties: this._properties,
            createdByUserId: this._createdByUserId,
            createdReason: this._createdReason,
            createdDate: this._createdDate,
        };

        return {
            id: this.getId(),
            initial: initial,
            current: current,
            changed: objectDiff.asBool(initial, current),
            changedData: objectDiff.asFlatObject(
                initial,
                current,
                '[' + this.getId() + ']'
            )
        };
    }

    /**
     * immutable copy
     *
     * @return {Object}
     */
    state() {
        return {
            id: this.getId(),
            properties: this.getProperties(),
            createdByUserId: this._createdByUserId,
            createdReason: this._createdReason,
            createdDate: this._createdDate,
        }
    }
}
