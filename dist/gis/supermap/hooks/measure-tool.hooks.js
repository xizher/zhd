import { ref, watch } from 'vue';
const TOOLNAME = 'measure';
export function useMeasureType(mapTools) {
    const tool = mapTools.getTool(TOOLNAME);
    const type = ref(tool.measureType);
    watch(type, t => t !== tool.measureType && tool.setMeasureType(t));
    tool.on('change:type', e => type.value = e.type);
    return type;
}
export function useMeasureMode(mapTools) {
    const tool = mapTools.getTool(TOOLNAME);
    const mode = ref(tool.clampMode);
    watch(mode, m => m !== tool.clampMode && tool.setClampMode(m));
    tool.on('change:mode', e => mode.value = e.mode);
    return mode;
}
export function useMeasureActived(mapTools) {
    const tool = mapTools.getTool(TOOLNAME);
    const actived = ref(tool.actived);
    mapTools.on('change', e => actived.value = (e.currentKey === TOOLNAME));
    watch(actived, b => b ? mapTools.setMapTool(TOOLNAME) : mapTools.setMapTool('default'));
    return actived;
}
export function useMeasureTool(mapTools) {
    const type = useMeasureType(mapTools);
    const mode = useMeasureMode(mapTools);
    const actived = useMeasureActived(mapTools);
    function clear() {
        const tool = mapTools.getTool(TOOLNAME);
        tool.clearMeasureResult();
    }
    return [type, mode, actived, clear];
}
export default useMeasureTool;
