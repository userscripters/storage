import { expect } from "chai";
import { NoStorageError } from "../../src/errors.js";

describe('NoStorageError', () => {
    it('should have a unique name', () => {
        const { name } = new NoStorageError("missing storage");
        expect(name).to.equal("NoStorageFoundError");
    });
});