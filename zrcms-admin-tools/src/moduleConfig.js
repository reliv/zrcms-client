import {CONTEXT_PAGE, CONTEXT_SITE} from "./block-data/BlockVersionData"
import {DEBUG} from "./debug/LogLevels"

const adminToolsModuleConfig = {
    /** {int} */
    'zrcms-admin-tools-debug': DEBUG,
    'zrcms-admin-tools-state-subscribers': {},
    'zrcms-admin-tools-block-menus': {
        /* Example /
         '{blockComponentName}': {
         '{optionId}': {
         title: '{String}',
         method: '{function}'
         }
         }
         /* */
    },
    'zrcms-admin-tools-context': {
        'available': [CONTEXT_PAGE, CONTEXT_SITE]
    },
};

export function getConfig() {
    return adminToolsModuleConfig;
}

/**
 *
 */
export default adminToolsModuleConfig;
