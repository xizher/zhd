import { WebMapPlugin } from '../../web-map/web-map-plugin'

export class Basemap extends WebMapPlugin<{

}> {

  //#region 构造函数

  constructor () {
    super('basemap')
  }

  //#endregion

}

export default Basemap
