import blockVersionDataRemove from "../block-data/blockVersionDataRemove";
import buildBlockVersionDataFromPageViewData from "../block-data/buildBlockVersionDataFromPageViewData";
import blockVersionDataAdd from "../block-data/blockVersionDataAdd";
import updatePageBlocksData from "../block-data/updatePageBlocksData";
import updateSiteContainersBlocksData from "../block-data/updateSiteContainersBlocksData";
import blockVersionDataRevert from "../block-data/blockVersionDataRevert";
import findBlockComponentsAvailable from "../block-component/findBlockComponentsAvailable";
import contextGetSaveData from "../block-edit/contextGetSaveData";
import contextInitEdit from "../block-edit/contextInitEdit";
import blockEditInitPageDispatch from "../block-edit/blockEditInitPageDispatch";
import blocksSaveDataGetDispatch from "../block-edit/blocksSaveDataGetDispatch";
import blockVersionInitEdit from "../block-edit/blockVersionInitEdit";
import blockArrangeInitAllContextDispatch from "../block-edit/blockArrangeInitAllContextDispatch";
import blockEditInitDispatch from "../block-edit/blockEditInitDispatch";
import domBlockRemoveById from "../dom/domBlockRemoveById";
import findCurrentPageDraftCmsResources from "../http/findCurrentPageDraftCmsResources";
import buildCurrentPageVersionDataFromPageViewData from "../page-data/buildCurrentPageVersionDataFromPageViewData";
import savePageData from "../page-data/savePageData";
import pageDraftSaveCompleteRedirect from "../page-edit/pageDraftSaveComplete";
import pageDraftSaveConfirm from "../page-edit/pageDraftSaveConfirm";
import pagePublish from "../page-edit/pagePublish";
import pageEditCancelRedirect from "../page-edit/pageEditCancelRedirect";
import pagePublishComplete from "../page-edit/pagePublishComplete";
import pageUpdateDataDispatch from "../page-edit/pageUpdateDataDispatch";
import buildCurrentSiteContainerVersionCollection from "../site-container-data/buildCurrentSiteContainerVersionCollection"
import saveSiteContainersData from "../site-container-data/saveSiteContainersData"
import validateSession from "../user/validateSession";
/* NOTE All the events below should be injected at the app layer */
import domBlocksControlsCreate, {domBlockControlsCreate} from "../../../zrcms-admin-block-controls/src/block-edit-controls/domBlocksControlsCreate";
import loading from "../../../loading/src/loading";
import blocksResizeEnable, {blockResizeEnable} from "../../../zrcms-admin-block-controls/src/block-resize/blocksResizeEnable";
import blocksSaveDataRichEditGet from "../../../zrcms-admin-block-rich-edits/src/blocksSaveDataRichEditGet";
import blocksRichEditEditInit from "../../../zrcms-admin-block-rich-edits/src/blocksRichEditEditInit";
import domEnableBlocksEdit from "../../../zrcms-admin-block-controls/src/block-edit-controls/domEnableBlocksEdit";
import initBlocksDrag, {initBlockDrag} from "../../../zrcms-admin-block-controls/src/block-drag/initBlocksDrag";
import waitForBlockInDom from "../../../zrcms-admin-block-controls/src/block-drag/waitForBlockInDom";
import domEnableBlockEdit from "../../../zrcms-admin-block-controls/src/block-edit-controls/domEnableBlockEdit";
import domCreateBlocksAvailableControl from "../../../zrcms-admin-block-controls/src/blocks-available-control/domCreateBlocksAvailableControl";
import initBlocksAvailableDrag from "../../../zrcms-admin-block-controls/src/blocks-available-control/initBlocksAvailableDrag";
import loadingComplete from "../../../loading/src/loadingComplete";
import blockRichEditEditInit from "../../../zrcms-admin-block-rich-edits/src/blockRichEditEditInit";
import domGlobalEditClassAdd from "../../../zrcms-admin-block-controls/src/blocks-global/domGlobalEditClassAdd";
import findRcmUserAclRoles from "../../../zrcms-admin-page-access/src/findRcmUserAclRoles"

