import {INIT} from "../action/adminToolsInit";
import extend from "extend";

/**
 * @param state
 * @param action
 * @return {*}
 */
export default function (state = {ready: false}, action) {
    switch (action.type) {
        case INIT:
            return extend(
                true,
                {},
                state,
                action.payload,
                {ready: true}
            );
        default:
            return state
    }
}
