import React, {Component} from 'react'
import {connect} from 'react-redux'
import buildPageRevisionLinkList from './buildPageRevisionLinkList'
import './page-revision-list.css'
import canEditPage from "../../zrcms-admin-tools/src/page-data/canEditPage"; //Is used. Do not remove.

export class PageRevisionList extends Component {
    constructor(props) {
        super(props);
    }

    renderLink(link) {
        return <a href={link.attributes.href} title={link.attributes.title}>{link.content}</a>
    }

    renderButton(link) {
        if (!link) {
            return this.renderNotAvailable();
        }

        return (
            <button className="btn btn-default btn-xs dropdown-toggle"
                    type="button"
                    title={link.attributes.title}
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
            >
                <span className="selected-page-version">{link.content}</span>
                <span>&nbsp;</span>
                <span className="caret"/>
            </button>
        );
    }

    renderNotAvailable() {
        return (
            <button className="btn btn-default btn-xs"
                    type="button"
                    title="Not Available"
                    data-toggle="dropdown"
                    disabled={true}>
                <span className="selected-page-version">Not an Editable Page or No Version Available</span>
            </button>
        );
    }

    renderLoading() {
        return (
            <button className="btn btn-default btn-xs"
                    type="button"
                    title="Loading"
                    data-toggle="dropdown"
                    disabled={true}>
                <span className="selected-page-version">loading...</span>
            </button>
        );
    }

    render() {
        if (!canEditPage()) {
            return this.renderNotAvailable();
        }

        if (!this.props.adminToolsInit.ready || this.props.loading) {
            return this.renderLoading();
        }

        let pageRevisionLinkList = buildPageRevisionLinkList(
            this.props.applicationState,
            this.props.adminToolsInit.pageDrafts
        );

        if (!pageRevisionLinkList || !pageRevisionLinkList.hasData) {
            return this.renderNotAvailable();
        }

        let selectedIndex = 0;

        return (
            <div className="page-revision-list-container">
                <div className="dropdown">
                    {this.renderButton(pageRevisionLinkList.rendered)}
                    <ul className="dropdown-menu" role="menu" aria-labelledby="revisionsList">
                        {
                            pageRevisionLinkList.available.map(
                                (link, index) => {
                                    return (
                                        <li key={index.toString()} role="presentation">
                                            {this.renderLink(link)}
                                        </li>
                                    );
                                }
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        adminToolsInit: state.adminToolsInit,
        loading: state.loading,
        applicationState: state.applicationState,
    }
}

export default connect(mapStateToProps)(PageRevisionList);
