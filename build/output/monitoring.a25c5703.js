parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"q60f":[function(require,module,exports) {
$(function(){var e=localStorage.getItem("pid");$.ajax({type:"GET",url:"http://39.108.103.150:8989/lz/video/getProjectVideoArea",data:{pid:e},dataType:"json",success:function(e){console.log(e);for(var t="",o=0;o<e.length;o++)console.log(e[o].url[0].url),t+='<div class="monitoring">\n                        <video class="player1" width="100%" height="100%"\n                            controls="controls" autoplay="autoplay"\n                            x-webkit-airplay="true" x5-video-player-fullscreen="true"\n                            preload="auto" playsinline="true" webkit-playsinline\n                            x5-video-player-typ="h5"&gt;\n                            <source type="application/x-mpegURL" src="'.concat(e[o].url[0].url,'">\n                        </video>\n                    </div>');$("#content").html(t)}})});
},{}]},{},["q60f"], null)
//# sourceMappingURL=/monitoring.a25c5703.map