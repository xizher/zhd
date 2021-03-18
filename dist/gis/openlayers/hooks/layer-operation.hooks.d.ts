import { ComputedRef } from 'vue';
import { ILayerItem, LayerOperation } from '../plugins/layer-operation/layer-operation';
export declare function useLayerList(layerOperation: LayerOperation): [ILayerItem[], ComputedRef<ILayerItem[]>];
export declare function useLayerAttributes<T>(layerOperation: LayerOperation, layerName: string): T[];
