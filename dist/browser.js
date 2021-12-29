(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Store = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./storages.js":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TampermonkeyStorage = exports.GreasemonkeyStorage = void 0;
class GreasemonkeyStorage {
    get length() {
        return GM.listValues().then((v) => v.length);
    }
    async clear() {
        const keys = await GM.listValues();
        return keys.forEach((key) => GM.deleteValue(key));
    }
    async key(index) {
        return (await GM.listValues())[index];
    }
    async getItem(key) {
        const item = await GM.getValue(key);
        return item === void 0 ? null : item + "";
    }
    setItem(key, val) {
        return GM.setValue(key, val);
    }
    removeItem(key) {
        return GM.deleteValue(key);
    }
}
exports.GreasemonkeyStorage = GreasemonkeyStorage;
class TampermonkeyStorage {
    get length() {
        return GM_listValues().length;
    }
    clear() {
        const keys = GM_listValues();
        return keys.forEach((key) => GM_deleteValue(key));
    }
    key(index) {
        return GM_listValues()[index];
    }
    getItem(key) {
        const item = GM_getValue(key);
        return item === void 0 ? null : item + "";
    }
    setItem(key, val) {
        return GM_setValue(key, val);
    }
    removeItem(key) {
        return GM_deleteValue(key);
    }
}
exports.TampermonkeyStorage = TampermonkeyStorage;
;

},{}]},{},[1])(1)
});
