import { onUnmounted, reactive, ref, Ref, watch } from 'vue'
import { ext } from '../../../../src/js-exts'
import { Basemap } from '../plugins/basemap/basemap'

export function useList (basemap: Basemap) : [string[], () => void] {
  const list = reactive(basemap.basemapItemList)
  function update () {
    ext(list).reset(...basemap.basemapItemList)
  }
  return [list, update]
}

export function useKey (basemap: Basemap) : Ref<string> {
  const key = ref(basemap.selectedKey)
  watch(key, k => (k !== basemap.selectedKey) && basemap.selectBasemap(k))
  const handler = basemap.on('change:key', e => key.value = e.key)
  onUnmounted(() => handler.remove())
  return key
}

export function useVisible (basemap: Basemap) : Ref<boolean> {
  const visible = ref(basemap.visible)
  watch(visible, v => (v !== basemap.visible) && basemap.setVisible(v))
  const handler = basemap.on('change:visible', e => visible.value = e.visible)
  onUnmounted(() => handler.remove())
  return visible
}
