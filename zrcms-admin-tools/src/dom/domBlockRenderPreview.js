import findRenderedBlockHtml from '../http/findRenderedBlockHtml'
import {getInstance} from '../block-data/BlockVersionDataCollectionFactory'
import domBlockInnerFind from './domBlockInnerFind'
import BlockVersionData from '../block-data/BlockVersionData'

/**
 * @param {String} blockVersionId
 * @param {Object} blockConfig
 * @return {Promise<element>}
 */
export default function domBlockRenderPreview(blockVersionId, blockConfig) {
    let blockVersionData = getInstance().find(blockVersionId);

    if (!blockVersionData) {
        //console.error('Block not found for id: ' + blockVersionId);
        return Promise.reject('Block not found for id: ' + blockVersionId);
    }

    let tempBlockVersionData = new BlockVersionData(
        blockVersionData.getContext(),
        blockVersionData.getContainerName(),
        blockVersionData.getBlockVersion(),
        blockVersionData.isEditInitialized(),
        false, // don't want this to be saved
        'Created Temp in domBlockRenderPreview'
    );

    tempBlockVersionData.setConfig(blockConfig);

    return findRenderedBlockHtml(
        tempBlockVersionData.getBlockVersion(),
        tempBlockVersionData.getId(),
        true
    ).then(
        (renderHtml) => {
            let blockInnerElm = domBlockInnerFind(tempBlockVersionData);
            blockInnerElm.html(renderHtml);
            return new Promise(
                (resolve, reject) => {
                    resolve(blockInnerElm);
                }
            );
        }
    )
}
