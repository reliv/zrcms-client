import React, {Component} from 'react'
import PropTypes from 'prop-types'
import NavMenuTagCollection from './NavMenuTagCollection'
import './style.css'

export default class NavigationMenu extends Component {
    render() {
        return <div className="zrcms-admin-navigation">
            <NavMenuTagCollection data={this.props.menuConfig}/>
        </div>
    }
}

NavigationMenu.propTypes = {
    menuConfig: PropTypes.array.isRequired,
};
