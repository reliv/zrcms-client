import React, {Component} from 'react'
import {Provider} from 'react-redux'
import getStore from './getStore'
import AdminMenu from '../../../zrcms-admin-menu/AdminMenu'
import adminToolsInit from '../action/adminToolsInit'

const store = getStore();

export default class ZrcmsAdminTools extends Component {
    render() {

        store.dispatch(adminToolsInit());
        return (<Provider store={store}><AdminMenu/></Provider>)
    }
}
