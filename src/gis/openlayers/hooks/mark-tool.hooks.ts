import { Ref, ref, watch } from 'vue'
import { MapTools } from '../plugins/map-tools/map-tools'
import { MarkGeometryType, MarkTool } from '../plugins/map-tools/tools/mark/mark-tool'

function useMark (mapTools: MapTools) : [Ref<string>, string[]] {
  const markTool = mapTools.getTool('mark') as MarkTool
  const typeList = ['Point', 'LineString', 'Polygon', 'Circle']
  const selectedType = ref(mapTools.activedKey === 'mark' ? markTool.markType : '')
  mapTools.on('change', e => {
    if (e.currentKey !== 'mark') {
      selectedType.value = ''
    }
  })
  watch(selectedType, val => {
    if (val) {
      markTool.setMarkType(val as MarkGeometryType)
      mapTools.setMapTool('mark')
    }
  })
  markTool.on('change:mark-type', e => {
    if (e.type !== selectedType.value) {
      selectedType.value = e.type
    }
  })
  return [selectedType, typeList]
}
export default useMark

export function useEnabled (mapTools: MapTools) : Ref<boolean> {
  const enabled = ref(mapTools.activedKey === 'mark')
  mapTools.on('change', e => {
    e.currentKey === 'mark'
      ? enabled.value = true
      : enabled.value = false
  })
  watch(enabled, b => {
    if (b) {
      mapTools.activedKey !== 'mark' && mapTools.setMapTool('mark')
    } else {
      mapTools.activedKey === 'mark' && mapTools.setMapTool('default')
    }
  })
  return enabled
}

export function useClearMark (mapTools: MapTools) : () => void {
  const markTool = mapTools.getTool('mark') as MarkTool
  return () => {
    markTool.clearMark()
  }
}

export function useMarkClearTool (mapTools: MapTools) : Ref<boolean> {
  const actived = ref(mapTools.activedKey === 'mark-clear')
  watch(actived, b => {
    if (b) {
      mapTools.activedKey !== 'mark-clear' && mapTools.setMapTool('mark-clear')
    } else {
      mapTools.setMapTool('default')
    }
  })
  mapTools.on('change', e => {
    actived.value = e.currentKey === 'mark'
  })
  return actived
}
