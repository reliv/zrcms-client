import { PAGE_PUBLISH } from "../action/pagePublish";
import extend from "extend";

export default function (state = { ready: false }, action) {
    switch (action.type) {
        case PAGE_PUBLISH:
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
