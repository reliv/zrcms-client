import { BLOCKS_SAVE_DATA_REVERT } from "../action/blocksSaveDataRevert";
import extend from "extend";
import ContextList from "../block-data/ContextList";

/**
 * @return {Object}
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
        case BLOCKS_SAVE_DATA_REVERT:
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
