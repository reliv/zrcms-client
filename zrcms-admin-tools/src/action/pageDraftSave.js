import onPageDraftSave from "../event/onPageDraftSave";
import catchEventPromise from "../event/catchEventPromise";
export const PAGE_DRAFT_SAVE = 'PAGE_DRAFT_SAVE';

/**
 * @return {function(*=)}
 */
export default function (applicationState) {
    return (dispatch) => {
        return onPageDraftSave(applicationState).then(
            (results) => {
                dispatch(
                    {
                        type: PAGE_DRAFT_SAVE,
                        payload: results
                    }
                )
            }
        ).catch(catchEventPromise);
    };
}
