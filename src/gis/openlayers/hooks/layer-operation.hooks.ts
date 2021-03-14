import { ComputedRef, reactive } from '@vue/reactivity'
import { computed, watch } from '@vue/runtime-core'
import { ILayerItem, LayerOperation } from '../plugins/layer-operation/layer-operation'


export function useLayerList (layerOperation: LayerOperation) : [ILayerItem[], Map<string, ILayerItem>] {
  const layerPool = layerOperation.layerPool
  const layerList = [...layerPool.values()]
  return [layerList, layerPool]
}
