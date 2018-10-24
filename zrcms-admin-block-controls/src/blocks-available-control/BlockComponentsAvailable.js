import React, {Component} from 'react'
import {connect} from 'react-redux'
import './block-components-available.css'
import getBlockComponentsAvailable from '../../../zrcms-admin-tools/src/block-component/getBlockComponentsAvailable'
import noBlockIcon from './no-block-icon.png'
import dragElement from './dragElement'

class BlockComponentsAvailable extends Component {
    /**
     * @param props
     */
    constructor(props) {
        super(props);
        this.handleHide = this.handleHide.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getToggleClass = this.getToggleClass.bind(this);
        this.filter = this.filter.bind(this);
        this.onAfterRender = this.onAfterRender.bind(this);
        this.getList = this.getList.bind(this);
        this.getIconPath = this.getIconPath.bind(this);

        this.state = {
            list: this.buildList(),
            collapse: false
        };

        this.initializeListShow();
    }

    buildList() {
        let blockComponentsAvailable = getBlockComponentsAvailable();

        if (!blockComponentsAvailable) {
            console.error('blockComponentsAvailable.list not available');
            return [];
        }

        // get copy
        return blockComponentsAvailable.list.filter(
            (blockComponent) => {
                return (!blockComponent.properties.disabled)
            }
        )
    }

    getList() {
        return this.state.list;
    }

    setList(list) {
        this.setState(
            {list: list}
        );
    }

    getIconPath(blockComponent) {
        // @todo @bc new paths can be determined server side thru url
        if (blockComponent.properties.renderer == 'bc') {
            return (blockComponent.properties.icon ? blockComponent.properties.icon : noBlockIcon);
        }
        return (blockComponent.properties.icon ? '/zrcms/component/block/' + blockComponent.name + '/icon.png' : noBlockIcon);
    }

    onAfterRender() {
        let dragElements = document.getElementsByClassName('admin-tools-block-components-available');
        if (!dragElements.length) {
            return;
        }
        dragElement(
            dragElements[0]
        );
    }

    componentDidMount() {
        setTimeout(
            () => {
                this.onAfterRender()
            }
        )
    }

    componentDidUpdate() {
        setTimeout(
            () => {
                this.onAfterRender()
            }
        )
    }

    getToggleClass() {
        return this.state.collapse ? ' hide-list' : ' show-list';
    }

    handleHide(event) {
        this.setState({collapse: !this.state.collapse});
    }

    handleChange(event) {
        this.filter(event.target.value);
    }

    initializeListShow() {
        let list = this.getList();

        this.setList(
            list.map(
                (blockComponent) => {
                    blockComponent.show = true;
                    return blockComponent;
                }
            )
        );
    }

    /**
     * @param search
     * @return {array}
     */
    filter(search) {
        let list = this.getList();

        if (!search) {
            this.initializeListShow();

            return;
        }

        let regex = new RegExp(search, 'i');

        this.setList(
            list.map(
                (blockComponent) => {
                    blockComponent.show = (
                        regex.test("" + blockComponent.properties.name)
                        || regex.test("" + blockComponent.properties.label)
                        || regex.test("" + blockComponent.properties.description)
                        || regex.test("" + blockComponent.properties.category)
                    );

                    return blockComponent;
                }
            )
        );
    }

    renderBlock(blockComponent, iconPath) {
        return (
            <div className="block-component-item block-components-item-drag panel-inner"
                 data-block-available-name={blockComponent.name}
                 data-show={(blockComponent.show === true ? 'true' : 'false')}>
                <div className="block-component-info">
                    <div className="block-component-image">
                        <img src={iconPath}/>
                    </div>

                    <div className="block-component-label"
                         title={blockComponent.properties.description + ' (' + blockComponent.properties.name + ')'}
                    >
                        {blockComponent.properties.label}
                    </div>
                </div>

                <div style={{display: 'none'}}>
                    <div className="block-component-info-drag" data-block-id="">
                        <div className="block-component-label"
                             title={blockComponent.properties.description + ' (' + blockComponent.properties.name + ')'}
                        >
                            [loading: {blockComponent.properties.label}]
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        let list = this.getList();
        let show = this.props.show;
        let getIconPath = this.getIconPath;
        return (
            <div className="admin-tools-block-components-available-container">
                <div className="admin-tools-block-components-available panel panel-default" data-show={show}>
                    <div className="panel-heading">
                        <form className="panel-heading-search form-inline">
                            <div className="form-group">
                                <div className="panel-minify">
                                    {this.state.collapse &&
                                    <span onClick={this.handleHide} className="glyphicon glyphicon-collapse-down"/>}
                                    {!this.state.collapse &&
                                    <span onClick={this.handleHide} className="glyphicon glyphicon-collapse-up"/>}
                                </div>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="admin-tools-block-components-available-search form-control input-sm"
                                    onChange={this.handleChange}
                                    placeholder="Search Available Blocks"
                                />
                            </div>
                        </form>
                    </div>
                    <div className={"panel-body" + this.getToggleClass()}>
                        <div>
                            {
                                list.map(
                                    (blockComponent) => {
                                        return this.renderBlock(
                                            blockComponent,
                                            getIconPath(blockComponent)
                                        );
                                    }
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.loading,
        show: state.blocksAvailableControl.show,
    }
}

export default connect(mapStateToProps)(BlockComponentsAvailable);
