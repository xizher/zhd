import { Ref, ref, watch } from 'vue'
import MapTools from '../plugins/map-tools/map-tools'
import MeasureTool, { ClampModeType } from '../plugins/map-tools/tools/measure/measure-tool'

const TOOLNAME = 'measure'

export function useMeasureType (mapTools: MapTools) : Ref<string> {
  const tool = mapTools.getTool(TOOLNAME) as MeasureTool
  const type = ref(tool.measureType)
  watch(type, t => t !== tool.measureType && tool.setMeasureType(t))
  tool.on('change:type', e => type.value = e.type)
  return type
}

export function useMeasureMode (mapTools: MapTools) : Ref<ClampModeType> {
  const tool = mapTools.getTool(TOOLNAME) as MeasureTool
  const mode = ref(tool.clampMode)
  watch(mode, m => m !== tool.clampMode && tool.setClampMode(m))
  tool.on('change:mode', e => mode.value = e.mode)
  return mode
}

export function useMeasureActived (mapTools: MapTools) : Ref<boolean> {
  const tool = mapTools.getTool(TOOLNAME) as MeasureTool
  const actived = ref(tool.actived)
  mapTools.on('change', e => actived.value = (e.currentKey === TOOLNAME))
  watch(actived, b => b ? mapTools.setMapTool(TOOLNAME) : mapTools.setMapTool('default'))
  return actived
}

export function useMeasureTool (mapTools: MapTools)
  : [
    Ref<string>, Ref<ClampModeType>, Ref<boolean>, () => void
  ] {
  const type = useMeasureType(mapTools)
  const mode = useMeasureMode(mapTools)
  const actived = useMeasureActived(mapTools)
  function clear () {
    const tool = mapTools.getTool(TOOLNAME) as MeasureTool
    tool.clearMeasureResult()
  }
  return [type, mode, actived, clear]
}

export default useMeasureTool
