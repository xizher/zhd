import { onUnmounted, ref, Ref, watch } from 'vue'
import { MapTools } from '../plugins/map-tools/map-tools'
import { MeasureTool, MeasureType } from '../plugins/map-tools/tools/measure/measure-tool'

const TOOL_NAME = 'measure'

export function useEnabled (mapTools: MapTools) : Ref<boolean> {
  const enabled = ref(mapTools.activedKey === TOOL_NAME)
  const handler = mapTools.on('change', e => enabled.value = e.currentKey === TOOL_NAME)
  watch(enabled, b => {
    b
      ? mapTools.activedKey !== TOOL_NAME && mapTools.setMapTool(TOOL_NAME)
      : mapTools.activedKey === TOOL_NAME && mapTools.setMapTool('default')
  })
  onUnmounted(() => handler.remove())
  return enabled
}

export function useType (mapTools: MapTools) : [Ref<MeasureType>, { name: MeasureType, alias: string }[]] {
  const measureTool = mapTools.getTool(TOOL_NAME) as MeasureTool
  const type = ref(mapTools.activedKey === 'mark' ? measureTool.type : '')
  const handler = measureTool.on('change:type', e => type.value = e.type)
  onUnmounted(() => handler.remove())
  const handler2 = mapTools.on('change', e => {
    if (e.currentKey !== TOOL_NAME) {
      type.value = ''
    }
  })
  onUnmounted(() => handler2.remove())
  watch(type, t => {
    if (t) {
      t !== measureTool.type && measureTool.setMeasureType(t)
      mapTools.activedKey !== TOOL_NAME && mapTools.setMapTool(TOOL_NAME)
    }
  })
  return [type, [
    { name: 'area', alias: '面积' },
    { name: 'length', alias: '长度' },
  ]]
}

export function useClear (mapTools: MapTools) : () => void {
  const measureTool = mapTools.getTool(TOOL_NAME) as MeasureTool
  return () => {
    measureTool.clearMeasure()
  }
}

export function useMeasureRemoveTool (mapTools: MapTools) : Ref<boolean> {
  const actived = ref(mapTools.activedKey === 'measure-remove')
  watch(actived, b => {
    if (b) {
      mapTools.activedKey !== 'measure-remove' && mapTools.setMapTool('measure-remove')
    } else {
      mapTools.activedKey === 'measure-remove' && mapTools.setMapTool('default')
    }
  })
  const handler = mapTools.on('change', e => actived.value = e.currentKey === 'measure-remove')
  onUnmounted(() => handler.remove())
  return actived
}
