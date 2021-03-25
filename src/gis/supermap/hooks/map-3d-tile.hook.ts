import { reactive, watch } from 'vue'
import { ext } from '../../../js-exts'
import Map3dTile from '../plugins/map-3d-tile/map-3d-tile'

export interface ITilesetList {
  name: string
  visible: boolean
  zoomTo () : void
}

export function useMap3dTile (map3dTile: Map3dTile) : [ITilesetList[], () => void] {
  const loadDataSource : () => ITilesetList[] = () => map3dTile.tilesetNames.map(name => ({
    name,
    visible: map3dTile.getTilesetByName(name).show,
    zoomTo () {
      map3dTile.zoomToTileset(name)
    }
  }))
  const tilesetList = reactive(loadDataSource())
  tilesetList.forEach(item => {
    watch(
      () => item.visible,
      visible => map3dTile.setTilesetVisible(item.name, visible)
    )
  })
  const update = () => ext(tilesetList).reset(...loadDataSource())
  return [tilesetList, update]
}

export default useMap3dTile
