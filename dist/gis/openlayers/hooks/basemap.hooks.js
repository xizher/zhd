import { onUnmounted, reactive, ref, watch } from 'vue';
import { ext } from '../../../../src/js-exts';
export function useList(basemap) {
    const list = reactive(basemap.basemapItemList);
    function update() {
        ext(list).reset(...basemap.basemapItemList);
    }
    return [list, update];
}
export function useKey(basemap) {
    const key = ref(basemap.selectedKey);
    watch(key, k => (k !== basemap.selectedKey) && basemap.selectBasemap(k));
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
