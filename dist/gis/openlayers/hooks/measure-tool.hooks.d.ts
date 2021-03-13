import { Ref } from 'vue';
import { MapTools } from '../plugins/map-tools/map-tools';
import { MeasureType } from '../plugins/map-tools/tools/measure/measure-tool';
export declare function useEnabled(mapTools: MapTools): Ref<boolean>;
export declare function useType(mapTools: MapTools): [Ref<MeasureType>, {
    name: MeasureType;
    alias: string;
}[]];
export declare function useClear(mapTools: MapTools): () => void;
export declare function useMeasureRemoveTool(mapTools: MapTools): Ref<boolean>;
