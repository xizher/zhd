import { baseUtils } from '../../../js-utils';
let Supermap = null;
export { Supermap };
export function initModules(cssUrl, jsUrl) {
    return new Promise(resolve => {
        baseUtils.loadCss(cssUrl);
        baseUtils.loadJs(jsUrl);
        const handler = setInterval(() => {
            if (window.Cesium) {
                // eslint-disable-next-line
                // @ts-ignore
                window.Supermap = window.Cesium;
                Supermap = window.Cesium; // eslint-disable-line
                delete window.Cesium;
                clearInterval(handler);
                resolve();
            }
        }, 100);
    });
}
