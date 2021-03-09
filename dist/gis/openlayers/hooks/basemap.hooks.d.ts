import { Ref } from 'vue';
import { Basemap } from '../plugins/basemap/basemap';
export declare function useList(basemap: Basemap): [string[], () => void];
export declare function useKey(basemap: Basemap): Ref<string>;
export declare function useVisible(basemap: Basemap): Ref<boolean>;
