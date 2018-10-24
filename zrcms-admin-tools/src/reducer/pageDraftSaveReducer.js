import { PAGE_DRAFT_SAVE } from "../action/pageDraftSave";
import extend from "extend";

export default function (state = { ready: false }, action) {
    switch (action.type) {
        case PAGE_DRAFT_SAVE:
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
