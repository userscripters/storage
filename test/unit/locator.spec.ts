/// <reference types="greasemonkey" />
/// <reference types="../../ndm" />

import { expect } from "chai";
import { JSDOM } from "jsdom";
import { stub } from "sinon";
import { canWriteToStorage, locateStorage } from "../../src/locator.js";
import { GreasemonkeyStorage, TampermonkeyStorage } from "../../src/storages.js";
import "node-domexception";

describe(locateStorage.name, () => {

    // working around https://github.com/sinonjs/sinon/issues/2195
    before(() => Object.defineProperty(globalThis, "GM", {
        value: {},
        writable: true,
        enumerable: true
    }));
    after(() => Object.assign(globalThis, { GM: void 0 }));

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