import { Ref } from 'vue';
import { Basemap } from '../plugins/basemap/basemap';
/**
 * 底图可选项列表钩子
 * @param basemap 底图控制插件对象
 */
export declare function useList(basemap: Basemap): [string[], () => void];
/**
 * 底图当前显示项对应Key值钩子
 * @param basemap 底图控制插件对象
 */
export declare function useKey(basemap: Basemap): Ref<string>;
/**
 * 底图可见性钩子
 * @param basemap 底图控制插件对象
 */
export declare function useVisible(basemap: Basemap): Ref<boolean>;
/**
 * 底图钩子
 * @param basemap 底图控制插件对象
 */
export default function (basemap: Basemap): [Ref<string>, Ref<boolean>, string[], () => void];
