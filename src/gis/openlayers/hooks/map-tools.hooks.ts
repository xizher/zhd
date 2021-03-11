import { reactive, Ref, ref, watch } from 'vue'
import { MapTools } from '../plugins/map-tools/map-tools'

function useMapTools (mapTools: MapTools, toolKeys: string[]) : [Ref<string>, string[]] {
  const activedKey = ref(mapTools.activedKey)
  watch(activedKey, k => (k !== mapTools.activedKey) && mapTools.setMapTool(k))
  mapTools.on('change', e => activedKey.value = e.currentKey)
  const list = reactive(toolKeys)
  return [activedKey, list]
}

export default useMapTools
