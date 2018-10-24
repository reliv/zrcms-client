import getZrcmsApplicationStateSynchronous from '../../../zrcms-application-state/getZrcmsApplicationStateSynchronous'

export default function applicationStateReducer(state = getZrcmsApplicationStateSynchronous(), action) {
    switch (action.type) {
        default:
            return state
    }
};
