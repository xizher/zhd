import { computed } from 'vue';
const loadSet = new Set();
const loadState = computed(() => {
    for (const item of loadSet) {
        if (!item.value) {
            return false;
        }
    }
    return true;
});
export function useLinkIn(boolRef) {
    loadSet.add(boolRef);
}
export function useloadState() {
    return loadState;
}
