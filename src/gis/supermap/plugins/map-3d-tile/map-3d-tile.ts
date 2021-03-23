import { baseUtils } from '../../../../js-utils'
import { $Supermap, Supermap } from '../../init-modules/init-modules'
import WebMap from '../../web-map/web-map'
import WebMapPlugin from '../../web-map/web-map-plugin'

export interface ITilesetItem {
  name?: string
  url?: string
  offsetHeight?: number
}

export interface IMap3dTileOptions {
  tilesetItems: ITilesetItem[]
  zoomItemName?: string
}

/** 插件：3dTile工具类 */
export class Map3dTile extends WebMapPlugin<{
  'change:visible': {
    tilesetName: string
    tileset: $Supermap.__Cesium3DTileset
    visible: boolean
  }
}> {

  //#region 私有属性

  private _tilesetPool : Map<string, $Supermap.__Cesium3DTileset> = new Map()

  /** 配置项 */
  private _options: IMap3dTileOptions = {
    tilesetItems: []
  }

  //#endregion

  //#region getter

  get tilesetNames () : string[] {
    return [...this._tilesetPool.keys()]
  }

  //#endregion

  //#region 构造函数

  constructor (options: IMap3dTileOptions) {
    super('map3dTile')
    baseUtils.$extend(true, this._options, options)
  }

  //#endregion

  //#region 私有方法

  private _init () {
    this._options.tilesetItems.forEach(
      item => this._createTileset(item)
    )
  }

  private _createTileset (tilesetItem: ITilesetItem) : this {
    const { name, url, offsetHeight } = tilesetItem
    const tileset = new Supermap.Cesium3DTileset({ url })
    tileset.readyPromise.then(() => {
      this.viewer.scene.primitives.add(tileset)
      Map3dTile.setTilesetOffsetHeight(tileset, offsetHeight)
      if (name === this._options.zoomItemName) {
        this.viewer.flyTo(tileset)
      }
    })
    this._tilesetPool.set(name, tileset)
    return this
  }

  //#endregion

  //#region 公有方法

  /** 安装插件 */
  installPlugin (webMap: WebMap) : this {
    super.installPlugin(webMap)
    this._init()
    return this
  }

  /**
   * 获取tileset通过名称方式
   * @param name tileset名称
   */
  getTilesetByName (name: string) : $Supermap.__Cesium3DTileset | null {
    if (!this._tilesetPool.has(name)) {
      return null
    }
    return this._tilesetPool.get(name)
  }

  /**
   * 设置tileset可见性
   * @param name tileset名称
   * @param visible tileset可见性
   */
  setTilesetVisible (name: string, visible: boolean) : this {
    const tileset = this.getTilesetByName(name)
    tileset && (tileset.show = visible)
    this.fire('change:visible', {
      tilesetName: name,
      tileset, visible
    })
    return this
  }

  /**
   * 缩放至指定tileset
   * @param name tileset名称
   */
  zoomToTileset (name: string) : this {
    const tileset = this.getTilesetByName(name)
    tileset && this.viewer.flyTo(tileset)
    return this
  }

  //#endregion

  //#region 静态方法

  static setTilesetOffsetHeight (tileset: $Supermap.__Cesium3DTileset, height: number) : void {
    const cartographic = Supermap.Cartographic.fromCartesian(
      tileset.boundingSphere.center
    )
    const surface = Supermap.Cartesian3.fromRadians(
      cartographic.longitude,
      cartographic.latitude,
      0.0
    )
    const offset = Supermap.Cartesian3.fromRadians(
      cartographic.longitude,
      cartographic.latitude,
      height
    )
    const translation = Supermap.Cartesian3.subtract(
      offset,
      surface,
      new Supermap.Cartesian3()
    )
    tileset.modelMatrix = Supermap.Matrix4.fromTranslation(translation)
  }

  //#endregion

}

export default Map3dTile
