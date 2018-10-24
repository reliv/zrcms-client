export const VALUE_CREATED = 'created';
export const VALUE_UPDATED = 'updated';
export const VALUE_DELETED = 'deleted';
export const VALUE_UNCHANGED = 'unchanged';

/**
 * {ObjectDiff}
 */
export class ObjectDiff {
    /**
     * @param {*} obj1
     * @param {*} obj2
     * @return {Object}
     */
    asMapObject(obj1, obj2) {
        if (this.isFunction(obj1) || this.isFunction(obj2)) {
            throw 'Invalid argument. Function given, object expected.';
        }

        if (this.isValue(obj1) || this.isValue(obj2)) {
            return {
                type: this.compareValues(obj1, obj2),
                data: JSON.stringify(obj1)
            };
        }

        let diff = {};
        for (let key in obj1) {
            if (this.isFunction(obj1[key])) {
                continue;
            }

            let value2 = undefined;
            if ('undefined' !== typeof(obj2[key])) {
                value2 = obj2[key];
            }

            diff[key] = this.asMap(obj1[key], value2);
        }

        for (let key in obj2) {
            if (this.isFunction(obj2[key]) || ('undefined' !== typeof(obj1[key]))) {
                continue;
            }

            diff[key] = this.asMap(undefined, obj2[key]);
        }

        return diff;
    }

    /**
     * @param {*} obj1
     * @param {*} obj2
     * @param {String} keyName
     * @param {Object} result
     * @param {Boolean} changedOnly
     * @return {Object}
     */
    asFlatObject(obj1, obj2, keyName = '[root]', result = {}, changedOnly = true) {
        if (this.isFunction(obj1) || this.isFunction(obj2)) {
            throw 'Invalid argument. Function given, object expected.';
        }

        if (this.isValue(obj1) || this.isValue(obj2)) {
            let changeType = this.compareValues(obj1, obj2);

            if (changedOnly && changeType === VALUE_UNCHANGED) {
                return result
            }
            result[keyName] = this.compareValues(obj1, obj2);
            return result
        }

        let keyName1, keyName2;
        for (let key in obj1) {
            keyName1 = keyName + '.' + key;
            if (this.isFunction(obj1[key])) {
                continue;
            }

            let value2 = undefined;
            if ('undefined' !== typeof(obj2[key])) {
                value2 = obj2[key];
            }

            result = this.asFlatObject(obj1[key], value2, keyName1, result, changedOnly);
        }

        for (let key in obj2) {
            keyName2 = keyName + '.' + key;
            if (this.isFunction(obj2[key]) || ('undefined' !== typeof(obj1[key]))) {
                continue;
            }

            result = this.asFlatObject(undefined, obj2[key], keyName2, result, changedOnly);
        }

        return result;
    }

    /**
     * @param {*} obj1
     * @param {*} obj2
     * @return {Boolean}
     */
    asBool(obj1, obj2) {
        if (this.isFunction(obj1) || this.isFunction(obj2)) {
            throw 'Invalid argument. Function given, object expected.';
        }

        if (this.isValue(obj1) || this.isValue(obj2)) {
            return this.valuesDifferent(obj1, obj2);
        }

        let diff = false;

        for (let key in obj1) {
            if (this.isFunction(obj1[key])) {
                continue;
            }

            let value2 = undefined;
            if ('undefined' !== typeof(obj2[key])) {
                value2 = obj2[key];
            }

            if (this.asBool(obj1[key], value2)) {
                diff = true;
            }
        }

        for (let key in obj2) {
            if (this.isFunction(obj2[key]) || ('undefined' !== typeof(obj1[key]))) {
                continue;
            }

            if (this.asBool(undefined, obj2[key])) {
                diff = true;
            }
        }

        return diff;
    }

    valuesDifferent(value1, value2) {
        return this.compareValues(value1, value2) !== VALUE_UNCHANGED;
    }

    compareValues(value1, value2) {
        if (value1 === value2) {
            return VALUE_UNCHANGED;
        }
        if ('undefined' === typeof(value1)) {
            return VALUE_CREATED;
        }
        if ('undefined' === typeof(value2)) {
            return VALUE_DELETED;
        }

        return VALUE_UPDATED;
    }

    isFunction(obj) {
        return 'function' === typeof(obj);
    }

    isValue(obj) {
        if (obj === null) {
            return true;
        }
        return ('object' !== typeof(obj)) && ('array' !== typeof(obj));
    }
}

export default new ObjectDiff();
