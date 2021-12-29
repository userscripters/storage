/// <reference types="greasemonkey" />
declare type RemoveIndex<T> = {
    [P in keyof T as string extends P ? never : number extends P ? never : P]: T[P];
};
export declare type AsyncStorage = RemoveIndex<{
    [P in keyof Storage]: Storage[P] extends Function ? (...args: Parameters<Storage[P]>) => Promise<ReturnType<Storage[P]>> : Promise<Storage[P]>;
}>;
export declare class GreasemonkeyStorage implements AsyncStorage {
    get length(): Promise<number>;
    clear(): Promise<void>;
    key(index: number): Promise<string>;
    getItem(key: string): Promise<string | null>;
    setItem(key: string, val: GM.Value): Promise<void>;
    removeItem(key: string): Promise<void>;
}
export declare class TampermonkeyStorage implements Storage {
    get length(): number;
    clear(): void;
    key(index: number): string;
    getItem(key: string): string | null;
    setItem(key: string, val: unknown): void;
    removeItem(key: string): void;
}
export {};
