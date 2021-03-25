import Map3dTile from '../plugins/map-3d-tile/map-3d-tile';
export interface ITilesetList {
    name: string;
    visible: boolean;
    zoomTo(): void;
}
export declare function useMap3dTile(map3dTile: Map3dTile): [ITilesetList[], () => void];
export default useMap3dTile;
