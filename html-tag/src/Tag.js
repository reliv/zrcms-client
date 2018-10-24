export default class Tag {
    /**
     * @param {String} tag
     * @param {String} content
     * @param {Object} attributes
     */
    constructor(tag, content, attributes) {
        this.tag = null;
        this.content = null;
        this.attributes = {};
        this.setTag = this.setTag.bind(this);
        this.getTag = this.getTag.bind(this);
        this.setContent = this.setContent.bind(this);
        this.getContent = this.getContent.bind(this);
        this.setAttributes = this.setAttributes.bind(this);
        this.getAttributes = this.getAttributes.bind(this);
        this.addAttribute = this.addAttribute.bind(this);
        this.removeAttribute = this.removeAttribute.bind(this);
        this.getAttribute = this.getAttribute.bind(this);
        this.setTag(tag);
        this.setContent(content);
        this.setAttributes(attributes)
    }

    /**
     * @param {String} tag
     */
    setTag(tag) {
        this.tag = String(tag);
    }

    /**
     * @return {String}
     */
    getTag() {
        return this.tag
    }

    /**
     *
     * @param {String} content
     */
    setContent(content) {
        this.content = String(content);
    }

    /**
     * @return {String}
     */
    getContent() {
        return this.content;
    }

    /**
     * @param {Object} attributes
     */
    setAttributes(attributes) {
        this.attributes = {};
        let name;
        for (name in attributes) {
            this.addAttribute(name, attributes[name]);
        }
    }

    /**
     * @return {Object}
     */
    getAttributes() {
        return this.attributes;
    }

    /**
     * @param {String} name
     * @param {String} value
     */
    addAttribute(name, value) {
        this.attributes[name] = String(value);
    }

    /**
     *
     * @param {String} name
     */
    removeAttribute(name) {
        delete this.attributes[name];
    }

    /**
     * @param {String} name
     * @param {*} def
     * @return {*}
     */
    getAttribute(name, def) {
        if (typeof this.attributes[name] === 'undefined') {
            return def;
        }
        return this.attributes[name];
    }
}
