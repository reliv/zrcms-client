import AllowedRoles from './AllowedRoles'
import getStore from "../../zrcms-admin-tools/src/redux/getStore";
import getAllowedRolesFromCurrentPageVersionData from "./getAllowedRolesFromCurrentPageVersionData";

const store = getStore();
let instance = null;

/**
 * @return {AllowedRoles|null}
 */
export function getInstance() {
    return instance;
}

export function buildWhenAllowedRoleReady(state) {
    if (instance) {
        return instance;
    }
    let allowedRoles = getAllowedRolesFromCurrentPageVersionData();
    if (allowedRoles === null) {
        return;
    }

    return build(allowedRoles);
}

/**
 * @param {String[]} allowedRoles
 */
export default function build(allowedRoles) {
    if (instance) {
        return instance;
    }

    instance = new AllowedRoles(allowedRoles);
    return instance;
}

store.subscribe(buildWhenAllowedRoleReady);
