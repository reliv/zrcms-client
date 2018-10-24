import {TOOLBAR_ACTIVE_CHANGE, TOOLBAR_SET} from "../action/blockToolbar";
import extend from "extend";

const defaultState = {
    toolBar: null,
    toolBarActive: false
};

/**
 * @param state
 * @param action
 * @return {*}
 */
export default function (state = defaultState, action) {
    switch (action.type) {
        case TOOLBAR_ACTIVE_CHANGE:
            return extend(
                true,
                {},
                state,
                {
                    toolBarActive: (action.payload === true)
                }
            );
        case TOOLBAR_SET:
            return extend(
                true,
                {},
                state,
                {
                    toolBar: action.payload
                }
            );
        default:
            return state
    }
}
