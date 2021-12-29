type RemoveIndex<T> = {
    [P in keyof T as string extends P
    ? never
    : number extends P
    ? never
    : P]: T[P];
};

export type AsyncStorage = RemoveIndex<
    {
        [P in keyof Storage]: Storage[P] extends Function
        ? (
            ...args: Parameters<Storage[P]>
        ) => Promise<ReturnType<Storage[P]>>
        : Promise<Storage[P]>;
    }
>;

export class GreasemonkeyStorage implements AsyncStorage {

    get length() {
        return GM.listValues().then((v) => v.length);
    }

    async clear() {
        const keys = await GM.listValues();
        return keys.forEach((key) => GM.deleteValue(key));
    }

    async key(index: number) {
        return (await GM.listValues())[index];
    }

    async getItem(key: string) {
        const item = await GM.getValue(key);
        return item === void 0 ? null : item + "";
    }

    setItem(key: string, val: GM.Value) {
        return GM.setValue(key, val);
    }

    removeItem(key: string) {
        return GM.deleteValue(key);
    }
}

export class TampermonkeyStorage implements Storage {
    get length() {
        return GM_listValues().length;
    }

    clear() {
        const keys = GM_listValues();
        return keys.forEach((key) => GM_deleteValue(key));
    }

    key(index: number) {
        return GM_listValues()[index];
    }

    getItem(key: string) {
        const item = GM_getValue(key);
        return item === void 0 ? null : item + "";
    }

    setItem(key: string, val: unknown) {
        return GM_setValue(key, val);
    }

    removeItem(key: string) {
        return GM_deleteValue(key);
    }
};