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
  var pid = localStorage.getItem('pid'); // 手机长度适配

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
    // console.log($(this).val())
    var value = $(this).val();
    $.ajax({
      type: "GET",
      url: "http://39.108.103.150:8989/lz/hire/localtionList",
      data: {
        id: pid,
        string: value
      },
      dataType: "json",
      success: function success(data) {
        console.log(data);
        var html = '';

        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            html += "<li data-name=".concat(data[i].hname, ">\n                            <div class=\"left-img\"></div>\n                            <div class=\"content\">\n                                <div class=\"name\">\n                                    \u59D3\u540D\uFF1A").concat(data[i].hname, "\n                                </div>\n                                <div class=\"company\">\n                                    \u6240\u5C5E\u516C\u53F8\uFF1A").concat(data[i].laowu, "\n                                </div>\n                                <div class=\"location\">\n                                    \u6240\u5C5E\u5DE5\u533A\uFF1A").concat(data[i].areaList[0].name, "\n                                </div>\n                            </div>\n                            <div class=\"right-img\"></div>\n                        </li>");
          }

          $('#searchList').html(html);
          $('.search-data').css('display', 'block');
        } else {
          $('#searchList').html("<li style=\"border-bottom:none\">\n                            <div class=\"content\" style=\"line-height:.7rem; text-align:center; font-size:.16rem\">\n                                \u65E0\u76F8\u5173\u4EBA\u5458\n                            </div>\n                        </li>");
          $('.search-data').css('display', 'block');
        }
      }
    });

    if (value == '') {
      $('.search-data').css('display', 'none');
    }
  });
  var marker; // 当前位置

  var circle; // 电子围栏

  var polyline; // 历史轨迹
  // 查看人员信息点击事件

  $('#searchList').on('click', 'li', function () {
    // console.log($(this).data('name'))
    var name = $(this).data('name');
    $('.history-box').css('display', 'none');
    $.ajax({
      type: "GET",
      url: "http://39.108.103.150:8989/lz/hire/localtionList",
      data: {
        id: pid,
        string: name
      },
      dataType: "json",
      // async: false,
      success: function success(data) {
        console.log(data);

        if (data[0].localtionList) {
          var _temp = [];
          var temp2 = [];

          _temp.push(data[0].areaList[0].xloc);

          _temp.push(data[0].areaList[0].yloc);

          temp2.push(data[0].localtionList[0].xloc);
          temp2.push(data[0].localtionList[0].yloc);
          $('.data-box').css('display', 'block');
          $('.search-data').css('display', 'none');
          marker = new AMap.Marker({
            position: temp2 // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]

          });
          map.add(marker);
          circle = new AMap.Circle({
            center: _temp,
            // 圆心位置
            radius: data[0].areaList[0].radius,
            // 圆半径
            fillColor: 'none',
            // 圆形填充颜色
            fillOpacity: 0,
            // 填充色透明度
            strokeColor: '#3979fe',
            // 描边颜色
            strokeWeight: 2 // 描边宽度

          });
          map.add(circle);
          map.setZoomAndCenter(13, _temp);
          $('#dataBox').html("<div class=\"top-box\">\n                            <div class=\"list-box\">\n                                <ul>\n                                    <li class=\"name\">\n                                        \u59D3\u540D\uFF1A".concat(data[0].hname, "\n                                    </li>\n                                    <li>\n                                        \u7535\u8BDD\uFF1A").concat(data[0].phone, "\n                                    </li>\n                                    <li>\n                                        \u6240\u5C5E\u516C\u53F8\uFF1A").concat(data[0].laowu, "\n                                    </li>\n                                    <li>\n                                        \u8BBE\u5907\u7F16\u53F7\uFF1A").concat(data[0].imei, "\n                                    </li>\n                                    <li>\n                                        \u5B9A\u4F4D\u65F6\u95F4\uFF1A").concat(data[0].localtionList[0].createDate, "\n                                    </li>\n                                    <li>\n                                        \u5B9A\u4F4D\u5730\u5740\uFF1A").concat(data[0].localtionList[0].address, "\n                                    </li>\n                                </ul>\n                            </div>\n                        </div>\n                        <div class=\"bottom-box\">\n                            <div class=\"electric\">\n                                \u7535\u91CF\uFF1A").concat(data[0].localtionList[0].bat, "%\n                            </div>\n                            <div class=\"refresh\">\n                                \u5237\u65B0\u5B9A\u4F4D\n                            </div>\n                            <div class=\"switchover\" id=\"history\" >\n                                \u5386\u53F2\u8F68\u8FF9\n                            </div>\n                        </div>"));
          var calendar = new datePicker();
          calendar.init({
            'trigger': '#history',

            /*按钮选择器，用于触发弹出插件*/
            'type': 'date',

            /*模式：date日期；datetime日期时间；time时间；ym年月；*/
            'minDate': '1900-1-1',

            /*最小日期*/
            'maxDate': '2100-12-31',

            /*最大日期*/
            'onSubmit': function onSubmit() {
              /*确认时触发事件*/
              var theSelectData = calendar.value; // console.log(name)

              $.ajax({
                type: "GET",
                url: "http://39.108.103.150:8989/lz/hire/localtionList",
                data: {
                  id: pid,
                  string: name,
                  createDate: theSelectData
                },
                dataType: "json",
                success: function success(data) {
                  // console.log(data)
                  $('.data-box').css('display', 'none');
                  $('.history-box').css('display', 'block');
                  var temp = [];
                  var temp2 = [];
                  var temp3 = [];
                  temp.push(data[0].areaList[0].xloc);
                  temp.push(data[0].areaList[0].yloc);

                  for (var i = 0; i < data[0].localtionList.length; i++) {
                    temp2 = [];
                    temp2.push(data[0].localtionList[data[0].localtionList.length - 1 - i].xloc);
                    temp2.push(data[0].localtionList[data[0].localtionList.length - 1 - i].yloc);
                    temp3.push(temp2);
                  }

                  polyline = new AMap.Polyline({
                    path: temp3,
                    lineJoin: 'round',
                    //折线拐点样式
                    showDir: true,
                    //移动方向
                    strokeWeight: 3,
                    //线条宽度
                    strokeColor: '#3366ff' //线条颜色

                  });
                  map.add(polyline);
                  map.remove(marker);
                  map.setZoomAndCenter(13, temp);
                  $('#historyBox').html("<div class=\"top-box\" id=\"historyTop\">\n                                            <div class=\"pull-up\"></div>\n                                            <div class=\"list-box\">\n                                                <ul>\n                                                    <li class=\"name\">\n                                                        \u59D3\u540D\uFF1A".concat(data[0].hname, "\n                                                    </li>\n                                                    <li>\n                                                        \u7535\u8BDD\uFF1A").concat(data[0].phone, "\n                                                    </li>\n                                                    <li>\n                                                        \u6240\u5C5E\u516C\u53F8\uFF1A").concat(data[0].laowu, "\n                                                    </li>\n                                                    <li>\n                                                        \u8BBE\u5907\u7F16\u53F7\uFF1A").concat(data[0].imei, "\n                                                    </li>\n                                                </ul>\n                                            </div>\n                                        </div>\n                                        <div class=\"middle-box\" id=\"historyMiddle\">\n                                            <div class=\"enter\">\n                                                <div class=\"img-box\"></div>\n                                                <ul>\n                                                    <li>\n                                                        \u8BBE\u5907\u7535\u91CF\uFF1A").concat(data[0].localtionList[0].bat, "%\n                                                    </li>\n                                                    <li>\n                                                        \u65F6\u95F4\uFF1A").concat(data[0].localtionList[0].createDate, "\n                                                        <br>\n\n                                                    </li>\n                                                    <li>\n                                                        \u4F4D\u7F6E\uFF1A").concat(data[0].localtionList[0].address, "\n                                                    </li>\n                                                </ul>\n                                            </div>\n                                            <div class=\"come\">\n                                                <div class=\"img-box\"></div>\n                                                <ul>\n                                                    <li>\n                                                        \u8BBE\u5907\u7535\u91CF\uFF1A").concat(data[0].localtionList[data[0].localtionList.length - 1].bat, "%\n                                                    </li>\n                                                    <li>\n                                                        \u65F6\u95F4\uFF1A").concat(data[0].localtionList[data[0].localtionList.length - 1].createDate, "\n                                                        <br>\n\n                                                    </li>\n                                                    <li>\n                                                        \u4F4D\u7F6E\uFF1A").concat(data[0].localtionList[data[0].localtionList.length - 1].address, "\n                                                    </li>\n                                                </ul>\n                                            </div>\n                                        </div>\n                                        <div class=\"bottom-box\">\n                                            <div class=\"electric\">\n                                                \u7535\u91CF\uFF1A").concat(data[0].localtionList[0].bat, "%\n                                            </div>\n                                            <div class=\"refresh\">\n                                                \u5237\u65B0\u5B9A\u4F4D\n                                            </div>\n                                            <div class=\"switchover\" id=\"particular\">\n                                                \u4E2A\u4EBA\u8BE6\u60C5\n                                            </div>\n                                        </div>"));
                }
              });
            },
            'onClose': function onClose() {
              /*取消时触发事件*/
              // console.log(`123`)
            }
          });
        } else {
          alert('此设备已关机！');
        }
      }
    });
  }); // 人员信息与历史轨迹切换

  $('#historyBox').on('click', '#particular', function () {
    $('.data-box').css('display', 'block');
    $('.history-box').css('display', 'none');
    map.add(marker);
    map.remove(polyline);
  });
  var temp = 1; // 历史轨迹详细信息

  $('#historyBox').on('click', '#historyTop', function () {
    // console.log(`123`)
    if (temp == 1) {
      $('#historyMiddle').animate({
        height: '1.705rem'
      });
      $('.pull-up').css('transform', 'rotate(180deg)');
      temp = 0;
    } else {
      $('#historyMiddle').animate({
        height: '0'
      });
      $('.pull-up').css('transform', 'rotate(0deg)');
      temp = 1;
    }
  }); // 获取工区数据

  $.ajax({
    type: "GET",
    url: "http://39.108.103.150:8989/lz/project/listzh",
    data: {
      id: pid
    },
    dataType: "json",
    success: function success(data) {
      // console.log(data)
      $('#sideBox').html("<div class=\"project\" id=\"project\">\n                    ".concat(data.title, "\n                    <i class=\"blue-v\"></i>\n                </div>"));
      var projectHtml = $('#project').html();

      for (var i = 0; i < data.areaList.length; i++) {
        // console.log(projectHtml)
        projectHtml += "<div class=\"sub-project\" id=\"subProject".concat(i, "\">\n                    ").concat(data.areaList[i].name, "\n                    <i class=\"black-v\"></i>\n                    <div class=\"name-box\">\n                        \n                    </div>\n                </div>");
      }

      $('#project').html(projectHtml);
      var subProjectHeight1 = $("#subProject0").height();
      var nameHeight1 = $("#subProject0 .name-box").height(); // console.log(subProjectHeight1)

      var subProjectHeight2 = 0;
      var nameHeight2 = 0;

      var _loop = function _loop(_i) {
        var tempHtml = '';

        for (var j = 0; j < data.areaList[_i].hireList.length; j++) {
          tempHtml += "<div class=\"name\" data-name=".concat(data.areaList[_i].hireList[j].hname, ">\n                        <span>").concat(data.areaList[_i].hireList[j].hname, "</span>\n                        <span class=").concat(data.areaList[_i].hireList[j].xloc != null ? 'online' : 'offline', ">").concat(data.areaList[_i].hireList[j].xloc != null ? '在线' : '不在线', "</span>\n                    </div>");
        }

        $("#subProject".concat(_i, " .name-box")).html(tempHtml); // console.log( $(`#subProject${i} .name-box`).html())

        subProjectHeight2 += $("#subProject".concat(_i)).height(); // console.log(subProjectHeight2)

        nameHeight2 += $("#subProject".concat(_i, " .name-box")).height();
        var projectHeight = $('#project').height();
        var project = 1;
        var subProject = 1; // 一级菜单

        $('#project').on('click', function (event) {
          // console.log($('#subProject').height())
          event.stopPropagation();

          if (project == 1) {
            $('#project').animate({
              height: projectHeight + subProjectHeight2 + nameHeight2 + 'px'
            });
            project = 0;
            $('.blue-v').addClass('rotate');
          } else {
            $('#project').animate({
              height: projectHeight + 'px'
            });
            $('.blue-v').removeClass('rotate');
            project = 1;
          }
        }); // 二级菜单

        $("#subProject".concat(_i)).on('click', function (event) {
          // 阻止事件冒泡
          event.stopPropagation(); // console.log(subProjectHeight2)        

          if (subProject == 1) {
            $("#subProject".concat(_i)).animate({
              height: subProjectHeight2 + nameHeight2 + 'px'
            });
            $("#subProject".concat(_i, " .black-v")).addClass('rotate');
            subProject = 0;
          } else {
            $("#subProject".concat(_i)).animate({
              height: subProjectHeight1 + 'px'
            });
            $("#subProject".concat(_i, " .black-v")).removeClass('rotate');
            subProject = 1;
          }
        }); // 人员点击事件

        $('.name').on('click', function (event) {
          event.stopPropagation(); // console.log($(this).data('name'))

          var name = $(this).data('name');
          $('.history-box').css('display', 'none');
          $.ajax({
            type: "GET",
            url: "http://39.108.103.150:8989/lz/hire/localtionList",
            data: {
              id: pid,
              string: name
            },
            dataType: "json",
            // async: false,
            success: function success(data) {
              // console.log(data)
              if (data[0].localtionList) {
                $('.side-box').animate({
                  left: '-3.2rem'
                });
                $('.search').animate({
                  left: '50%'
                });
                side = 0;
                var _temp2 = [];
                var temp2 = [];

                _temp2.push(data[0].areaList[0].xloc);

                _temp2.push(data[0].areaList[0].yloc);

                temp2.push(data[0].localtionList[0].xloc);
                temp2.push(data[0].localtionList[0].yloc);
                $('.data-box').css('display', 'block');
                $('.search-data').css('display', 'none');
                marker = new AMap.Marker({
                  position: temp2 // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]

                });
                map.add(marker);
                circle = new AMap.Circle({
                  center: _temp2,
                  // 圆心位置
                  radius: data[0].areaList[0].radius,
                  // 圆半径
                  fillColor: 'none',
                  // 圆形填充颜色
                  fillOpacity: 0,
                  // 填充色透明度
                  strokeColor: '#3979fe',
                  // 描边颜色
                  strokeWeight: 2 // 描边宽度

                });
                map.add(circle);
                map.setZoomAndCenter(13, _temp2);
                $('#dataBox').html("<div class=\"top-box\">\n                                        <div class=\"list-box\">\n                                            <ul>\n                                                <li class=\"name\">\n                                                    \u59D3\u540D\uFF1A".concat(data[0].hname, "\n                                                </li>\n                                                <li>\n                                                    \u7535\u8BDD\uFF1A").concat(data[0].phone, "\n                                                </li>\n                                                <li>\n                                                    \u6240\u5C5E\u516C\u53F8\uFF1A").concat(data[0].laowu, "\n                                                </li>\n                                                <li>\n                                                    \u8BBE\u5907\u7F16\u53F7\uFF1A").concat(data[0].imei, "\n                                                </li>\n                                                <li>\n                                                    \u5B9A\u4F4D\u65F6\u95F4\uFF1A").concat(data[0].localtionList[0].createDate, "\n                                                </li>\n                                                <li>\n                                                    \u5B9A\u4F4D\u5730\u5740\uFF1A").concat(data[0].localtionList[0].address, "\n                                                </li>\n                                            </ul>\n                                        </div>\n                                    </div>\n                                    <div class=\"bottom-box\">\n                                        <div class=\"electric\">\n                                            \u7535\u91CF\uFF1A").concat(data[0].localtionList[0].bat, "%\n                                        </div>\n                                        <div class=\"refresh\">\n                                            \u5237\u65B0\u5B9A\u4F4D\n                                        </div>\n                                        <div class=\"switchover\" id=\"history\" >\n                                            \u5386\u53F2\u8F68\u8FF9\n                                        </div>\n                                    </div>"));
                var calendar = new datePicker();
                calendar.init({
                  'trigger': '#history',

                  /*按钮选择器，用于触发弹出插件*/
                  'type': 'date',

                  /*模式：date日期；datetime日期时间；time时间；ym年月；*/
                  'minDate': '1900-1-1',

                  /*最小日期*/
                  'maxDate': '2100-12-31',

                  /*最大日期*/
                  'onSubmit': function onSubmit() {
                    /*确认时触发事件*/
                    var theSelectData = calendar.value; // console.log(name)

                    $.ajax({
                      type: "GET",
                      url: "http://39.108.103.150:8989/lz/hire/localtionList",
                      data: {
                        id: pid,
                        string: name,
                        createDate: theSelectData
                      },
                      dataType: "json",
                      success: function success(data) {
                        // console.log(data)
                        $('.data-box').css('display', 'none');
                        $('.history-box').css('display', 'block');
                        var temp = [];
                        var temp2 = [];
                        var temp3 = [];
                        temp.push(data[0].areaList[0].xloc);
                        temp.push(data[0].areaList[0].yloc);

                        for (var _i2 = 0; _i2 < data[0].localtionList.length; _i2++) {
                          temp2 = [];
                          temp2.push(data[0].localtionList[data[0].localtionList.length - 1 - _i2].xloc);
                          temp2.push(data[0].localtionList[data[0].localtionList.length - 1 - _i2].yloc);
                          temp3.push(temp2);
                        }

                        polyline = new AMap.Polyline({
                          path: temp3,
                          lineJoin: 'round',
                          //折线拐点样式
                          showDir: true,
                          //移动方向
                          strokeWeight: 3,
                          //线条宽度
                          strokeColor: '#3366ff' //线条颜色

                        });
                        map.add(polyline);
                        map.remove(marker);
                        map.setZoomAndCenter(13, temp);
                        $('#historyBox').html("<div class=\"top-box\" id=\"historyTop\">\n                                                        <div class=\"pull-up\"></div>\n                                                        <div class=\"list-box\">\n                                                            <ul>\n                                                                <li class=\"name\">\n                                                                    \u59D3\u540D\uFF1A".concat(data[0].hname, "\n                                                                </li>\n                                                                <li>\n                                                                    \u7535\u8BDD\uFF1A").concat(data[0].phone, "\n                                                                </li>\n                                                                <li>\n                                                                    \u6240\u5C5E\u516C\u53F8\uFF1A").concat(data[0].laowu, "\n                                                                </li>\n                                                                <li>\n                                                                    \u8BBE\u5907\u7F16\u53F7\uFF1A").concat(data[0].imei, "\n                                                                </li>\n                                                            </ul>\n                                                        </div>\n                                                    </div>\n                                                    <div class=\"middle-box\" id=\"historyMiddle\">\n                                                        <div class=\"enter\">\n                                                            <div class=\"img-box\"></div>\n                                                            <ul>\n                                                                <li>\n                                                                    \u8BBE\u5907\u7535\u91CF\uFF1A").concat(data[0].localtionList[0].bat, "%\n                                                                </li>\n                                                                <li>\n                                                                    \u65F6\u95F4\uFF1A").concat(data[0].localtionList[0].createDate, "\n                                                                    <br>\n                                                \n                                                                </li>\n                                                                <li>\n                                                                    \u4F4D\u7F6E\uFF1A").concat(data[0].localtionList[0].address, "\n                                                                </li>\n                                                            </ul>\n                                                        </div>\n                                                        <div class=\"come\">\n                                                            <div class=\"img-box\"></div>\n                                                            <ul>\n                                                                <li>\n                                                                    \u8BBE\u5907\u7535\u91CF\uFF1A").concat(data[0].localtionList[data[0].localtionList.length - 1].bat, "%\n                                                                </li>\n                                                                <li>\n                                                                    \u65F6\u95F4\uFF1A").concat(data[0].localtionList[data[0].localtionList.length - 1].createDate, "\n                                                                    <br>\n                                                \n                                                                </li>\n                                                                <li>\n                                                                    \u4F4D\u7F6E\uFF1A").concat(data[0].localtionList[data[0].localtionList.length - 1].address, "\n                                                                </li>\n                                                            </ul>\n                                                        </div>\n                                                    </div>\n                                                    <div class=\"bottom-box\">\n                                                        <div class=\"electric\">\n                                                            \u7535\u91CF\uFF1A").concat(data[0].localtionList[0].bat, "%\n                                                        </div>\n                                                        <div class=\"refresh\">\n                                                            \u5237\u65B0\u5B9A\u4F4D\n                                                        </div>\n                                                        <div class=\"switchover\" id=\"particular\">\n                                                            \u4E2A\u4EBA\u8BE6\u60C5\n                                                        </div>\n                                                    </div>"));
                      }
                    });
                  },
                  'onClose': function onClose() {
                    /*取消时触发事件*/
                    // console.log(`123`)
                  }
                });
              } else {
                alert('此设备已关机！');
              }
            }
          });
        });
      };

      for (var _i = 0; _i < data.areaList.length; _i++) {
        _loop(_i);
      }
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
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/location.js"], null)
//# sourceMappingURL=/location.0d2fe3e7.map