// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/location.js":[function(require,module,exports) {
$(function () {
  // 手机长度适配
  var height = $('body').height();
  $('body').height(height); // 初始化地图

  var map = new AMap.Map('main', {
    zoom: 12,
    center: [114.083372, 22.544146]
  }); // 侧导航栏点击事件

  var side = 0;
  $('.nav').on('click', function () {
    if (side == 0) {
      $('.side-box').animate({
        left: '0'
      });
      $('.search').animate({
        left: '135%'
      });
      side = 1;
    } else {
      $('.side-box').animate({
        left: '-3.2rem'
      });
      $('.search').animate({
        left: '50%'
      });
      side = 0;
    }
  }); // 监听输入框状态

  $('#search').on('input propertychange', function () {
    if ($(this).val().includes('段') || $(this).val().includes('裕') || $(this).val().includes('德')) {
      $('.search-data').css('display', 'block');
    } else {
      $('.search-data').css('display', 'none');
    }
  });
  var marker;
  var polygon; // 查看人员信息点击事件

  $('#examine').on('click', function () {
    $('.data-box').css('display', 'block');
    $('.search-data').css('display', 'none');
    marker = new AMap.Marker({
      position: [114.003378, 22.571492] // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]

    });
    map.add(marker);
    polygon = new AMap.Polygon({
      path: [new AMap.LngLat(113.992992, 22.581439), new AMap.LngLat(114.01033, 22.582786), new AMap.LngLat(114.010287, 22.562853), new AMap.LngLat(113.996898, 22.563329)],
      fillColor: '#fff',
      // 多边形填充颜色
      fillOpacity: 0,
      //填充颜色透明度
      borderWeight: 1,
      // 线条宽度
      strokeColor: '#137ed2' // 线条颜色}

    });
    map.add(polygon);
    map.setZoomAndCenter(14, [114.003378, 22.561492]);
  });
  var circle1;
  var circle2;
  var circle3;
  var circle4;
  var polyline; // 人员信息与历史轨迹切换

  $('#particular').on('click', function () {
    $('.data-box').css('display', 'block');
    $('.history-box').css('display', 'none');
    map.add(marker);
    map.remove(circle1);
    map.remove(circle2);
    map.remove(circle3);
    map.remove(circle4);
    map.remove(polyline);
  });
  $('#history').on('click', function () {
    $('.data-box').css('display', 'none');
    $('.history-box').css('display', 'block');
    circle1 = new AMap.Circle({
      center: [113.994194, 22.578189],
      fillOpacity: 1,
      //透明度
      zIndex: 100,
      //层级
      radius: 10,
      //半径
      fillColor: '#e10505',
      //填充颜色
      strokeColor: '#e10505' //轮廓线颜色

    });
    circle2 = new AMap.Circle({
      center: [114.004537, 22.563725],
      fillOpacity: 1,
      //透明度
      zIndex: 100,
      //层级
      radius: 10,
      //半径
      fillColor: '#e10505',
      //填充颜色
      strokeColor: '#e10505' //轮廓线颜色

    });
    circle3 = new AMap.Circle({
      center: [114.009601, 22.570383],
      fillOpacity: 1,
      //透明度
      zIndex: 100,
      //层级
      radius: 10,
      //半径
      fillColor: '#e10505',
      //填充颜色
      strokeColor: '#e10505' //轮廓线颜色

    });
    circle4 = new AMap.Circle({
      center: [114.006167, 22.580171],
      fillOpacity: 1,
      //透明度
      zIndex: 100,
      //层级
      radius: 10,
      //半径
      fillColor: '#e10505',
      //填充颜色
      strokeColor: '#e10505' //轮廓线颜色

    });
    polyline = new AMap.Polyline({
      path: [new AMap.LngLat(113.994194, 22.578189), new AMap.LngLat(114.004537, 22.563725), new AMap.LngLat(114.009601, 22.570383), new AMap.LngLat(114.006167, 22.580171)],
      lineJoin: 'round',
      //折线拐点样式
      showDir: true,
      //移动方向
      strokeWeight: 3,
      //线条宽度
      strokeColor: '#3366ff' //线条颜色

    });
    map.add(circle1);
    map.add(circle2);
    map.add(circle3);
    map.add(circle4);
    map.add(polyline);
    map.remove(marker);
  });
  var temp = 1; // 历史轨迹详细信息

  $('#historyTop').on('click', function () {
    if (temp == 1) {
      $('#historyMiddle').animate({
        height: '1.705rem'
      });
      temp = 0;
    } else {
      $('#historyMiddle').animate({
        height: '0'
      });
      temp = 1;
    }
  });
  var project = 1; // 一级菜单

  $('#project').on('click', function () {
    if (project == 1) {
      $('#project').animate({
        height: '1.74rem'
      });
      project = 0;
      $('.blue-v').addClass('rotate');
    } else {
      $('#project').animate({
        height: '.39rem'
      });
      $('.blue-v').removeClass('rotate');
      project = 1;
    }
  });
  var subProject = 1; // 二级菜单

  $('#subProject').on('click', function (event) {
    event.stopPropagation();

    if (subProject == 1) {
      $('#subProject').animate({
        height: '1.4rem'
      });
      $('.black-v').addClass('rotate');
      subProject = 0;
    } else {
      $('#subProject').animate({
        height: '.35rem'
      });
      $('.black-v').removeClass('rotate');
      subProject = 1;
    }
  });
});
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64444" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/location.js"], null)
//# sourceMappingURL=/location.0d2fe3e7.map