import Toolbar from "../toolbar/Toolbar";

export const TOOLBAR_ACTIVE_CHANGE = 'TOOLBAR_ACTIVE_CHANGE';
export const TOOLBAR_SET = 'TOOLBAR_SET';

/**
 * @param {Toolbar} toolbar
 * @return {{type: *, payload}}
 */
export function setToolbar(toolbar) {
    return {
        type: TOOLBAR_SET,
        payload: new Toolbar(toolbar.getList())
    }
}

export function setToolbarActive(active) {
    return {
        type: TOOLBAR_ACTIVE_CHANGE,
        payload: active
    }
}
