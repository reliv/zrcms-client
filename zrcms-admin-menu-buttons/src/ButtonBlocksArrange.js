import React, {Component} from 'react'
import {connect} from 'react-redux'
import blocksArrangeInit from '../../zrcms-admin-tools/src/action/blocksArrangeInit'
import {CONTEXT_PAGE, CONTEXT_SITE} from "../../zrcms-admin-tools/src/block-data/BlockVersionData";
import canEditPage from "../../zrcms-admin-tools/src/page-data/canEditPage"

class ButtonBlocksArrange extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.dispatch(blocksArrangeInit(CONTEXT_PAGE));
        this.props.dispatch(blocksArrangeInit(CONTEXT_SITE));
    }

    _hide() {
        if (!canEditPage()) {
            return true;
        }

        if (!this.props.blocksArrangeInit.contextList) {
            return true;
        }

        return (this.props.blocksArrangeInit.contextList.hasAll())
    }

    render() {
        if (this._hide()) {
            return null;
        }

        return (
            <div className="edit-blocks-arrange-button-container">
                <button className="btn btn-warning btn-xs"
                        onClick={this.handleClick}
                        disabled={this.props.loading}
                        type="button">
                    <span className="glyphicon glyphicon-move"/>
                    <span>&nbsp;</span>
                    <span>{this.props.label}</span>
                </button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        blocksArrangeInit: state.blocksArrangeInit,
        loading: state.loading,
        renderingPublishedVersion: state.applicationState.view.renderState.renderingPublishedVersion
    }
}

export default connect(mapStateToProps)(ButtonBlocksArrange);
