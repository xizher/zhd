import { Ref } from 'vue';
import { MapTools } from '../plugins/map-tools/map-tools';
declare function useMark(mapTools: MapTools): [Ref<string>, string[]];
export default useMark;
export declare function useEnabled(mapTools: MapTools): Ref<boolean>;
export declare function useClearMark(mapTools: MapTools): () => void;
export declare function useMarkClearTool(mapTools: MapTools): Ref<boolean>;
