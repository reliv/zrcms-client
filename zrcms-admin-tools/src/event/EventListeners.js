import defaultListeners from './listeners'

class EventListeners {
    constructor(listeners = {}) {
        this.listeners = listeners
    }

    /**
     * @param {String} listenersKey
     * @param {String} name
     * @param {function<Promise>} func
     */
    add(listenersKey, name, func) {
        if (!this.listeners[listenersKey]) {
            throw "listenersKey not defined with name: " + listenersKey;
        }

        if (this.listeners[listenersKey][name]) {
            console.warn('Over-riding key: ' + listenersKey + ' name: ' + name);
        }

        this.listeners[listenersKey][name] = func;
    }

    /**
     * @param listenersKey
     * @return {object|null}
     */
    find(listenersKey) {
        if (this.listeners[listenersKey]) {
            return this.listeners[listenersKey];
        }

        throw "Listeners not found with key: " + listenersKey;
    }
}

window.zrcmsAdminToolsEventListeners = new EventListeners(defaultListeners);

export default window.zrcmsAdminToolsEventListeners;
