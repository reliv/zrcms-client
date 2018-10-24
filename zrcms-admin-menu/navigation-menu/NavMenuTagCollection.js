import React, {Component} from 'react'
import PropTypes from 'prop-types'
import NavMenuTag from './NavMenuTag'

export default class NavMenuTagCollection extends Component {
    //@TODO get menu config from application state
    render() {
        return <ul>
            {
                this.props.data.map(
                    (data, index) => {
                        return (<li key={index.toString()}><NavMenuTag data={data}/></li>);
                    }
                )
            }
        </ul>
    }
}

NavMenuTagCollection.propTypes = {
    data: PropTypes.array.isRequired
};
