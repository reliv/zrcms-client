import React, {Component} from 'react'
import BlockComponentsAvailable from './BlockComponentsAvailable'
import {Provider} from 'react-redux'
import getStore from '../../../zrcms-admin-tools/src/redux/getStore'

export default class BlockComponentsAvailableApp extends Component {
    render() {
        let store = getStore();
        return (<Provider store={store}><BlockComponentsAvailable/></Provider>)
    }
}
