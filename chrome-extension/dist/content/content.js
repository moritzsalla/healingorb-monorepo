parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"EB4j":[function(require,module,exports) {
var define;
},{}],"S1Rj":[function(require,module,exports) {
"use strict";function e(){var e=document.querySelectorAll("p"),t="";return e&&e.length>0&&e.forEach(function(e){t+=e.textContent}),t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.scrapeHTML=void 0,exports.scrapeHTML=e;
},{}],"uduF":[function(require,module,exports) {
"use strict";var e=this&&this.__createBinding||(Object.create?function(e,r,t,o){void 0===o&&(o=t),Object.defineProperty(e,o,{enumerable:!0,get:function(){return r[t]}})}:function(e,r,t,o){void 0===o&&(o=t),e[o]=r[t]}),r=this&&this.__setModuleDefault||(Object.create?function(e,r){Object.defineProperty(e,"default",{enumerable:!0,value:r})}:function(e,r){e.default=r}),t=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var o={};if(null!=t)for(var c in t)"default"!==c&&Object.prototype.hasOwnProperty.call(t,c)&&e(o,t,c);return r(o,t),o};Object.defineProperty(exports,"__esModule",{value:!0});var o=t(require("ml5")),c=require("./htmlScraper"),n=c.scrapeHTML();function s(e){return i.predict(e)}var i=o.sentiment("movieReviews",function(){var e=s(n).score;e=Math.round(100*e)/100,console.log("score: "+e),chrome.storage.local.get(["score"],function(r){if(Array.isArray(r.score)){(t=r.score).push(e),chrome.storage.local.set({score:t})}else{var t=[r.score];chrome.storage.local.set({score:t})}}),chrome.storage.local.get(["score"],function(e){console.log(e.score)})});
},{"ml5":"EB4j","./htmlScraper":"S1Rj"}]},{},["uduF"], null)
//# sourceMappingURL=/content/content.js.map