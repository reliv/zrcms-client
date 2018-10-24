import { PAGE_EDIT_CANCEL } from "../action/pageEditCancel";
import extend from "extend";

export default function (state = { ready: false }, action) {
    switch (action.type) {
        case PAGE_EDIT_CANCEL:
            return extend(
                true,
                {},
                state,
                action.payload,
                { ready: true }
            );
        default:
            return state
    }
}
