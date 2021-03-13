import { onUnmounted, ref, watch } from 'vue';
function useMark(mapTools) {
    const markTool = mapTools.getTool('mark');
    const typeList = [
        { name: 'Point', alias: '点' },
        { name: 'LineString', alias: '线' },
        { name: 'Polygon', alias: '面' },
        { name: 'Circle', alias: '圆' }
    ];
    const selectedType = ref(mapTools.activedKey === 'mark' ? markTool.markType : '');
    const handler = mapTools.on('change', e => {
        if (e.currentKey !== 'mark') {
            selectedType.value = '';
        }
    });
    onUnmounted(() => handler.remove());
    watch(selectedType, val => {
        if (val) {
            markTool.setMarkType(val);
            mapTools.setMapTool('mark');
        }
    });
    const handler2 = markTool.on('change:mark-type', e => {
        if (e.type !== selectedType.value) {
            selectedType.value = e.type;
        }
    });
    onUnmounted(() => handler2.remove());
    return [selectedType, typeList];
}
export default useMark;
export function useEnabled(mapTools) {
    const enabled = ref(mapTools.activedKey === 'mark');
    const handler = mapTools.on('change', e => {
        e.currentKey === 'mark'
            ? enabled.value = true
            : enabled.value = false;
    });
    onUnmounted(() => handler.remove());
    watch(enabled, b => {
        if (b) {
            mapTools.activedKey !== 'mark' && mapTools.setMapTool('mark');
        }
        else {
            mapTools.activedKey === 'mark' && mapTools.setMapTool('default');
        }
    });
    return enabled;
}
export function useClearMark(mapTools) {
    const markTool = mapTools.getTool('mark');
    return () => {
        markTool.clearMark();
    };
}
export function useMarkRemoveTool(mapTools) {
    const actived = ref(mapTools.activedKey === 'mark-remove');
    watch(actived, b => {
        if (b) {
            mapTools.activedKey !== 'mark-remove' && mapTools.setMapTool('mark-remove');
        }
        else {
            mapTools.activedKey === 'mark-remove' && mapTools.setMapTool('default');
        }
    });
    const handler = mapTools.on('change', e => actived.value = e.currentKey === 'mark-remove');
    onUnmounted(() => handler.remove());
    return actived;
}
