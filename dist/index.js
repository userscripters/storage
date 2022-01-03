"use strict";
/// <reference types="greasemonkey" />
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./locator.js"), exports);
__exportStar(require("./storages.js"), exports);
class Store {
    constructor(prefix, storage) {
        this.prefix = prefix;
        this.storage = storage;
    }
    /**
     * @summary loads the prefixed storage
     * @param prefix prefix to load by
     */
    async open(prefix) {
        const { storage } = this;
        const val = await storage.getItem(prefix);
        return val ? JSON.parse(val) : {};
    }
    /**
     * @summary gets a property from storage
     * @param key property key
     * @param def default value
     */
    async load(key, def) {
        const { prefix } = this;
        const val = (await this.open(prefix))[key];
        return val !== void 0 ? val : def;
    }
    /**
     * @summary sets a property to storage
     * @param key property key
     * @param val value to store
     */
    async save(key, val) {
        const { storage, prefix } = this;
        const old = await this.open(prefix);
        old[key] = val;
        return storage.setItem(prefix, JSON.stringify(old));
    }
    /**
     * @summary toggles a boolean property value
     * @param key property key
     */
    async toggle(key) {
        return this.save(key, !(await this.load(key)));
    }
    /**
     * @summary removes a property from storage
     * @param key property key
     */
    async remove(key) {
        const { prefix } = this;
        const old = await this.load(prefix, {});
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
exports.default = Store;
