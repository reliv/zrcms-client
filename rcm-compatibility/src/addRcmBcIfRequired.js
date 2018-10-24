import getZrcmsApplicationState from "../../zrcms-application-state/getZrcmsApplicationState";
import AjaxPluginEditHelperBc from "./AjaxPluginEditHelperBc";
import buildDialgIn from "./jqueryDialogInputsBc";

export default async function () {
    const applicationState = await getZrcmsApplicationState();
    if (!applicationState || !applicationState['adminTools'] || applicationState['adminTools']['allowed'] !== true) {
        return;
    }

    window.AjaxPluginEditHelper = AjaxPluginEditHelperBc;

    document.addEventListener(
        "DOMContentLoaded",
        function () {
            buildDialgIn(window.jQuery);
            window.AjaxPluginEditHelper = AjaxPluginEditHelperBc;
        }
    );
}
