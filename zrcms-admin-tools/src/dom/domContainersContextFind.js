import domContainersContextGetSelector from './domContainersContextGetSelector'

/**
 * @param {String} context
 * @return {HTMLElement}
 */
export default function domContainersContextFind(context) {
    return jQuery(domContainersContextGetSelector(context))
}
