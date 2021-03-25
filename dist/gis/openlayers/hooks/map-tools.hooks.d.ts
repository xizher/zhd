import { Ref } from 'vue';
import { MapTools } from '../plugins/map-tools/map-tools';
/**
 * 地图工具链钩子
 * @param mapTools 地图工具链插件对象
 * @param toolKeys 当前激活的工具对应Key值
 */
declare function useMapTools(mapTools: MapTools, toolKeys?: string[]): [Ref<string>, string[]];
export default useMapTools;
