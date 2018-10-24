import getStore from '../../../zrcms-admin-tools/src/redux/getStore';
import BlockComponentsAvailable from './BlockComponentsAvailable'

/**
 * @return {null|BlockComponentsAvailable}
 */
export default function () {
    return getStore().getState().adminToolsInit.availableBlocks;
}
