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
})({"js/qualityParticulars.js":[function(require,module,exports) {
$(function () {
  var pid = localStorage.getItem('pid'); // 提交整改所需数据

  var type = getQueryString('type'); // 表单状态

  var pollingId = getQueryString('pollingId'); // 发起整改id

  var pollingDetailId = getQueryString('pollingDetailId'); // 整改流程id

  var describex = ''; // 整改描述

  var fileUrl = ''; // 照片路径

  var isAvailable = ''; // 整改单状态
  // console.log(`123`)
  // 整改点击事件

  $('.abarbeitung-button').on('click', function (event) {
    event.stopPropagation();
    isAvailable = 1;
    $('.abarbeitung-box').css('display', 'block');
  }); // 获取整改单id

  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);

    if (r != null) {
      return unescape(r[2]);
    }

    return null;
  } // 获取整改单详情页


  function getQueryPollingIs() {
    // 获取url中的整改单id
    // console.log(pollingId)
    axios.post("http://39.108.103.150:8989/lz/polling/queryPollingIs?pollingId=".concat(pollingId, "&type=").concat(type)).then(function (res) {
      var number = 1;
      console.log(res.data);

      for (var i = 0; i < res.data.msg.length; i++) {
        if (res.data.msg[i].isAvailable == 2 || res.data.msg[i].isAvailable == 1) {
          html += "<div class=\"title\">\n                                \u7B2C".concat(number, "\u6B21\u6574\u6539\n                            </div>\n                            <div class=\"describe\">\n                                <p>\u6574\u6539\u7ED3\u679C</p>\n                                <span>").concat(res.data.msg[i].describex, "</span>\n                            </div>\n                            <div class=\"name\">\n                                \u6574\u6539\u540E\u7167\u7247\n                            </div>\n                            <div class=\"pic-box\" style=\"margin-bottom: .175rem\">\n                                <img src=\"").concat(res.data.msg[i].fileUrl, "\" alt=\"\">\n                            </div>");
          number++;
        }

        if (res.data.msg[i].isAvailable == 6 || res.data.msg[i].isAvailable == 5) {
          html += "<div class=\"justify\">\n                                <span>\u590D\u67E5\u4EBA</span>\n                                <span class=\"white-color\">\u67D0\u67D0\u67D0</span>\n                            </div>\n                            <div class=\"justify\">\n                                <span>\u590D\u67E5\u610F\u89C1</span>\n                                <span class=\"white-color\">".concat(res.data.msg[i].isAvailable == 6 ? '不通过' : '通过', "</span>\n                            </div>\n                            <div class=\"name\">\n                                \u590D\u67E5\u540E\u7167\u7247\n                            </div>\n                            <div class=\"pic-box\" style=\"margin-bottom: .25rem\">\n                                <img src=\"").concat(res.data.msg[i].fileUrl, "\" alt=\"\">\n                            </div>\n                            <div class=\"line\"></div>");
        }
      }

      $('.centent-box').html(html);
    });
  } // 获取复查单详情页
  // 获取整改单详情页数据


  var polling = '';

  function getQueryPolling() {
    axios.post("http://39.108.103.150:8989/lz/polling/queryPolling?examineUserId=".concat(pid, "&type=").concat(type)).then(function (res) {
      // console.log(res.data)
      for (var i = 0; i < res.data.msg.length; i++) {
        if (res.data.msg[i].pollingId == pollingId) {
          console.log(res.data.msg[i]);
          polling = res.data.msg[i];
          setCentent();
          setState();
        }
      }
    });
  } // 渲染整改单详情页


  var html = '';

  function setCentent() {
    html = "<div class=\"title\">\n                ".concat(polling.describex, "\n            </div>\n            <div class=\"justify\">\n                <span>\u68C0\u67E5\u533A\u57DF</span>\n                <span class=\"white-color\">").concat(polling.place, "</span>\n            </div>\n            <div class=\"justify\">\n                <span>\u5206\u5305\u5355\u4F4D</span>\n                <span class=\"white-color\">").concat(polling.unitTitle, "</span>\n            </div>\n            <div class=\"border-bottom\"></div>\n            <div class=\"justify\">\n                <span>\u95EE\u9898\u7EA7\u522B</span>\n                <span class=\"").concat(polling.rank == 1 ? 'slight' : polling.rank == 2 ? 'ordinary' : 'severity', "\">").concat(polling.rank == 1 ? '轻微' : polling.rank == 2 ? '一般' : '严重', "</span>\n            </div>\n            <div class=\"pic-box\">\n                <img src=\"").concat(polling.fileUrl, "\" alt=\"\">\n            </div>\n            <div class=\"justify\">\n                <span>\u68C0\u67E5\u4EBA</span>\n                <span class=\"white-color\">\u67D0\u67D0\u67D0</span>\n            </div>\n            <div class=\"justify\">\n                <span>\u68C0\u67E5\u65F6\u95F4</span>\n                <span class=\"white-color\">").concat(polling.createTime, "</span>\n            </div>\n            <div class=\"line\"></div>\n            <div class=\"title\">\n                \u6574\u6539\u901A\u77E5\n            </div>\n            <div class=\"justify\">\n                <span>\u6574\u6539\u4EBA</span>\n                <span class=\"white-color\">\u67D0\u67D0\u67D0</span>\n            </div>\n            <div class=\"justify\">\n                <span>\u6574\u6539\u65F6\u9650</span>\n                <span class=\"white-color\">").concat(polling.deadlineTime, "</span>\n            </div>\n            <div class=\"describe\">\n                <p>\u6574\u6539\u8981\u6C42</p>\n                <span>").concat(polling.rectification, "</span>\n            </div>\n            <div class=\"line\"></div>");
    getQueryPollingIs();
  }

  getQueryPolling(); // 上传照片信息
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
  }); // 确认取消点击事件

  $('.abarbeitung-affirm').on('click', function (event) {
    event.stopPropagation();
    describex = $('.abarbeitung-box textarea').val();
    axios.post("http://39.108.103.150:8989/lz/polling/updatePollingDetail?id=".concat(pollingDetailId, "&pollingId=").concat(pollingId, "&examineUserid=").concat(pid, "&describex=").concat(describex, "&fileUrl=").concat(fileUrl, "&isAvailable=").concat(isAvailable)).then(function (res) {
      console.log(res.data);

      if (res.data.msg == '整改成功！等待审核') {
        location = '../components/quality.html';
      } else {
        alert("\u6570\u636E\u4E0A\u4F20\u5931\u8D25\uFF01\u8BF7\u91CD\u8BD5");
      }
    });
  });
  $('.abarbeitung-cancel').on('click', function (event) {
    event.stopPropagation();
    console.log("123");
    $('.abarbeitung-box').css('display', 'none');
  }); // 根据整改单状态渲染按钮跟头部

  function setState() {
    if (type == 0) {
      $('.state-box').html("<div class=\"state\">\n                    \u5F85\u6574\u6539\n                </div>\n                <div class=\"time\">\n                    \u521B\u5EFA\u65F6\u95F4\uFF1A ".concat(polling.createTime, "\n                </div>")).addClass('orange-color');
      $('.abarbeitung-button').css('display', 'block');
      $('.review-button').css('display', 'none');
    } else if (type == 1) {
      $('.state-box').html("<div class=\"state\">\n                    \u5F85\u590D\u67E5\n                </div>\n                <div class=\"time\">\n                    \u521B\u5EFA\u65F6\u95F4\uFF1A ".concat(polling.createTime, "\n                </div>")).addClass('orange-color');
    } else if (type == 2) {
      $('.state-box').html("<div class=\"state\">\n                    \u5DF2\u5B8C\u6210\n                </div>\n                <div class=\"time\">\n                    \u521B\u5EFA\u65F6\u95F4\uFF1A ".concat(polling.createTime, "\n                </div>")).addClass('green-color');
      $('.review-button').css('display', 'none');
    }
  } // 通过或不通过点击事件


  $('.review-button .pass').on('click', function (event) {
    event.stopPropagation();
    isAvailable = 5;
    $('.review-box').css('display', 'block');
  });
  $('.review-button .no-pass').on('click', function (event) {
    event.stopPropagation();
    isAvailable = 6;
    $('.review-box').css('display', 'block');
  }); // 添加照片点击事件

  $('.review-addPic').on('click', function () {
    $('.review-camera').click();
  }); // 照片上传

  $(".review-camera").change(function (e) {
    $('.review-addPic').css('display', 'none');
    $('.review-uploading').css('display', 'block');
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
      $('.review-addPic').attr('src', res.data.data[0].fileimgurl);
      $('.review-addPic').css('display', 'block');
      $('.review-uploading').css('display', 'none');
      fileUrl = res.data.data[0].fileimgurl;
    });
  }); // 确认取消点击事件

  $('.review-affirm').on('click', function (event) {
    event.stopPropagation();
    describex = $('.review-box textarea').val();
    axios.post("http://39.108.103.150:8989/lz/polling/updatePolling?id=".concat(pollingDetailId, "&pollingId=").concat(pollingId, "&examineUserid=").concat(pid, "&describex=").concat(describex, "&fileUrl=").concat(fileUrl, "&isAvailable=").concat(isAvailable)).then(function (res) {
      console.log(res.data);

      if (res.data.msg == '审核成功！') {
        location = '../components/quality.html';
      } else {
        alert("\u6570\u636E\u4E0A\u4F20\u5931\u8D25\uFF01\u8BF7\u91CD\u8BD5");
      }
    });
  });
  $('.review-cancel').on('click', function (event) {
    event.stopPropagation();
    console.log("123");
    $('.review-box').css('display', 'none');
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
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/qualityParticulars.js"], null)
//# sourceMappingURL=/qualityParticulars.6be09f0a.map