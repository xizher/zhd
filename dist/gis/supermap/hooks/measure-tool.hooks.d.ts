import { Ref } from 'vue';
import MapTools from '../plugins/map-tools/map-tools';
import { ClampModeType } from '../plugins/map-tools/tools/measure/measure-tool';
export declare function useMeasureType(mapTools: MapTools): Ref<string>;
export declare function useMeasureMode(mapTools: MapTools): Ref<ClampModeType>;
export declare function useMeasureActived(mapTools: MapTools): Ref<boolean>;
export declare function useMeasureTool(mapTools: MapTools): [
    Ref<string>,
    Ref<ClampModeType>,
    Ref<boolean>,
    () => void
];
export default useMeasureTool;
