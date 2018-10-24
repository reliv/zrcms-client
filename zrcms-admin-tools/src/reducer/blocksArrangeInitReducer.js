import { BLOCKS_ARRANGE_INIT } from "../action/blocksArrangeInit";
import extend from "extend";
import ContextList from "../block-data/ContextList";

/**
 * @return {{contextList: ContextList, contextListReady: ContextList}}
 */
function getDefaultState() {
    return {
        contextList: new ContextList(),
        contextListReady: new ContextList(),
    };
}

/**
 * @param state
 * @param action
 * @return {*}
 */
export default function (state = getDefaultState(), action) {
    switch (action.type) {
        case BLOCKS_ARRANGE_INIT:
            return extend(
                true,
                {},
                state,
                action.payload,
                {
                    contextList: action.contextList,
                    contextListReady: action.contextListReady
                }
            );
        default:
            return state
    }
}
