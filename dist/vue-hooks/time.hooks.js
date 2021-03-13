import { ref, computed, onUnmounted } from 'vue';
import { ext } from '../js-exts';
export function useTimeFormat(format = 'yyyy-MM-dd hh:mm:ss') {
    const timeStamp = ref(Date.now());
    const handler = setInterval(() => timeStamp.value = Date.now(), 1000);
    onUnmounted(() => clearInterval(handler));
    const timeFormat = computed(() => ext(timeStamp.value).toDateFormat(format));
    return timeFormat;
}
