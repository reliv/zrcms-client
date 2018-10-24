const richEditAttribute = 'data-richEdit';
const textEditAttribute = 'data-textEdit';

/**
 * @param {jQuery.element} blockElement
 * @return {{}}
 */
export default function(blockElement) {
    let richEditors = blockElement.find('[' + richEditAttribute + ']');
    let textEditors = blockElement.find('[' + textEditAttribute + ']');

    let editorElements = {};

    richEditors.each(
        function (index) {
            editorElements[jQuery(this).attr(richEditAttribute)] = this;
        }
    );

    textEditors.each(
        function (index) {
            editorElements[jQuery(this).attr(textEditAttribute)] = this;
        }
    );

    return editorElements;
}
