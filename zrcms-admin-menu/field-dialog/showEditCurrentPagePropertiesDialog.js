import showZrcmsResourceEditFieldDialog from '../../zrcms-admin-tools/src/core/showZrcmsResourceEditFieldDialog'
import getZrcmsApplicationState from '../../zrcms-application-state/getZrcmsApplicationState'

export default function showEditCurrentPagePropertiesDialog() {
    getZrcmsApplicationState().then(appState => {
        if (!appState.view.site.id) {
            alert('You must be on a normal content page such as the home page to edit site properties.');
            return;
        }
        showZrcmsResourceEditFieldDialog(
            'Page Properties',
            'page',
            appState.view.page.id,
            'Update Page Properties'
        );
    })
}
