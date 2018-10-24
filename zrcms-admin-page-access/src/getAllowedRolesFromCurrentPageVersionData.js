import {getInstance, hasInstance} from "../../zrcms-admin-tools/src/page-data/CurrentPageVersionDataFactory";
import {PAGE_ACCESS_OPTION_ALLOWED_ROLES, PAGE_ACCESS_OPTIONS} from "./FieldsPageAccess";

/**
 * Array when everything is ready, null if not ready
 *
 * @return {Array|null} allowedRoles
 */
export default function () {
    if (!hasInstance()) {
        return null;
    }

    let currentPageVersionData = getInstance();

    let pageAccessOptions = currentPageVersionData.findProperty(
        PAGE_ACCESS_OPTIONS
    );

    if (!pageAccessOptions) {
        return [];
    }

    if (!pageAccessOptions[PAGE_ACCESS_OPTION_ALLOWED_ROLES]) {
        return [];
    }

    // Return copy
    return pageAccessOptions[PAGE_ACCESS_OPTION_ALLOWED_ROLES].slice();
}
