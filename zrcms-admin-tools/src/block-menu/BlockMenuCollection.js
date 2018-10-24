/* USAGE EXAMPLE *
import BlockMenu from './BlockMenu'
import getInstance from './BlockMenuCollectionFactory'

getInstance().add(
    'RcmHtmlArea',
    new BlockMenu(
        {'test':{title: 'Poop', method: ()=>{alert('test')}}}
    )
);
/* */

/**
 * {BlockMenuCollection}
 */
export default class BlockMenuCollection {
    constructor() {
        this.list = {}
    }

    /**
     * @param {String} blockComponentName
     * @param {BlockMenu} blockMenu
     */
    add(blockComponentName, blockMenu) {
        if (this.has(blockComponentName)) {
            console.warn(
                'Duplicate block menu for block component: ' + blockComponentName
            );
        }
        this.list[blockComponentName] = blockMenu;
    }

    has(blockComponentName) {
        return (typeof this.list[blockComponentName] !== 'undefined');
    }

    /**
     * @param {String} blockComponentName
     * @return {null|BlockMenu}
     */
    get(blockComponentName) {
        if (typeof this.list[blockComponentName] === 'undefined') {
            return null;
        }

        return this.list[blockComponentName]
    }
}
