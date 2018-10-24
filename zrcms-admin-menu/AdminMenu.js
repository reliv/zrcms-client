import React, {Component} from 'react'
import NavigationMenu from './navigation-menu/NavigationMenu'
import AdminMenuButtons from './menu-buttons/AdminMenuButtons'
import Toolbar from './toolbar/Toolbar'
import getConfig from '../../config-rat/src/getConfig'
import {connect} from 'react-redux'
import './style.css'

class AdminMenu extends Component {

    constructor(props) {
        super(props);
        const config = getConfig();
        this.state = {links: config['zrcms-admin-menu']['links']};
    }

    render() {
        // @todo We are dual rendering, this can be accomplished with js to fix height issue
        return (
            <div>
                <div className="zrcms-admin-panel rcmAdminPanelWrapper fixed">
                    <div className="container-fluid">
                        <div className="row zrcms-admin-panel-nav">
                            <div className="col-sm-6 zrcms-admin-menu-col rcm-admin-menu-nav-col">
                                <NavigationMenu menuConfig={this.state.links}/>
                            </div>
                            <div className="col-sm-6 zrcms-admin-menu-col rcm-admin-menu-nav-col">
                                <div style={{'float': 'right'}}>
                                    <AdminMenuButtons/>
                                </div>
                            </div>
                        </div>
                        <div className="row zrcms-admin-panel-editor-toolbar">
                            <div className="col-sm-12 zrcms-admin-menu-col rcm-admin-menu-toolbar">
                                <Toolbar/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="zrcms-admin-panel rcmAdminPanelWrapper not-shown">
                    <div className="container-fluid">
                        <div className="row zrcms-admin-panel-nav">
                            <div className="col-sm-6 zrcms-admin-menu-col rcm-admin-menu-nav-col">
                                <NavigationMenu menuConfig={this.state.links}/>
                            </div>
                            <div className="col-sm-6 zrcms-admin-menu-col rcm-admin-menu-nav-col">
                                <div style={{'float': 'right'}}>
                                    <AdminMenuButtons/>
                                </div>
                            </div>
                        </div>
                        <div className="row zrcms-admin-panel-editor-toolbar">
                            <div className="col-sm-12 zrcms-admin-menu-col rcm-admin-menu-toolbar">
                                <Toolbar/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        applicationState: state.applicationState
    }
}

export default connect(mapStateToProps)(AdminMenu)
