import { computed, ComputedRef, Ref } from 'vue'
const loadedSet : Set<Ref<boolean>> = new Set()
const loadingState : ComputedRef<boolean> = computed(() => {
  for (const item of loadedSet) {
    if (!item.value) {
      return true
    }
  }
  return false
})

export function useLinkIn (boolRef: Ref<boolean>) : void {
  loadedSet.add(boolRef)
}

export function useloadingState () : ComputedRef<boolean> {
  return loadingState
}

export function useUnLink (boolRef: Ref<boolean>) : void {
  loadedSet.delete(boolRef)
}
