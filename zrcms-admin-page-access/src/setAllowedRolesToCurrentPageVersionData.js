import {getInstance} from "../../zrcms-admin-tools/src/page-data/CurrentPageVersionDataFactory";
import {PAGE_ACCESS_OPTION_ALLOWED_ROLES, PAGE_ACCESS_OPTIONS} from "./FieldsPageAccess";

/**
 * @param {Array} allowedRoles
 */
export default function (allowedRoles) {
    let currentPageVersionData = getInstance();

    let pageAccessOptions = {};
    pageAccessOptions[PAGE_ACCESS_OPTION_ALLOWED_ROLES] = allowedRoles;

    currentPageVersionData.putProperty(
        PAGE_ACCESS_OPTIONS,
        pageAccessOptions
    );

    return currentPageVersionData;
}
