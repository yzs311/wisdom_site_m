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
})({"js/establish.js":[function(require,module,exports) {
$(function () {
  // console.log('hello world')
  var pid = localStorage.getItem('pid'); // 创建整改单需要上传的数据

  var place = ''; // 具体位置

  var unitId = ''; // 分包单位id

  var fileUrl = ''; // 照片路径

  var describex = ''; // 问题描述

  var rank = 1; // 问题级别

  var deadlineTime = ''; // 整改期限

  var rectification = ''; // 整改要求
  // 添加照片点击事件

  $('.addPic').on('click', function () {
    $('.camera').click();
  }); // 照片上传

  $(".camera").change(function (e) {
    $('.addPic').css('display', 'none');
    $('.uploading').css('display', 'block');
    var headers = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    var temp = e.target.files[0];
    file = new FormData(); // 创建form对象

    file.append('file', temp); // 通过append向form对象添加数据
    // console.log(file.get('file')) //FormData私有类对象，访问不到，可以通过get判断值是否传进去

    axios.post("http://39.108.103.150:8989/lz/file/upload?folderName=1", file, headers).then(function (res) {
      // console.log(res.data.data[0].fileimgurl)
      $('.addPic').attr('src', res.data.data[0].fileimgurl);
      $('.addPic').css('display', 'block');
      $('.uploading').css('display', 'none');
      fileUrl = res.data.data[0].fileimgurl;
    });
  }); // 获取分包单位列表

  function getQueryBuildCompanyInFo() {
    axios.post("http://39.108.103.150:8989/lz/polling/queryBuildCompanyInFo?projectId=".concat(pid)).then(function (res) {
      // console.log(res.data)
      var html = '';

      for (var i = 0; i < res.data.msg.length; i++) {
        html += "<li data-unitid=\"".concat(res.data.msg[i].id, "\">").concat(res.data.msg[i].title, "</li>");
      }

      $('.unit-box ul').html(html); // 分包单位选项栏点击事件

      $('.unit-box ul li').on('click', function (event) {
        event.stopPropagation();
        $('.unit-box').css('display', 'none'); // $('.shade-box').css('display','none')
        // console.log($(this).data('unitid'))

        unitId = $(this).data('unitid');
        $('.unit .text').html("".concat($(this).text(), "<i></i>"));
      });
    });
  }

  getQueryBuildCompanyInFo(); // 设置整改期限

  var calendar = new datePicker();
  calendar.init({
    'trigger': '.deadline',

    /*按钮选择器，用于触发弹出插件*/
    'type': 'date',

    /*模式：date日期；datetime日期时间；time时间；ym年月；*/
    'minDate': '1900-1-1',

    /*最小日期*/
    'maxDate': '2100-12-31',

    /*最大日期*/
    'onSubmit': function onSubmit() {
      /*确认时触发事件*/
      var theSelectData = calendar.value; // console.log(theSelectData)

      $('.deadline span').html(theSelectData);
      deadlineTime = theSelectData;
    },
    'onClose': function onClose() {
      /*取消时触发事件*/
      // console.log(`123`)
    }
  }); // 问题级别选择

  $('.rank .button-box div').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active'); // console.log($(this).data('rank'))

    rank = $(this).data('rank');
  }); // 选择分包单位

  $('.unit').on('click', function () {
    $('.unit-box').css('display', 'block');
  }); // 创建巡检单

  $('.countersign').on('click', function () {
    place = $('.position input').val(); // console.log(place)

    describex = $('.describe textarea').val(); // console.log(describex)

    rectification = $('.require textarea').val(); // console.log(rectification)

    axios.post("http://39.108.103.150:8989/lz/polling/addPolling?place=".concat(place, "&describex=").concat(describex, "&rectification=").concat(rectification, "&unitId=").concat(unitId, "&fileUrl=").concat(fileUrl, "&rank=").concat(rank, "&deadlineTime=").concat(deadlineTime, "&projectId=").concat(pid)).then(function (res) {
      console.log(res.data);

      if (res.data.msg == '发起成功！') {
        location = '../components/quality.html';
      } else {
        alert('');
      }
    });
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49646" + '/');

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
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/establish.js"], null)
//# sourceMappingURL=/establish.25be478c.map