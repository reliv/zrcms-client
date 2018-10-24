import {DIALOG_HIDE, DIALOG_PROPERTIES_SET, DIALOG_SHOW, DIALOG_TOGGLE} from "./actions";
import extend from "extend";
import DefaultCloseButton from "./DefaultCloseButton";

const defaultState = {
    id: '_default',
    title: '',
    content: <span/>,
    show: false,
    buttons: [],
    closeButton: DefaultCloseButton,
    onShowAsync: null,
    onHideAsync: null,
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case DIALOG_SHOW:
            return extend(
                true,
                {},
                state,
                {
                    show: true,
                }
            );
        case DIALOG_HIDE:
            return extend(
                true,
                {},
                state,
                {
                    show: false,
                }
            );
        case DIALOG_TOGGLE:
            return extend(
                true,
                {},
                state,
                {
                    show: !state.show,
                }
            );
        case DIALOG_PROPERTIES_SET:
            return extend(
                true,
                {},
                state,
                action.payload,
            );
        default:
            return {...state}
    }
}
