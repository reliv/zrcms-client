import React, {Component} from 'react'
import {connect} from "react-redux";
import unlockImage from './glyphicons_unlock.png'
import './style.css'
import canEditPage from "../../zrcms-admin-tools/src/page-data/canEditPage";
import {getInstance} from "./AllowedRolesFactory";
import showPageAccessPropertiesDialogModalV from './showPageAccessPropertiesDialogModalV';

class PageAccessLock extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleAllowedRolesChange = this.handleAllowedRolesChange.bind(this);
        this.hasAllowedRoles = this.hasAllowedRoles.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.renderDisabled = this.renderDisabled.bind(this);
        this.render = this.render.bind(this);
    }

    handleClick() {
        showPageAccessPropertiesDialogModalV(this.handleAllowedRolesChange);
    }

    handleAllowedRolesChange(allowedRoles) {
        this.forceUpdate();
    }

    hasAllowedRoles() {
        let allowedRoles = getInstance();
        return (allowedRoles && allowedRoles.hasAny())
    }

    renderButton() {
        if (this.hasAllowedRoles()) {
            return (
                //<!-- <lock-permissions> -->
                <button className="btn btn-default btn-xs"
                        title="Page Permissions Lock"
                        onClick={this.handleClick}>
                    <span className="glyphicon glyphicon-lock page-access-icon"/>
                </button>
                //<!-- </lock-permissions> -->
            )
        }

        return (
            //<!-- <unlock-permissions> -->
            <button className="btn btn-default btn-xs"
                    title="Page Permissions Unlock"
                    onClick={this.handleClick}>
                <img className="page-access-icon" src={unlockImage}/>
            </button>
            //<!-- </unlock-permissions> -->
        )
    }

    renderDisabled() {
        return (
            <div>
                <div className="page-access-button-container">
                    <button className="btn btn-default btn-xs"
                            disabled={true}>
                        <span className="glyphicon glyphicon-ban-circle page-access-icon"/>
                    </button>
                </div>
            </div>
        )
    }

    render() {
        let allowedRoles = getInstance();
        if (!canEditPage() || !allowedRoles) {
            return this.renderDisabled();
        }

        return (
            <div>
                <div className="page-access-button-container">
                    {this.renderButton()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let allowedRoles = getInstance();
    // This is here to force checks of the roles on state changes so we may re-render
    return {
        allowedRolesReady: (allowedRoles !== null),
    }
}

export default connect(mapStateToProps)(PageAccessLock);
