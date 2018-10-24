import extend from 'extend';
import findBlockComponent from "./findBlockComponent";

let cache = {};

/**
 * @return {Promise<{Object}>}
 */
export default function (blockComponentName) {
    if (cache[blockComponentName]) {
        return Promise.resolve(extend(true, {}, cache[blockComponentName]));
    }

    return findBlockComponent(blockComponentName).then(
        (blockComponent) => {
            cache[blockComponent.name] = blockComponent;
            return Promise.resolve(extend(true, {}, blockComponent));
        }
    )
}
