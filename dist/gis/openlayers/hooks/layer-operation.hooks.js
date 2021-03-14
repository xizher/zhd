export function useLayerList(layerOperation) {
    const layerPool = layerOperation.layerPool;
    const layerList = [...layerPool.values()];
    return [layerList, layerPool];
}
