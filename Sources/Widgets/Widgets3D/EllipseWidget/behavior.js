import shapeBehavior from 'vtk.js/Sources/Widgets/Widgets3D/ShapeWidget/behavior';
import { vec3 } from 'gl-matrix';

export default function widgetBehavior(publicAPI, model) {
  // We inherit shapeBehavior
  shapeBehavior(publicAPI, model);
  const superClass = Object.assign({}, publicAPI);

  model.classHierarchy.push('vtkEllipseWidgetProp');

  publicAPI.setCorners = (point1, point2) => {
    if (superClass.setCorners) {
      superClass.setCorners(point1, point2);
    }

    const center = [
      0.5 * (point1[0] + point2[0]),
      0.5 * (point1[1] + point2[1]),
      0.5 * (point1[2] + point2[2]),
    ];

    const d = [0, 0, 0];
    vec3.subtract(d, point2, center);

    const horizontal = model.shapeHandle.getRight();
    const vertical = model.shapeHandle.getUp();
    const sh = vec3.dot(d, horizontal);
    const sv = vec3.dot(d, vertical);

    model.shapeHandle.setOrigin(center);
    model.shapeHandle.setScale3([sh, sv, 1]);
  };
}
