import { expect } from "chai";
import { JSDOM } from "jsdom";
import { stub } from "sinon";
import Store, { GreasemonkeyStorage, TampermonkeyStorage } from "../../src/index.js";

describe('Store', () => {

    it('should save values in a prefixed store', async () => {
        const { window: { localStorage } } = new JSDOM(void 0, {
            url: "https://localhost"
        });

        const store = new Store("pfx", localStorage);
        await store.save("answer", 42);

        const prefixed = JSON.parse(localStorage.getItem("pfx")!);

        expect(prefixed.answer).to.equal(42);
    });

    it('should accept any type of storage', async () => {
        for(const constructor of [TampermonkeyStorage, GreasemonkeyStorage]) {
            const storage = new constructor();
            const getter = stub(storage, "getItem");
            const setter = stub(storage, "setItem");

            const store = new Store("test", storage);
            await store.save("queen", "Elisabeth");

            expect(getter.calledOnceWith("test"));
            expect(setter.calledOnceWith(
                "test", JSON.stringify({ queen: "Elisabeth" })
            )).to.be.true;
        }
    });
});