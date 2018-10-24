import {combineReducers} from 'redux'
import adminToolsInitReducer from '../reducer/adminToolsInitReducer'
import applicationStateReducer from '../reducer/applicationStateReducer'
import blockAddReducer from '../reducer/blockAddReducer'
import blockRemoveReducer from '../reducer/blockRemoveReducer'
import blocksArrangeInitReducer from '../reducer/blocksArrangeInitReducer'
import blocksEditInitReducer from '../reducer/blocksEditInitReducer'
import blocksSaveDataGetReducer from '../reducer/blocksSaveDataGetReducer'
import blocksSaveDataRevertReducer from '../reducer/blocksSaveDataRevertReducer'
import blockToolbarReducer from '../reducer/blockToolbarReducer'
import loadingReducer from '../reducer/loadingReducer'
import pageEditInitReducer from '../reducer/pageEditInitReducer'
import pageUpdateDataReducer from '../reducer/pageUpdateDataReducer'
import pageDraftSaveReducer from '../reducer/pageDraftSaveReducer'
import pageEditCancelReducer from '../reducer/pageEditCancelReducer'
import pagePublishReducer from '../reducer/pagePublishReducer'
import reducerBlocksAvailableControl from '../../../zrcms-admin-block-controls/src/blocks-available-control/reducerBlocksAvailableControl'
import dialogModalReducer from "../../../react-dialog-modal-v/reducer";

const rootReducer = combineReducers(
    // @todo Get this from moduleConfig?
    {
        dialogModalV: dialogModalReducer,
        adminToolsInit: adminToolsInitReducer,
        applicationState: applicationStateReducer,
        blockAdd: blockAddReducer,
        blockRemove: blockRemoveReducer,
        blocksArrangeInit: blocksArrangeInitReducer,
        blocksEditInit: blocksEditInitReducer,
        blocksSaveDataGet: blocksSaveDataGetReducer,
        blocksSaveDataRevert: blocksSaveDataRevertReducer,
        blockToolbar: blockToolbarReducer,
        loading: loadingReducer,
        pageEditInit: pageEditInitReducer,
        pageUpdateData: pageUpdateDataReducer,
        pageDraftSave: pageDraftSaveReducer,
        pageEditCancel: pageEditCancelReducer,
        pagePublish: pagePublishReducer,
        blocksAvailableControl: reducerBlocksAvailableControl
    }
);

export default rootReducer
