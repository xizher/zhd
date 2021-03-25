import { ComputedRef } from 'vue';
import { ILayerItem, LayerOperation } from '../plugins/layer-operation/layer-operation';
/**
 * 图层列表钩子
 * @param layerOperation 图层控制插件对象
 */
export declare function useLayerList(layerOperation: LayerOperation): [ILayerItem[], ComputedRef<ILayerItem[]>];
/**
 * 指定图层属性表钩子
 * @param layerOperation 图层控制插件对象
 * @param layerName 图层名
 */
export declare function useLayerAttributes<T>(layerOperation: LayerOperation, layerName: string): T[];
