import React, {Component} from 'react'
import ButtonBlocksArrange from '../../zrcms-admin-menu-buttons/src/ButtonBlocksArrange'
import BlockComponentsAvailableToggleButton from '../../zrcms-admin-block-controls/src/blocks-available-control/BlockComponentsAvailableToggleButton'
import ButtonPageBlocksEdit from '../../zrcms-admin-menu-buttons/src/ButtonPageBlocksEdit'
import ButtonSiteBlocksEdit from '../../zrcms-admin-menu-buttons/src/ButtonSiteBlocksEdit'
import ButtonCancel from '../../zrcms-admin-menu-buttons/src/ButtonCancel'
import ButtonEditInit from '../../zrcms-admin-menu-buttons/src/ButtonEditInit'
import ButtonPagePublish from '../../zrcms-admin-menu-buttons/src/ButtonPagePublish'
import ButtonPageSaveDraft from '../../zrcms-admin-menu-buttons/src/ButtonPageSaveDraft'
import PageRevisionList from '../../zrcms-admin-menu-buttons/src/PageRevisionList'
import PageAccessLock from '../../zrcms-admin-page-access/src/PageAccessLock'
import './style.css' //Is used. Do not remove.

export default class AdminMenuButtons extends Component {

    render() {
        return (
            <div className="admin-menu-buttons">
                <div className="panel-button-container">
                    <PageRevisionList/>
                </div>
                {/*<div className="panel-button-container">*/}
                    {/*<ButtonEditInit/>*/}
                {/*</div>*/}
                {/*<div className="panel-button-container">*/}
                    {/*<ButtonPageBlocksEdit/>*/}
                {/*</div>*/}
                {/*<div className="panel-button-container">*/}
                    {/*<ButtonSiteBlocksEdit/>*/}
                {/*</div>*/}
                <div className="panel-button-container">
                    <ButtonBlocksArrange label="Edit"/>
                </div>
                <div className="panel-button-container">
                    <ButtonPageSaveDraft/>
                </div>
                <div className="panel-button-container">
                    <ButtonPagePublish/>
                </div>
                <div className="panel-button-container">
                    <ButtonCancel/>
                </div>
                {/*<div className="panel-button-container">*/}
                    {/*<BlockComponentsAvailableToggleButton/>*/}
                {/*</div>*/}
                <div className="panel-button-container">
                    <PageAccessLock/>
                </div>
            </div>
        )
    }
}
