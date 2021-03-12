import { Extent } from 'ol/extent';
/** 对象接口 */
export interface IObject<T = any> {
    [key: string]: T;
}
export interface IWMSCapabilitiesResult {
    Capability: {
        Layer: {
            Layer: {
                Name: string;
                EX_GeographicBoundingBox: Extent;
            }[];
        };
    };
    Service: {};
    version: string;
}
