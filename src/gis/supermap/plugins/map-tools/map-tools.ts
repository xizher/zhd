import WebMap from '../../web-map/web-map'
import WebMapPlugin from '../../web-map/web-map-plugin'
import BaseTool from './base-tool'
import MeasureTool from './tools/measure/measure-tool'

/** 地图工具链 */
export class MapTools extends WebMapPlugin<{
  'change' : {
    previousKey: string
    executeKey: string
    currentKey: string
    isOnceTool: boolean
  }
}> {

  //#region 私有方法

  /** 工具池 */
  private _toolPool : Map<string, BaseTool> = new Map()

  /** 当前激活工具的Key */
  private _activedKey = 'default'

  //#endregion

  //#region getter

  get activedKey () : string {
    return this._activedKey
  }

  //#endregion

  //#region 构造函数

  /** 构造地图工具链对象 */
  constructor () {
    super('mapTools')
  }

  //#endregion

  //#region 私有方法

  private _init () {
    this._toolPool
      .set('default', new BaseTool(this.viewer, this.entities))
      .set('measure', new MeasureTool(this.viewer, this.entities))
  }

  //#endregion

  //#region 公有方法

  /** 重写：插件安装方法 */
  installPlugin (webMap: WebMap) : this {
    super.installPlugin(webMap)
    this._init()
    return this
  }

  /**
   * 设置工具
   * @param toolKey 工具Key
   */
  setMapTool (toolKey: string) : this {
    if (!this._toolPool.has(toolKey)) {
      return this
    }
    const tool = this._toolPool.get(toolKey)
    if (tool.isOnceTool) {
      this.fire('change', {
        previousKey: this._activedKey,
        currentKey: this._activedKey,
        executeKey: toolKey,
        isOnceTool: true
      })
      tool.active()
      return this
    }
    [...this._toolPool.values()].map(t => {
      if (t !== tool) {
        t.deactive()
      }
    })
    this.fire('change', {
      previousKey: this._activedKey,
      currentKey: toolKey,
      executeKey: toolKey,
      isOnceTool: false
    })
    this._activedKey = toolKey
    tool.active()
    return this
  }

  /**
   * 创建自定义工具
   * @param key 工具Key
   * @param tool 工具对象
   */
  createCustomTool (key: string, tool: BaseTool) : this {
    this._toolPool.set(key, tool)
    return this
  }

  /**
   * 检查是否存在工具
   * @param key 工具Key
   */
  hasTool (key: string) : boolean {
    return this._toolPool.has(key)
  }

  /**
   * 移除工具
   * @param key 工具Key
   */
  deleteTool (key: string) : this {
    this._toolPool.has(key) && this._toolPool.delete(key)
    return this
  }

  /**
   * 获取工具
   * @param key 工具Key
   */
  getTool<T extends BaseTool> (key: string) : T | null {
    if (!this._toolPool.has(key)) {
      return null
    }
    return this._toolPool.get(key) as T
  }

  //#endregion

}

export default MapTools
