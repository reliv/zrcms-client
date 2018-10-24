import React, {Component} from 'react'
import {connect} from 'react-redux'
import blocksEditInit from '../../zrcms-admin-tools/src/action/blocksEditInit'
import {CONTEXT_SITE} from "../../zrcms-admin-tools/src/block-data/BlockVersionData";
import canEditPage from "../../zrcms-admin-tools/src/page-data/canEditPage";

class ButtonSiteBlocksEdit extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick() {
        this.props.dispatch(blocksEditInit(CONTEXT_SITE));
    }

    _hide() {
        if (!canEditPage()) {
            return true;
        }

        if (!this.props.blocksEditInit.contextList) {
            return true;
        }

        return (this.props.blocksEditInit.contextList.has(CONTEXT_SITE));
    }

    render() {
        if (this._hide()) {
            return null;
        }

        return (
            <div className="edit-site-blocks-button-container">
                <button className="btn btn-warning btn-xs"
                        onClick={this.handleClick}
                        disabled={this.props.loading}
                        type="button">
                    <span className="glyphicon glyphicon-globe"/>
                    <span>&nbsp;</span>
                    <span>Edit Site Blocks</span>
                </button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        blocksEditInit: state.blocksEditInit,
        loading: state.loading,
        renderingPublishedVersion: state.applicationState.view.renderState.renderingPublishedVersion
    }
}

export default connect(mapStateToProps)(ButtonSiteBlocksEdit);
