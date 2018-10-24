import { PAGE_EDIT_INIT } from "../action/pageEditInit";
import extend from "extend";

export default function (state = { ready: false }, action) {
    switch (action.type) {
        case PAGE_EDIT_INIT:
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
