/**
 * {Tags}
 */
export default class Tags {
    constructor(tags) {
        this.tags = [];
        this.setList = this.setList.bind(this);
        this.getList = this.getList.bind(this);
        this.append = this.append.bind(this);
        this.prepend = this.prepend.bind(this);
        if(tags) {
            this.setList(tags);
        }
    }

    /**
     * @param {Tag[]} tags
     */
    setList(tags) {
        this.tags = [];
        let index, len;
        for (index = 0, len = tags.length; index < len; index++) {
            this.append(tags[index]);
        }
    }

    /**
     * @return {Tag[]}
     */
    getList() {
        return this.tags;
    }

    /**
     * @param {Tag} tag
     */
    append(tag) {
        this.tags.push(tag);
    }

    /**
     * @param {Tag} tag
     */
    prepend(tag) {
        this.tags.unshift(tag)
    }
}
