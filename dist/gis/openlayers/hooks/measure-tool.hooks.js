import { onUnmounted, ref, watch } from 'vue';
const TOOL_NAME = 'measure';
export function useEnabled(mapTools) {
    const enabled = ref(mapTools.activedKey === TOOL_NAME);
    const handler = mapTools.on('change', e => enabled.value = e.currentKey === TOOL_NAME);
    watch(enabled, b => {
        b
            ? mapTools.activedKey !== TOOL_NAME && mapTools.setMapTool(TOOL_NAME)
            : mapTools.activedKey === TOOL_NAME && mapTools.setMapTool('default');
    });
    onUnmounted(() => handler.remove());
    return enabled;
}
export function useType(mapTools) {
    const measureTool = mapTools.getTool(TOOL_NAME);
    const type = ref(mapTools.activedKey === 'mark' ? measureTool.type : '');
    const handler = measureTool.on('change:type', e => type.value = e.type);
    onUnmounted(() => handler.remove());
    const handler2 = mapTools.on('change', e => {
        if (e.currentKey !== TOOL_NAME) {
            type.value = '';
        }
    });
    onUnmounted(() => handler2.remove());
    watch(type, t => {
        if (t) {
            t !== measureTool.type && measureTool.setMeasureType(t);
            mapTools.activedKey !== TOOL_NAME && mapTools.setMapTool(TOOL_NAME);
        }
    });
    return [type, ['area', 'length']];
}
export function useClear(mapTools) {
    const measureTool = mapTools.getTool(TOOL_NAME);
    return () => {
        measureTool.clearMeasure();
    };
}
export function useMeasureRemoveTool(mapTools) {
    const actived = ref(mapTools.activedKey === 'measure-remove');
    watch(actived, b => {
        if (b) {
            mapTools.activedKey !== 'measure-remove' && mapTools.setMapTool('measure-remove');
        }
        else {
            mapTools.activedKey === 'measure-remove' && mapTools.setMapTool('default');
        }
    });
    const handler = mapTools.on('change', e => actived.value = e.currentKey === 'measure-remove');
    onUnmounted(() => handler.remove());
    return actived;
}
