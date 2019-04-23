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
})({"js/safety.js":[function(require,module,exports) {
$(function () {
  // 获取项目id
  var pid = localStorage.getItem('pid'); // 初始化导航栏滚动

  var swiper1 = new Swiper('#swiper1', {
    slidesPerView: 3,
    freeMode: true,
    scrollbar: {
      el: '.swiper-scrollbar'
    }
  }); // const swiper3 = new Swiper('#swiper3')
  // 模块切换点击事件
  // 切换到塔吊模块

  $('#towerCraneBtn').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    event.stopPropagation();
    $('.towerCrane').css('display', '');
    var siblings = $('.towerCrane').siblings();

    for (var i = 0; i < siblings.length; i++) {
      $(siblings[i]).css('display', 'none');
    }
  }); // 切换到升降机模块

  $('#elevatorBtn').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.elevator').css('display', '');
    var siblings = $('.elevator').siblings();

    for (var i = 0; i < siblings.length; i++) {
      $(siblings[i]).css('display', 'none');
    }

    var swiper3 = new Swiper('#swiper3', {
      spaceBetween: 30
    });
  }); // 切换到车辆出入模块

  $('#carBtn').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.car').css('display', '');
    var siblings = $('.car').siblings();

    for (var i = 0; i < siblings.length; i++) {
      $(siblings[i]).css('display', 'none');
    }

    var swiper4 = new Swiper('#swiper4', {
      spaceBetween: 30
    });
  }); // 启动车辆出入模块滚动

  scrollStart('carBox1', 'carBox1-1', 'carBox1-2');
  scrollStart('carBox2', 'carBox2-1', 'carBox2-2'); // 滚动启动函数

  function scrollStart(id, id1, id2) {
    setTimeout(function () {
      var speed = 45;
      var colee2 = document.getElementById(id2);
      var colee1 = document.getElementById(id1);
      var colee = document.getElementById(id);
      colee2.innerHTML = colee1.innerHTML; //克隆colee1为colee2

      function Marquee1() {
        // console.log(colee1.offsetHeight)
        //当滚动至colee1与colee2交界时
        if (colee2.offsetTop - colee.scrollTop <= 0) {
          colee.scrollTop -= colee1.offsetHeight; //colee跳到最顶端
        } else {
          colee.scrollTop++;

          if (colee.scrollTop == colee1.offsetHeight) {
            colee.scrollTop = 0;
          }
        }
      }

      var MyMar1 = setInterval(Marquee1, 50); //设置定时器
      //   //鼠标移上时清除定时器达到滚动停止的目的
      //   colee.onmouseover = function() {
      //     clearInterval(MyMar1);
      //   };
      //   //鼠标移开时重设定时器
      //   colee.onmouseout = function() {
      //     MyMar1 = setInterval(Marquee1, speed);
      //   };
    }, 100);
  } // 切换到气体检测数据模块


  $('#gasBtn').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.gas').css('display', '');
    var siblings = $('.gas').siblings();

    for (var i = 0; i < siblings.length; i++) {
      $(siblings[i]).css('display', 'none');
    }

    var swiper5 = new Swiper('#swiper5', {
      spaceBetween: 30
    });
  }); // 切换到龙门吊数据模块

  $('#gantryCrane').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.gantryCrane').css('display', '');
    var siblings = $('.gantryCrane').siblings();

    for (var i = 0; i < siblings.length; i++) {
      $(siblings[i]).css('display', 'none');
    }

    var swiper6 = new Swiper('#swiper6', {
      spaceBetween: 30
    });
  }); // 启动龙门吊实时数据滚动

  scrollStart('gantryBox1', 'gantryBox1-1', 'gantryBox1-2'); // 获取塔吊数据

  axios.get("http://39.108.103.150:8989/lz/deye/getCraneData?pid=".concat(pid)).then(function (res) {
    console.log(res.data); // 将塔吊的数据渲染到页面中

    var html = '';

    for (var i = 0; i < res.data.length; i++) {
      html += "<div class=\"slide-box swiper-slide\">\n                        <div class=\"information\">\n                            <div class=\"information-left ".concat(res.data[i].MotorStatus != 0 ? 'normal' : 'anomaly', "\">\n                                ").concat(res.data[i].MotorStatus != 0 ? '正常运行' : '异常运行', "\n                            </div>\n                            <div class=\"information-middle\">\n                                <div class=\"name\">\n                                    \u4ECA\u65E5\u5DE5\u4F5C\n                                    <span>").concat(res.data[i].name, "</span>\n                                </div>\n                                <div class=\"time\">\n                                    \u4E0A\u5DE5\u65F6\u95F4\n                                    <span>").concat(res.data[i].startTime != null ? res.data[i].startTime.split(' ')[1] : '', "</span>\n                                </div>\n                            </div>\n                            <div class=\"information-right\">\n                                <img src=\"").concat(res.data[i].image, "\" alt=\"\">\n                            </div>\n                        </div>\n                        <div class=\"data\">\n                            <div class=\"name\">\n                            ").concat(res.data[i].dname, "\n                            </div>\n                            <div class=\"top-data\">\n                                <div class=\"left-box\">\n                                    <p>\u8D77\u91CD</p>\n                                    <p>").concat(res.data[i].ratedWeight, "t</p>\n                                </div>\n                                <div class=\"middle-box\">\n                                ").concat(res.data[i].moment, "%\n                                    <p>\u529B\u8DDD</p>\n                                </div>\n                                <div class=\"right-box\">\n                                    <p>\u500D\u7387</p>\n                                    <p>").concat(res.data[i].multiple, "\u500D</p>\n                                </div>\n                            </div>\n                            <div class=\"bottom-data\">\n                                <ul>\n                                    <li style=\"margin-top: 0;\">\n                                        <div class=\"icon-box weight\"></div>\n                                        <div class=\"li-data\">\n                                            <p>\u91CD\u91CF</p>\n                                            <p>").concat(res.data[i].weight, "t</p>\n                                        </div>\n                                    </li>\n                                    <li style=\"margin-top: 0;\">\n                                        <div class=\"icon-box range\"></div>\n                                        <div class=\"li-data\">\n                                            <p>\u5E45\u5EA6</p>\n                                            <p>").concat(res.data[i].rrange, "m</p>\n                                        </div>\n                                    </li>\n                                    <li>\n                                        <div class=\"icon-box altitude\"></div>\n                                        <div class=\"li-data\">\n                                            <p>\u9AD8\u5EA6</p>\n                                            <p>").concat(res.data[i].height, "m</p>\n                                        </div>\n                                    </li>\n                                    <li>\n                                        <div class=\"icon-box rotation\"></div>\n                                        <div class=\"li-data\">\n                                            <p>\u56DE\u8F6C</p>\n                                            <p>").concat(res.data[i].angle, "\xB0</p>\n                                        </div>\n                                    </li>\n                                    <li>\n                                        <div class=\"icon-box windSpeed\"></div>\n                                        <div class=\"li-data\">\n                                            <p>\u98CE\u901F</p>\n                                            <p>").concat(res.data[i].windSpeed, "m</p>\n                                        </div>\n                                    </li>\n                                    <li>\n                                        <div class=\"icon-box dipAngle\"></div>\n                                        <div class=\"li-data\">\n                                            <p>\u503E\u89D2</p>\n                                            <p>").concat(res.data[i].obliguity, "\xB0</p>\n                                        </div>\n                                    </li>\n                                </ul>\n                                <div class=\"service\">\n                                    \u68C0\u4FEE\u5012\u8BA1\u65F6 : \n                                    <span class=\"normal\">").concat(res.data[i].ts, "\u5929</span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>");
    }

    $('#towerCrane').html(html); // 初始化塔吊滚动

    var swiper2 = new Swiper('#swiper2', {
      spaceBetween: 30
    });
  }); // 获取升降机数据

  axios.get("http://39.108.103.150:8989/lz/deye/getElevatorData?pid=".concat(pid)).then(function (res) {
    var html = '';

    for (var i = 0; i < res.data.length; i++) {
      html += "<div class=\"slide-box swiper-slide\">\n                        <div class=\"information\">\n                            <div class=\"information-left normal\">\n                                \u6B63\u5E38\u8FD0\u884C\n                            </div>\n                            <div class=\"information-middle\">\n                                <div class=\"name\">\n                                    \u4ECA\u65E5\u5DE5\u4F5C\n                                    <span>".concat(res.data[0].name, "</span>\n                                </div>\n                                <div class=\"time\">\n                                    \u4E0A\u5DE5\u65F6\u95F4\n                                    <span>").concat(res.data[i].startTime != null ? res.data[i].startTime.split(' ')[1] : '', "</span>\n                                </div>\n                            </div>\n                            <div class=\"information-right\">\n                                <img src=\"").concat(res.data[0].image, "\" alt=\"\">\n                            </div>\n                        </div>\n                        <div class=\"data\">\n                            <div class=\"name\">\n                                ").concat(res.data[0].dname, "\n                            </div>\n                            <div class=\"data-box\">\n                                <ul>\n                                    <li class=\"normal green-circle\">\n                                        ").concat(res.data[0].weight, "t\n                                        <span>\u8F7D\u91CD</span>\n                                    </li>\n                                    <li class=\"normal\">\n                                        ").concat(res.data[0].height, "m\n                                        <span>\u9AD8\u5EA6</span>\n                                    </li>\n                                    <li class=\"normal\">\n                                        ").concat(res.data[0].fallAlarm == 0 ? '正常' : '异常', "\n                                        <span>\u9632\u5760\u5728\u4F4D\u76D1\u6D4B</span>\n                                    </li>\n                                    <li class=\"normal\">\n                                        ").concat(res.data[0].bottomAlarm == 0 ? '正常' : '异常', "\n                                        <span>\u4E0A\u4E0B\u9650\u4F4D\u76D1\u6D4B</span>\n                                    </li>\n                                </ul>\n                                <div class=\"service\">\n                                    \u68C0\u4FEE\u5012\u8BA1\u65F6 : \n                                    <span class=\"normal\">").concat(res.data[0].ts, "\u5929</span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>");
    }

    $('#elevator').html(html);
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49579" + '/');

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
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/safety.js"], null)
//# sourceMappingURL=/safety.34b3e448.map