import { reactive, toRefs } from '@vue/reactivity';
import { computed, onUnmounted } from '@vue/runtime-core';
import { transform } from 'ol/proj';
export function useMouseCoordinate(webMap, options = {
    xyRound: 6, lonlatRound: 3
}) {
    const state = reactive({
        coordinateX: 0, coordinateY: 0,
        longitude: computed(() => {
            const [lon] = transform([state.coordinateX, state.coordinateY], webMap.view.getProjection(), 'EPSG:4326');
            return lon;
        }),
        latitude: computed(() => {
            const [, lat] = transform([state.coordinateX, state.coordinateY], webMap.view.getProjection(), 'EPSG:4326');
            return lat;
        }),
        xyFormat: computed(() => {
            const xStr = state.coordinateX.toFixed(options.xyRound);
            const yStr = state.coordinateY.toFixed(options.xyRound);
            return `${xStr},${yStr}`;
        }),
        lonlatFormat: computed(() => {
            const lonStr = state.longitude.toFixed(options.lonlatRound);
            const latStr = state.latitude.toFixed(options.lonlatRound);
            return `${lonStr},${latStr}`;
        })
    });
    const handler = webMap.map.on('pointermove', ({ coordinate }) => {
        const [x, y] = coordinate;
        state.coordinateX = x;
        state.coordinateY = y;
    });
    onUnmounted(() => webMap.map.un('pointermove', handler.listener));
    return toRefs(state);
}
