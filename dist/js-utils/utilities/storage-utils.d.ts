export interface IStorageOptions {
    set<T>(key: string, value: T): IStorageOptions;
    get(key: string): string | null;
    getUseJSON<T>(key: string): T | null;
    remove(key: string): IStorageOptions;
    clear(): IStorageOptions;
}
export interface IStorageUtils {
    local: IStorageOptions;
    session: IStorageOptions;
}
export declare const storageUtils: IStorageUtils;
