import extend from 'extend'
import {BLOCKS_AVAILABLE_TOGGLE} from "./actionBlocksAvailableControl";

const defaultState = {
    show: true
};

export default function reducerBlocksAvailableControl(state = defaultState, action) {
    switch (action.type) {
        case BLOCKS_AVAILABLE_TOGGLE:
            return extend(
                {},
                state,
                {
                    show: !state.show
                },
            );
        default:
            return state
    }
}
