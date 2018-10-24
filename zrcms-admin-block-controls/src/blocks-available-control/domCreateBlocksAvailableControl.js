import BlockComponentsAvailableApp from './BlockComponentsAvailableApp'

let rendered = false;

/**
 * @param {String} eventName
 * @param {String} eventId
 * @param {object} eventResults
 * @param {Object} eventParams
 * @return {Promise<void>}
 */
export default function (eventName, eventId, eventResults, eventParams) {
    if (rendered) {
        return Promise.resolve(true);
    }
    rendered = true;

    let containerElement = document.createElement('div');

    document.body.insertBefore(containerElement, document.body.firstChild);

    window.ReactDom.render(
        window.React.createElement(
            BlockComponentsAvailableApp
        ),
        containerElement
    );

    return Promise.resolve(true);
}
