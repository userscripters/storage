import type { AsyncStorage } from "./storages.js";
export * from "./storages.js";
export default class Store {
    prefix: string;
    protected storage: Storage | AsyncStorage;
    constructor(prefix: string, storage: Storage | AsyncStorage);
    /**
     * @summary loads the prefixed storage
     * @param prefix prefix to load by
     */
    open(prefix: string): Promise<any>;
    /**
     * @summary gets a property from storage
     * @param key property key
     * @param def default value
     */
    load<T>(key: string, def?: T): Promise<T>;
    /**
     * @summary sets a property to storage
     * @param key property key
     * @param val value to store
     */
    save<T>(key: string, val: T): Promise<void>;
    /**
     * @summary toggles a boolean property value
     * @param key property key
     */
    toggle(key: string): Promise<void>;
    /**
     * @summary removes a property from storage
     * @param key property key
     */
    remove(key: string): Promise<void>;
    /**
     * @summary clears the storage
     */
    clear(): Promise<void>;
}
