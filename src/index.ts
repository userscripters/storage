/// <reference types="greasemonkey" />

import type { AsyncStorage } from "./storages.js";

export * from "./storages.js";

export default class Store {

    constructor(
        public prefix: string,
        protected storage: Storage | AsyncStorage
    ) { }

    /**
     * @summary loads the prefixed storage
     * @param prefix prefix to load by
     */
    async open(prefix: string) {
        const { storage } = this;
        const val = await storage.getItem(prefix);
        return val ? JSON.parse(val) : {};
    }

    /**
     * @summary gets a property from storage
     * @param key property key
     * @param def default value
     */
    async load<T>(key: string, def?: T): Promise<T> {
        const { prefix } = this;
        const val = (await this.open(prefix))[key];
        return val !== void 0 ? val : def;
    }

    /**
     * @summary sets a property to storage
     * @param key property key
     * @param val value to store
     */
    async save<T>(key: string, val: T) {
        const { storage, prefix } = this;
        const old = await this.open(prefix);
        old[key] = val;
        return storage.setItem(prefix, JSON.stringify(old));
    }

    /**
     * @summary toggles a boolean property value
     * @param key property key
     */
    async toggle(key: string) {
        return this.save(key, !(await this.load(key)));
    }

    /**
     * @summary removes a property from storage
     * @param key property key
     */
    async remove(key: string) {
        const { prefix } = this;

        const old = await this.load<Record<string, any>>(prefix, {});
        delete old[key];

        return this.save(key, old);
    }

    /**
     * @summary clears the storage
     */
    async clear() {
        const { storage, prefix } = this;
        return storage.removeItem(prefix);
    }
}