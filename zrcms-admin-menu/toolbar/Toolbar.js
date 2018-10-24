import React, {Component} from 'react'
import {connect} from 'react-redux'
import HtmlEditor2Toolbar from '../../html-editor-2/src/HtmlEditor2Toolbar'
import TagComponent from '../../html-tag/src/TagComponent'
import css from './toolbar.css'

(css); // Required for build

class Toolbar extends Component {
    constructor(props) {
        super(props);
    }

    isActive() {
        return (this.props.toolBarActive && !this.props.loading)
    }

    getToolbarTags() {
        let toolbar = this.props.toolBar;

        if (!toolbar) {
            return [];
        }

        return toolbar.getList();
    }

    getActiveClass() {
        return (this.isActive() ? ' active' : '');
    }

    render() {
        let activeClass = this.getActiveClass();
        let toolbarTags = this.getToolbarTags();

        return (
            <div className={"admin-menu-toolbar" + activeClass}>
                <div className="admin-menu-toolbar-content">
                    {
                        toolbarTags.map(
                            /**
                             * @param {Tag} tag
                             */
                            (tag) => {
                                return (<div className="admin-menu-toolbar-item">
                                    <TagComponent tag={tag}/>
                                </div>)
                            }
                        )
                    }
                    <div className="admin-menu-toolbar-item html-editor"><HtmlEditor2Toolbar/></div>
                </div>
                <div className="admin-menu-toolbar-cover">
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        toolBarActive: state.blockToolbar.toolBarActive,
        toolBar: state.blockToolbar.toolBar,
        loading: state.loading,
    }
}

export default connect(mapStateToProps)(Toolbar);
