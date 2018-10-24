import {hide} from "../../react-dialog-modal-v/actions";
import setAllowedRolesFromPageVersionData from "./setAllowedRolesToCurrentPageVersionData";
import pageUpdateData from "../../zrcms-admin-tools/src/action/pageUpdateData";
import getStore from '../../zrcms-admin-tools/src/redux/getStore'
import {getInstance} from "./AllowedRolesFactory";

export default function() {
    let allowedRoles = getInstance();

    if (!allowedRoles) {
        // @todo do nothing?
        return;
    }

    let store = getStore();
    if (!allowedRoles.hasChanged()) {
        store.dispatch(hide());
        return;
    }

    let confirm = window.confirm(
        "You must save and publish this page for your permission changes to take effect."
        + "\nClick 'Cancel' to revert these changes."
    );

    if (!confirm) {
        store.dispatch(hide());
        // revert to initial state
        allowedRoles.revert();
        return;
    }

    setAllowedRolesFromPageVersionData(allowedRoles.get());
    store.dispatch(pageUpdateData(store.getState().applicationState));
    store.dispatch(hide());
}
