/// <reference types="greasemonkey" />
/// <reference types="../../ndm" />

import { expect } from "chai";
import { JSDOM } from "jsdom";
import "node-domexception";
import { stub } from "sinon";
import { NoStorageError } from "../../src/errors.js";
import { canWriteToStorage, locateStorage } from "../../src/locator.js";
import { GreasemonkeyStorage, TampermonkeyStorage } from "../../src/storages.js";

describe(locateStorage.name, () => {
    const { window: { localStorage, sessionStorage, Storage } } = new JSDOM(void 0, { url: "https://localhost" });

    // working around https://github.com/sinonjs/sinon/issues/2195
    beforeEach(() => {
        Object.defineProperty(globalThis, "GM", { value: { info: {} }, writable: true, enumerable: true });
        Object.assign(globalThis, { localStorage, sessionStorage });
    });

    afterEach(() => Object.assign(globalThis, {
        GM: void 0,
        localStorage: void 0,
        sessionStorage: void 0
    }));

    it('should choose userscript manager storage if found', () => {

        const gmStub = stub(globalThis, "GM");

        const storageMap = new Map();
        storageMap.set("Greasemonkey", GreasemonkeyStorage);
        storageMap.set("Tampermonkey", TampermonkeyStorage);

        storageMap.forEach((constructor, scriptHandler) => {
            gmStub.value({ info: { scriptHandler } });

            const storage = locateStorage();

            expect(storage).to.be.instanceOf(constructor);
        });
    });

    it('should choose one of the default storages if none found', () => {
        const storage = locateStorage();
        expect(storage).to.be.instanceOf(Storage);
    });

    it('should throw NoStorageError if no storages found', () => {
        Object.assign(globalThis, { localStorage: void 0, sessionStorage: void 0 });
        expect(() => locateStorage()).to.throw(NoStorageError);
    });
});

describe(canWriteToStorage.name, () => {
    it('should return true if storage has quota', () => {
        const { window: { localStorage, sessionStorage } } = new JSDOM(void 0, {
            url: "https://localhost",
        });

        const localAvailable = canWriteToStorage(localStorage);
        const sessionAvailable = canWriteToStorage(sessionStorage);

        expect(localAvailable).to.be.true;
        expect(sessionAvailable).to.be.true;
    });

    it('should return false if storage has no quota', () => {
        const { window: { localStorage, sessionStorage } } = new JSDOM(void 0, {
            storageQuota: 0,
            url: "https://localhost"
        });

        const localAvailable = canWriteToStorage(localStorage);
        const sessionAvailable = canWriteToStorage(sessionStorage);

        expect(localAvailable).to.be.false;
        expect(sessionAvailable).to.be.false;
    });
});