import { ref, watch } from 'vue';
function useMark(mapTools) {
    const markTool = mapTools.getTool('mark');
    const typeList = ['Point', 'LineString', 'Polygon', 'Circle'];
    const selectedType = ref(mapTools.activedKey === 'mark' ? markTool.markType : '');
    mapTools.on('change', e => {
        if (e.currentKey !== 'mark') {
            selectedType.value = '';
        }
    });
    watch(selectedType, val => {
        if (val) {
            markTool.setMarkType(val);
            mapTools.setMapTool('mark');
        }
    });
    markTool.on('change:mark-type', e => {
        if (e.type !== selectedType.value) {
            selectedType.value = e.type;
        }
    });
    return [selectedType, typeList];
}
export default useMark;
export function useEnabled(mapTools) {
    const enabled = ref(mapTools.activedKey === 'mark');
    mapTools.on('change', e => {
        e.currentKey === 'mark'
            ? enabled.value = true
            : enabled.value = false;
    });
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
export function useMarkClearTool(mapTools) {
    const actived = ref(mapTools.activedKey === 'mark-clear');
    watch(actived, b => {
        if (b) {
            mapTools.activedKey !== 'mark-clear' && mapTools.setMapTool('mark-clear');
        }
        else {
            mapTools.setMapTool('default');
        }
    });
    mapTools.on('change', e => {
        // if (e.currentKey !== )
    });
    return actived;
}
