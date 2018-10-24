import ContentVersionData from "../core/ContentVersionData";

export default class CurrentSiteContainerVersionData extends ContentVersionData {
    /**
     * @param {string} id
     * @param {object} properties
     * @param {string} createdByUserId
     * @param {string} createdReason
     * @param {string} createdDate
     * @param {string} cmsResourceId
     */
    constructor(
        id,
        properties,
        createdByUserId,
        createdReason,
        createdDate,
        cmsResourceId
    ) {
        super(
            id,
            properties,
            createdByUserId,
            createdReason,
            createdDate,
        );

        this._cmsResourceId = cmsResourceId;
    }

    getCmsResourceId() {
        return this._cmsResourceId;
    }
}
