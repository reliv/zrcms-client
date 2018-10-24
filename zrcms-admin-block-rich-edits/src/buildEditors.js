import {angularCompileElement} from "../../angular-utilities/src/angularCompile";

/**
 * @todo This uses jQuery to build a tag for an angular directive... make this simple
 *
 * @param blockVersionData
 * @param editorElements
 * @return {boolean}
 */
export default function(blockVersionData, editorElements) {
    /*
     <div id="myEditorId"
     rcm-html-edit="something"
     html-editor-options="myOptionsModel"
     html-editor-type="defaults"
     html-editor-attached-toolbar="true"
     html-editor-size="small"
     html-editor-base-url="/"
     ng-model="myModelData"
     >
     Some place holder content
     </div>
     */

    let key;
    for (key in editorElements) {
        let element = jQuery(editorElements[key]);

        element.attr('id', 'blockVersionEditorId' + blockVersionData.getId());
        // @todo this may not be needed
        element.attr('html-editor-block-id', blockVersionData.getId());
        element.attr('rcm-html-edit', key);
        //element.attr('data-html-editor-attached-toolbar', 'true');
        //element.attr('html-editor-type', 'simpleText');
        element.attr('ng-model', 'zrcmsAdminBlockRichEdit["' + blockVersionData.getId() + '"]');
        setTimeout(
            function () {
                angularCompileElement(
                    // Not sure why parent is required
                    element.parent()
                );
            },
            0
        );
    }

    return true;
}
