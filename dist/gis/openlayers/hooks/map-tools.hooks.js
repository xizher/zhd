import { reactive, ref, watch } from 'vue';
/**
 * 地图工具链钩子
 * @param mapTools 地图工具链插件对象
 * @param toolKeys 当前激活的工具对应Key值
 */
function useMapTools(mapTools, toolKeys = []) {
    const activedKey = ref(mapTools.activedKey);
    watch(activedKey, k => (k !== mapTools.activedKey) && mapTools.setMapTool(k));
    mapTools.on('change', e => activedKey.value = e.currentKey);
    const list = reactive(toolKeys);
    return [activedKey, list];
}
export default useMapTools;
