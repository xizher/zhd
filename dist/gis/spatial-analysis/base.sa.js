export function distanceByTwoPoint(pt1, pt2) {
    const [x1, y1] = pt1;
    const [x2, y2] = pt2;
    return ((x2 - x1) ** 2 + (y1 - y2) ** 2) ** .5;
}
