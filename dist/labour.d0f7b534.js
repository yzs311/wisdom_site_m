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
})({"js/labour.js":[function(require,module,exports) {
$(function () {
  // console.log('hello world')
  var pid = localStorage.getItem('pid'); // 获取合同签订数据

  $.ajax({
    type: "GET",
    url: "http://39.108.103.150:8989/lz/get/getDataCount",
    data: {
      pid: pid
    },
    dataType: "json",
    success: function success(data) {
      // console.log(data)
      // 渲染进场手续签订模块
      $('#entrance').html("<div class=\"left-box\">\n                    <i class=\"shade\"></i>\n                    <div class=\"box-title\">\n                        \u8FDB\u573A\u624B\u7EED\u7B7E\u8BA2\u7B7E\u8BA2\n                    </div>\n                    <div class=\"box-data\">\n                        <ul>\n                            <li>\u5171\u5F55\u5165\uFF1A".concat(data.entrance.total, "\u4EBA</li>\n                            <li>\u5171\u7B7E\u8BA2\uFF1A").concat(data.entrance.ht, "\u4EBA</li>\n                            <li>\u672A\u7B7E\u8BA2\uFF1A").concat(data.entrance.wq, "\u4EBA</li>\n                            <li>\u662F\u5426\u5408\u683C\uFF1A<span class=\"").concat(data.entrance.bfb == 100 ? 'green-color' : 'red-color', "\">").concat(data.entrance.hg, "</span></li>\n                        </ul>\n                    </div>\n                </div>\n                <div class=\"right-box ").concat(data.entrance.bfb == 100 ? 'green-bg' : 'red-bg', "\">\n                    <div class=\"border ").concat(data.entrance.bfb == 100 ? 'green-color' : 'red-color', "\"></div>\n                    <div class=\"subBorder ").concat(data.entrance.bfb == 100 ? 'green-color' : 'red-color', "\">\n                        <div class=\"wrapper\" style=\"right:0\">\n                            <div class=\"circleProgress ").concat(data.entrance.bfb == 100 ? 'rightcircle-green' : 'rightcircle-red', "\"></div>\n                        </div>\n                        <div class=\"wrapper\" style=\"left:0\">\n                            <div class=\"circleProgress ").concat(data.entrance.bfb == 100 ? 'leftcircle-green' : 'leftcircle-red', "\"></div>\n                        </div>\n                    </div>\n                    <span class=\"").concat(data.entrance.bfb == 100 ? 'green-color' : 'red-color', "\">").concat(Math.floor(data.entrance.bfb), "%</span>\n                </div>")); // 渲染退场手续模块

      $('#exit_pdf').html("<div class=\"left-box\">\n                   <i class=\"shade\"></i>\n                   <div class=\"box-title\">\n                       \u9000\u573A\u624B\u7EED\u7B7E\u8BA2\n                   </div>\n                   <div class=\"box-data\">\n                       <ul>\n                           <li>\u5171\u5F55\u5165\uFF1A".concat(data.exit_pdf.total, "\u4EBA</li>\n                           <li>\u5171\u7B7E\u8BA2\uFF1A").concat(data.exit_pdf.ht, "\u4EBA</li>\n                           <li>\u672A\u7B7E\u8BA2\uFF1A").concat(data.exit_pdf.wq, "\u4EBA</li>\n                           <li>\u662F\u5426\u5408\u89C4\uFF1A<span class=\"").concat(data.exit_pdf.bfb == 100 ? 'green-color' : 'red-color', "\">").concat(data.exit_pdf.hg, "</span></li>\n                       </ul>\n                   </div>\n                </div>\n                <div class=\"right-box ").concat(data.exit_pdf.bfb == 100 ? 'green-bg' : 'red-bg', "\">\n                   <div class=\"border ").concat(data.exit_pdf.bfb == 100 ? 'green-color' : 'red-color', "\"></div>\n                   <div class=\"subBorder ").concat(data.exit_pdf.bfb == 100 ? 'green-color' : 'red-color', "\">\n                       <div class=\"wrapper\" style=\"right:0\">\n                           <div class=\"circleProgress ").concat(data.exit_pdf.bfb == 100 ? 'rightcircle-green' : 'rightcircle-red', "\"></div>\n                       </div>\n                       <div class=\"wrapper\" style=\"left:0\">\n                           <div class=\"circleProgress ").concat(data.exit_pdf.bfb == 100 ? 'leftcircle-green' : 'leftcircle-red', "\"></div>\n                       </div>\n                   </div>\n                   <span class=\"").concat(data.exit_pdf.bfb == 100 ? 'green-color' : 'red-color', "\">").concat(Math.floor(data.exit_pdf.bfb), "%</span>\n                </div>")); // 渲染劳动合同签订模块

      $('#contract').html("<div class=\"left-box\">\n                    <i class=\"shade\"></i>\n                    <div class=\"box-title\">\n                        \u52B3\u52A8\u5408\u540C\u7B7E\u8BA2\n                    </div>\n                    <div class=\"box-data\">\n                        <ul>\n                            <li>\u5171\u5F55\u5165\uFF1A".concat(data.contract.total, "\u4EBA</li>\n                            <li>\u5171\u7B7E\u8BA2\uFF1A").concat(data.contract.ht, "\u4EBA</li>\n                            <li>\u672A\u7B7E\u8BA2\uFF1A").concat(data.contract.wq, "\u4EBA</li>\n                            <li>\u662F\u5426\u5408\u89C4\uFF1A<span class=\"").concat(data.contract.bfb == 100 ? 'green-color' : 'red-color', "\">").concat(data.contract.hg, "</span></li>\n                        </ul>\n                    </div>\n                </div>\n                <div class=\"right-box ").concat(data.contract.bfb == 100 ? 'green-bg' : 'red-bg', "\">\n                    <div class=\"border ").concat(data.contract.bfb == 100 ? 'green-color' : 'red-color', "\"></div>\n                    <div class=\"subBorder ").concat(data.contract.bfb == 100 ? 'green-color' : 'red-color', "\">\n                        <div class=\"wrapper\" style=\"right:0\">\n                            <div class=\"circleProgress ").concat(data.contract.bfb == 100 ? 'rightcircle-green' : 'rightcircle-red', "\"></div>\n                        </div>\n                        <div class=\"wrapper\" style=\"left:0\">\n                            <div class=\"circleProgress ").concat(data.contract.bfb == 100 ? 'leftcircle-green' : 'leftcircle-red', "\"></div>\n                        </div>\n                    </div>\n                    <span class=\"").concat(data.contract.bfb == 100 ? 'green-color' : 'red-color', "\">").concat(Math.floor(data.contract.bfb), "%</span>\n                </div>")); // 两制确认书签订模块

      $('#workConfirm').html("<div class=\"left-box\">\n                    <i class=\"shade\"></i>\n                    <div class=\"box-title\">\n                        \u4E24\u5236\u786E\u8BA4\u4E66\u7B7E\u8BA2\n                    </div>\n                    <div class=\"box-data\">\n                        <ul>\n                            <li>\u5171\u5F55\u5165\uFF1A".concat(data.workConfirm.total, "\u4EBA</li>\n                            <li>\u5171\u7B7E\u8BA2\uFF1A").concat(data.workConfirm.ht, "\u4EBA</li>\n                            <li>\u672A\u7B7E\u8BA2\uFF1A").concat(data.workConfirm.wq, "\u4EBA</li>\n                            <li>\u662F\u5426\u5408\u89C4\uFF1A<span class=\"").concat(data.workConfirm.bfb == 100 ? 'green-color' : 'red-color', "\">").concat(data.workConfirm.hg, "</span></li>\n                        </ul>\n                    </div>\n                </div>\n                <div class=\"right-box ").concat(data.workConfirm.bfb == 100 ? 'green-bg' : 'red-bg', "\">\n                    <div class=\"border ").concat(data.workConfirm.bfb == 100 ? 'green-color' : 'red-color', "\"></div>\n                    <div class=\"subBorder ").concat(data.workConfirm.bfb == 100 ? 'green-color' : 'red-color', "\">\n                        <div class=\"wrapper\" style=\"right:0\">\n                            <div class=\"circleProgress ").concat(data.workConfirm.bfb == 100 ? 'rightcircle-green' : 'rightcircle-red', "\"></div>\n                        </div>\n                        <div class=\"wrapper\" style=\"left:0\">\n                            <div class=\"circleProgress ").concat(data.workConfirm.bfb == 100 ? 'leftcircle-green' : 'leftcircle-red', "\"></div>\n                        </div>\n                    </div>\n                    <span class=\"").concat(data.workConfirm.bfb == 100 ? 'green-color' : 'red-color', "\">").concat(Math.floor(data.workConfirm.bfb), "%</span>\n                </div>"));
    }
  }); // 获取工人出勤模块

  $.ajax({
    type: "get",
    url: "http://39.108.103.150:8989/lz/get/getKQCount",
    data: {
      pid: pid
    },
    dataType: "json",
    success: function success(data) {
      console.log(data); // 工人出勤模块渲染

      $('.attendance-rate').html("<div class=\"attendance-title\">\n                    <i class=\"shade\"></i>\n                    \u5DE5\u4EBA\u51FA\u52E4\u60C5\u51B5\n                </div>\n                <div class=\"schedule\">\n                    <div class=\"sub-schedule\" style=\"width:".concat(data.bfb, "%\">\n                        <p>").concat(Math.floor(data.bfb), "%</p>\n                    </div>\n                </div>\n                <div class=\"content-box\">\n                    <div class=\"online\">\n                        <div class=\"content-top\">\n                            \u9879\u76EE\u5728\u5728\u573A\u4EBA\u6570\n                        </div>\n                        <div class=\"content-bottom\">\n                            ").concat(data.sum, "\n                        </div>\n                        <i class=\"rise\"></i>\n                    </div>\n                    <div class=\"real-time\">\n                        <div class=\"content-top\">\n                            \u4ECA\u65E5\u8003\u52E4\u603B\u4EBA\u6570\n                        </div>\n                        <div class=\"content-bottom\">\n                            ").concat(data.kq, "\n                        </div>\n                        <i class=\"rise\"></i>\n                    </div>\n                    <div class=\"worker\">\n                        <div class=\"content-top\">\n                            \u4ECA\u65E5\u5DE5\u4EBA\u51FA\u52E4\u4EBA\u6570\n                        </div>\n                        <div class=\"content-bottom\">\n                            ").concat(data.workerCheck, "\n                        </div>\n                        <i class=\"rise\"></i>\n                    </div>\n                    <div class=\"administrator\">\n                        <div class=\"content-top\">\n                            \u4ECA\u65E5\u7BA1\u7406\u51FA\u52E4\u4EBA\u6570\n                        </div>\n                        <div class=\"content-bottom\">\n                            ").concat(data.managerCheck, "\n                        </div>\n                        <i class=\"rise\"></i>\n                    </div>\n                </div>"));
    }
  });
});
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49665" + '/');

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
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/labour.js"], null)
//# sourceMappingURL=/labour.d0f7b534.map