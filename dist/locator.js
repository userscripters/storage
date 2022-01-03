"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locateStorage = exports.canWriteToStorage = void 0;
const errors_js_1 = require("./errors.js");
const storages_js_1 = require("./storages.js");
/**
 * @summary checks if storage is available for writing
 * @param storage storage to check for availability
 */
const canWriteToStorage = (storage) => {
    try {
        const testKey = `storage-test-${Date.now()}`;
        storage.setItem(testKey, testKey);
        storage.removeItem(testKey);
        return true;
    }
    catch (error) {
        if (error instanceof DOMException) {
            const { name, code } = error;
            const names = ["QuotaExceededError", "NS_ERROR_DOM_QUOTA_REACHED"];
            const codes = [22, 1014];
            return names.some((n) => n === name) || codes.some((c) => c === code);
        }
        return false;
    }
};
exports.canWriteToStorage = canWriteToStorage;
/**
 * @summary gets the most appropriate storage given the environment
 */
const locateStorage = () => {
    const { scriptHandler } = typeof GM !== "undefined" ?
        GM.info :
        { scriptHandler: "" };
    const handlerMap = {
        "Greasemonkey": storages_js_1.GreasemonkeyStorage,
        "Tampermonkey": storages_js_1.TampermonkeyStorage,
    };
    const constructor = handlerMap[scriptHandler];
    if (constructor) {
        return new constructor();
    }
    const defaultStorages = [localStorage, sessionStorage];
    const storage = defaultStorages.find((s) => (0, exports.canWriteToStorage)(s));
    if (!storage) {
        throw new errors_js_1.NoStorageError("failed to find an available storage");
    }
    return storage;
};
exports.locateStorage = locateStorage;
