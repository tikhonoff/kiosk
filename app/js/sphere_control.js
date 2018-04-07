const seen = require('./seen.min');
const $ = require('./jquery.min');

export default function CanvasRender(contextId = 'seen-canvas') {
  var KIOSK_POSITION, context, degPerRad, dragger, group, height, initShape, radToDeg, scene, setShinyness, shape, width;

  width = 360;

  height = 360;

  KIOSK_POSITION = '0,90';

  degPerRad = 180 / Math.PI;

  scene = new seen.Scene({
    model: seen.Models["default"](),
    viewport: seen.Viewports.center(width, height)
  });

  context = seen.Context('seen-canvas', scene).render();

  group = scene.model.append().scale(100);

  shape = null;

  dragger = new seen.Drag(document.getElementById('seen-canvas'), {
    inertia: false
  });

  dragger.on('drag.rotate', function(e) {
    var params, xDeg, xform, yDeg, _ref;
    xform = (_ref = seen.Quaternion).xyToTransform.apply(_ref, e.offsetRelative);
    group.transform(xform);
    context.render();
    xDeg = radToDeg(e.offsetRelative[0] / seen.Quaternion.pixelsPerRadian);
    yDeg = -radToDeg(e.offsetRelative[1] / seen.Quaternion.pixelsPerRadian);
    params = ['D' + yDeg + ',' + xDeg];
    top.postMessage({
      'sosCommand': 'pointer',
      'params': [KIOSK_POSITION]
    }, '*');
    top.postMessage({
      'sosCommand': 'pointer',
      'params': ['grab']
    }, '*');
    top.postMessage({
      'sosCommand': 'pointer',
      'params': params
    }, '*');
    return top.postMessage({
      'sosCommand': 'pointer',
      'params': ['ungrab']
    }, '*');
  });

  setShinyness = function(shinyness) {
    var surf, _i, _len, _ref, _results;
    _ref = shape.surfaces;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      surf = _ref[_i];
      surf.fill.specularExponent = shinyness;
      _results.push(surf.dirty = true);
    }
    return _results;
  };

  initShape = function() {
    group.children = [shape = seen.Shapes.sphere(3).scale(1.5)];
    setShinyness(11);
    return context.render();
  };

  radToDeg = function(rad) {
    return rad * degPerRad;
  };

  $(document).ready(function() {
    return initShape();
  });

}
