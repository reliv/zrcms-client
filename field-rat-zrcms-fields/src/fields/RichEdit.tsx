import flatten from 'lodash/flatten';
import React, { FormEvent } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import sanitizeHtml from 'sanitize-html'
import { Field, FieldProps } from 'field-rat-core'
import colors from 'reliv-styles/colors'

interface Props extends FieldProps<string> { }

interface State {
    value: string;
}

const TINYMCE_OPTIONS = {
    plugins: 'code textcolor link autoresize',
    toolbar: 'code | undo redo | cut copy paste | styleselect | forecolor bold italic underline strikethrough superscript subscript | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link unlink anchor | removeformat',
    menubar: false,
    branding: false,
    statusbar: false,
    textcolor_map:
        flatten(colors.map(({ value, text }) => [value.slice(1), text]))
};

const SANITIZE_OPTIONS = {
    allowedTags: [
        'b', 'i', 'em', 'strong', 'a', 'span', 'div', 'p',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'hr', 'br', 'img', 'sub', 'sup'
    ],
    allowedAttributes: false
}

export default class RichEdit extends Field<string, {}, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            value: sanitizeHtml(this.props.initialValue, SANITIZE_OPTIONS)
        }
        this.handleChange = this.handleChange.bind(this);
    }

    async getValue() {
        return sanitizeHtml(this.state.value, SANITIZE_OPTIONS);
    }

    handleChange(e: any) {
        this.setState({ value: e.target.getContent() });
    }

    render() {
        return <Editor
            initialValue={this.state.value}
            onChange={this.handleChange}
            init={TINYMCE_OPTIONS}
        />;
    }
}

