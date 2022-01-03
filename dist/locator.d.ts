/**
 * @summary checks if storage is available for writing
 * @param storage storage to check for availability
 */
export declare const canWriteToStorage: (storage: Storage) => boolean;
/**
 * @summary gets the most appropriate storage given the environment
 */
export declare const locateStorage: () => Storage | {
    readonly length: Promise<number>;
    clear: () => Promise<void>;
    getItem: (key: string) => Promise<string | null>;
    key: (index: number) => Promise<string | null>;
    removeItem: (key: string) => Promise<void>;
    setItem: (key: string, value: string) => Promise<void>;
};
