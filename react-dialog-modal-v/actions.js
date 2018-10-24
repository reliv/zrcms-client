export const DIALOG_SHOW = 'DIALOG_SHOW';
export const DIALOG_HIDE = 'DIALOG_HIDE';
export const DIALOG_TOGGLE = 'DIALOG_TOGGLE';
export const DIALOG_PROPERTIES_SET = 'DIALOG_PROPERTIES_SET';

export function show() {
    return {
        type: DIALOG_SHOW,
    }
}

export function hide() {
    return {
        type: DIALOG_HIDE,
    }
}

export function toggle() {
    return {
        type: DIALOG_TOGGLE,
    }
}

export function setProperties(dialogProperties) {
    return {
        type: DIALOG_PROPERTIES_SET,
        payload: dialogProperties
    }
}
