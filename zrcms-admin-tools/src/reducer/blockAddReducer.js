import { BLOCK_ADD } from "../action/blockAdd";
import extend from "extend";

/**
 * @return {*}
 */
function getDefaultState() {
    return {};
}

/**
 * @param state
 * @param action
 * @return {*}
 */
export default function (state = getDefaultState(), action) {
    switch (action.type) {
        case BLOCK_ADD:
            return extend(
                true,
                {},
                state,
                action.payload
            );
        default:
            return state
    }
}
