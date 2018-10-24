import { LOADING } from "../action/loading";
import extend from "extend";

/**
 * @param state
 * @param action
 * @return {*}
 */
export default function (state = false, action) {
    switch (action.type) {
        case LOADING:
            return state = action.payload;
        default:
            return state
    }
}
