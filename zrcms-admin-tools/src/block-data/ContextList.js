import getAvailableContexts from './getAvailableContexts'

/**
 *
 */
export default class ContextList {
    /**
     * @param {Array} available
     * @param {Array} list
     */
    constructor(available = getAvailableContexts(), list = []) {
        this.available = available;
        this.list = list;
        this.getCopy = this.getCopy.bind(this);
        this.getList = this.getList.bind(this);
        this.add = this.add.bind(this);
        this.has = this.has.bind(this);
        this.hasAny = this.hasAny.bind(this);
        this.hasAll = this.hasAll.bind(this);
    }

    /**
     * @return {ContextList}
     */
    getCopy() {
        return new ContextList(this.getAvailable(), this.getList());
    }

    /**
     * @return {*[]}
     */
    getList() {
        return [...this.list];
    }

    /**
     * @return {*[]}
     */
    getAvailable() {
        return [...this.available];
    }

    /**
     * @param {String} context
     * @return {*[]}
     */
    add(context) {
        if (this.list.indexOf(context) === -1) {
            this.list.push(context);
        }
    }

    /**
     * @param {String} context
     * @return {boolean}
     */
    has(context) {
        return (this.list.indexOf(context) !== -1);
    }

    /**
     *
     * @return {Boolean}
     */
    hasAny() {
        return (this.list.length > 0);
    }

    /**
     *
     * @return {Boolean}
     */
    hasAll() {
        let index, len;
        for (index = 0, len = this.available.length; index < len; index++) {
            if (this.list.indexOf(this.available[index]) === -1) {
                return false;
            }
        }

        return true;
    }
}
