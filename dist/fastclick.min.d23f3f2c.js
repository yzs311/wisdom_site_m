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
})({"lib/fastclick/fastclick.min.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function () {
  "use strict";

  function t(e, o) {
    function i(t, e) {
      return function () {
        return t.apply(e, arguments);
      };
    }

    var r;

    if (o = o || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = o.touchBoundary || 10, this.layer = e, this.tapDelay = o.tapDelay || 200, this.tapTimeout = o.tapTimeout || 700, !t.notNeeded(e)) {
      for (var a = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], c = this, s = 0, u = a.length; u > s; s++) {
        c[a[s]] = i(c[a[s]], c);
      }

      n && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function (t, n, o) {
        var i = Node.prototype.removeEventListener;
        "click" === t ? i.call(e, t, n.hijacked || n, o) : i.call(e, t, n, o);
      }, e.addEventListener = function (t, n, o) {
        var i = Node.prototype.addEventListener;
        "click" === t ? i.call(e, t, n.hijacked || (n.hijacked = function (t) {
          t.propagationStopped || n(t);
        }), o) : i.call(e, t, n, o);
      }), "function" == typeof e.onclick && (r = e.onclick, e.addEventListener("click", function (t) {
        r(t);
      }, !1), e.onclick = null);
    }
  }

  var e = navigator.userAgent.indexOf("Windows Phone") >= 0,
      n = navigator.userAgent.indexOf("Android") > 0 && !e,
      o = /iP(ad|hone|od)/.test(navigator.userAgent) && !e,
      i = o && /OS 4_\d(_\d)?/.test(navigator.userAgent),
      r = o && /OS [6-7]_\d/.test(navigator.userAgent),
      a = navigator.userAgent.indexOf("BB10") > 0;
  t.prototype.needsClick = function (t) {
    switch (t.nodeName.toLowerCase()) {
      case "button":
      case "select":
      case "textarea":
        if (t.disabled) return !0;
        break;

      case "input":
        if (o && "file" === t.type || t.disabled) return !0;
        break;

      case "label":
      case "iframe":
      case "video":
        return !0;
    }

    return /\bneedsclick\b/.test(t.className);
  }, t.prototype.needsFocus = function (t) {
    switch (t.nodeName.toLowerCase()) {
      case "textarea":
        return !0;

      case "select":
        return !n;

      case "input":
        switch (t.type) {
          case "button":
          case "checkbox":
          case "file":
          case "image":
          case "radio":
          case "submit":
            return !1;
        }

        return !t.disabled && !t.readOnly;

      default:
        return /\bneedsfocus\b/.test(t.className);
    }
  }, t.prototype.sendClick = function (t, e) {
    var n, o;
    document.activeElement && document.activeElement !== t && document.activeElement.blur(), o = e.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, t.dispatchEvent(n);
  }, t.prototype.determineEventType = function (t) {
    return n && "select" === t.tagName.toLowerCase() ? "mousedown" : "click";
  }, t.prototype.focus = function (t) {
    var e;
    o && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus();
  }, t.prototype.updateScrollParent = function (t) {
    var e, n;

    if (e = t.fastClickScrollParent, !e || !e.contains(t)) {
      n = t;

      do {
        if (n.scrollHeight > n.offsetHeight) {
          e = n, t.fastClickScrollParent = n;
          break;
        }

        n = n.parentElement;
      } while (n);
    }

    e && (e.fastClickLastScrollTop = e.scrollTop);
  }, t.prototype.getTargetElementFromEventTarget = function (t) {
    return t.nodeType === Node.TEXT_NODE ? t.parentNode : t;
  }, t.prototype.onTouchStart = function (t) {
    var e, n, r;
    if (t.targetTouches.length > 1) return !0;

    if (e = this.getTargetElementFromEventTarget(t.target), n = t.targetTouches[0], o) {
      if (r = window.getSelection(), r.rangeCount && !r.isCollapsed) return !0;

      if (!i) {
        if (n.identifier && n.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
        this.lastTouchIdentifier = n.identifier, this.updateScrollParent(e);
      }
    }

    return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = n.pageX, this.touchStartY = n.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0;
  }, t.prototype.touchHasMoved = function (t) {
    var e = t.changedTouches[0],
        n = this.touchBoundary;
    return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n ? !0 : !1;
  }, t.prototype.onTouchMove = function (t) {
    return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0;
  }, t.prototype.findControl = function (t) {
    return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea");
  }, t.prototype.onTouchEnd = function (t) {
    var e,
        a,
        c,
        s,
        u,
        l = this.targetElement;
    if (!this.trackingClick) return !0;
    if (t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
    if (t.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;

    if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, a = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, r && (u = t.changedTouches[0], l = document.elementFromPoint(u.pageX - window.pageXOffset, u.pageY - window.pageYOffset) || l, l.fastClickScrollParent = this.targetElement.fastClickScrollParent), c = l.tagName.toLowerCase(), "label" === c) {
      if (e = this.findControl(l)) {
        if (this.focus(l), n) return !1;
        l = e;
      }
    } else if (this.needsFocus(l)) return t.timeStamp - a > 100 || o && window.top !== window && "input" === c ? (this.targetElement = null, !1) : (this.focus(l), this.sendClick(l, t), o && "select" === c || (this.targetElement = null, t.preventDefault()), !1);

    return o && !i && (s = l.fastClickScrollParent, s && s.fastClickLastScrollTop !== s.scrollTop) ? !0 : (this.needsClick(l) || (t.preventDefault(), this.sendClick(l, t)), !1);
  }, t.prototype.onTouchCancel = function () {
    this.trackingClick = !1, this.targetElement = null;
  }, t.prototype.onMouse = function (t) {
    return this.targetElement ? t.forwardedTouchEvent ? !0 : t.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1) : !0 : !0;
  }, t.prototype.onClick = function (t) {
    var e;
    return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail ? !0 : (e = this.onMouse(t), e || (this.targetElement = null), e);
  }, t.prototype.destroy = function () {
    var t = this.layer;
    n && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1);
  }, t.notNeeded = function (t) {
    var e, o, i, r;
    if ("undefined" == typeof window.ontouchstart) return !0;

    if (o = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
      if (!n) return !0;

      if (e = document.querySelector("meta[name=viewport]")) {
        if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
        if (o > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0;
      }
    }

    if (a && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), i[1] >= 10 && i[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
      if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
      if (document.documentElement.scrollWidth <= window.outerWidth) return !0;
    }

    return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction ? !0 : (r = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], r >= 27 && (e = document.querySelector("meta[name=viewport]"), e && (-1 !== e.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === t.style.touchAction || "manipulation" === t.style.touchAction ? !0 : !1);
  }, t.attach = function (e, n) {
    return new t(e, n);
  }, "function" == typeof define && "object" == _typeof(define.amd) && define.amd ? define(function () {
    return t;
  }) : "undefined" != typeof module && module.exports ? (module.exports = t.attach, module.exports.FastClick = t) : window.FastClick = t;
}();
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53615" + '/');

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
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","lib/fastclick/fastclick.min.js"], null)
//# sourceMappingURL=/fastclick.min.d23f3f2c.map