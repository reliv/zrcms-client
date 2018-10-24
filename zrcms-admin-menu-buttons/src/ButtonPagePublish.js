import React, {Component} from 'react'
import {connect} from 'react-redux'
import pagePublish from '../../zrcms-admin-tools/src/action/pagePublish'
import canEditPage from "../../zrcms-admin-tools/src/page-data/canEditPage";

class ButtonPagePublish extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this._hide = this._hide.bind(this);
    }

    handleClick() {
        this.props.dispatch(
            pagePublish(
                this.props.pageVersionId,
                this.props.targetPageCmsResourceId
            )
        );
    }

    _hide() {
        if (!canEditPage()) {
            return true;
        }
        // Only hide when rendering the published version
        if (this.props.renderingPublishedVersion) {
            return true;
        }

        // @todo this is wrong
        return (this.props.blocksEditInit.contextList && this.props.blocksEditInit.contextList.hasAny());
    }

    render() {
        if (this._hide()) {
            return null;
        }

        return (
            <div className="publish-button-container">
                <button className="btn btn-primary btn-xs"
                        disabled={this.props.loading}
                        onClick={this.handleClick}
                        type="button">
                    <span className="glyphicon glyphicon-check"/>
                    <span>&nbsp;</span>
                    <span>Publish</span>
                </button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.loading,
        renderingPublishedVersion: state.applicationState.view.renderState.renderingPublishedVersion,
        targetPageCmsResourceId: state.applicationState.view.pageRequested.id,
        pageVersionId: state.applicationState.view.page.contentVersionId,
        blocksEditInit: state.blocksEditInit,
    }
}

export default connect(mapStateToProps)(ButtonPagePublish);
