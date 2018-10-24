import React, {Component} from 'react'
import {connect} from 'react-redux'
import pageDraftSave from '../../zrcms-admin-tools/src/action/pageDraftSave'
import canEditPage from "../../zrcms-admin-tools/src/page-data/canEditPage";

class ButtonPageSaveDraft extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this._hide = this._hide.bind(this);
    }

    handleClick() {
        this.props.dispatch(pageDraftSave(this.props.applicationState))
    }

    _hide() {
        if (!canEditPage()) {
            return true;
        }

        if (!this.props.blocksEditInit.contextList) {
            return true;
        }

        return (!this.props.blocksEditInit.contextList.hasAny())
    }

    render() {
        if (this._hide()) {
            return null;
        }

        return (
            <div className="save-button-container">
                <button className="btn btn-primary btn-xs"
                        disabled={this.props.loading}
                        onClick={this.handleClick}
                        type="button">
                    <span className="glyphicon glyphicon-ok"/>
                    <span>&nbsp;</span>
                    <span>Save Draft</span>
                </button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.loading,
        applicationState: state.applicationState,
        renderingPublishedVersion: state.applicationState.view.renderState.renderingPublishedVersion,
        blocksEditInit: state.blocksEditInit,
    }
}

export default connect(mapStateToProps)(ButtonPageSaveDraft);
