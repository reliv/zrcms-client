import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setToolbar, setToolbarActive} from '../../zrcms-admin-tools/src/action/blockToolbar'
import Toolbar from "../../zrcms-admin-tools/src/toolbar/Toolbar";
import Tag from "../../html-tag/src/Tag";

class ToolbarTest extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickSet = this.handleClickSet.bind(this);
    }


    handleClick() {
        this.props.dispatch(setToolbarActive(!this.props.toolBarActive));
    }

    handleClickSet() {
        let tags = [
            new Tag(
                'test',
                'My Test Tag',
                {'data-test': 'testValue'}
            ),
            new Tag(
                'button',
                'My Test button', {
                    'data-test': 'testValue',
                    'className': 'btn btn-default',
                }
            ),
        ];
        let toolbar = new Toolbar(tags);

        this.props.dispatch(setToolbar(toolbar));
    }

    render() {
        return (
            <div className="toolbar-test-button-container">
                <button className="btn btn-default btn-xs"
                        onClick={this.handleClick}
                        disabled={this.props.loading}
                        type="button">
                    <span>Toggle Toolbar</span>
                </button>
                <button className="btn btn-default btn-xs"
                        onClick={this.handleClickSet}
                        disabled={this.props.loading}
                        type="button">
                    <span>Test Toolbar</span>
                </button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        toolBarActive: state.blockToolbar.toolBarActive,
        loading: state.loading
    }
}

export default connect(mapStateToProps)(ToolbarTest);
