import React, {Component} from 'react'
import {connect} from 'react-redux'
import pageEditCancel from '../../zrcms-admin-tools/src/action/pageEditCancel'
import canEditPage from "../../zrcms-admin-tools/src/page-data/canEditPage";

class ButtonCancel extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this._hide = this._hide.bind(this);
    }


    handleClick() {
        this.props.dispatch(pageEditCancel(this.props.applicationState));
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
            <div className="cancel-button-container">
                <button className="btn btn-default btn-xs"
                        onClick={this.handleClick}
                        disabled={this.props.loading}
                        type="button">
                    <span className="glyphicon glyphicon-remove"/>
                    <span>&nbsp;</span>
                    <span>Cancel</span>
                </button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        applicationState: state.applicationState,
        renderingPublishedVersion: state.applicationState.view.renderState.renderingPublishedVersion,
        blocksEditInit: state.blocksEditInit,
        loading: state.loading
    }
}

export default connect(mapStateToProps)(ButtonCancel);
