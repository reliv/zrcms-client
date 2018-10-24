import getStore from '../redux/getStore'
import blocksEditInit from '../action/blocksEditInit';
import {CONTEXT_PAGE} from "../block-data/BlockVersionData";

/**
 * @todo May not be needed
 */
export default function () {
    return getStore().dispatch(blocksEditInit(CONTEXT_PAGE));
}
