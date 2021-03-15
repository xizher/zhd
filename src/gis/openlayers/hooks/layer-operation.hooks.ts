import { ComputedRef, reactive } from '@vue/reactivity'
import { computed, onUnmounted, watch } from '@vue/runtime-core'
import { ILayerItem, LayerOperation } from '../plugins/layer-operation/layer-operation'


export function useLayerList (layerOperation: LayerOperation)
  : [ILayerItem[], ComputedRef<ILayerItem[]>] {
  const layerList = reactive([...(layerOperation.layerPool.values())]) as ILayerItem[]
  for (let i = 0; i < layerList.length; i++) {
    const layerItem = layerList[i]
    watch(() => layerItem.visible, visible => {
      layerOperation.setLayerVisible(layerItem.name, visible)
    })
    watch(() => layerItem.opacity, opacity => {
      layerOperation.setLayerOpacity(layerItem.name, opacity)
    })
    watch(() => layerItem.level, level => {
      layerOperation.setLayerLevel(layerItem.name, level)
    })
  }
  {
    const handler = layerOperation.on('change:visible', e => {
      layerList.find(item => item.name === e.layerName).visible = e.visible
    })
    onUnmounted(() => handler.remove())
  } {
    const handler = layerOperation.on('change:opacity', e => {
      layerList.find(item => item.name === e.layerName).opacity = e.opacity
    })
    onUnmounted(() => handler.remove())
  } {
    const handler = layerOperation.on('change:level', () => {
      [...(layerOperation.layerPool.values())].forEach(item => {
        layerList.find(lyr => lyr.name === item.name).level = item.level
      })
    })
    onUnmounted(() => handler.remove())
  }
  const layerFormatList = computed(() => layerList.sort((i, j) => j.level - i.level))
  return [layerList, layerFormatList]
}