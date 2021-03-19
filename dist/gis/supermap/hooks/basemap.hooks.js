import { onUnmounted, reactive, ref, watch } from 'vue';
import { ext } from '../../../js-exts';
export function useList(basemap) {
    const list = reactive(basemap.basemapList);
    function updateList() {
        ext(list).reset(...basemap.basemapList);
    }
    return [list, updateList];
}
export function useKey(basemap) {
    const key = ref(basemap.selectedKey);
    watch(key, k => k !== basemap.selectedKey && basemap.selectBasemap(k));
    const handler = basemap.on('change:key', e => key.value = e.key);
    onUnmounted(() => handler.remove());
    return key;
}
export function useVisible(basemap) {
    const visible = ref(basemap.visible);
    watch(visible, v => (v !== basemap.visible) && basemap.setVisible(v));
    const handler = basemap.on('change:visible', e => visible.value = e.visible);
    onUnmounted(() => handler.remove());
    return visible;
}
export default function (basemap) {
    const key = useKey(basemap);
    const visible = useVisible(basemap);
    const [list, updateList] = useList(basemap);
    return [key, visible, list, updateList];
}
