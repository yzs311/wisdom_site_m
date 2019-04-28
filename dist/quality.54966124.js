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
})({"js/quality.js":[function(require,module,exports) {
$(function () {
  var pid = localStorage.getItem('pid'); // console.log(`hello world`)
  // const height = $('body').height()
  // $('body').height(height)
  // console.log(3*0.1)
  // 初始化swiper

  var swiper = new Swiper('#swiper', {
    slidesPerView: 3,
    freeMode: true,
    scrollbar: {
      el: '.swiper-scrollbar'
    }
  }); // 导航栏点击事件

  $('.nav li').on('click', function (event) {
    event.stopPropagation(); // $(this).addClass('active').siblings().removeClass('active')
    // console.log($(this).text().includes('待办'))

    if ($(this).text().includes('全部巡检')) {
      $(this).addClass('active').siblings().removeClass('active');
      $('.list').css('display', 'block');
      $('.backlog').css('display', 'none');
      $('.sponsor').css('display', 'none');
      $('.inform').css('display', 'none');
    } else if ($(this).text().includes('待办')) {
      $(this).addClass('active').siblings().removeClass('active');
      $('.list').css('display', 'none');
      $('.backlog').css('display', 'block');
      $('.sponsor').css('display', 'none');
      $('.inform').css('display', 'none');
    } else if ($(this).text().includes('我发起的')) {
      $(this).addClass('active').siblings().removeClass('active');
      $('.list').css('display', 'none');
      $('.backlog').css('display', 'none');
      $('.sponsor').css('display', 'block');
      $('.inform').css('display', 'none');
    } else if ($(this).text().includes('通知')) {
      $(this).addClass('active').siblings().removeClass('active');
      $('.list').css('display', 'none');
      $('.backlog').css('display', 'none');
      $('.sponsor').css('display', 'none');
      $('.inform').css('display', 'block');
    }
  }); // 信息列表导航栏点击事件

  $('.list-nav span').on('click', function (event) {
    event.stopPropagation(); // $(this).siblings()

    if ($(this).html() == '待整改') {
      $(this).addClass('active').siblings().removeClass('active');
      $('.list-centent').css('display', 'block');
      $('.screen-box').css('display', 'none');
      $('.fixed-box').css('display', 'block');
      $('.review-list').css('display', 'none');
      $('.accomplish-list').css('display', 'none');
    } else if ($(this).html() == '筛选') {
      $(this).addClass('active').siblings().removeClass('active');
      $('.list-centent').css('display', 'none');
      $('.screen-box').css('display', 'block');
      $('.fixed-box').css('display', 'none');
      $('.review-list').css('display', 'none');
      $('.accomplish-list').css('display', 'none');
    } else if ($(this).html() == '待复查') {
      $(this).addClass('active').siblings().removeClass('active');
      $('.list-centent').css('display', 'none');
      $('.screen-box').css('display', 'none');
      $('.fixed-box').css('display', 'block');
      $('.review-list').css('display', 'block');
      $('.accomplish-list').css('display', 'none');
    } else if ($(this).html() == '已完成') {
      $(this).addClass('active').siblings().removeClass('active');
      $('.list-centent').css('display', 'none');
      $('.screen-box').css('display', 'none');
      $('.fixed-box').css('display', 'block');
      $('.review-list').css('display', 'none');
      $('.accomplish-list').css('display', 'block');
    }

    if ($(this).html() == '待办') {
      $(this).addClass('active').siblings().removeClass('active');
      $('.list-centent').css('display', 'block');
    } else if ($(this).html() == '已办') {
      $(this).addClass('active').siblings().removeClass('active');
      $('.list-centent').css('display', 'none');
    } else if ($(this).html() == '信息') {
      $(this).addClass('active').siblings().removeClass('active');
      $('#message').css('display', 'block');
      $('#warning').css('display', 'none');
    } else if ($(this).html() == '警告') {
      $(this).addClass('active').siblings().removeClass('active');
      $('#message').css('display', 'none');
      $('#warning').css('display', 'block');
    } // console.log($(this).html())

  }); // 筛选按钮点击事件

  $('.option-box li').on('click', function (event) {
    event.stopPropagation();
    $(this).addClass('active').siblings().removeClass('active');
  }); // 分包单位点击事件

  $('.unit .option-bar').on('click', function (event) {
    event.stopPropagation();
    $('.unit-box').css('display', 'block');
    $('.shade-box').css('display', 'block');
  }); // 工区点击事件

  $('.work-area .option-bar').on('click', function (event) {
    event.stopPropagation();
    $('.work-area-box').css('display', 'block');
    $('.shade-box').css('display', 'block');
  }); // 分包单位选项栏点击事件

  $('.unit-box ul li').on('click', function (event) {
    event.stopPropagation();
    $('.unit-box').css('display', 'none');
    $('.shade-box').css('display', 'none');
    $('.unit .option-bar').html("".concat($(this).text(), "<i></i>"));
  }); // 工区选项栏点击事件

  $('.work-area-box ul li').on('click', function (event) {
    event.stopPropagation();
    $('.work-area-box').css('display', 'none');
    $('.shade-box').css('display', 'none');
    $('.work-area .option-bar').html("".concat($(this).text(), "<i></i>"));
  }); // 获取待整改整改单列表

  function rectifyQueryPolling() {
    axios.post("http://39.108.103.150:8989/lz/polling/queryPolling?examineUserId=".concat(pid, "&type=0")).then(function (res) {
      console.log(res.data);
      var html = '';

      for (var i = 0; i < res.data.msg.length; i++) {
        // console.log(res.data.msg[i])
        html += "<li>\n                            <a href=\"./qualityParticulars.html?pollingId=".concat(res.data.msg[res.data.msg.length - 1 - i].pollingId, "&type=0&pollingDetailId=").concat(res.data.msg[res.data.msg.length - 1 - i].pollingDetailId, "\">\n                                <div class=\"title\">\n                                    <div class=\"title-name\">\n                                        ").concat(res.data.msg[res.data.msg.length - 1 - i].describex, "\n                                    </div>\n                                    <div class=\"title-state\" style=\"color:rgb(233, 162, 47)\">\n                                        \u5F85\u6574\u6539\n                                    </div>\n                                </div>\n                                <div class=\"middle\">\n                                    <div>\n                                        <span class=\"name\">\u68C0\u67E5\u533A\u57DF</span>\n                                        <span class=\"message\">").concat(res.data.msg[res.data.msg.length - 1 - i].place, "</span>\n                                    </div>\n                                    <div>\n                                        <span class=\"name\">\u6574\u6539\u8981\u6C42</span>\n                                        <span class=\"message\">").concat(res.data.msg[res.data.msg.length - 1 - i].rectification, "</span>\n                                    </div>\n                                    <div>\n                                        <span class=\"name\">\u68C0\u67E5\u4EBA</span>\n                                        <span class=\"message\">\u67D0\u67D0\u67D0</span>\n                                    </div>\n                                    <div>\n                                        <span class=\"name\">\u6574\u6539\u65F6\u9650</span>\n                                        <span class=\"message\">").concat(res.data.msg[res.data.msg.length - 1 - i].deadlineTime, "</span>\n                                    </div>\n                                    <div class=\"img-box\" style=\"background-image:url(").concat(res.data.msg[res.data.msg.length - 1 - i].fileUrl, ")\"></div>\n                                    <div class=\"bottom\">\n                                        <span class=\"").concat(res.data.msg[res.data.msg.length - 1 - i].rank == 1 ? 'slight' : res.data.msg[res.data.msg.length - 1 - i].rank == 2 ? 'ordinary' : 'severity', "\"></span>\n                                        <span class=\"name\">\u6574\u6539\u4EBA</span>\n                                        <span class=\"message\">\u67D0\u67D0\u67D0</span>\n                                        <div class=\"time\">").concat(res.data.msg[res.data.msg.length - 1 - i].createTime, "</div>\n                                    </div>\n                                </div>\n                            </a>\n                        </li>");
      }

      $('.list-centent ul').html(html);
    });
  } // 获取待审核整改单列表


  function auditQueryPolling() {
    axios.post("http://39.108.103.150:8989/lz/polling/queryPolling?examineUserId=".concat(pid, "&type=1")).then(function (res) {
      console.log(res.data);
      var html = '';

      for (var i = 0; i < res.data.msg.length; i++) {
        // console.log(res.data.msg[i])
        html += "<li>\n                            <a href=\"./qualityParticulars.html?pollingId=".concat(res.data.msg[res.data.msg.length - 1 - i].pollingId, "&type=1&pollingDetailId=").concat(res.data.msg[res.data.msg.length - 1 - i].pollingDetailId, "\">\n                                <div class=\"title\">\n                                    <div class=\"title-name\">\n                                        ").concat(res.data.msg[res.data.msg.length - 1 - i].describex, "\n                                    </div>\n                                    <div class=\"title-state\" style=\"color:rgb(233, 162, 47)\">\n                                        \u5F85\u590D\u67E5\n                                    </div>\n                                </div>\n                                <div class=\"middle\">\n                                    <div>\n                                        <span class=\"name\">\u68C0\u67E5\u533A\u57DF</span>\n                                        <span class=\"message\">").concat(res.data.msg[res.data.msg.length - 1 - i].place, "</span>\n                                    </div>\n                                    <div>\n                                        <span class=\"name\">\u6574\u6539\u8981\u6C42</span>\n                                        <span class=\"message\">").concat(res.data.msg[res.data.msg.length - 1 - i].rectification, "</span>\n                                    </div>\n                                    <div>\n                                        <span class=\"name\">\u68C0\u67E5\u4EBA</span>\n                                        <span class=\"message\">\u67D0\u67D0\u67D0</span>\n                                    </div>\n                                    <div>\n                                        <span class=\"name\">\u6574\u6539\u65F6\u9650</span>\n                                        <span class=\"message\">").concat(res.data.msg[res.data.msg.length - 1 - i].deadlineTime, "</span>\n                                    </div>\n                                    <div class=\"img-box\" style=\"background-image:url(").concat(res.data.msg[res.data.msg.length - 1 - i].fileUrl, ")\"></div>\n                                    <div class=\"bottom\">\n                                        <span class=\"").concat(res.data.msg[res.data.msg.length - 1 - i].rank == 1 ? 'slight' : res.data.msg[res.data.msg.length - 1 - i].rank == 2 ? 'ordinary' : res.data.msg[res.data.msg.length - 1 - i].rank == 3 ? 'severity' : '', "\"></span>\n                                        <span class=\"name\">\u6574\u6539\u4EBA</span>\n                                        <span class=\"message\">\u67D0\u67D0\u67D0</span>\n                                        <div class=\"time\">").concat(res.data.msg[res.data.msg.length - 1 - i].createTime, "</div>\n                                    </div>\n                                </div>\n                            </a>\n                        </li>");
      }

      $('.review-list ul').html(html);
    });
  } // 获取已完成的整改单列表


  function accomplishQueryPolling() {
    axios.post("http://39.108.103.150:8989/lz/polling/queryPolling?examineUserId=".concat(pid, "&type=2")).then(function (res) {
      console.log(res.data);
      var html = '';

      for (var i = 0; i < res.data.msg.length; i++) {
        // console.log(res.data.msg[i])
        html += "<li>\n                            <a href=\"./qualityParticulars.html?pollingId=".concat(res.data.msg[res.data.msg.length - 1 - i].pollingId, "&type=2&pollingDetailId=").concat(res.data.msg[res.data.msg.length - 1 - i].pollingDetailId, "\">\n                                <div class=\"title\">\n                                    <div class=\"title-name\">\n                                        ").concat(res.data.msg[res.data.msg.length - 1 - i].describex, "\n                                    </div>\n                                    <div class=\"title-state\" style=\"color:#4cd964\">\n                                        \u5DF2\u5B8C\u6210\n                                    </div>\n                                </div>\n                                <div class=\"middle\">\n                                    <div>\n                                        <span class=\"name\">\u68C0\u67E5\u533A\u57DF</span>\n                                        <span class=\"message\">").concat(res.data.msg[res.data.msg.length - 1 - i].place, "</span>\n                                    </div>\n                                    <div>\n                                        <span class=\"name\">\u6574\u6539\u8981\u6C42</span>\n                                        <span class=\"message\">").concat(res.data.msg[res.data.msg.length - 1 - i].rectification, "</span>\n                                    </div>\n                                    <div>\n                                        <span class=\"name\">\u68C0\u67E5\u4EBA</span>\n                                        <span class=\"message\">\u67D0\u67D0\u67D0</span>\n                                    </div>\n                                    <div>\n                                        <span class=\"name\">\u6574\u6539\u65F6\u9650</span>\n                                        <span class=\"message\">").concat(res.data.msg[res.data.msg.length - 1 - i].deadlineTime, "</span>\n                                    </div>\n                                    <div class=\"img-box\" style=\"background-image:url(").concat(res.data.msg[res.data.msg.length - 1 - i].fileUrl, ")\"></div>\n                                    <div class=\"bottom\">\n                                        <span class=\"").concat(res.data.msg[res.data.msg.length - 1 - i].rank == 1 ? 'slight' : res.data.msg[res.data.msg.length - 1 - i].rank == 2 ? 'ordinary' : res.data.msg[res.data.msg.length - 1 - i].rank == 3 ? 'severity' : '', "\"></span>\n                                        <span class=\"name\">\u6574\u6539\u4EBA</span>\n                                        <span class=\"message\">\u67D0\u67D0\u67D0</span>\n                                        <div class=\"time\">").concat(res.data.msg[res.data.msg.length - 1 - i].createTime, "</div>\n                                    </div>\n                                </div>\n                            </a>\n                        </li>");
      }

      $('.accomplish-list ul').html(html);
    });
  }

  accomplishQueryPolling();
  rectifyQueryPolling();
  auditQueryPolling();
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49590" + '/');

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
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/quality.js"], null)
//# sourceMappingURL=/quality.54966124.map