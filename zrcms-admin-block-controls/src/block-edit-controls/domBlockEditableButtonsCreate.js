import domBlockFind from '../../../zrcms-admin-tools/src/dom/domBlockFind'

/**
 * @param {BlockVersionData} blockVersionData
 * @return {Promise<element>}
 */
export default function domBlockEditableButtonsCreate(blockVersionData) {
    let blockElm = domBlockFind(blockVersionData);

    blockElm.find('button').each(
        function (index, element) {

            let curElement = jQuery(element);
            let newElm = jQuery('<div role="button"></div>');

            let curHtml = curElement.html();
            if (curHtml) {
                newElm.html(curHtml);
            }

            let curClass = curElement.attr('class');
            if (curClass) {
                newElm.attr('class', curClass);
            }

            let curId = curElement.attr('id');
            if (curId) {
                newElm.attr('id', curId);
            }

            let curTextEdit = curElement.attr('data-textedit');
            if (curTextEdit) {
                newElm.attr('data-textedit', curTextEdit);
            }

            curElement.after(newElm);
            curElement.remove();
        }
    );

    return new Promise(
        (resolve, reject) => {
            resolve(blockElm);
        }
    );
}
