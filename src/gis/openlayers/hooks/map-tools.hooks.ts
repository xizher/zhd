import { reactive, Ref, ref, watch } from 'vue'
import { MapTools } from '../plugins/map-tools/map-tools'

/**
 * 地图工具链钩子
 * @param mapTools 地图工具链插件对象
 * @param toolKeys 当前激活的工具对应Key值
 */
function useMapTools (mapTools: MapTools, toolKeys: string[] = []) : [Ref<string>, string[]] {
  const activedKey = ref(mapTools.activedKey)
  watch(activedKey, k => (k !== mapTools.activedKey) && mapTools.setMapTool(k))
  mapTools.on('change', e => activedKey.value = e.currentKey)
  const list = reactive(toolKeys)
  return [activedKey, list]
}

export default useMapTools
