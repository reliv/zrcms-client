import getZrcmsApplicationState from '../zrcms-application-state/getZrcmsApplicationState'
import ZrcmsAdminTools from '../zrcms-admin-tools/src/redux/ZrcmsAdminTools'

export default async function () {
    const applicationState = await getZrcmsApplicationState();
    if (!applicationState || !applicationState['adminTools'] || applicationState['adminTools']['allowed'] !== true) {
        return;
    }

    document.addEventListener(
        "DOMContentLoaded",
        function () {
            const containerElement = document.createElement('div');
            containerElement.id = 'zrcms-admin-menu-container';

            document.body.insertBefore(containerElement, document.body.firstChild);

            window.ReactDom.render(
                window.React.createElement(
                    ZrcmsAdminTools
                ),
                containerElement
            );
        }
    );
}
