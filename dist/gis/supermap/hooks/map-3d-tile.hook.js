import { reactive, watch } from 'vue';
import { ext } from '../../../js-exts';
export function useMap3dTile(map3dTile) {
    const loadDataSource = () => map3dTile.tilesetNames.map(name => ({
        name,
        visible: map3dTile.getTilesetByName(name).show,
        zoomTo() {
            map3dTile.zoomToTileset(name);
        }
    }));
    const tilesetList = reactive(loadDataSource());
    tilesetList.forEach(item => {
        watch(() => item.visible, visible => map3dTile.setTilesetVisible(item.name, visible));
    });
    const update = () => ext(tilesetList).reset(...loadDataSource());
    return [tilesetList, update];
}
export default useMap3dTile;
