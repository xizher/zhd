import { reactive, ref, watch } from 'vue';
function useMapTools(mapTools, toolKeys) {
    const activedKey = ref(mapTools.activedKey);
    watch(activedKey, k => (k !== mapTools.activedKey) && mapTools.setMapTool(k));
    mapTools.on('change', e => activedKey.value = e.currentKey);
    const list = reactive(toolKeys);
    return [activedKey, list];
}
export default useMapTools;
