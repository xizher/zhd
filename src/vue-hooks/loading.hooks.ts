import { computed, ComputedRef, Ref } from 'vue'

const loadSet : Set<Ref<boolean>> = new Set()
const loadState : ComputedRef<boolean> = computed(() => {
  for (const item of loadSet) {
    if (!item.value) {
      return true
    }
  }
  return false
})

export function useLinkIn (boolRef: Ref<boolean>) : void {
  loadSet.add(boolRef)
}

export function useloadingState () : ComputedRef<boolean> {
  return loadState
}
