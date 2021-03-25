declare class AjaxStore {
    url: string;
    params: {};
    data: {};
    headers: HeadersInit;
    otherOptions: {};
    clone(): AjaxStore;
}
export interface IAjax {
    setUrl(url: string): IAjax;
    setParams<T>(params: T): IAjax;
    setData<T>(data: T): IAjax;
    setHeaders(headers: HeadersInit): IAjax;
    setOtherOptions(options: RequestInit): IAjax;
    mountGet(): Promise<Response>;
    mountPost(): Promise<Response>;
}
export declare function createAjax(store?: AjaxStore): IAjax;
export {};
