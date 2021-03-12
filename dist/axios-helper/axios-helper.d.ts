import { AxiosRequestConfig } from 'axios';
export interface IAxiosHelper {
    setUrl(url: string): IAxiosHelper;
    setParams<T>(params: T): IAxiosHelper;
    setData<T>(data: T): IAxiosHelper;
    setConfig(config: AxiosRequestConfig): IAxiosHelper;
    mountGet<T>(): Promise<T>;
    mountPost<T>(): Promise<T>;
}
export interface IAxiosStore {
    url: string;
    params: any;
    data: any;
    config: AxiosRequestConfig;
}
declare function axiosHelper(): IAxiosHelper;
export default axiosHelper;
