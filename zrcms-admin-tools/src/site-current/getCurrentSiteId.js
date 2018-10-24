import getStore from "../redux/getStore";

/**
 * return {String}
 */
export default function () {
    let state = getStore().getState();

    return state.applicationState.view.site.id;
}
