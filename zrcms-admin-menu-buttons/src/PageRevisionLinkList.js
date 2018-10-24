export default class PageRevisionLinkList {
    constructor() {
        /**
         * @type {Tag|null}
         */
        this.rendered = null;

        this.index = {};

        /**
         * @type {Tag[]}
         */
        this.available = [];
    }

    hasData() {
        return (this.rendered !== null);
    }

    /**
     * @param {String} id
     * @param {Tag} tag
     */
    setRendered(id, tag) {
        this.rendered = tag;
    }

    /**
     * @param {String} id
     * @param {Tag} tag
     */
    addAvailable(id, tag) {
        if (this.index[id] !== undefined) {
            // no duplicates
            return;
        }
        this.index[id] = this.available.length;

        this.available.push(
            tag
        );
    }

    getAvailable() {
        return this.available;
    }
}
