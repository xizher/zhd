import { onUnmounted, reactive, ref, watch } from 'vue';
import { ext } from '../../../../src/js-exts';
/**
 * 底图可选项列表钩子
 * @param basemap 底图控制插件对象
 */
export function useList(basemap) {
    const list = reactive(basemap.basemapItemList);
    function update() {
        ext(list).reset(...basemap.basemapItemList);
    }
    return [list, update];
}
/**
 * 底图当前显示项对应Key值钩子
 * @param basemap 底图控制插件对象
 */
export function useKey(basemap) {
    const key = ref(basemap.selectedKey);
    watch(key, k => (k !== basemap.selectedKey) && basemap.selectBasemap(k));
    const handler = basemap.on('change:key', e => key.value = e.key);
    onUnmounted(() => handler.remove());
    return key;
}
/**
 * 底图可见性钩子
 * @param basemap 底图控制插件对象
 */
export function useVisible(basemap) {
    const visible = ref(basemap.visible);
    watch(visible, v => (v !== basemap.visible) && basemap.setVisible(v));
    const handler = basemap.on('change:visible', e => visible.value = e.visible);
    onUnmounted(() => handler.remove());
    return visible;
}
/**
 * 底图钩子
 * @param basemap 底图控制插件对象
 */
export default function (basemap) {
    const [list, update] = useList(basemap);
    const key = useKey(basemap);
    const visible = useVisible(basemap);
    return [key, visible, list, update];
}
