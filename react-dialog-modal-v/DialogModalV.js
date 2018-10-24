import React, {Component} from 'react'
import PropTypes from 'prop-types'
import extend from 'extend';
import DefaultCloseButton from './DefaultCloseButton';

import {hide, show} from './actions'

class DialogModalV extends Component {

    constructor(props, context) {
        super(props, context);

        this._onPropsChange = this._onPropsChange.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getButtons = this.getButtons.bind(this);
        this.getCloseButton = this.getCloseButton.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.renderCloseButton = this.renderCloseButton.bind(this);
        this.render = this.render.bind(this);

        this.state = {
            id: '_default',
            title: '',
            content: <span/>,
            show: false,
            buttons: [],
            closeButton: DefaultCloseButton,
            onShowAsync: null,
            onHideAsync: null,
        };

        this.props.store.subscribe(this._onPropsChange);
    }

    _onPropsChange() {
        let state = this.props.store.getState();

        // @todo Better check here, we only want to change is state.dialogModalV has changed
        if (!state.dialogModalV || JSON.stringify(state.dialogModalV) === JSON.stringify(this.state)) {
            return
        }

        // @todo Extend values to make immutable
        this.setState(
            {
                id: state.dialogModalV.id,
                title: state.dialogModalV.title,
                content: state.dialogModalV.content,
                show: state.dialogModalV.show,
                buttons: state.dialogModalV.buttons,
                closeButton: state.dialogModalV.closeButton,
                onShowAsync: state.dialogModalV.onShowAsync,
                onHideAsync: state.dialogModalV.onHideAsync,
            }
        )
    }

    handleShow(e) {
        if (this.state.onShowAsync) {
            this.state.onShowAsync(e).then(
                () => {
                    this.props.store.dispatch(show());
                }
            );

            return;
        }
        this.props.store.dispatch(show());
    }

    handleHide(e) {
        if (this.state.onHideAsync) {
            this.state.onHideAsync(e).then(
                () => {
                    this.props.store.dispatch(hide());
                }
            );

            return;
        }
        this.props.store.dispatch(hide());
    }

    handleClose(e, onClose) {
        if (typeof onClose === 'function') {
            onClose(e)
        }

        this.handleHide(e)
    }

    getButtons() {
        return this.state.buttons || [];
    }

    getCloseButton() {
        if (!this.state.closeButton) {
            return extend(true, {}, DefaultCloseButton);
        }

        return extend(true, {}, DefaultCloseButton, this.state.closeButton);
    }

    renderButtons() {
        return this.getButtons().map(
            (button, index) => {
                return this.renderButton(button, index.toString())
            }
        )
    }

    renderButton(button, key) {
        if (button.hide) {
            return (<span/>);
        }
        return (
            <button
                key={key}
                type="button"
                className={"btn btn-sm " + button.className || 'btn-default'}
                onClick={
                    button.onClick || function () {
                    }
                }
            >
                {button.content}
            </button>
        )
    }

    renderCloseButton(button, key) {
        if (button.hide) {
            return (<span/>);
        }
        return (
            <button
                key={key}
                type="button"
                className={"btn btn-sm " + button.className || 'btn-default'}
                onClick={(e) => {
                    this.handleClose(e, button.onClick)
                }}
            >
                {button.content}
            </button>
        )
    }

    renderContent() {
        if (!this.state.content) {
            return <span/>;
        }

        return this.state.content
    }

    render() {
        let self = this;

        if (!self.state.show) {
            return (<span>{/* DialogModalV hidden */}</span>);
        }

        let closeButton = self.getCloseButton();

        let closeIcon = (<span/>);

        if (!closeButton.hide) {
            closeIcon = (
                <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={this.handleHide}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            );
        }
        // @todo Fix styling
        return (
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            }}>
                <div className="modal" role="dialog" aria-hidden="true" style={{display: 'block'}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                {closeIcon}
                                <h4 className="modal-title">{self.state.title}</h4>
                            </div>
                            <div className="modal-body">
                                {self.renderContent()}
                            </div>
                            <div className="modal-footer">
                                {self.renderCloseButton(closeButton, '0-close')}
                                {self.renderButtons()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DialogModalV.propTypes = {
    store: PropTypes.object,
};

export default DialogModalV;
