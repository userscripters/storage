"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoStorageError = void 0;
class NoStorageError extends Error {
    constructor() {
        super(...arguments);
        this.name = "NoStorageFoundError";
    }
}
exports.NoStorageError = NoStorageError;
