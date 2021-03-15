import { ComputedRef } from '@vue/reactivity';
import { ILayerItem, LayerOperation } from '../plugins/layer-operation/layer-operation';
export declare function useLayerList(layerOperation: LayerOperation): [ILayerItem[], ComputedRef<ILayerItem[]>];
