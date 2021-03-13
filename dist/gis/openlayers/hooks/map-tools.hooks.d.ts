import { Ref } from 'vue';
import { MapTools } from '../plugins/map-tools/map-tools';
declare function useMapTools(mapTools: MapTools, toolKeys?: string[]): [Ref<string>, string[]];
export default useMapTools;
