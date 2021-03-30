import {
  Cartesian3,
  Cartographic,
  Matrix4,
  Cesium3DTileset,
  Cesium3DTileStyle,
} from 'cesium'
import { baseUtils } from '../../../../js-utils'
import WebMap from '../../web-map/web-map'
import WebMapPlugin from '../../web-map/web-map-plugin'

export interface I3dTileItemOptions {
  name: string
  url: string
  offsetHeight: number
}

export interface IMap3dTileOptions {
  tilesetItems: I3dTileItemOptions[]
  defaultZoomItemName?: string
}

/** 地图三维模型控制插件 */
export class Map3dTile extends WebMapPlugin<{
  'change:visible': {
    tileset: Cesium3DTileset
    visible: boolean
  }
}> {

  //#region 私有属性

  /** 配置项 */
  private _options : IMap3dTileOptions = {
    tilesetItems: []
  }

  /** 模型池 */
  private _tilesetPool : Map<string, [Cesium3DTileset, I3dTileItemOptions]> = new Map()

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

  /** 初始化 */
  private _init () {
    this._options.tilesetItems.forEach(
      item => this._createTileset(item)
    )
  }

  /** 创建模型数据集 */
  private _createTileset (tileItemOptions: I3dTileItemOptions) : this {
    const { name, url, offsetHeight } = tileItemOptions
    const tileset = new Cesium3DTileset({ url })
    tileset.readyPromise.then(() => {
      offsetHeight ?? Map3dTile.SetTilesetOffsetHeight(tileset, offsetHeight)
      this.viewer.scene.primitives.add(tileset)
      if (name === this._options.defaultZoomItemName) {
        this.zoomToTileset(tileset)
      }
    })
    this._tilesetPool.set(name, [tileset, tileItemOptions])
    return this
  }

  //#endregion

  //#region 公有方法

  /** 重写插件安装方法 */
  public installPlugin (webMap: WebMap) : this {
    super.installPlugin(webMap)
    this._init()
    return this
  }

  /**
   * 获取模型对象（通过名称检索方式）
   * @param name 模型名
   */
  public getTilesetByName (name: string) : Cesium3DTileset | null {
    if (!this._tilesetPool.has(name)) {
      return null
    }
    return this._tilesetPool.get(name)[0]
  }

  /**
   * 缩放至模型
   * @param name 模型名称
   */
  public zoomToTileset (name: string) : this
  /**
   * 缩放至模型
   * @param tileset 模型对象
   */
  public zoomToTileset (tileset: Cesium3DTileset) : this
  /** 缩放至模型 */
  public zoomToTileset (...args: [string] | [Cesium3DTileset]) : this {
    let tileset: string | Cesium3DTileset = args[0]
    if (typeof tileset === 'string') {
      tileset = this.getTilesetByName(tileset)
    }
    tileset && this.viewer.flyTo(tileset, { duration: .5, offset: {
      heading: 0, pitch: -90, range: 0
    } })
    return this
  }

  /**
   * 设置模型可见性
   * @param name 模型名
   * @param visible 可见性
   */
  public setTilesetVisible (name: string, visible: boolean) : this
  /**
   * 设置模型可见性
   * @param tileset 模型对象
   * @param visible 可见性
   */
  public setTilesetVisible (tileset: Cesium3DTileset, visible: boolean) : this
  /** 设置模型可见性 */
  public setTilesetVisible (arg0: string | Cesium3DTileset, visible: boolean) : this {
    let tileset: string | Cesium3DTileset = arg0
    if (typeof tileset === 'string') {
      tileset = this.getTilesetByName(tileset)
    }
    if (tileset) {
      tileset.show = visible
      this.fire('change:visible', { tileset, visible })
    }
    return this
  }

  /**
   * 设置模型透明度
   * @param name 模型名称
   * @param opacity 模型不可透明度
   */
  public setTilesetOpacity (name: string, opacity: number) : this
  /**
   * 设置模型透明度
   * @param tileset 模型对象
   * @param opacity 模型不可透明度
   */
  public setTilesetOpacity (tileset: Cesium3DTileset, opacity: number) : this
  /** 设置模型透明度 */
  public setTilesetOpacity (arg0: string | Cesium3DTileset, opacity: number) : this {
    let tileset = arg0
    if (typeof tileset === 'string') {
      tileset = this.getTilesetByName(tileset)
    }
    tileset.style = new Cesium3DTileStyle({
      color: `color('rgba(255, 255, 255, ${opacity})')`
    })
    return this
  }

  //#endregion

  //#region 静态公有方法

  /**
   * 设置模型偏移高度
   * @param tileset 模型
   * @param height 模型偏移高度
   */
  public static SetTilesetOffsetHeight (tileset: Cesium3DTileset, height: number) : void {
    const cartographic = Cartographic.fromCartesian(
      tileset.boundingSphere.center
    )
    const surface = Cartesian3.fromRadians(
      cartographic.longitude,
      cartographic.latitude,
      0.0
    )
    const offset = Cartesian3.fromRadians(
      cartographic.longitude,
      cartographic.latitude,
      height
    )
    const translation = Cartesian3.subtract(
      offset,
      surface,
      new Cartesian3()
    )
    tileset.modelMatrix = Matrix4.fromTranslation(translation)
  }

  //#endregion

}

export default Map3dTile
