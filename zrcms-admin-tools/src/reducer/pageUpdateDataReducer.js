import {PAGE_UPDATE_DATA} from "../action/pageUpdateData";
import extend from "extend";
import generateGuid from '../event/generateGuid'

function getDefaultState() {
    return {
        pageUpdateId: generateGuid()
    }
}

export default function (state = getDefaultState(), action) {
    switch (action.type) {
        case PAGE_UPDATE_DATA:
            state.pageUpdateId = generateGuid();
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
