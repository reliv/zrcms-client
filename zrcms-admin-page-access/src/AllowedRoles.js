export default class AllowedRoles {
    /**
     * @param {String[]} allowedRoles
     */
    constructor(allowedRoles) {
        this._initalAllowedRolesList = allowedRoles.slice();
        this.allowedRolesList = allowedRoles.slice();
    }

    has(role) {
        return (this.allowedRolesList.indexOf(role) !== -1)
    }

    add(role) {
        let index = this.allowedRolesList.indexOf(role);

        if (index === -1) {
            this.allowedRolesList.push(role);
        }
    }

    remove(role) {
        let index = this.props.allowedRoles.indexOf(role);

        if (index === -1) {
            return;
        }

        this.props.allowedRoles.splice(index, 1);
    }

    /**
     * @param {String[]} allowedRoles
     */
    set(allowedRoles) {
        this.allowedRolesList = allowedRoles.slice();
    }

    /**
     * @param allowedRoles
     * @return {String[]}
     */
    get(allowedRoles) {
        return this.allowedRolesList.slice();
    }

    hasAny() {
        return (this.allowedRolesList.length > 0);
    }

    hasChanged() {
        if (this.allowedRolesList.length !== this._initalAllowedRolesList.length) {
            return true;
        }

        let index;
        for (index in this.allowedRolesList) {
            if (this._initalAllowedRolesList.indexOf(this.allowedRolesList[index]) === -1) {
                return true;
            }
        }

        return false;
    }

    revert() {
        this.set(this._initalAllowedRolesList);
    }
}
