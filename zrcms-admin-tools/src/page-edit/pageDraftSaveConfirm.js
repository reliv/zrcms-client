import {getInstance as getInstanceCurrentSiteContainerVersionCollection} from "../site-container-data/CurrentSiteContainerVersionCollectionFactory";
import logger from "../debug/Logger";
import {INFO} from "../debug/LogLevels";

/**
 * @return {Promise<boolean>}
 */
export default function () {
    let currentSiteContainerVersionCollection = getInstanceCurrentSiteContainerVersionCollection();

    if (currentSiteContainerVersionCollection.hasDataChanged()) {
        // We wrap this because status() is an expensive call
        if (logger.isLevel(INFO)) {
            logger.info(
                'currentSiteContainerVersionCollection version changed: ',
                currentSiteContainerVersionCollection.status()
            );
        }

        let confirm = window.confirm(
            "Warning: Some of the changes may impact other pages on the site. "
            + "\nClick 'Cancel' to skip saving these changes."
        );

        return new Promise(
            (resolve, reject) => {
                if (confirm) {
                    resolve({status: 'OK for site container changes'});
                    return;
                }

                // @todo This should be a dispatch for a currentSiteContainerVersionCollectionRevert event
                //       in listeners so others may tie into it
                currentSiteContainerVersionCollection.revert();
                resolve({status: 'Revert site container changes'});
            }
        );
    }

    return Promise.resolve({status: 'No site container changes'});
}
