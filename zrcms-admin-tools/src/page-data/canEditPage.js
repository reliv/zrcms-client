import getStore from "../redux/getStore";

export default function () {
    let state = getStore().getState();

    if (!state.applicationState) {
        return false;
    }

    if (!state.applicationState.view) {
        return false;
    }

    if (!state.applicationState.adminTools) {
        return false;
    }

    if (!state.applicationState.view.renderState) {
        return false;
    }

    if (!state.applicationState.view.renderState.cmsPage) {
        return false;
    }

    if (!state.applicationState.view.renderState.isPageForPath) {
        return false;
    }

    return state.applicationState.adminTools.allowed;
}
