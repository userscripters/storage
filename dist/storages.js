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
