import XYZ from 'ol/source/XYZ';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import LayerGroup from 'ol/layer/Group';
import VectorLayer from 'ol/layer/Vector';
import { baseUtils } from '../../../js-utils/index';
/**
 * 创建XYZ图层
 * @param xyzUrl XYZ地址
 * @param options 配置项
 */
export function createXYZLayer(xyzUrl, options = {}) {
    const _options = {
        url: xyzUrl
    };
    baseUtils.$extend(true, _options, options.xyzOptions ?? {});
    const source = new XYZ(_options);
    return new TileLayer({ ...(options.layerOptions ?? {}), source });
}
/**
 * 创建OSM图层
 * @param options 配置项
 */
export function createOSMLayer(options = {}) {
    const source = new OSM(options.osmOptions ?? {});
    return new TileLayer({ ...(options.layerOptions ?? {}), source });
}
/**
 * 创建图层组
 * @param options 配置项
 */
export function createLayerGroup(options = {}) {
    return new LayerGroup(options);
}
/**
 * 创建矢量图层
 * @param options 配置项
 */
export function createVectorLayer(options = {}) {
    return new VectorLayer({ source: new VectorSource(), ...options });
}
