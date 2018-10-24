import {getConfig} from "../moduleConfig";

/**
 * @return {Array}
 */
export default function () {
    let moduleConfig = getConfig();

    return moduleConfig['zrcms-admin-tools-context']['available'];
}