export default {
    /* onLoad */
    'adminToolsInit': {
        'loading:100': loading,
        'validateSession:105': validateSession,
        'availableBlocks:1000': findBlockComponentsAvailable,
        'pageDrafts:1000': findCurrentPageDraftCmsResources,
        'rcmUserAclRoles:1000': findRcmUserAclRoles,
        'currentPageVersionData:1500': buildCurrentPageVersionDataFromPageViewData,
        'currentSiteContainerVersionCollection:1500': buildCurrentSiteContainerVersionCollection,
        'blockVersionDataCollection:1500': buildBlockVersionDataFromPageViewData,
        'loading:5000': loadingComplete,
    },

    /* InitEdit {context: {String}} */
    'blocksEditInit': {
        'loading:100': loading,
        'validateSession:105': validateSession,
        'contextInitEdit:1000': contextInitEdit,
        'blockControlsDomGlobalEditClassAdd:1000': domGlobalEditClassAdd,
        'blockControlsEnableBlocksEdit:1000': domEnableBlocksEdit,
        'richEdits:1000': blocksRichEditEditInit,
        'loading:5000': loadingComplete,
    },

    /* Arranging {context: {String}} */
    'blocksArrangeInit': {
        'loading:100': loading,
        'validateSession:105': validateSession,
        'blockEditInitDispatch:105': blockEditInitDispatch,
        'blocksAvailableControl:1000': domCreateBlocksAvailableControl,
        'blocksControlsEditControls:1000': domBlocksControlsCreate,
        'blocksResize:1000': blocksResizeEnable,
        'initBlocksDrag:1010': initBlocksDrag,
        'initBlocksAvailableDrag:1020': initBlocksAvailableDrag,
        'loading:5000': loadingComplete,
    },

    /* GetSaveData {context: {String}} */
    'blocksSaveDataGet': {
        'loading:100': loading,
        'validateSession:105': validateSession,
        // Should make sure all are initialized
        'blockEditInitDispatch:105': blockEditInitDispatch,
        'saveData:1000': contextGetSaveData,
        'richEdits:1050': blocksSaveDataRichEditGet,
        'loading:5000': loadingComplete,
    },

    /* GetSaveData {context: {String}} */
    'blocksSaveDataRevert': {
        'loading:100': loading,
        'blockVersionDataRevert:1000': blockVersionDataRevert,
        'loading:5000': loadingComplete,
    },

    /* {blockVersionData: {BlockVersionData}} */
    'blockAdd': {
        'loading:100': loading,
        'waitForBlockInDom:200': waitForBlockInDom,
        'blockVersionDataAdd:1100': blockVersionDataAdd,
        'blockVersionInitEdit:1200': blockVersionInitEdit,
        'blockControlsEnableBlockEdit:1200': domEnableBlockEdit,
        'richEdits:1200': blockRichEditEditInit,
        'blockControlsControlsCreate:1300': domBlockControlsCreate,
        'blockResize:1300': blockResizeEnable,
        'initBlockDrag:1400': initBlockDrag,
        'loading:5000': loadingComplete,
    },

    /* {BlockVersionId: {String}, context: {String}} */
    'blockRemove': {
        'loading:100': loading,
        'domBlockRemove:1000': domBlockRemoveById,
        'blockVersionDataRemove:1100': blockVersionDataRemove,
        'initBlockDrag:1200': initBlockDrag,
        'loading:5000': loadingComplete,
    },

    /* {blockVersionData: {BlockVersionData}} */
    'blockActiveStart': {},
    /* {blockVersionData: {BlockVersionData}} */
    'blockActiveEnd': {},

    /* Sync data to current page {applicationState: {Object}} */
    'pageUpdateData': {
        'loading:100': loading,
        // @todo we may not need do blockEditInitAllContextDispatch, could be dispatched by the block edit button
        'blockArrangeInitAllContextDispatch:105': blockArrangeInitAllContextDispatch,
        'updatePageBlocksData:1000': updatePageBlocksData,
        'updateSiteContainersBlocksData:1000': updateSiteContainersBlocksData,
        'loading:5000': loadingComplete,
    },

    /* SaveDraft {applicationState: {Object}} */
    'pageDraftSave': {
        'loading:100': loading,
        'validateSession:105': validateSession,
        // @todo we may not need do blocksSaveDataGetDispatch here, could be dispatched by the block save button
        'blocksSaveDataGetDispatch:150': blocksSaveDataGetDispatch,
        'pageUpdateDataDispatch:200': pageUpdateDataDispatch,
        'pageDraftSaveConfirm:500': pageDraftSaveConfirm,
        'savePageData:1000': savePageData,
        'saveSiteContainersData:1000': saveSiteContainersData,
        'redirect:2000': pageDraftSaveCompleteRedirect,
        'loading:5000': loadingComplete,
    },

    /* Publish {pageVersionId: {String}, targetPageCmsResourceId: {String}} */
    'pagePublish': {
        'loading:100': loading,
        'validateSession:105': validateSession,
        'pagePublish:1000': pagePublish,
        // redirect
        'pagePublishComplete:2000': pagePublishComplete,
        'loading:5000': loadingComplete,
    },

    /* Cancel {applicationState: {Object}} */
    'pageEditCancel': {
        'loading:100': loading,
        'redirect:1000': pageEditCancelRedirect,
        'loading:5000': loadingComplete,
    },

    /* @todo This may not be needed */
    /* Page Data {applicationState: {Object}} */
    'pageEditInit': {
        'loading:100': loading,
        'validateSession:105': validateSession,
        'blockEditInitPageDispatch:1000': blockEditInitPageDispatch,
        'loading:5000': loadingComplete,
    },

};
