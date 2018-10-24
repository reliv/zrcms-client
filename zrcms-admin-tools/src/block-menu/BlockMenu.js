/**
 * {BlockMenu}
 */
export default class BlockMenu {
    /**
     * @param {{optionId:{title: {string}, method: {function}}} items
     */
    constructor(items) {
        this.items = {};
        if (items) {
            let optionId = null;
            for (optionId in items) {
                this.add(optionId, items[optionId]);
            }
        }
    }

    add(optionId, params) {
        if (typeof params.title !== 'string') {
            console.error('title must be string for block menu: ', params);
            return;
        }
        if (typeof params.method !== 'function') {
            console.error('method must be function for block menu: ', params);
            return;
        }

        this.items[optionId] = params;
    }

    getItems() {
        return this.items;
    }
}
