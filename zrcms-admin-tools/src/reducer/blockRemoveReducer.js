import { BLOCK_REMOVE } from "../action/blockRemove";
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
        case BLOCK_REMOVE:
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
