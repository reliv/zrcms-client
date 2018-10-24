import React, {Component} from 'react'
import Tag from './Tag'

export default class TagsComponent extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * @return {Tags}
     */
    getTags() {
        return this.props.tags;
    }

    render() {
        let tags = this.getTags();

        if (!tags) {
            return null;
        }

        return (
            <div>
                {
                    tags.getList().map(
                        (tag) => {
                            return <Tag tag={tag}/>
                        }
                    )
                }
            </div>
        );
    }
}
