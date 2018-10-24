import DialogModalV from "./DialogModalV";

export default function (store) {
    document.addEventListener(
        "DOMContentLoaded",
        function () {
            let containerElement = document.createElement('div');
            containerElement.id = 'react-dialog-model-v';

            document.body.insertBefore(containerElement, document.body.firstChild);

            window.ReactDom.render(
                window.React.createElement(
                    DialogModalV,
                    {store: store}
                ),
                containerElement
            );
        }
    );
}
