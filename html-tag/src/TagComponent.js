import React, {Component} from 'react'

export default class TagComponent extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * @return {Tag}
     */
    getTag() {
        return this.props.tag;
    }

    render() {
        let tag = this.getTag();

        if (!tag) {
            return null;
        }

        return React.createElement(
            tag.getTag(),
            tag.getAttributes(),
            tag.getContent()
        );
    }
}
