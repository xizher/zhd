import { Supermap, } from '../init-modules/init-modules';
export function createEntity() {
    const entityOptions = {};
    const methods = {
        finsh() {
            return new Supermap.Entity(entityOptions);
        },
        setPosition(position) {
            entityOptions.position = position;
            return methods;
        },
        setBox(options) {
            entityOptions.box = options;
            return methods;
        },
        setRectangle(options) {
            entityOptions.rectangle = options;
            return methods;
        },
        setEllipse(options) {
            entityOptions.ellipse = options;
            return methods;
        },
        setPolygon(options) {
            entityOptions.polygon = options;
            return methods;
        },
        setCircle(radius, options) {
            return methods.setEllipse({
                ...options,
                semiMajorAxis: radius,
                semiMinorAxis: radius,
            });
        },
        setCylinder(options) {
            entityOptions.cylinder = options;
            return methods;
        },
    };
    return methods;
}
