import { NoStorageError } from "./errors.js";
import { GreasemonkeyStorage, TampermonkeyStorage, type AsyncStorage } from "./storages.js";

/**
 * @summary checks if storage is available for writing
 * @param storage storage to check for availability
 */
export const canWriteToStorage = (storage: Storage) => {
    try {
        const testKey = `storage-test-${Date.now()}`;
        storage.setItem(testKey, testKey);
        storage.removeItem(testKey);
        return true;
    } catch (error) {
        if (error instanceof DOMException) {
            const { name, code } = error;

            const names = ["QuotaExceededError", "NS_ERROR_DOM_QUOTA_REACHED"];
            const codes = [22, 1014];

            return names.some((n) => n === name) || codes.some((c) => c === code);
        }

        return false;
    }
};

/**
 * @summary gets the most appropriate storage given the environment
 */
export const locateStorage = () => {
    const { scriptHandler } = typeof GM !== "undefined" ?
        GM.info :
        { scriptHandler: "" };

    const handlerMap: Record<string, new () => (AsyncStorage | Storage)> = {
        "Greasemonkey": GreasemonkeyStorage,
        "Tampermonkey": TampermonkeyStorage,
    };

    const constructor = handlerMap[scriptHandler];
    if (constructor) {
        return new constructor();
    }

    const defaultStorages = [localStorage, sessionStorage];

    const storage = defaultStorages.find((s) => canWriteToStorage(s));
    if (!storage) {
        throw new NoStorageError("failed to find an available storage");
    }

    return storage;
};