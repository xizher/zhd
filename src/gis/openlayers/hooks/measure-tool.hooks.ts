import { onUnmounted, ref, Ref, watch } from 'vue'
import { MapTools } from '../plugins/map-tools/map-tools'
import { MeasureTool, MeasureType } from '../plugins/map-tools/tools/measure/measure-tool'

const TOOL_NAME = 'measure'

/**
 * 测量工具开启状态钩子
 * @param mapTools 地图工具链插件对象
 */
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

/**
 * 测量类型钩子
 * @param mapTools 地图工具链插件对象
 */
export function useType (mapTools: MapTools) : Ref<MeasureType> {
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
  return type
}

/**
 * 测量类型列表钩子
 * @param mapTools 地图工具链插件对象
 */
export function useList () : { name: MeasureType, alias: string }[] {
  return [
    { name: 'area', alias: '面积' },
    { name: 'length', alias: '长度' },
  ]
}

/**
 * 测量清理钩子
 * @param mapTools 地图工具链插件对象
 */
export function useClearMeasure (mapTools: MapTools) : () => void {
  const measureTool = mapTools.getTool(TOOL_NAME) as MeasureTool
  return () => {
    measureTool.clearMeasure()
  }
}

/**
 * 测量移除工具开启状态钩子
 * @param mapTools 地图工具链插件对象
 */
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

/**
 * 测量工具钩子
 * @param mapTools 地图工具链插件对象
 */
export default function (mapTools: MapTools)
  : [
    Ref<string>,
    { name: MeasureType, alias: string }[],
    Ref<boolean>,
    () => void,
    Ref<boolean>,
  ] {
  const type = useType(mapTools)
  const list = useList()
  const enabled = useEnabled(mapTools)
  const clear = useClearMeasure(mapTools)
  const measureRemoveToolActived = useMeasureRemoveTool(mapTools)
  return [
    type,
    list,
    enabled,
    clear,
    measureRemoveToolActived,
  ]
}
