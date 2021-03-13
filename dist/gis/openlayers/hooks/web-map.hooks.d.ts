import { ToRefs } from '@vue/reactivity';
import { WebMap } from '../web-map/web-map';
export interface IMouseCoordinateOptions {
    xyRound?: number;
    lonlatRound?: number;
}
export declare function useMouseCoordinate(webMap: WebMap, options?: IMouseCoordinateOptions): ToRefs<{
    coordinateX: number;
    coordinateY: number;
    longitude: number;
    latitude: number;
    xyFormat: string;
    lonlatFormat: string;
}>;
