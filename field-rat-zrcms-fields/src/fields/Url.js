import React from 'react'
import {Field} from '../../../../field-rat-core'
import getAutoCompletePageUrls from '../lib/getAutoCompletePageUrls'

export default class Url extends Field {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.initialValue,
            loadingAutoCompleteUrls: true,
            autoCompleteUrls: null
        };

        this.handleChange = this.handleChange.bind(this);

        getAutoCompletePageUrls().then((urls) => {
            this.setState({autoCompleteUrls: urls, loadingAutoCompleteUrls: false});
        });
    }

    /**
     * @TODO do we need to remove non-relative URLs? do we need to remove protocols and replace with "//"?
     *
     * @returns {Promise<{value}|*>}
     */
    async getValue() {
        return this.state.value;
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        if (this.state.loadingAutoCompleteUrls) {
            return <div className="UrlField-loadingAutoCompleteUrls"/> //Show nothing while loading
        }
        return <div><input {...this.props}
                           type="text"
                           value={this.state.value}
                           onChange={this.handleChange}
                           className="form-control"
                           list="autoCompleteUrls"/>
            <datalist id="autoCompleteUrls">
                {this.state.autoCompleteUrls.map(url =>
                    <option value={url}/>)}
            </datalist>
        </div>;
    }
}
