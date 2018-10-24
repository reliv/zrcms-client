import getStore from "../../zrcms-admin-tools/src/redux/getStore";
import {setProperties} from "../../react-dialog-modal-v/actions";
import {getInstance} from "./AllowedRolesFactory";
import pageUpdateDataForPageAccess from "./pageUpdateDataForPageAccess";
import PageAccessUiRcmUserAclRoles from './PageAccessUiRcmUserAclRoles';

export default function (onRollsChange) {
    let store = getStore();
    let allowedRoles = getInstance();

    if (!allowedRoles) {
        console.error('Allowed Roles are not yet available.');
        return;
    }

    let rcmUserAclRoles = store.getState().adminToolsInit.rcmUserAclRoles;

    if (!rcmUserAclRoles) {
        console.error('rcmUserAclRoles are not yet available.');
        return;
    }

    if (typeof onRollsChange !== 'function') {
        onRollsChange = (allowedRolesList) => {}
    }

    store.dispatch(
        setProperties(
            {
                id: 'zrcmsPageAccessPermissions',
                title: 'Page Access Permissions',
                content: (
                    <PageAccessUiRcmUserAclRoles
                        allowedRoles={allowedRoles}
                        rcmUserAclRoles={rcmUserAclRoles}
                        onAllowedRolesChange={onRollsChange}
                    />
                ),
                show: true,
                buttons: [
                    {
                        content: 'Save',
                        className: 'btn-primary',
                        onClick: pageUpdateDataForPageAccess
                    }
                ],
                closeButton: {
                    content: 'Close',
                    onClick: (e) => {
                        allowedRoles.revert()
                    }
                }
            }
        )
    );
}
