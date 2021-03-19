import { onUnmounted, reactive, ref, Ref, watch } from 'vue'
import { ext } from '../../../js-exts'
import Basemap from '../plugins/basemap/basemap'

export function useList (basemap: Basemap) : [string[], () => void] {
  const list = reactive(basemap.basemapList)
  function updateList () {
    ext(list).reset(...basemap.basemapList)
  }
  return [list, updateList]
}

export function useKey (basemap: Basemap) : Ref<string> {
  const key = ref(basemap.selectedKey)
  watch(key, k => k !== basemap.selectedKey && basemap.selectBasemap(k))
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

export default function (basemap: Basemap)
  : [Ref<string>, Ref<boolean>, string[], () => void] {
  const key = useKey(basemap)
  const visible = useVisible(basemap)
  const [list, updateList] = useList(basemap)
  return [key, visible, list, updateList]
}
