import getZrcmsApplicationState from "../zrcms-application-state/getZrcmsApplicationState";
import addDialogModal from "./addDialogModal";
import getStore from '../zrcms-admin-tools/src/redux/getStore'

export default async function () {
    const applicationState = await getZrcmsApplicationState();
    if (!applicationState || !applicationState['adminTools'] || applicationState['adminTools']['allowed'] !== true) {
        return;
    }

    addDialogModal(getStore());
}
