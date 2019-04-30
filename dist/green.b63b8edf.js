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
})({"js/green.js":[function(require,module,exports) {
$(function () {
  // console.log('hello world')
  var pid = localStorage.getItem('pid'); // console.log(pid)
  // 获取扬尘监测设备数据

  var getDustEmissionData = function getDustEmissionData(sid) {
    $.ajax({
      type: "GET",
      url: "http://39.108.103.150:8989/dustEmission/get/DustEmissionDatas",
      data: {
        sid: sid
      },
      dataType: "json",
      success: function success(data) {
        // console.log(data)
        var html = $('#dustBox').html();
        html += "<div class=\"slide-box swiper-slide\">\n                    <!-- \u626C\u5C18\u76D1\u6D4B -->\n                    <div class=\"environment\">\n                <div class=\"environment-title\">\n                    ".concat(data.newData[0].comments, "\n                </div>\n                <div class=\"PM\">\n                    <div class=\"subPM1 ").concat(data.newData[0].PM25 > 50 ? data.newData[0].PM25 > 75 ? data.newData[0].PM25 > 150 ? data.newData[0].PM25 > 250 ? data.newData[0].PM25 > 300 ? 'severe' : 'serious' : 'moderate' : 'mild' : 'good' : 'excellent', "\">\n                        <p>PM2.5</p>\n                        <span> ").concat(data.newData[0].PM25, "</span>\n                        <i></i>\n                    </div>\n                    <div class=\"subPM2 ").concat(data.newData[0].PM10 > 50 ? data.newData[0].PM10 > 75 ? data.newData[0].PM10 > 150 ? data.newData[0].PM10 > 250 ? data.newData[0].PM10 > 300 ? 'severe' : 'serious' : 'moderate' : 'mild' : 'good' : 'excellent', "\">\n                        <p>PM10</p>\n                        <span> ").concat(data.newData[0].PM10, "</span>\n                        <i></i>\n                    </div>\n                </div>\n                <div class=\"pollute\"></div>\n                <div class=\"environment-data\">\n                    <div class=\"temperature\">\n                        <p>\u6C14\u6E29</p>\n                        <p> ").concat(data.newData[0].Temperature, "\u2103</p>\n                    </div>\n                    <div class=\"humidity\">\n                        <p>\u6E7F\u5EA6</p>\n                        <p> ").concat(data.newData[0].Humidity, "%</p>\n                    </div>\n                    <div class=\"wind-speed\">\n                        <p>\u98CE\u901F</p>\n                        <p> ").concat(data.newData[0].WindSpeed, "m/s</p>\n                    </div>\n                </div>\n                    </div>\n                    <!-- \u566A\u97F3\u76D1\u6D4B -->\n                    <div class=\"noise\">\n                <div class=\"noise-title\">\n                    <i class=\"shade\"></i>\n                    \u566A\u97F3\u68C0\u6D4B\n                </div>\n                <div class=\"noise-state\">\n                    <p>\u6B63\u5E38</p>\n                </div>\n                <div class=\"noise-data\">\n                    \u5B9E\u65F6\u6570\u636E\uFF1A\n                    <span> ").concat(data.newData[0].Noise, "</span>\n                    dB\n                </div>\n                    </div>\n                </div>");
        $('#dustBox').html(html); // 初始化环境监测滚动

        var swiper = new Swiper('#swiper', {
          spaceBetween: 30
        }); // 选择设备

        $('.selech').on('click', 'li', function (event) {
          event.stopPropagation();
          $('.selech').css('display', 'none');
          swiper.slideTo($(this).index(), 500, false);
        });
      }
    });
  }; // 显示选择框


  $('#dustBox').on('click', '.environment-title', function (event) {
    event.stopPropagation(); // console.log(`选择栏出现`)

    $('.selech').css('display', 'block');
  }); // 选择设备
  // $('.selech').on('click','li',function(event){
  //     event.stopPropagation()
  //     $('.selech').css('display','none')
  //     // console.log(this.id)
  //     // console.log($(`#${this.id}`).html())
  //     // $(`#${this.id}`).on('click',(event)=>{
  //     //     event.stopPropagation()
  //     //     swiper.slideTo(0, 1000, false)
  //     //     // $('.selech').css('display','none')
  //     // })
  //     swiper.slideTo(0, 1000, false)
  // })
  // 获取天气数据

  $.ajax({
    type: "GET",
    url: "http://39.108.103.150:8989/lz/get/getWeather",
    data: {
      pid: pid
    },
    dataType: "json",
    success: function success(data) {
      // console.log(data)
      var mydate = new Date(); // console.log(mydate.getHours()+':'+mydate.getMinutes()+':'+mydate.getSeconds())

      var hours = mydate.getHours();
      var minutes = mydate.getMinutes();
      var seconds = mydate.getSeconds(); // 开启计算器更新时间

      setInterval(function () {
        seconds++;

        if (seconds == 60) {
          seconds = 0;
          minutes++;
        }

        if (minutes == 60) {
          minutes = 0;
          hours++;
        }

        if (hours == 24) {
          hours = 0;
        }

        var time1 = hours < 10 ? '0' + hours : hours;
        var time2 = minutes < 10 ? '0' + minutes : minutes;
        var time3 = seconds < 10 ? '0' + seconds : seconds; // 渲染天气预报模块

        $('#weather').html("<div class=\"weather-left\">\n                        <div class=\"time\">\n                            ".concat(time1 + ':' + time2, "\n                        </div>\n                        <div class=\"day\">\n                            ").concat(data.data[0].week, "\n                        </div>\n                        <div class=\"weather-data\">\n                            <i class=\"weather-img\"></i>\n                            <p>").concat(data.data[0].wea, "</p>\n                            <p>").concat(data.data[0].tem, "~").concat(data.data[0].tem2, "</p>\n                            <p class=\"weather-bg\">").concat(data.data[0].win[0], "</p>\n                            <i class=\"line\"></i>\n                        </div>\n                    </div>\n                    <div class=\"weather-right\">\n                        <div class=\"weather-title\">\n                            ").concat(data.city, "\u5E02\u5929\u6C14\u9884\u62A5\n                        </div>\n                        <div class=\"weather-box\">\n                            <div class=\"weather-data\">\n                                <p class=\"day\">").concat(data.data[1].week, "</p>\n                                <i class=\"weather-img\"></i>\n                                <p>").concat(data.data[1].wea, "</p>\n                                <p>").concat(data.data[1].tem, "~").concat(data.data[1].tem2, "</p>\n                                <p class=\"weather-bg\">").concat(data.data[1].win[0], "</p>\n                            </div>\n                            <div class=\"weather-data\">\n                                <p class=\"day\">").concat(data.data[2].week, "</p>\n                                <i class=\"weather-img\"></i>\n                                <p>").concat(data.data[2].wea, "</p>\n                                <p>").concat(data.data[2].tem, "~").concat(data.data[2].tem2, "</p>\n                                <p class=\"weather-bg\">").concat(data.data[2].win[0], "</p>\n                            </div>\n                        </div>\n                    </div>"));
      }, 1000);
    }
  }); // 获取设备名称与设备编号

  $.ajax({
    type: "GET",
    url: "http://39.108.103.150:8989/dustEmission/get/getDustEmissionList",
    data: {
      pid: pid
    },
    dataType: "json",
    success: function success(data) {
      // console.log(data.dustEmissionList)
      var html = '';

      for (var i = 0; i < data.dustEmissionList.length; i++) {
        html += "<li id=\"sid".concat(data.dustEmissionList[data.dustEmissionList.length - 1 - i].id, "\" index=\"").concat(i, "\">").concat(data.dustEmissionList[data.dustEmissionList.length - 1 - i].comments, "</li>");
        getDustEmissionData(data.dustEmissionList[data.dustEmissionList.length - 1 - i].id);
      }

      $('.dust-selech').html(html);
    }
  }); // 获取智能电箱设备数据

  $.ajax({
    type: "GET",
    url: "http://39.108.103.150:8989/electricityBox/get/getElectricBoxState",
    data: {
      pid: pid
    },
    dataType: "json",
    success: function success(data) {
      console.log(data);
      $('#electicBox').html("<div class=\"slide-box swiper-slide\">\n                    <div class=\"electic\" >\n                        <div class=\"electic-title\">\n                            <i class=\"shade\"></i>\n                            \u7528\u7535\u7BA1\u7406\n                        </div>\n                        <div class=\"this-month\">\n                            <i></i>\n                            \u7535\u7BB1\u8FD0\u884C\u72B6\u6001\uFF1A\n                            <span>".concat(data.sb, "</span>\n                        </div>\n                        <div class=\"electic-box\">\n                            <div class=\"today\">\n                                &nbsp;\n                                <p style=\"font-size:.2rem\">").concat(data.kg == 0 ? '关' : '开', "</p>\n                                <span>\u7BB1\u95E8\u5F00\u5173</span>\n                            </div>\n                            <div class=\"").concat(data.envirwarm < 45 ? 'electic-temperature' : 'electic-leakage', "\">\n                                ").concat(data.envirwarm, "\n                                <p>\u2103</p>\n                                <span>\u7535\u7BB1\u6E29\u5EA6</span>\n                            </div>\n                            <div class=").concat(data.current < 150 ? 'electic-temperature' : 'electic-leakage', ">\n                                ").concat(data.current, "\n                                <p>kwh</p>\n                                <span>\u7535\u7BB1\u6F0F\u7535</span>\n                            </div>\n                        </div>\n                    </div>\n                </div>")); // 初始化用电管理滚动

      var swiper2 = new Swiper('#swiper2', {
        spaceBetween: 30
      });
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
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/green.js"], null)
//# sourceMappingURL=/green.b63b8edf.map