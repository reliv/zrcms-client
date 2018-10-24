import React from 'react'
import {Field} from '../../../../field-rat-core'

export default class Image extends Field {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.initialValue
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleBrowseClick = this.handleBrowseClick.bind(this);
    }

    /**
     * @TODO do we need to remove non-relative URLs? do we need to remove protocols from URLs and replace with "//"?
     *
     * @returns {Promise<{value}|*>}
     */
    async getValue() {
        return this.state.value;
    }

    handleBrowseClick() {
        if (typeof window.rcmFileChooser === 'undefined') {
            throw 'window.rcmFileChooser is undefined.';
        }
        window.rcmFileChooser.chooseFile(
            newPath => this.setState({value: newPath}),
            this.state.value
        );
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return <div className="clearfix">
            <div className="input-group">
                <input {...this.props}
                       type="text"
                       value={this.state.value}
                       onChange={this.handleChange}
                       className="form-control"
                       list="autoCompleteUrls"/>
                <span className="input-group-btn">
                    <button className="btn btn-default"
                            type="button"
                            onClick={this.handleBrowseClick}>
                        <span className=" glyphicon glyphicon-folder-open" aria-hidden="true"/>
                    </button>
                </span>
            </div>
            <img src={this.state.value} style={{maxHeight: '5em', maxWidth: '80%', paddingTop: '5px'}}/>
        </div>
    }
}
