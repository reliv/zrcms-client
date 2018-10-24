import React, {Component} from 'react'
import {connect} from 'react-redux'
import blocksEditInit from '../../zrcms-admin-tools/src/action/blocksEditInit'
import {CONTEXT_PAGE} from "../../zrcms-admin-tools/src/block-data/BlockVersionData";
import canEditPage from "../../zrcms-admin-tools/src/page-data/canEditPage";

class ButtonPageBlocksEdit extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this._hide = this._hide.bind(this);
    }

    handleClick() {
        this.props.dispatch(blocksEditInit(CONTEXT_PAGE));
    }

    _hide() {
        if (!canEditPage()) {
            return true;
        }

        if (!this.props.blocksEditInit.contextList) {
            return true;
        }

        return (this.props.blocksEditInit.contextList.has(CONTEXT_PAGE))
    }

    render() {
        if (this._hide()) {
            return null;
        }

        return (
            <div className="edit-button-container">
                <button className="btn btn-warning btn-xs"
                        onClick={this.handleClick}
                        disabled={this.props.loading}
                        type="button">
                    <span className="glyphicon glyphicon-edit"/>
                    <span>&nbsp;</span>
                    <span>Edit Page Blocks</span>
                </button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        renderingPublishedVersion: state.applicationState.view.renderState.renderingPublishedVersion,
        blocksEditInit: state.blocksEditInit,
        loading: state.loading,
    }
}

export default connect(mapStateToProps)(ButtonPageBlocksEdit);
