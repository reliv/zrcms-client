import React, {Component} from 'react'
import {connect} from 'react-redux'
import {actionBlocksAvailableControlToggle} from './actionBlocksAvailableControl'

class BlockComponentsAvailableToggleButton extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.dispatch(actionBlocksAvailableControlToggle());
    }

    render() {
        if (!this.props.blocksArrangeInit.contextList.hasAll()) {
            return null;
        }

        return (
            <div className="block-components-available-toggle-button-container">
                <button className="btn btn-default btn-xs"
                        onClick={this.handleClick}
                        disabled={this.props.loading}
                        type="button"
                        title="Blocks Available Toggle">
                    {this.props.show && <span className="glyphicon glyphicon-eye-open"/>}
                    {!this.props.show && <span className="glyphicon glyphicon-eye-close"/>}
                    {/*<span>&nbsp;</span>*/}
                    {/*<span>Blocks</span>*/}
                </button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        blocksArrangeInit: state.blocksArrangeInit,
        loading: state.loading,
        show: state.blocksAvailableControl.show
    }
}

export default connect(mapStateToProps)(BlockComponentsAvailableToggleButton);
