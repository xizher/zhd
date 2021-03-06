import { onUnmounted, reactive, ref, watch } from 'vue'
import { ext } from '../../dist/js-exts'

/**
 *
 * @param { import('../../src/gis/openlayers').Basemap } basemap
 * @returns { [string[], () => void] }
 */
export function useList (basemap) {
  const list = reactive(basemap.basemapItemList)
  function update () {
    ext(list).reset(...basemap.basemapItemList)
  }
  return [list, update]
}

/**
 *
 * @param { import('../../src/gis/openlayers').Basemap } basemap
 * @returns { import('@vue/reactivity').Ref<string> }
 */
export function useKey (basemap) {
  const key = ref(basemap.selectedKey)
  watch(key, k => (k !== basemap.selectedKey) && basemap.selectBasemap(k))
  const handler = basemap.on('change:key', e => key.value = e.key)
  onUnmounted(() => handler.remove())
  return key
}

/**
 *
 * @param { import('../../src/gis/openlayers').Basemap } basemap
 * @returns { import('@vue/reactivity').Ref<string> }
 */
export function useVisible (basemap) {
  const visible = ref(basemap.visible)
  watch(visible, v => (v !== basemap.visible) && basemap.setVisible(v))
  const handler = basemap.on('change:visible', e => visible.value = e.visible)
  onUnmounted(() => handler.remove())
  return visible
}
