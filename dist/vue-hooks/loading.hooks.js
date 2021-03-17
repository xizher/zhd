import { computed } from 'vue';
const loadedSet = new Set();
const loadingState = computed(() => {
    for (const item of loadedSet) {
        if (!item.value) {
            return true;
        }
    }
    return false;
});
export function useLinkIn(boolRef) {
    loadedSet.add(boolRef);
}
export function useloadingState() {
    return loadingState;
}
export function useUnLink(boolRef) {
    loadedSet.delete(boolRef);
}
