import React, {Component} from 'react'
import {angularCompileElement} from '../../angular-utilities/src/angularCompile'

export default class HtmlEditor2Toolbar extends Component {
    //@TODO get menu config from application state
    constructor(props) {
        super(props);
        this.element = null;
        this.state = {};
        this.onAfterRender = this.onAfterRender.bind(this);
    }

    onAfterRender() {
        angularCompileElement(
            this.element
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

    render() {
        return (
            <div ref={(element) => {
                this.element = element;
            }}>
                <html-editor-toolbar
                    html-editor-toolbar-toggle="false"
                    html-editor-toolbar-default-skin="lightgray"
                >
                    <div className="htmlEditorToolbar">
                        [html-editor-toolbar-2 missing]
                    </div>
                </html-editor-toolbar>
            </div>
        )
    }
}

HtmlEditor2Toolbar.propTypes = {};
