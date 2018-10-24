import extend from 'extend'
import {end, log, start} from "../debug/Console"
import generateGuid from './generateGuid'

const defaultPriority = 1000;

/**

 * @param {String} eventName
 * @param {String} eventId
 * @param {*} eventResults
 * @param {Array} listenerDataList
 * @param {Number} listenerDataListIndex
 * @param {Object} eventParams
 * @return {Promise<any>}
 */
export function promiseChain(
    eventName,
    eventId,
    eventResults,
    listenerDataList,
    listenerDataListIndex = 0,
    eventParams
) {
    let nextIndex = listenerDataList[listenerDataListIndex].nextIndex;
    let priority = listenerDataList[listenerDataListIndex].priority;
    let listenerNames = listenerDataList[listenerDataListIndex].listenerNames;

    start(eventName + ':' + priority + ':' + eventId, '--zrcms-admin-tools--');

    let promises = listenerDataList[listenerDataListIndex].listeners.map(
        (listener, index) => {
            log(
                eventName + ':' + priority + ':' + eventId,
                '[' + listenerNames[index] + '] :results: %o eventParams: %o',
                extend(true, {}, eventResults),
                eventParams
            );

            return listener(eventName, eventId, eventResults, eventParams);
        }
    );

    return Promise.all(
        promises
    ).then(
        (resultArray) => {
            end(
                eventName + ':' + priority + ':' + eventId,
                '--zrcms-admin-tools--'
            );
            let index, len;
            for (index = 0, len = resultArray.length; index < len; index++) {
                eventResults[listenerNames[index]] = resultArray[index];
            }

            if (nextIndex !== null) {
                return promiseChain(
                    eventName,
                    eventId,
                    eventResults,
                    listenerDataList,
                    nextIndex,
                    eventParams
                )
            }
            return Promise.resolve(eventResults);
        }
    );
}

/**
 * @param listeners
 * @return {Array}
 */
export function prioritizeListeners(listeners) {
    let priorities = [];
    let name, nameParsed, parts, priority;

    for (name in listeners) {
        parts = name.split(':');
        nameParsed = name;
        priority = defaultPriority;

        if (parts.length > 1) {
            nameParsed = parts[0];
            priority = Number(parts[1]);
        }

        if (!priorities[priority]) {
            priorities[priority] = {};
        }
        priorities[priority][nameParsed] = listeners[name];
    }

    let indexCount = 0;
    let prioritiesSimpleIndex = [];
    let prioritiesSize = Object.keys(priorities).length;
    priorities.map(
        (listenerGroup, priority) => {
            indexCount++;
            let listenerData = {
                listeners: [],
                listenerNames: [],
                priority: priority,
                nextIndex: indexCount
            };

            if (prioritiesSize === indexCount) {
                listenerData.nextIndex = null;
            }

            for (name in listenerGroup) {
                listenerData.listenerNames.push(name);
                listenerData.listeners.push(listenerGroup[name]);
            }

            prioritiesSimpleIndex.push(listenerData);

            return listenerData;
        }
    );

    return prioritiesSimpleIndex;
}

/**
 * @param {String} eventName
 * @param {Object} listeners
 * @param {Object} eventParams
 * @return {Promise<any>}
 */
export default function buildEventChain(eventName, listeners, eventParams = {}) {
    let listenerDataList = prioritizeListeners(listeners);
    let eventResults = {};

    return promiseChain(
        eventName,
        generateGuid(),
        eventResults,
        listenerDataList,
        0,
        eventParams
    )
}
