import { computed } from 'vue';
const loadSet = new Set();
const loadState = computed(() => {
    for (const item of loadSet) {
        if (!item.value) {
            return true;
        }
    }
    return false;
});
export function useLinkIn(boolRef) {
    loadSet.add(boolRef);
}
export function useloadingState() {
    return loadState;
}
