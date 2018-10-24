import findRenderedBlock from "./findRenderedBlock";

/**
 * @param {*} blockProperties
 * @param {String} blockId
 * @param {Boolean} contentOnly
 * @return {Promise<renderHtml>}
 */
export default function(blockProperties, blockId, contentOnly = false) {
    return findRenderedBlock(blockProperties, blockId, contentOnly).then(
        (data) => {
            return new Promise(
                (resolve, reject) => {
                    resolve(data.renderHtml)
                }
            )
        }
    );
}
