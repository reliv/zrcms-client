import React, {Component} from 'react'

export default class PageAccessLock extends Component {
    render() {
        let VariableTag = this.props.data.tag;
        if (!VariableTag) {
            VariableTag = 'a'; //Is used in JSX. Do not remove.
        }
        return <div>
            <VariableTag {...this.props.data.props}>{this.props.data.text}</VariableTag>
            {
                this.props.data.children && <NavMenuTagCollection data={this.props.data.children}/>
            }
        </div>
    }
}
