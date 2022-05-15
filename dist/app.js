/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/base-x/src/index.js":
/*!******************************************!*\
  !*** ./node_modules/base-x/src/index.js ***!
  \******************************************/
/***/ ((module) => {

"use strict";

// base-x encoding / decoding
// Copyright (c) 2018 base-x contributors
// Copyright (c) 2014-2018 The Bitcoin Core developers (base58.cpp)
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.
function base (ALPHABET) {
  if (ALPHABET.length >= 255) { throw new TypeError('Alphabet too long') }
  var BASE_MAP = new Uint8Array(256)
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i)
    var xc = x.charCodeAt(0)
    if (BASE_MAP[xc] !== 255) { throw new TypeError(x + ' is ambiguous') }
    BASE_MAP[xc] = i
  }
  var BASE = ALPHABET.length
  var LEADER = ALPHABET.charAt(0)
  var FACTOR = Math.log(BASE) / Math.log(256) // log(BASE) / log(256), rounded up
  var iFACTOR = Math.log(256) / Math.log(BASE) // log(256) / log(BASE), rounded up
  function encode (source) {
    if (source instanceof Uint8Array) {
    } else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength)
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source)
    }
    if (!(source instanceof Uint8Array)) { throw new TypeError('Expected Uint8Array') }
    if (source.length === 0) { return '' }
        // Skip & count leading zeroes.
    var zeroes = 0
    var length = 0
    var pbegin = 0
    var pend = source.length
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++
      zeroes++
    }
        // Allocate enough space in big-endian base58 representation.
    var size = ((pend - pbegin) * iFACTOR + 1) >>> 0
    var b58 = new Uint8Array(size)
        // Process the bytes.
    while (pbegin !== pend) {
      var carry = source[pbegin]
            // Apply "b58 = b58 * 256 + ch".
      var i = 0
      for (var it1 = size - 1; (carry !== 0 || i < length) && (it1 !== -1); it1--, i++) {
        carry += (256 * b58[it1]) >>> 0
        b58[it1] = (carry % BASE) >>> 0
        carry = (carry / BASE) >>> 0
      }
      if (carry !== 0) { throw new Error('Non-zero carry') }
      length = i
      pbegin++
    }
        // Skip leading zeroes in base58 result.
    var it2 = size - length
    while (it2 !== size && b58[it2] === 0) {
      it2++
    }
        // Translate the result into a string.
    var str = LEADER.repeat(zeroes)
    for (; it2 < size; ++it2) { str += ALPHABET.charAt(b58[it2]) }
    return str
  }
  function decodeUnsafe (source) {
    if (typeof source !== 'string') { throw new TypeError('Expected String') }
    if (source.length === 0) { return new Uint8Array() }
    var psz = 0
        // Skip and count leading '1's.
    var zeroes = 0
    var length = 0
    while (source[psz] === LEADER) {
      zeroes++
      psz++
    }
        // Allocate enough space in big-endian base256 representation.
    var size = (((source.length - psz) * FACTOR) + 1) >>> 0 // log(58) / log(256), rounded up.
    var b256 = new Uint8Array(size)
        // Process the characters.
    while (source[psz]) {
            // Decode character
      var carry = BASE_MAP[source.charCodeAt(psz)]
            // Invalid character
      if (carry === 255) { return }
      var i = 0
      for (var it3 = size - 1; (carry !== 0 || i < length) && (it3 !== -1); it3--, i++) {
        carry += (BASE * b256[it3]) >>> 0
        b256[it3] = (carry % 256) >>> 0
        carry = (carry / 256) >>> 0
      }
      if (carry !== 0) { throw new Error('Non-zero carry') }
      length = i
      psz++
    }
        // Skip leading zeroes in b256.
    var it4 = size - length
    while (it4 !== size && b256[it4] === 0) {
      it4++
    }
    var vch = new Uint8Array(zeroes + (size - it4))
    var j = zeroes
    while (it4 !== size) {
      vch[j++] = b256[it4++]
    }
    return vch
  }
  function decode (string) {
    var buffer = decodeUnsafe(string)
    if (buffer) { return buffer }
    throw new Error('Non-base' + BASE + ' character')
  }
  return {
    encode: encode,
    decodeUnsafe: decodeUnsafe,
    decode: decode
  }
}
module.exports = base


/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/App.module.scss":
/*!*****************************!*\
  !*** ./src/App.module.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"app":"d6WLOcTu8Dn56sG4Ft2_"});

/***/ }),

/***/ "./src/components/banner/Banner.module.scss":
/*!**************************************************!*\
  !*** ./src/components/banner/Banner.module.scss ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"banner":"GfIQMA2OIOulmaPkxgZc"});

/***/ }),

/***/ "./src/components/compatibility/Compatibility.module.scss":
/*!****************************************************************!*\
  !*** ./src/components/compatibility/Compatibility.module.scss ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"compatibility":"qXb197rVvE8ZIHF24B80","toggleControl":"d4PmlsGCiLFslYzOayxB","control":"fagH42GUQFOi0LdFjFod"});

/***/ }),

/***/ "./src/components/container/Container.module.scss":
/*!********************************************************!*\
  !*** ./src/components/container/Container.module.scss ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"container":"Cs6eoSGNglhZQuRHG9G3"});

/***/ }),

/***/ "./src/components/encryption/Encryption.module.scss":
/*!**********************************************************!*\
  !*** ./src/components/encryption/Encryption.module.scss ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"encryption":"BoWiBmVdUEa_aDwrEt0c","toggle":"aEkkdOhJX3iHynd0L5n4","active":"zpslhQ6rRCIamSNO6HDH","input":"CRpRnJy9F4HmrW7yK5wM"});

/***/ }),

/***/ "./src/components/pages/download/Download.module.scss":
/*!************************************************************!*\
  !*** ./src/components/pages/download/Download.module.scss ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"download":"zwIEcYwh1x6qei3AJxhL","file":"olXBmeTKgfMeWn38ZNUJ","details":"k6RXQGDjRkL2dCgHwooh","password":"KmBGQDzEAxvtGMyQ4tM0","bad":"KbQUTCniNDuepdsj6VWI","text":"jXZXf1r4q253y2YP5Rac"});

/***/ }),

/***/ "./src/components/pages/upload/Upload.module.scss":
/*!********************************************************!*\
  !*** ./src/components/pages/upload/Upload.module.scss ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"upload":"SCh9oIISgRaSfb8ayADR","tab-container":"HgcmYHdwb17mmHVrMif5","tabContainer":"HgcmYHdwb17mmHVrMif5","tab":"Aymlb6O1OpRZtl3Zl2GR","active":"fHp7iEmZzX97zX4nSWU_","compatibility":"m_9zNCvotI7a4yXuOwyj","send-button":"aplmLlU97qtJXrRUjVDb","sendButton":"aplmLlU97qtJXrRUjVDb"});

/***/ }),

/***/ "./src/components/upload-types/file/File.module.scss":
/*!***********************************************************!*\
  !*** ./src/components/upload-types/file/File.module.scss ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({});

/***/ }),

/***/ "./src/components/upload-types/image/Image.module.scss":
/*!*************************************************************!*\
  !*** ./src/components/upload-types/image/Image.module.scss ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({});

/***/ }),

/***/ "./src/components/upload-types/text/Text.module.scss":
/*!***********************************************************!*\
  !*** ./src/components/upload-types/text/Text.module.scss ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"text":"kZoUQCHYre_ldjzbWGl4"});

/***/ }),

/***/ "./node_modules/preact/compat/dist/compat.module.js":
/*!**********************************************************!*\
  !*** ./node_modules/preact/compat/dist/compat.module.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Children": () => (/* binding */ k),
/* harmony export */   "Component": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_1__.Component),
/* harmony export */   "Fragment": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_1__.Fragment),
/* harmony export */   "PureComponent": () => (/* binding */ E),
/* harmony export */   "StrictMode": () => (/* binding */ cn),
/* harmony export */   "Suspense": () => (/* binding */ L),
/* harmony export */   "SuspenseList": () => (/* binding */ M),
/* harmony export */   "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED": () => (/* binding */ X),
/* harmony export */   "cloneElement": () => (/* binding */ rn),
/* harmony export */   "createContext": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_1__.createContext),
/* harmony export */   "createElement": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_1__.createElement),
/* harmony export */   "createFactory": () => (/* binding */ tn),
/* harmony export */   "createPortal": () => (/* binding */ W),
/* harmony export */   "createRef": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_1__.createRef),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "findDOMNode": () => (/* binding */ on),
/* harmony export */   "flushSync": () => (/* binding */ fn),
/* harmony export */   "forwardRef": () => (/* binding */ x),
/* harmony export */   "hydrate": () => (/* binding */ $),
/* harmony export */   "isValidElement": () => (/* binding */ en),
/* harmony export */   "lazy": () => (/* binding */ F),
/* harmony export */   "memo": () => (/* binding */ g),
/* harmony export */   "render": () => (/* binding */ B),
/* harmony export */   "unmountComponentAtNode": () => (/* binding */ un),
/* harmony export */   "unstable_batchedUpdates": () => (/* binding */ ln),
/* harmony export */   "useCallback": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useCallback),
/* harmony export */   "useContext": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useContext),
/* harmony export */   "useDebugValue": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useDebugValue),
/* harmony export */   "useEffect": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useEffect),
/* harmony export */   "useErrorBoundary": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useErrorBoundary),
/* harmony export */   "useImperativeHandle": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle),
/* harmony export */   "useLayoutEffect": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect),
/* harmony export */   "useMemo": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useMemo),
/* harmony export */   "useReducer": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useReducer),
/* harmony export */   "useRef": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useRef),
/* harmony export */   "useState": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useState),
/* harmony export */   "version": () => (/* binding */ nn)
/* harmony export */ });
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
function C(n,t){for(var e in t)n[e]=t[e];return n}function S(n,t){for(var e in n)if("__source"!==e&&!(e in t))return!0;for(var r in t)if("__source"!==r&&n[r]!==t[r])return!0;return!1}function E(n){this.props=n}function g(n,t){function e(n){var e=this.props.ref,r=e==n.ref;return!r&&e&&(e.call?e(null):e.current=null),t?!t(this.props,n)||!r:S(this.props,n)}function r(t){return this.shouldComponentUpdate=e,(0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(n,t)}return r.displayName="Memo("+(n.displayName||n.name)+")",r.prototype.isReactComponent=!0,r.__f=!0,r}(E.prototype=new preact__WEBPACK_IMPORTED_MODULE_1__.Component).isPureReactComponent=!0,E.prototype.shouldComponentUpdate=function(n,t){return S(this.props,n)||S(this.state,t)};var w=preact__WEBPACK_IMPORTED_MODULE_1__.options.__b;preact__WEBPACK_IMPORTED_MODULE_1__.options.__b=function(n){n.type&&n.type.__f&&n.ref&&(n.props.ref=n.ref,n.ref=null),w&&w(n)};var R="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function x(n){function t(t){var e=C({},t);return delete e.ref,n(e,t.ref||null)}return t.$$typeof=R,t.render=t,t.prototype.isReactComponent=t.__f=!0,t.displayName="ForwardRef("+(n.displayName||n.name)+")",t}var N=function(n,t){return null==n?null:(0,preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray)((0,preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray)(n).map(t))},k={map:N,forEach:N,count:function(n){return n?(0,preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray)(n).length:0},only:function(n){var t=(0,preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray)(n);if(1!==t.length)throw"Children.only";return t[0]},toArray:preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray},A=preact__WEBPACK_IMPORTED_MODULE_1__.options.__e;preact__WEBPACK_IMPORTED_MODULE_1__.options.__e=function(n,t,e,r){if(n.then)for(var u,o=t;o=o.__;)if((u=o.__c)&&u.__c)return null==t.__e&&(t.__e=e.__e,t.__k=e.__k),u.__c(n,t);A(n,t,e,r)};var O=preact__WEBPACK_IMPORTED_MODULE_1__.options.unmount;function L(){this.__u=0,this.t=null,this.__b=null}function U(n){var t=n.__.__c;return t&&t.__e&&t.__e(n)}function F(n){var t,e,r;function u(u){if(t||(t=n()).then(function(n){e=n.default||n},function(n){r=n}),r)throw r;if(!e)throw t;return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(e,u)}return u.displayName="Lazy",u.__f=!0,u}function M(){this.u=null,this.o=null}preact__WEBPACK_IMPORTED_MODULE_1__.options.unmount=function(n){var t=n.__c;t&&t.__R&&t.__R(),t&&!0===n.__h&&(n.type=null),O&&O(n)},(L.prototype=new preact__WEBPACK_IMPORTED_MODULE_1__.Component).__c=function(n,t){var e=t.__c,r=this;null==r.t&&(r.t=[]),r.t.push(e);var u=U(r.__v),o=!1,i=function(){o||(o=!0,e.__R=null,u?u(l):l())};e.__R=i;var l=function(){if(!--r.__u){if(r.state.__e){var n=r.state.__e;r.__v.__k[0]=function n(t,e,r){return t&&(t.__v=null,t.__k=t.__k&&t.__k.map(function(t){return n(t,e,r)}),t.__c&&t.__c.__P===e&&(t.__e&&r.insertBefore(t.__e,t.__d),t.__c.__e=!0,t.__c.__P=r)),t}(n,n.__c.__P,n.__c.__O)}var t;for(r.setState({__e:r.__b=null});t=r.t.pop();)t.forceUpdate()}},f=!0===t.__h;r.__u++||f||r.setState({__e:r.__b=r.__v.__k[0]}),n.then(i,i)},L.prototype.componentWillUnmount=function(){this.t=[]},L.prototype.render=function(n,t){if(this.__b){if(this.__v.__k){var e=document.createElement("div"),r=this.__v.__k[0].__c;this.__v.__k[0]=function n(t,e,r){return t&&(t.__c&&t.__c.__H&&(t.__c.__H.__.forEach(function(n){"function"==typeof n.__c&&n.__c()}),t.__c.__H=null),null!=(t=C({},t)).__c&&(t.__c.__P===r&&(t.__c.__P=e),t.__c=null),t.__k=t.__k&&t.__k.map(function(t){return n(t,e,r)})),t}(this.__b,e,r.__O=r.__P)}this.__b=null}var u=t.__e&&(0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(preact__WEBPACK_IMPORTED_MODULE_1__.Fragment,null,n.fallback);return u&&(u.__h=null),[(0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(preact__WEBPACK_IMPORTED_MODULE_1__.Fragment,null,t.__e?null:n.children),u]};var T=function(n,t,e){if(++e[1]===e[0]&&n.o.delete(t),n.props.revealOrder&&("t"!==n.props.revealOrder[0]||!n.o.size))for(e=n.u;e;){for(;e.length>3;)e.pop()();if(e[1]<e[0])break;n.u=e=e[2]}};function D(n){return this.getChildContext=function(){return n.context},n.children}function I(n){var t=this,e=n.i;t.componentWillUnmount=function(){(0,preact__WEBPACK_IMPORTED_MODULE_1__.render)(null,t.l),t.l=null,t.i=null},t.i&&t.i!==e&&t.componentWillUnmount(),n.__v?(t.l||(t.i=e,t.l={nodeType:1,parentNode:e,childNodes:[],appendChild:function(n){this.childNodes.push(n),t.i.appendChild(n)},insertBefore:function(n,e){this.childNodes.push(n),t.i.appendChild(n)},removeChild:function(n){this.childNodes.splice(this.childNodes.indexOf(n)>>>1,1),t.i.removeChild(n)}}),(0,preact__WEBPACK_IMPORTED_MODULE_1__.render)((0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(D,{context:t.context},n.__v),t.l)):t.l&&t.componentWillUnmount()}function W(n,t){return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(I,{__v:n,i:t})}(M.prototype=new preact__WEBPACK_IMPORTED_MODULE_1__.Component).__e=function(n){var t=this,e=U(t.__v),r=t.o.get(n);return r[0]++,function(u){var o=function(){t.props.revealOrder?(r.push(u),T(t,n,r)):u()};e?e(o):o()}},M.prototype.render=function(n){this.u=null,this.o=new Map;var t=(0,preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray)(n.children);n.revealOrder&&"b"===n.revealOrder[0]&&t.reverse();for(var e=t.length;e--;)this.o.set(t[e],this.u=[1,0,this.u]);return n.children},M.prototype.componentDidUpdate=M.prototype.componentDidMount=function(){var n=this;this.o.forEach(function(t,e){T(n,e,t)})};var P="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,V=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,j="undefined"!=typeof document,z=function(n){return("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/i:/fil|che|ra/i).test(n)};function B(n,t,e){return null==t.__k&&(t.textContent=""),(0,preact__WEBPACK_IMPORTED_MODULE_1__.render)(n,t),"function"==typeof e&&e(),n?n.__c:null}function $(n,t,e){return (0,preact__WEBPACK_IMPORTED_MODULE_1__.hydrate)(n,t),"function"==typeof e&&e(),n?n.__c:null}preact__WEBPACK_IMPORTED_MODULE_1__.Component.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(n){Object.defineProperty(preact__WEBPACK_IMPORTED_MODULE_1__.Component.prototype,n,{configurable:!0,get:function(){return this["UNSAFE_"+n]},set:function(t){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:t})}})});var H=preact__WEBPACK_IMPORTED_MODULE_1__.options.event;function Z(){}function Y(){return this.cancelBubble}function q(){return this.defaultPrevented}preact__WEBPACK_IMPORTED_MODULE_1__.options.event=function(n){return H&&(n=H(n)),n.persist=Z,n.isPropagationStopped=Y,n.isDefaultPrevented=q,n.nativeEvent=n};var G,J={configurable:!0,get:function(){return this.class}},K=preact__WEBPACK_IMPORTED_MODULE_1__.options.vnode;preact__WEBPACK_IMPORTED_MODULE_1__.options.vnode=function(n){var t=n.type,e=n.props,r=e;if("string"==typeof t){var u=-1===t.indexOf("-");for(var o in r={},e){var i=e[o];j&&"children"===o&&"noscript"===t||"value"===o&&"defaultValue"in e&&null==i||("defaultValue"===o&&"value"in e&&null==e.value?o="value":"download"===o&&!0===i?i="":/ondoubleclick/i.test(o)?o="ondblclick":/^onchange(textarea|input)/i.test(o+t)&&!z(e.type)?o="oninput":/^onfocus$/i.test(o)?o="onfocusin":/^onblur$/i.test(o)?o="onfocusout":/^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(o)?o=o.toLowerCase():u&&V.test(o)?o=o.replace(/[A-Z0-9]/,"-$&").toLowerCase():null===i&&(i=void 0),r[o]=i)}"select"==t&&r.multiple&&Array.isArray(r.value)&&(r.value=(0,preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray)(e.children).forEach(function(n){n.props.selected=-1!=r.value.indexOf(n.props.value)})),"select"==t&&null!=r.defaultValue&&(r.value=(0,preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray)(e.children).forEach(function(n){n.props.selected=r.multiple?-1!=r.defaultValue.indexOf(n.props.value):r.defaultValue==n.props.value})),n.props=r,e.class!=e.className&&(J.enumerable="className"in e,null!=e.className&&(r.class=e.className),Object.defineProperty(r,"className",J))}n.$$typeof=P,K&&K(n)};var Q=preact__WEBPACK_IMPORTED_MODULE_1__.options.__r;preact__WEBPACK_IMPORTED_MODULE_1__.options.__r=function(n){Q&&Q(n),G=n.__c};var X={ReactCurrentDispatcher:{current:{readContext:function(n){return G.__n[n.__c].props.value}}}},nn="17.0.2";function tn(n){return preact__WEBPACK_IMPORTED_MODULE_1__.createElement.bind(null,n)}function en(n){return!!n&&n.$$typeof===P}function rn(n){return en(n)?preact__WEBPACK_IMPORTED_MODULE_1__.cloneElement.apply(null,arguments):n}function un(n){return!!n.__k&&((0,preact__WEBPACK_IMPORTED_MODULE_1__.render)(null,n),!0)}function on(n){return n&&(n.base||1===n.nodeType&&n)||null}var ln=function(n,t){return n(t)},fn=function(n,t){return n(t)},cn=preact__WEBPACK_IMPORTED_MODULE_1__.Fragment;/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({useState:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useState,useReducer:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useReducer,useEffect:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useEffect,useLayoutEffect:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect,useRef:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useRef,useImperativeHandle:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle,useMemo:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useMemo,useCallback:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useCallback,useContext:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useContext,useDebugValue:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useDebugValue,version:"17.0.2",Children:k,render:B,hydrate:$,unmountComponentAtNode:un,createPortal:W,createElement:preact__WEBPACK_IMPORTED_MODULE_1__.createElement,createContext:preact__WEBPACK_IMPORTED_MODULE_1__.createContext,createFactory:tn,cloneElement:rn,createRef:preact__WEBPACK_IMPORTED_MODULE_1__.createRef,Fragment:preact__WEBPACK_IMPORTED_MODULE_1__.Fragment,isValidElement:en,findDOMNode:on,Component:preact__WEBPACK_IMPORTED_MODULE_1__.Component,PureComponent:E,memo:g,forwardRef:x,flushSync:fn,unstable_batchedUpdates:ln,StrictMode:preact__WEBPACK_IMPORTED_MODULE_1__.Fragment,Suspense:L,SuspenseList:M,lazy:F,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:X});
//# sourceMappingURL=compat.module.js.map


/***/ }),

/***/ "./node_modules/preact/dist/preact.module.js":
/*!***************************************************!*\
  !*** ./node_modules/preact/dist/preact.module.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ _),
/* harmony export */   "Fragment": () => (/* binding */ d),
/* harmony export */   "cloneElement": () => (/* binding */ B),
/* harmony export */   "createContext": () => (/* binding */ D),
/* harmony export */   "createElement": () => (/* binding */ v),
/* harmony export */   "createRef": () => (/* binding */ p),
/* harmony export */   "h": () => (/* binding */ v),
/* harmony export */   "hydrate": () => (/* binding */ q),
/* harmony export */   "isValidElement": () => (/* binding */ i),
/* harmony export */   "options": () => (/* binding */ l),
/* harmony export */   "render": () => (/* binding */ S),
/* harmony export */   "toChildArray": () => (/* binding */ A)
/* harmony export */ });
var n,l,u,i,t,o,r,f,e={},c=[],s=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function a(n,l){for(var u in l)n[u]=l[u];return n}function h(n){var l=n.parentNode;l&&l.removeChild(n)}function v(l,u,i){var t,o,r,f={};for(r in u)"key"==r?t=u[r]:"ref"==r?o=u[r]:f[r]=u[r];if(arguments.length>2&&(f.children=arguments.length>3?n.call(arguments,2):i),"function"==typeof l&&null!=l.defaultProps)for(r in l.defaultProps)void 0===f[r]&&(f[r]=l.defaultProps[r]);return y(l,f,t,o,null)}function y(n,i,t,o,r){var f={type:n,props:i,key:t,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==r?++u:r};return null==r&&null!=l.vnode&&l.vnode(f),f}function p(){return{current:null}}function d(n){return n.children}function _(n,l){this.props=n,this.context=l}function k(n,l){if(null==l)return n.__?k(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return"function"==typeof n.type?k(n):null}function b(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return b(n)}}function m(n){(!n.__d&&(n.__d=!0)&&t.push(n)&&!g.__r++||r!==l.debounceRendering)&&((r=l.debounceRendering)||o)(g)}function g(){for(var n;g.__r=t.length;)n=t.sort(function(n,l){return n.__v.__b-l.__v.__b}),t=[],n.some(function(n){var l,u,i,t,o,r;n.__d&&(o=(t=(l=n).__v).__e,(r=l.__P)&&(u=[],(i=a({},t)).__v=t.__v+1,j(r,t,i,l.__n,void 0!==r.ownerSVGElement,null!=t.__h?[o]:null,u,null==o?k(t):o,t.__h),z(u,t),t.__e!=o&&b(t)))})}function w(n,l,u,i,t,o,r,f,s,a){var h,v,p,_,b,m,g,w=i&&i.__k||c,A=w.length;for(u.__k=[],h=0;h<l.length;h++)if(null!=(_=u.__k[h]=null==(_=l[h])||"boolean"==typeof _?null:"string"==typeof _||"number"==typeof _||"bigint"==typeof _?y(null,_,null,null,_):Array.isArray(_)?y(d,{children:_},null,null,null):_.__b>0?y(_.type,_.props,_.key,null,_.__v):_)){if(_.__=u,_.__b=u.__b+1,null===(p=w[h])||p&&_.key==p.key&&_.type===p.type)w[h]=void 0;else for(v=0;v<A;v++){if((p=w[v])&&_.key==p.key&&_.type===p.type){w[v]=void 0;break}p=null}j(n,_,p=p||e,t,o,r,f,s,a),b=_.__e,(v=_.ref)&&p.ref!=v&&(g||(g=[]),p.ref&&g.push(p.ref,null,_),g.push(v,_.__c||b,_)),null!=b?(null==m&&(m=b),"function"==typeof _.type&&_.__k===p.__k?_.__d=s=x(_,s,n):s=P(n,_,p,w,b,s),"function"==typeof u.type&&(u.__d=s)):s&&p.__e==s&&s.parentNode!=n&&(s=k(p))}for(u.__e=m,h=A;h--;)null!=w[h]&&("function"==typeof u.type&&null!=w[h].__e&&w[h].__e==u.__d&&(u.__d=k(i,h+1)),N(w[h],w[h]));if(g)for(h=0;h<g.length;h++)M(g[h],g[++h],g[++h])}function x(n,l,u){for(var i,t=n.__k,o=0;t&&o<t.length;o++)(i=t[o])&&(i.__=n,l="function"==typeof i.type?x(i,l,u):P(u,i,i,t,i.__e,l));return l}function A(n,l){return l=l||[],null==n||"boolean"==typeof n||(Array.isArray(n)?n.some(function(n){A(n,l)}):l.push(n)),l}function P(n,l,u,i,t,o){var r,f,e;if(void 0!==l.__d)r=l.__d,l.__d=void 0;else if(null==u||t!=o||null==t.parentNode)n:if(null==o||o.parentNode!==n)n.appendChild(t),r=null;else{for(f=o,e=0;(f=f.nextSibling)&&e<i.length;e+=2)if(f==t)break n;n.insertBefore(t,o),r=o}return void 0!==r?r:t.nextSibling}function C(n,l,u,i,t){var o;for(o in u)"children"===o||"key"===o||o in l||H(n,o,null,u[o],i);for(o in l)t&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||H(n,o,l[o],u[o],i)}function $(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||s.test(l)?u:u+"px"}function H(n,l,u,i,t){var o;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else{if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||$(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||$(n.style,l,u[l])}else if("o"===l[0]&&"n"===l[1])o=l!==(l=l.replace(/Capture$/,"")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?i||n.addEventListener(l,o?T:I,o):n.removeEventListener(l,o?T:I,o);else if("dangerouslySetInnerHTML"!==l){if(t)l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("href"!==l&&"list"!==l&&"form"!==l&&"tabIndex"!==l&&"download"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null!=u&&(!1!==u||"a"===l[0]&&"r"===l[1])?n.setAttribute(l,u):n.removeAttribute(l))}}function I(n){this.l[n.type+!1](l.event?l.event(n):n)}function T(n){this.l[n.type+!0](l.event?l.event(n):n)}function j(n,u,i,t,o,r,f,e,c){var s,h,v,y,p,k,b,m,g,x,A,P=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(c=i.__h,e=u.__e=i.__e,u.__h=null,r=[e]),(s=l.__b)&&s(u);try{n:if("function"==typeof P){if(m=u.props,g=(s=P.contextType)&&t[s.__c],x=s?g?g.props.value:s.__:t,i.__c?b=(h=u.__c=i.__c).__=h.__E:("prototype"in P&&P.prototype.render?u.__c=h=new P(m,x):(u.__c=h=new _(m,x),h.constructor=P,h.render=O),g&&g.sub(h),h.props=m,h.state||(h.state={}),h.context=x,h.__n=t,v=h.__d=!0,h.__h=[]),null==h.__s&&(h.__s=h.state),null!=P.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=a({},h.__s)),a(h.__s,P.getDerivedStateFromProps(m,h.__s))),y=h.props,p=h.state,v)null==P.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else{if(null==P.getDerivedStateFromProps&&m!==y&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(m,x),!h.__e&&null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(m,h.__s,x)||u.__v===i.__v){h.props=m,h.state=h.__s,u.__v!==i.__v&&(h.__d=!1),h.__v=u,u.__e=i.__e,u.__k=i.__k,u.__k.forEach(function(n){n&&(n.__=u)}),h.__h.length&&f.push(h);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(m,h.__s,x),null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(y,p,k)})}h.context=x,h.props=m,h.state=h.__s,(s=l.__r)&&s(u),h.__d=!1,h.__v=u,h.__P=n,s=h.render(h.props,h.state,h.context),h.state=h.__s,null!=h.getChildContext&&(t=a(a({},t),h.getChildContext())),v||null==h.getSnapshotBeforeUpdate||(k=h.getSnapshotBeforeUpdate(y,p)),A=null!=s&&s.type===d&&null==s.key?s.props.children:s,w(n,Array.isArray(A)?A:[A],u,i,t,o,r,f,e,c),h.base=u.__e,u.__h=null,h.__h.length&&f.push(h),b&&(h.__E=h.__=null),h.__e=!1}else null==r&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=L(i.__e,u,i,t,o,r,f,c);(s=l.diffed)&&s(u)}catch(n){u.__v=null,(c||null!=r)&&(u.__e=e,u.__h=!!c,r[r.indexOf(e)]=null),l.__e(n,u,i)}}function z(n,u){l.__c&&l.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u)})}catch(n){l.__e(n,u.__v)}})}function L(l,u,i,t,o,r,f,c){var s,a,v,y=i.props,p=u.props,d=u.type,_=0;if("svg"===d&&(o=!0),null!=r)for(;_<r.length;_++)if((s=r[_])&&"setAttribute"in s==!!d&&(d?s.localName===d:3===s.nodeType)){l=s,r[_]=null;break}if(null==l){if(null===d)return document.createTextNode(p);l=o?document.createElementNS("http://www.w3.org/2000/svg",d):document.createElement(d,p.is&&p),r=null,c=!1}if(null===d)y===p||c&&l.data===p||(l.data=p);else{if(r=r&&n.call(l.childNodes),a=(y=i.props||e).dangerouslySetInnerHTML,v=p.dangerouslySetInnerHTML,!c){if(null!=r)for(y={},_=0;_<l.attributes.length;_++)y[l.attributes[_].name]=l.attributes[_].value;(v||a)&&(v&&(a&&v.__html==a.__html||v.__html===l.innerHTML)||(l.innerHTML=v&&v.__html||""))}if(C(l,p,y,o,c),v)u.__k=[];else if(_=u.props.children,w(l,Array.isArray(_)?_:[_],u,i,t,o&&"foreignObject"!==d,r,f,r?r[0]:i.__k&&k(i,0),c),null!=r)for(_=r.length;_--;)null!=r[_]&&h(r[_]);c||("value"in p&&void 0!==(_=p.value)&&(_!==l.value||"progress"===d&&!_||"option"===d&&_!==y.value)&&H(l,"value",_,y.value,!1),"checked"in p&&void 0!==(_=p.checked)&&_!==l.checked&&H(l,"checked",_,y.checked,!1))}return l}function M(n,u,i){try{"function"==typeof n?n(u):n.current=u}catch(n){l.__e(n,i)}}function N(n,u,i){var t,o;if(l.unmount&&l.unmount(n),(t=n.ref)&&(t.current&&t.current!==n.__e||M(t,null,u)),null!=(t=n.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount()}catch(n){l.__e(n,u)}t.base=t.__P=null}if(t=n.__k)for(o=0;o<t.length;o++)t[o]&&N(t[o],u,"function"!=typeof n.type);i||null==n.__e||h(n.__e),n.__e=n.__d=void 0}function O(n,l,u){return this.constructor(n,u)}function S(u,i,t){var o,r,f;l.__&&l.__(u,i),r=(o="function"==typeof t)?null:t&&t.__k||i.__k,f=[],j(i,u=(!o&&t||i).__k=v(d,null,[u]),r||e,e,void 0!==i.ownerSVGElement,!o&&t?[t]:r?null:i.firstChild?n.call(i.childNodes):null,f,!o&&t?t:r?r.__e:i.firstChild,o),z(f,u)}function q(n,l){S(n,l,q)}function B(l,u,i){var t,o,r,f=a({},l.props);for(r in u)"key"==r?t=u[r]:"ref"==r?o=u[r]:f[r]=u[r];return arguments.length>2&&(f.children=arguments.length>3?n.call(arguments,2):i),y(l.type,f,t||l.key,o||l.ref,null)}function D(n,l){var u={__c:l="__cC"+f++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,i;return this.getChildContext||(u=[],(i={})[l]=this,this.getChildContext=function(){return i},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(m)},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n)}}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n=c.slice,l={__e:function(n,l,u,i){for(var t,o,r;l=l.__;)if((t=l.__c)&&!t.__)try{if((o=t.constructor)&&null!=o.getDerivedStateFromError&&(t.setState(o.getDerivedStateFromError(n)),r=t.__d),null!=t.componentDidCatch&&(t.componentDidCatch(n,i||{}),r=t.__d),r)return t.__E=t}catch(l){n=l}throw n}},u=0,i=function(n){return null!=n&&void 0===n.constructor},_.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=a({},this.state),"function"==typeof n&&(n=n(a({},u),this.props)),n&&a(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),m(this))},_.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),m(this))},_.prototype.render=d,t=[],o="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,g.__r=0,f=0;
//# sourceMappingURL=preact.module.js.map


/***/ }),

/***/ "./node_modules/preact/hooks/dist/hooks.module.js":
/*!********************************************************!*\
  !*** ./node_modules/preact/hooks/dist/hooks.module.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useCallback": () => (/* binding */ A),
/* harmony export */   "useContext": () => (/* binding */ F),
/* harmony export */   "useDebugValue": () => (/* binding */ T),
/* harmony export */   "useEffect": () => (/* binding */ y),
/* harmony export */   "useErrorBoundary": () => (/* binding */ q),
/* harmony export */   "useImperativeHandle": () => (/* binding */ s),
/* harmony export */   "useLayoutEffect": () => (/* binding */ d),
/* harmony export */   "useMemo": () => (/* binding */ _),
/* harmony export */   "useReducer": () => (/* binding */ p),
/* harmony export */   "useRef": () => (/* binding */ h),
/* harmony export */   "useState": () => (/* binding */ m)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var t,u,r,o=0,i=[],c=preact__WEBPACK_IMPORTED_MODULE_0__.options.__b,f=preact__WEBPACK_IMPORTED_MODULE_0__.options.__r,e=preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed,a=preact__WEBPACK_IMPORTED_MODULE_0__.options.__c,v=preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount;function l(t,r){preact__WEBPACK_IMPORTED_MODULE_0__.options.__h&&preact__WEBPACK_IMPORTED_MODULE_0__.options.__h(u,t,o||r),o=0;var i=u.__H||(u.__H={__:[],__h:[]});return t>=i.__.length&&i.__.push({}),i.__[t]}function m(n){return o=1,p(w,n)}function p(n,r,o){var i=l(t++,2);return i.t=n,i.__c||(i.__=[o?o(r):w(void 0,r),function(n){var t=i.t(i.__[0],n);i.__[0]!==t&&(i.__=[t,i.__[1]],i.__c.setState({}))}],i.__c=u),i.__}function y(r,o){var i=l(t++,3);!preact__WEBPACK_IMPORTED_MODULE_0__.options.__s&&k(i.__H,o)&&(i.__=r,i.__H=o,u.__H.__h.push(i))}function d(r,o){var i=l(t++,4);!preact__WEBPACK_IMPORTED_MODULE_0__.options.__s&&k(i.__H,o)&&(i.__=r,i.__H=o,u.__h.push(i))}function h(n){return o=5,_(function(){return{current:n}},[])}function s(n,t,u){o=6,d(function(){return"function"==typeof n?(n(t()),function(){return n(null)}):n?(n.current=t(),function(){return n.current=null}):void 0},null==u?u:u.concat(n))}function _(n,u){var r=l(t++,7);return k(r.__H,u)&&(r.__=n(),r.__H=u,r.__h=n),r.__}function A(n,t){return o=8,_(function(){return n},t)}function F(n){var r=u.context[n.__c],o=l(t++,9);return o.c=n,r?(null==o.__&&(o.__=!0,r.sub(u)),r.props.value):n.__}function T(t,u){preact__WEBPACK_IMPORTED_MODULE_0__.options.useDebugValue&&preact__WEBPACK_IMPORTED_MODULE_0__.options.useDebugValue(u?u(t):t)}function q(n){var r=l(t++,10),o=m();return r.__=n,u.componentDidCatch||(u.componentDidCatch=function(n){r.__&&r.__(n),o[1](n)}),[o[0],function(){o[1](void 0)}]}function x(){for(var t;t=i.shift();)if(t.__P)try{t.__H.__h.forEach(g),t.__H.__h.forEach(j),t.__H.__h=[]}catch(u){t.__H.__h=[],preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(u,t.__v)}}preact__WEBPACK_IMPORTED_MODULE_0__.options.__b=function(n){u=null,c&&c(n)},preact__WEBPACK_IMPORTED_MODULE_0__.options.__r=function(n){f&&f(n),t=0;var r=(u=n.__c).__H;r&&(r.__h.forEach(g),r.__h.forEach(j),r.__h=[])},preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed=function(t){e&&e(t);var o=t.__c;o&&o.__H&&o.__H.__h.length&&(1!==i.push(o)&&r===preact__WEBPACK_IMPORTED_MODULE_0__.options.requestAnimationFrame||((r=preact__WEBPACK_IMPORTED_MODULE_0__.options.requestAnimationFrame)||function(n){var t,u=function(){clearTimeout(r),b&&cancelAnimationFrame(t),setTimeout(n)},r=setTimeout(u,100);b&&(t=requestAnimationFrame(u))})(x)),u=null},preact__WEBPACK_IMPORTED_MODULE_0__.options.__c=function(t,u){u.some(function(t){try{t.__h.forEach(g),t.__h=t.__h.filter(function(n){return!n.__||j(n)})}catch(r){u.some(function(n){n.__h&&(n.__h=[])}),u=[],preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(r,t.__v)}}),a&&a(t,u)},preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount=function(t){v&&v(t);var u,r=t.__c;r&&r.__H&&(r.__H.__.forEach(function(n){try{g(n)}catch(n){u=n}}),u&&preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(u,r.__v))};var b="function"==typeof requestAnimationFrame;function g(n){var t=u,r=n.__c;"function"==typeof r&&(n.__c=void 0,r()),u=t}function j(n){var t=u;n.__c=n.__(),u=t}function k(n,t){return!n||n.length!==t.length||t.some(function(t,u){return t!==n[u]})}function w(n,t){return"function"==typeof t?t(n):t}
//# sourceMappingURL=hooks.module.js.map


/***/ }),

/***/ "./node_modules/scrypt-async/scrypt-async.js":
/*!***************************************************!*\
  !*** ./node_modules/scrypt-async/scrypt-async.js ***!
  \***************************************************/
/***/ ((module) => {

/*!
 * Fast "async" scrypt implementation in JavaScript.
 * Copyright (c) 2013-2016 Dmitry Chestnykh | BSD License
 * https://github.com/dchest/scrypt-async-js
 */

/**
 * scrypt(password, salt, options, callback)
 *
 * where
 *
 * password and salt are strings or arrays of bytes (Array of Uint8Array)
 * options is
 *
 * {
 *    N:      // CPU/memory cost parameter, must be power of two
 *            // (alternatively, you can specify logN)
 *    r:      // block size
 *    p:      // parallelization parameter
 *    dkLen:  // length of derived key, default = 32
 *    encoding: // optional encoding:
 *                    "base64" - standard Base64 encoding
 *                    "hex" — hex encoding,
 *                    "binary" — Uint8Array,
 *                    undefined/null - Array of bytes
 *    interruptStep: // optional, steps to split calculations (default is 0)
 * }
 *
 * Derives a key from password and salt and calls callback
 * with derived key as the only argument.
 *
 * Calculations are interrupted with setImmediate (or zero setTimeout) at the
 * given interruptSteps to avoid freezing the browser. If it's undefined or zero,
 * the callback is called immediately after the calculation, avoiding setImmediate.
 *
 * Legacy way (only supports p = 1) to call this function is:
 *
 * scrypt(password, salt, logN, r, dkLen, [interruptStep], callback, [encoding])
 *
 * In legacy API, if interruptStep is not given, it defaults to 1000.
 * Pass 0 to have callback called immediately.
 *
 */
function scrypt(password, salt, logN, r, dkLen, interruptStep, callback, encoding) {
  'use strict';

  function SHA256(m) {
    /** @const */ var K = [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b,
      0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01,
      0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7,
      0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
      0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152,
      0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
      0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc,
      0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
      0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08,
      0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f,
      0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
      0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];

    var h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a,
        h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19,
        w = new Array(64);

    function blocks(p) {
      var off = 0, len = p.length;
      while (len >= 64) {
        var a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7,
            u, i, j, t1, t2;

        for (i = 0; i < 16; i++) {
          j = off + i*4;
          w[i] = ((p[j] & 0xff)<<24) | ((p[j+1] & 0xff)<<16) |
                 ((p[j+2] & 0xff)<<8) | (p[j+3] & 0xff);
        }

        for (i = 16; i < 64; i++) {
          u = w[i-2];
          t1 = ((u>>>17) | (u<<(32-17))) ^ ((u>>>19) | (u<<(32-19))) ^ (u>>>10);

          u = w[i-15];
          t2 = ((u>>>7) | (u<<(32-7))) ^ ((u>>>18) | (u<<(32-18))) ^ (u>>>3);

          w[i] = (((t1 + w[i-7]) | 0) + ((t2 + w[i-16]) | 0)) | 0;
        }

        for (i = 0; i < 64; i++) {
          t1 = ((((((e>>>6) | (e<<(32-6))) ^ ((e>>>11) | (e<<(32-11))) ^
               ((e>>>25) | (e<<(32-25)))) + ((e & f) ^ (~e & g))) | 0) +
               ((h + ((K[i] + w[i]) | 0)) | 0)) | 0;

          t2 = ((((a>>>2) | (a<<(32-2))) ^ ((a>>>13) | (a<<(32-13))) ^
               ((a>>>22) | (a<<(32-22)))) + ((a & b) ^ (a & c) ^ (b & c))) | 0;

          h = g;
          g = f;
          f = e;
          e = (d + t1) | 0;
          d = c;
          c = b;
          b = a;
          a = (t1 + t2) | 0;
        }

        h0 = (h0 + a) | 0;
        h1 = (h1 + b) | 0;
        h2 = (h2 + c) | 0;
        h3 = (h3 + d) | 0;
        h4 = (h4 + e) | 0;
        h5 = (h5 + f) | 0;
        h6 = (h6 + g) | 0;
        h7 = (h7 + h) | 0;

        off += 64;
        len -= 64;
      }
    }

    blocks(m);

    var i, bytesLeft = m.length % 64,
        bitLenHi = (m.length / 0x20000000) | 0,
        bitLenLo = m.length << 3,
        numZeros = (bytesLeft < 56) ? 56 : 120,
        p = m.slice(m.length - bytesLeft, m.length);

    p.push(0x80);
    for (i = bytesLeft + 1; i < numZeros; i++) p.push(0);
    p.push((bitLenHi>>>24) & 0xff);
    p.push((bitLenHi>>>16) & 0xff);
    p.push((bitLenHi>>>8)  & 0xff);
    p.push((bitLenHi>>>0)  & 0xff);
    p.push((bitLenLo>>>24) & 0xff);
    p.push((bitLenLo>>>16) & 0xff);
    p.push((bitLenLo>>>8)  & 0xff);
    p.push((bitLenLo>>>0)  & 0xff);

    blocks(p);

    return [
      (h0>>>24) & 0xff, (h0>>>16) & 0xff, (h0>>>8) & 0xff, (h0>>>0) & 0xff,
      (h1>>>24) & 0xff, (h1>>>16) & 0xff, (h1>>>8) & 0xff, (h1>>>0) & 0xff,
      (h2>>>24) & 0xff, (h2>>>16) & 0xff, (h2>>>8) & 0xff, (h2>>>0) & 0xff,
      (h3>>>24) & 0xff, (h3>>>16) & 0xff, (h3>>>8) & 0xff, (h3>>>0) & 0xff,
      (h4>>>24) & 0xff, (h4>>>16) & 0xff, (h4>>>8) & 0xff, (h4>>>0) & 0xff,
      (h5>>>24) & 0xff, (h5>>>16) & 0xff, (h5>>>8) & 0xff, (h5>>>0) & 0xff,
      (h6>>>24) & 0xff, (h6>>>16) & 0xff, (h6>>>8) & 0xff, (h6>>>0) & 0xff,
      (h7>>>24) & 0xff, (h7>>>16) & 0xff, (h7>>>8) & 0xff, (h7>>>0) & 0xff
    ];
  }

  function PBKDF2_HMAC_SHA256_OneIter(password, salt, dkLen) {
    // compress password if it's longer than hash block length
    if(password.length > 64) {
      // SHA256 expects password to be an Array. If it's not
      // (i.e. it doesn't have .push method), convert it to one.
      password = SHA256(password.push ? password : Array.prototype.slice.call(password, 0));
    }

    var i, innerLen = 64 + salt.length + 4,
        inner = new Array(innerLen),
        outerKey = new Array(64),
        dk = [];

    // inner = (password ^ ipad) || salt || counter
    for (i = 0; i < 64; i++) inner[i] = 0x36;
    for (i = 0; i < password.length; i++) inner[i] ^= password[i];
    for (i = 0; i < salt.length; i++) inner[64+i] = salt[i];
    for (i = innerLen - 4; i < innerLen; i++) inner[i] = 0;

    // outerKey = password ^ opad
    for (i = 0; i < 64; i++) outerKey[i] = 0x5c;
    for (i = 0; i < password.length; i++) outerKey[i] ^= password[i];

    // increments counter inside inner
    function incrementCounter() {
      for (var i = innerLen-1; i >= innerLen-4; i--) {
        inner[i]++;
        if (inner[i] <= 0xff) return;
        inner[i] = 0;
      }
    }

    // output blocks = SHA256(outerKey || SHA256(inner)) ...
    while (dkLen >= 32) {
      incrementCounter();
      dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))));
      dkLen -= 32;
    }
    if (dkLen > 0) {
      incrementCounter();
      dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))).slice(0, dkLen));
    }
    return dk;
  }

  function salsaXOR(tmp, B, bin, bout) {
    var j0  = tmp[0]  ^ B[bin++],
        j1  = tmp[1]  ^ B[bin++],
        j2  = tmp[2]  ^ B[bin++],
        j3  = tmp[3]  ^ B[bin++],
        j4  = tmp[4]  ^ B[bin++],
        j5  = tmp[5]  ^ B[bin++],
        j6  = tmp[6]  ^ B[bin++],
        j7  = tmp[7]  ^ B[bin++],
        j8  = tmp[8]  ^ B[bin++],
        j9  = tmp[9]  ^ B[bin++],
        j10 = tmp[10] ^ B[bin++],
        j11 = tmp[11] ^ B[bin++],
        j12 = tmp[12] ^ B[bin++],
        j13 = tmp[13] ^ B[bin++],
        j14 = tmp[14] ^ B[bin++],
        j15 = tmp[15] ^ B[bin++],
        u, i;

    var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
        x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
        x15 = j15;

    for (i = 0; i < 8; i += 2) {
      u =  x0 + x12;   x4 ^= u<<7  | u>>>(32-7);
      u =  x4 +  x0;   x8 ^= u<<9  | u>>>(32-9);
      u =  x8 +  x4;  x12 ^= u<<13 | u>>>(32-13);
      u = x12 +  x8;   x0 ^= u<<18 | u>>>(32-18);

      u =  x5 +  x1;   x9 ^= u<<7  | u>>>(32-7);
      u =  x9 +  x5;  x13 ^= u<<9  | u>>>(32-9);
      u = x13 +  x9;   x1 ^= u<<13 | u>>>(32-13);
      u =  x1 + x13;   x5 ^= u<<18 | u>>>(32-18);

      u = x10 +  x6;  x14 ^= u<<7  | u>>>(32-7);
      u = x14 + x10;   x2 ^= u<<9  | u>>>(32-9);
      u =  x2 + x14;   x6 ^= u<<13 | u>>>(32-13);
      u =  x6 +  x2;  x10 ^= u<<18 | u>>>(32-18);

      u = x15 + x11;   x3 ^= u<<7  | u>>>(32-7);
      u =  x3 + x15;   x7 ^= u<<9  | u>>>(32-9);
      u =  x7 +  x3;  x11 ^= u<<13 | u>>>(32-13);
      u = x11 +  x7;  x15 ^= u<<18 | u>>>(32-18);

      u =  x0 +  x3;   x1 ^= u<<7  | u>>>(32-7);
      u =  x1 +  x0;   x2 ^= u<<9  | u>>>(32-9);
      u =  x2 +  x1;   x3 ^= u<<13 | u>>>(32-13);
      u =  x3 +  x2;   x0 ^= u<<18 | u>>>(32-18);

      u =  x5 +  x4;   x6 ^= u<<7  | u>>>(32-7);
      u =  x6 +  x5;   x7 ^= u<<9  | u>>>(32-9);
      u =  x7 +  x6;   x4 ^= u<<13 | u>>>(32-13);
      u =  x4 +  x7;   x5 ^= u<<18 | u>>>(32-18);

      u = x10 +  x9;  x11 ^= u<<7  | u>>>(32-7);
      u = x11 + x10;   x8 ^= u<<9  | u>>>(32-9);
      u =  x8 + x11;   x9 ^= u<<13 | u>>>(32-13);
      u =  x9 +  x8;  x10 ^= u<<18 | u>>>(32-18);

      u = x15 + x14;  x12 ^= u<<7  | u>>>(32-7);
      u = x12 + x15;  x13 ^= u<<9  | u>>>(32-9);
      u = x13 + x12;  x14 ^= u<<13 | u>>>(32-13);
      u = x14 + x13;  x15 ^= u<<18 | u>>>(32-18);
    }

    B[bout++] = tmp[0]  = (x0  + j0)  | 0;
    B[bout++] = tmp[1]  = (x1  + j1)  | 0;
    B[bout++] = tmp[2]  = (x2  + j2)  | 0;
    B[bout++] = tmp[3]  = (x3  + j3)  | 0;
    B[bout++] = tmp[4]  = (x4  + j4)  | 0;
    B[bout++] = tmp[5]  = (x5  + j5)  | 0;
    B[bout++] = tmp[6]  = (x6  + j6)  | 0;
    B[bout++] = tmp[7]  = (x7  + j7)  | 0;
    B[bout++] = tmp[8]  = (x8  + j8)  | 0;
    B[bout++] = tmp[9]  = (x9  + j9)  | 0;
    B[bout++] = tmp[10] = (x10 + j10) | 0;
    B[bout++] = tmp[11] = (x11 + j11) | 0;
    B[bout++] = tmp[12] = (x12 + j12) | 0;
    B[bout++] = tmp[13] = (x13 + j13) | 0;
    B[bout++] = tmp[14] = (x14 + j14) | 0;
    B[bout++] = tmp[15] = (x15 + j15) | 0;
  }

  function blockCopy(dst, di, src, si, len) {
    while (len--) dst[di++] = src[si++];
  }

  function blockXOR(dst, di, src, si, len) {
    while (len--) dst[di++] ^= src[si++];
  }

  function blockMix(tmp, B, bin, bout, r) {
    blockCopy(tmp, 0, B, bin + (2*r-1)*16, 16);
    for (var i = 0; i < 2*r; i += 2) {
      salsaXOR(tmp, B, bin + i*16,      bout + i*8);
      salsaXOR(tmp, B, bin + i*16 + 16, bout + i*8 + r*16);
    }
  }

  function integerify(B, bi, r) {
    return B[bi+(2*r-1)*16];
  }

  function stringToUTF8Bytes(s) {
    var arr = [];
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (c < 0x80) {
        arr.push(c);
      } else if (c < 0x800) {
        arr.push(0xc0 | c >> 6);
        arr.push(0x80 | c & 0x3f);
      } else if (c < 0xd800) {
        arr.push(0xe0 | c >> 12);
        arr.push(0x80 | (c >> 6) & 0x3f);
        arr.push(0x80 | c & 0x3f);
      } else {
        if (i >= s.length - 1) {
          throw new Error('invalid string');
        }
        i++; // get one more character
        c = (c & 0x3ff) << 10;
        c |= s.charCodeAt(i) & 0x3ff;
        c += 0x10000;

        arr.push(0xf0 | c >> 18);
        arr.push(0x80 | (c >> 12) & 0x3f);
        arr.push(0x80 | (c >> 6) & 0x3f);
        arr.push(0x80 | c & 0x3f);
      }
    }
    return arr;
  }

  function bytesToHex(p) {
    /** @const */
    var enc = '0123456789abcdef'.split('');

    var len = p.length,
        arr = [],
        i = 0;

    for (; i < len; i++) {
        arr.push(enc[(p[i]>>>4) & 15]);
        arr.push(enc[(p[i]>>>0) & 15]);
    }
    return arr.join('');
  }

  function bytesToBase64(p) {
    /** @const */
    var enc = ('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' +
              '0123456789+/').split('');

    var len = p.length,
        arr = [],
        i = 0,
        a, b, c, t;

    while (i < len) {
      a = i < len ? p[i++] : 0;
      b = i < len ? p[i++] : 0;
      c = i < len ? p[i++] : 0;
      t = (a << 16) + (b << 8) + c;
      arr.push(enc[(t >>> 3 * 6) & 63]);
      arr.push(enc[(t >>> 2 * 6) & 63]);
      arr.push(enc[(t >>> 1 * 6) & 63]);
      arr.push(enc[(t >>> 0 * 6) & 63]);
    }
    if (len % 3 > 0) {
      arr[arr.length-1] = '=';
      if (len % 3 === 1) arr[arr.length-2] = '=';
    }
    return arr.join('');
  }


  // Generate key.

  var MAX_UINT = (-1)>>>0,
      p = 1;

  if (typeof logN === "object") {
    // Called as: scrypt(password, salt, opts, callback)
    if (arguments.length > 4) {
      throw new Error('scrypt: incorrect number of arguments');
    }

    var opts = logN;

    callback = r;
    logN = opts.logN;
    if (typeof logN === 'undefined') {
      if (typeof opts.N !== 'undefined') {
        if (opts.N < 2 || opts.N > MAX_UINT)
          throw new Error('scrypt: N is out of range');

        if ((opts.N & (opts.N - 1)) !== 0)
          throw new Error('scrypt: N is not a power of 2');

        logN = Math.log(opts.N) / Math.LN2;
      } else {
        throw new Error('scrypt: missing N parameter');
      }
    }

    // XXX: If opts.p or opts.dkLen is 0, it will be set to the default value
    // instead of throwing due to incorrect value. To avoid breaking
    // compatibility, this will only be changed in the next major version.
    p = opts.p || 1;
    r = opts.r;
    dkLen = opts.dkLen || 32;
    interruptStep = opts.interruptStep || 0;
    encoding = opts.encoding;
  }

  if (p < 1)
    throw new Error('scrypt: invalid p');

  if (r <= 0)
    throw new Error('scrypt: invalid r');

  if (logN < 1 || logN > 31)
    throw new Error('scrypt: logN must be between 1 and 31');


  var N = (1<<logN)>>>0,
      XY, V, B, tmp;

  if (r*p >= 1<<30 || r > MAX_UINT/128/p || r > MAX_UINT/256 || N > MAX_UINT/128/r)
    throw new Error('scrypt: parameters are too large');

  // Decode strings.
  if (typeof password === 'string')
    password = stringToUTF8Bytes(password);
  if (typeof salt === 'string')
    salt = stringToUTF8Bytes(salt);

  if (typeof Int32Array !== 'undefined') {
    //XXX We can use Uint32Array, but Int32Array is faster in Safari.
    XY = new Int32Array(64*r);
    V = new Int32Array(32*N*r);
    tmp = new Int32Array(16);
  } else {
    XY = [];
    V = [];
    tmp = new Array(16);
  }
  B = PBKDF2_HMAC_SHA256_OneIter(password, salt, p*128*r);

  var xi = 0, yi = 32 * r;

  function smixStart(pos) {
    for (var i = 0; i < 32*r; i++) {
      var j = pos + i*4;
      XY[xi+i] = ((B[j+3] & 0xff)<<24) | ((B[j+2] & 0xff)<<16) |
                 ((B[j+1] & 0xff)<<8)  | ((B[j+0] & 0xff)<<0);
    }
  }

  function smixStep1(start, end) {
    for (var i = start; i < end; i += 2) {
      blockCopy(V, i*(32*r), XY, xi, 32*r);
      blockMix(tmp, XY, xi, yi, r);

      blockCopy(V, (i+1)*(32*r), XY, yi, 32*r);
      blockMix(tmp, XY, yi, xi, r);
    }
  }

  function smixStep2(start, end) {
    for (var i = start; i < end; i += 2) {
      var j = integerify(XY, xi, r) & (N-1);
      blockXOR(XY, xi, V, j*(32*r), 32*r);
      blockMix(tmp, XY, xi, yi, r);

      j = integerify(XY, yi, r) & (N-1);
      blockXOR(XY, yi, V, j*(32*r), 32*r);
      blockMix(tmp, XY, yi, xi, r);
    }
  }

  function smixFinish(pos) {
    for (var i = 0; i < 32*r; i++) {
      var j = XY[xi+i];
      B[pos + i*4 + 0] = (j>>>0)  & 0xff;
      B[pos + i*4 + 1] = (j>>>8)  & 0xff;
      B[pos + i*4 + 2] = (j>>>16) & 0xff;
      B[pos + i*4 + 3] = (j>>>24) & 0xff;
    }
  }

  var nextTick = (typeof setImmediate !== 'undefined') ? setImmediate : setTimeout;

  function interruptedFor(start, end, step, fn, donefn) {
    (function performStep() {
      nextTick(function() {
        fn(start, start + step < end ? start + step : end);
        start += step;
        if (start < end)
          performStep();
        else
          donefn();
        });
    })();
  }

  function getResult(enc) {
      var result = PBKDF2_HMAC_SHA256_OneIter(password, B, dkLen);
      if (enc === 'base64')
        return bytesToBase64(result);
      else if (enc === 'hex')
        return bytesToHex(result);
      else if (enc === 'binary')
        return new Uint8Array(result);
      else
        return result;
  }

  // Blocking variant.
  function calculateSync() {
    for (var i = 0; i < p; i++) {
      smixStart(i*128*r);
      smixStep1(0, N);
      smixStep2(0, N);
      smixFinish(i*128*r);
    }
    callback(getResult(encoding));
  }

  // Async variant.
  function calculateAsync(i) {
      smixStart(i*128*r);
      interruptedFor(0, N, interruptStep*2, smixStep1, function() {
        interruptedFor(0, N, interruptStep*2, smixStep2, function () {
          smixFinish(i*128*r);
          if (i + 1 < p) {
            nextTick(function() { calculateAsync(i + 1); });
          } else {
            callback(getResult(encoding));
          }
        });
      });
  }

  if (typeof interruptStep === 'function') {
    // Called as: scrypt(...,      callback, [encoding])
    //  shifting: scrypt(..., interruptStep,  callback, [encoding])
    encoding = callback;
    callback = interruptStep;
    interruptStep = 1000;
  }

  if (interruptStep <= 0) {
    calculateSync();
  } else {
    calculateAsync(0);
  }
}

if (true) module.exports = scrypt;


/***/ }),

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _App_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.module.scss */ "./src/App.module.scss");
/* harmony import */ var _components_pages_download_Download__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/pages/download/Download */ "./src/components/pages/download/Download.tsx");
/* harmony import */ var _components_pages_upload_Upload__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/pages/upload/Upload */ "./src/components/pages/upload/Upload.tsx");




function App() {
    return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: _App_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].app }, location.hash ? react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_components_pages_download_Download__WEBPACK_IMPORTED_MODULE_2__["default"], null) : react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_components_pages_upload_Upload__WEBPACK_IMPORTED_MODULE_3__["default"], null));
}


/***/ }),

/***/ "./src/components/banner/Banner.tsx":
/*!******************************************!*\
  !*** ./src/components/banner/Banner.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Banner)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _Banner_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Banner.module.scss */ "./src/components/banner/Banner.module.scss");


function Banner() {
    return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: _Banner_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].banner },
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("a", { href: "/" }, "ZUP"));
}


/***/ }),

/***/ "./src/components/compatibility/Compatibility.tsx":
/*!********************************************************!*\
  !*** ./src/components/compatibility/Compatibility.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Compatibility)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _utils_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/types */ "./src/utils/types.ts");
/* harmony import */ var _Compatibility_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Compatibility.module.scss */ "./src/components/compatibility/Compatibility.module.scss");



function Compatibility() {
    return (react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: _Compatibility_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].compatibility },
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("label", { className: _Compatibility_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].toggleControl },
            "compatibility",
            react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("input", { type: "checkbox", name: _utils_types__WEBPACK_IMPORTED_MODULE_1__.FormFields.Compatibility }),
            react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", { className: _Compatibility_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].control }))));
}


/***/ }),

/***/ "./src/components/container/Container.tsx":
/*!************************************************!*\
  !*** ./src/components/container/Container.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Container)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _Container_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Container.module.scss */ "./src/components/container/Container.module.scss");


function Container(_a) {
    var children = _a.children, className = _a.className;
    return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: "".concat(_Container_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].container, " ").concat(className !== null && className !== void 0 ? className : '') }, children);
}


/***/ }),

/***/ "./src/components/encryption/Encryption.tsx":
/*!**************************************************!*\
  !*** ./src/components/encryption/Encryption.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Encryption)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _utils_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/types */ "./src/utils/types.ts");
/* harmony import */ var _Encryption_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Encryption.module.scss */ "./src/components/encryption/Encryption.module.scss");



function Encryption(_a) {
    var className = _a.className;
    var _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), showPassword = _b[0], setShowPassword = _b[1];
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        if (!showPassword) {
        }
    }, [showPassword]);
    return (react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: "".concat(_Encryption_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].encryption, " ").concat(className !== null && className !== void 0 ? className : '', " ").concat(showPassword ? _Encryption_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].active : '') },
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: _Encryption_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].toggle, onClick: function () { return setShowPassword(!showPassword); } },
            react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, "Security"),
            react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("i", { className: "fa-solid ".concat(showPassword ? 'fa-lock' : 'fa-lock-open') }))),
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: _Encryption_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].input },
            react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("input", { type: 'password', name: _utils_types__WEBPACK_IMPORTED_MODULE_1__.FormFields.Password, placeholder: 'Pick a password' }))));
}


/***/ }),

/***/ "./src/components/pages/download/Download.tsx":
/*!****************************************************!*\
  !*** ./src/components/pages/download/Download.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Download)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var use_debounce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! use-debounce */ "./node_modules/use-debounce/dist/index.module.js");
/* harmony import */ var _logic_link_creator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../logic/link-creator */ "./src/logic/link-creator.ts");
/* harmony import */ var _utils_use_effect_async__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/use-effect-async */ "./src/utils/use-effect-async.ts");
/* harmony import */ var _Download_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Download.module.scss */ "./src/components/pages/download/Download.module.scss");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





function Download() {
    var _this = this;
    var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''), password = _a[0], setPassword = _a[1];
    var _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(undefined), pwState = _b[0], setPwState = _b[1];
    var debouncedPassword = (0,use_debounce__WEBPACK_IMPORTED_MODULE_4__.useDebounce)(password, 1000)[0];
    var hash = location.hash.slice(1);
    var _c = _logic_link_creator__WEBPACK_IMPORTED_MODULE_1__.LinkCreator.getParts(hash), flags = _c[0], dataPart = _c[1];
    var showPasswordModal = flags.encrypted && !pwState;
    var _d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''), data = _d[0], setData = _d[1];
    (0,_utils_use_effect_async__WEBPACK_IMPORTED_MODULE_2__.useEffectAsync)(function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, ex_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!!flags.encrypted) return [3 /*break*/, 2];
                    _a = setData;
                    return [4 /*yield*/, _logic_link_creator__WEBPACK_IMPORTED_MODULE_1__.LinkCreator.unpackAsync(dataPart, flags)];
                case 1:
                    _a.apply(void 0, [_c.sent()]);
                    return [2 /*return*/];
                case 2:
                    if (password === '')
                        return [2 /*return*/];
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 5, , 6]);
                    _b = setData;
                    return [4 /*yield*/, _logic_link_creator__WEBPACK_IMPORTED_MODULE_1__.LinkCreator.unpackAsync(dataPart, flags, password)];
                case 4:
                    _b.apply(void 0, [_c.sent()]);
                    setPwState(true);
                    return [3 /*break*/, 6];
                case 5:
                    ex_1 = _c.sent();
                    setPwState(false);
                    console.log(ex_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); }, [debouncedPassword]);
    var onPasswordChange = function (evt) {
        setPassword(evt.currentTarget.value);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: _Download_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].download },
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: _Download_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].file },
            react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("i", { className: "fa-solid ".concat(showPasswordModal ? 'fa-file-shield' : 'fa-envelope-open-text') })),
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: _Download_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].details },
            react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, showPasswordModal ? 'Secure content' : 'Text message'),
            showPasswordModal ?
                react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: _Download_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].password },
                    react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("input", { className: pwState === false ? _Download_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].bad : '', type: "password", name: 'password', placeholder: 'Password', onChange: onPasswordChange })) :
                react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: _Download_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].text },
                    react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, data)))));
}


/***/ }),

/***/ "./src/components/pages/upload/Upload.tsx":
/*!************************************************!*\
  !*** ./src/components/pages/upload/Upload.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Upload)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _Upload_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Upload.module.scss */ "./src/components/pages/upload/Upload.module.scss");
/* harmony import */ var _utils_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/types */ "./src/utils/types.ts");
/* harmony import */ var _components_upload_types_text_Text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/upload-types/text/Text */ "./src/components/upload-types/text/Text.tsx");
/* harmony import */ var _utils_vanilla_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/vanilla-helpers */ "./src/utils/vanilla-helpers.ts");
/* harmony import */ var _components_upload_types_image_Image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/upload-types/image/Image */ "./src/components/upload-types/image/Image.tsx");
/* harmony import */ var _components_upload_types_file_File__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/upload-types/file/File */ "./src/components/upload-types/file/File.tsx");
/* harmony import */ var _components_compatibility_Compatibility__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/compatibility/Compatibility */ "./src/components/compatibility/Compatibility.tsx");
/* harmony import */ var _components_encryption_Encryption__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/encryption/Encryption */ "./src/components/encryption/Encryption.tsx");
/* harmony import */ var _logic_link_creator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../logic/link-creator */ "./src/logic/link-creator.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};










function Upload() {
    var _a;
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    }); })();
    var _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_utils_types__WEBPACK_IMPORTED_MODULE_2__.UploadType.Text), uploadType = _b[0], setUploadType = _b[1];
    var types = (_a = {},
        _a[_utils_types__WEBPACK_IMPORTED_MODULE_2__.UploadType.Text] = { label: 'Text', component: react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_components_upload_types_text_Text__WEBPACK_IMPORTED_MODULE_3__["default"], { placeholder: 'Your message...' }) },
        _a[_utils_types__WEBPACK_IMPORTED_MODULE_2__.UploadType.Image] = { label: 'Image', component: react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_components_upload_types_image_Image__WEBPACK_IMPORTED_MODULE_5__["default"], null) },
        _a[_utils_types__WEBPACK_IMPORTED_MODULE_2__.UploadType.File] = { label: 'File', component: react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_components_upload_types_file_File__WEBPACK_IMPORTED_MODULE_6__["default"], null) },
        _a);
    var onSubmit = function (evt) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var formData, request, link;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formData = new FormData(evt.currentTarget);
                        request = {
                            uploadType: uploadType,
                            compatibility: parseInt(formData.get(_utils_types__WEBPACK_IMPORTED_MODULE_2__.FormFields.Compatibility)),
                            password: formData.get(_utils_types__WEBPACK_IMPORTED_MODULE_2__.FormFields.Password),
                            textdata: formData.get(_utils_types__WEBPACK_IMPORTED_MODULE_2__.FormFields.TextData),
                            imagedata: formData.get(_utils_types__WEBPACK_IMPORTED_MODULE_2__.FormFields.ImageData),
                            filedata: formData.get(_utils_types__WEBPACK_IMPORTED_MODULE_2__.FormFields.FileData),
                        };
                        return [4 /*yield*/, _logic_link_creator__WEBPACK_IMPORTED_MODULE_9__.LinkCreator.packAsync(request)];
                    case 1:
                        link = _a.sent();
                        alert("".concat(location.href, "#").concat(link));
                        return [2 /*return*/];
                }
            });
        }); })();
        evt.preventDefault();
    };
    var renderMenu = function () { return (0,_utils_vanilla_helpers__WEBPACK_IMPORTED_MODULE_4__.objectEntries)(types).map(function (_a) {
        var type = _a[0], obj = _a[1];
        return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("li", { onClick: function () { return setUploadType(+type); }, className: +type === uploadType ? _Upload_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].active : '' }, obj.label);
    }); };
    return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: _Upload_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].upload },
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("form", { onSubmit: onSubmit },
            react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: _Upload_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].tabContainer },
                react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("ul", { className: _Upload_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].tab }, renderMenu()),
                react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_components_compatibility_Compatibility__WEBPACK_IMPORTED_MODULE_7__["default"], null)),
            types[uploadType].component,
            react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_components_encryption_Encryption__WEBPACK_IMPORTED_MODULE_8__["default"], { className: _Upload_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].encryption }),
            react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", { className: _Upload_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].sendButton }, "Generate link")));
}


/***/ }),

/***/ "./src/components/upload-types/file/File.tsx":
/*!***************************************************!*\
  !*** ./src/components/upload-types/file/File.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ File)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _utils_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/types */ "./src/utils/types.ts");
/* harmony import */ var _File_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./File.module.scss */ "./src/components/upload-types/file/File.module.scss");



function File() {
    return (react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: _File_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].file },
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("input", { type: "file", name: _utils_types__WEBPACK_IMPORTED_MODULE_1__.FormFields.FileData, multiple: true })));
}


/***/ }),

/***/ "./src/components/upload-types/image/Image.tsx":
/*!*****************************************************!*\
  !*** ./src/components/upload-types/image/Image.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Image)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _utils_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/types */ "./src/utils/types.ts");
/* harmony import */ var _Image_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Image.module.scss */ "./src/components/upload-types/image/Image.module.scss");



function Image() {
    return (react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: _Image_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].image },
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("input", { type: "file", name: _utils_types__WEBPACK_IMPORTED_MODULE_1__.FormFields.FileData, multiple: true, accept: 'image/jpeg,image/png,image/gif' })));
}


/***/ }),

/***/ "./src/components/upload-types/text/Text.tsx":
/*!***************************************************!*\
  !*** ./src/components/upload-types/text/Text.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Text)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _utils_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/types */ "./src/utils/types.ts");
/* harmony import */ var _Text_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Text.module.scss */ "./src/components/upload-types/text/Text.module.scss");



function Text(_a) {
    var placeholder = _a.placeholder;
    return (react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: _Text_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].text },
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("textarea", { name: _utils_types__WEBPACK_IMPORTED_MODULE_1__.FormFields.TextData, placeholder: placeholder })));
}


/***/ }),

/***/ "./src/logic/link-creator.ts":
/*!***********************************!*\
  !*** ./src/logic/link-creator.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LinkCreator": () => (/* binding */ LinkCreator)
/* harmony export */ });
/* harmony import */ var _utils_bitfield__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/bitfield */ "./src/utils/bitfield.ts");
/* harmony import */ var _utils_crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/crypto */ "./src/utils/crypto.ts");
/* harmony import */ var _utils_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/types */ "./src/utils/types.ts");
/* harmony import */ var _utils_vanilla_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/vanilla-helpers */ "./src/utils/vanilla-helpers.ts");
/* harmony import */ var _url_encoder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./url-encoder */ "./src/logic/url-encoder.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};





var browserUrlLengths = [
    { name: 'Chrome', modern: true, length: 2097152 },
    { name: 'Firefox', modern: true, length: 65536 },
    { name: 'Internet Explorer', modern: false, length: 2083 },
    { name: 'Opera', modern: false, length: 2097152 },
    { name: 'Safari', modern: true, length: 80000 },
];
var flagSchema = {
    encrypted: 1,
    compressed: 1,
    uploadType: 2,
};
var LinkCreator = /** @class */ (function () {
    function LinkCreator() {
    }
    LinkCreator.unpackAsync = function (data, flags, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!flags.encrypted) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0,_utils_crypto__WEBPACK_IMPORTED_MODULE_1__.decryptDataAsync)(password, data)];
                    case 1:
                        data = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (flags.compressed)
                            data = LZUTF8.decompress(data, {
                                inputEncoding: 'ByteArray',
                                outputEncoding: 'ByteArray',
                            });
                        return [2 /*return*/, (0,_utils_vanilla_helpers__WEBPACK_IMPORTED_MODULE_3__.convertUint8ToString)(data)];
                }
            });
        });
    };
    LinkCreator.getParts = function (encodedData) {
        var pack = (0,_url_encoder__WEBPACK_IMPORTED_MODULE_4__.urlDecode)(encodedData);
        var flags = _utils_bitfield__WEBPACK_IMPORTED_MODULE_0__.Bitfield.create(8, flagSchema, pack[0]);
        var data = pack.slice(1);
        return [flags, data];
    };
    LinkCreator.packAsync = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var maxUrlLength, data, compressedData, shouldCompress, encrypted, flags, urlEncoded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Validate
                        if (request.uploadType !== _utils_types__WEBPACK_IMPORTED_MODULE_2__.UploadType.Text)
                            throw new Error('Unsupported upload type');
                        maxUrlLength = LinkCreator.getEffectiveUrlLength(request.compatibility);
                        data = (0,_utils_vanilla_helpers__WEBPACK_IMPORTED_MODULE_3__.convertStringToUint8)(request.textdata);
                        compressedData = LZUTF8.compress(data, {
                            inputEncoding: 'ByteArray',
                            outputEncoding: 'ByteArray',
                        });
                        shouldCompress = data.byteLength > compressedData.byteLength;
                        if (shouldCompress) {
                            data = compressedData;
                        }
                        encrypted = !!request.password;
                        if (!encrypted) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0,_utils_crypto__WEBPACK_IMPORTED_MODULE_1__.encryptDataAsync)(request.password, data)
                            // Add flags
                        ];
                    case 1:
                        data = _a.sent();
                        _a.label = 2;
                    case 2:
                        flags = _utils_bitfield__WEBPACK_IMPORTED_MODULE_0__.Bitfield.create(8, flagSchema, {
                            encrypted: +encrypted,
                            uploadType: +request.uploadType,
                            compressed: +shouldCompress
                        });
                        data = Uint8Array.from(__spreadArray([flags + 0], Array.from(data), true));
                        urlEncoded = (0,_url_encoder__WEBPACK_IMPORTED_MODULE_4__.urlEncode)(data);
                        if (urlEncoded.length > maxUrlLength) {
                            throw new Error('Url reached maximum length');
                        }
                        return [2 /*return*/, urlEncoded];
                }
            });
        });
    };
    LinkCreator.getFileContentAsync = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, file.arrayBuffer()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LinkCreator.getEffectiveUrlLength = function (urlCompatibility) {
        var baseUrlLength = location.href.length;
        var filterCb = function (x) { return ((urlCompatibility === _utils_types__WEBPACK_IMPORTED_MODULE_2__.CompatibilityType.Modern && x.modern)
            || urlCompatibility !== _utils_types__WEBPACK_IMPORTED_MODULE_2__.CompatibilityType.Modern); };
        return browserUrlLengths
            .filter(filterCb)
            .map(function (x) { return x.length; })
            .reduce(function (prev, curr) { return curr > prev ? curr : prev; }, 0) - baseUrlLength;
    };
    return LinkCreator;
}());



/***/ }),

/***/ "./src/logic/url-encoder.ts":
/*!**********************************!*\
  !*** ./src/logic/url-encoder.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "urlDecode": () => (/* binding */ urlDecode),
/* harmony export */   "urlEncode": () => (/* binding */ urlEncode)
/* harmony export */ });
/* harmony import */ var base_x__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! base-x */ "./node_modules/base-x/src/index.js");
/* harmony import */ var base_x__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(base_x__WEBPACK_IMPORTED_MODULE_0__);

var URL_SAFE_ALPHABET = '#!$%&\'()*+,-./0123456789:;=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}~';
var BS90 = base_x__WEBPACK_IMPORTED_MODULE_0___default()(URL_SAFE_ALPHABET);
function urlEncode(data) {
    return BS90.encode(data);
}
function urlDecode(data) {
    return BS90.decode(data);
}


/***/ }),

/***/ "./src/utils/bitfield.ts":
/*!*******************************!*\
  !*** ./src/utils/bitfield.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bitfield": () => (/* binding */ Bitfield)
/* harmony export */ });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
var mask = function (bits) { return (1 << bits) - 1; };
var Bitfield_size = Symbol('Bitfield_size');
var Bitfield_schema = Symbol('Bitfield_schema');
var Bitfield_data = Symbol('Bitfield_data');
var Bitfield_value_fn = Symbol('Bitfield_value_fn');
var Bitfield_init_fn = Symbol('Bitfield_init_fn');
var bitFieldSymbols = [
    Symbol.toPrimitive,
    Bitfield_data,
    Bitfield_schema,
    Bitfield_size,
    Bitfield_value_fn,
    Bitfield_init_fn,
];
var Bitfield = /** @class */ (function () {
    function Bitfield(size, schema, data) {
        this[_a] = {};
        this[Bitfield_size] = size;
        this[Bitfield_schema] = __assign({}, schema);
        if (data) {
            this[Bitfield_init_fn](data);
        }
        else {
            for (var prop in schema) {
                this[Bitfield_data][prop] = 0;
            }
        }
    }
    Bitfield.create = function (size, schema, data) {
        var bf = new Bitfield(size, schema, data);
        var proxy = new Proxy({}, bf);
        return proxy;
    };
    Bitfield.prototype.get = function (_, propName, __) {
        if (bitFieldSymbols.includes(propName))
            return this[propName];
        if (typeof propName === 'symbol')
            throw new Error("Unknown symbol access: ".concat(propName.toString()));
        if (!(propName in this[Bitfield_schema]))
            throw new Error("Property '".concat(propName, "' not found in schema"));
        return this[Bitfield_data][propName];
    };
    Bitfield.prototype.set = function (_, propName, value, __) {
        if (typeof value !== 'number')
            throw new Error('Bitfield value must be a number');
        if (value < 0)
            throw new Error('Bitfield cannot store negative values');
        var size = this[Bitfield_schema][propName];
        if (value >= (1 << size))
            throw new Error("Value '".concat(value, "' is too big to be represented on ").concat(size, " bits"));
        this[Bitfield_data][propName] = value;
        return true;
    };
    Bitfield.prototype.apply = function (_, __, ___) {
        return this[Bitfield_value_fn]();
    };
    Bitfield.prototype[(_a = Bitfield_data, Bitfield_value_fn)] = function () {
        var result = 0;
        for (var prop in this[Bitfield_schema]) {
            var size = this[Bitfield_schema][prop];
            var value = this[Bitfield_data][prop];
            result = (result << size) | (value & mask(size));
        }
        return result & mask(this[Bitfield_size]);
    };
    Bitfield.prototype[Bitfield_init_fn] = function (data) {
        if (typeof data === "number") {
            if (data > mask(this[Bitfield_size]))
                throw new Error('Number is bigger than the schema size');
            var num = data & mask(this[Bitfield_size]);
            for (var _i = 0, _b = Object.keys(this[Bitfield_schema]).reverse(); _i < _b.length; _i++) {
                var prop = _b[_i];
                var size = this[Bitfield_schema][prop];
                this[Bitfield_data][prop] = num & mask(size);
                num = num >> size;
            }
        }
        else {
            this[Bitfield_data] = __assign({}, data);
        }
    };
    Bitfield.prototype[Symbol.toPrimitive] = function () {
        return this[Bitfield_value_fn]();
    };
    return Bitfield;
}());

Bitfield.prototype.valueOf = function () {
    return this[Bitfield_value_fn]();
};


/***/ }),

/***/ "./src/utils/crypto.ts":
/*!*****************************!*\
  !*** ./src/utils/crypto.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decryptDataAsync": () => (/* binding */ decryptDataAsync),
/* harmony export */   "encryptDataAsync": () => (/* binding */ encryptDataAsync)
/* harmony export */ });
/* harmony import */ var scrypt_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scrypt-async */ "./node_modules/scrypt-async/scrypt-async.js");
/* harmony import */ var scrypt_async__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(scrypt_async__WEBPACK_IMPORTED_MODULE_0__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

function encryptDataAsync(password, data) {
    return __awaiter(this, void 0, void 0, function () {
        var iv, key, keyObj, encryptedData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    iv = new Uint8Array(16);
                    return [4 /*yield*/, deriveKeyAsync(password)];
                case 1:
                    key = _a.sent();
                    return [4 /*yield*/, crypto.subtle.importKey('raw', key.buffer, 'AES-GCM', false, ['encrypt', 'decrypt'])
                        // encrypt data
                    ];
                case 2:
                    keyObj = _a.sent();
                    return [4 /*yield*/, window.crypto.subtle.encrypt({
                            name: "AES-GCM",
                            iv: iv
                        }, keyObj, data)];
                case 3:
                    encryptedData = _a.sent();
                    return [2 /*return*/, new Uint8Array(encryptedData)];
            }
        });
    });
}
function decryptDataAsync(password, data) {
    return __awaiter(this, void 0, void 0, function () {
        var iv, key, keyObj, encryptedData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    iv = new Uint8Array(16);
                    return [4 /*yield*/, deriveKeyAsync(password)];
                case 1:
                    key = _a.sent();
                    return [4 /*yield*/, crypto.subtle.importKey('raw', key.buffer, 'AES-GCM', false, ['encrypt', 'decrypt'])
                        // encrypt data
                    ];
                case 2:
                    keyObj = _a.sent();
                    return [4 /*yield*/, window.crypto.subtle.decrypt({
                            name: "AES-GCM",
                            iv: iv,
                        }, keyObj, data)];
                case 3:
                    encryptedData = _a.sent();
                    return [2 /*return*/, new Uint8Array(encryptedData)];
            }
        });
    });
}
function deriveKeyAsync(password) {
    return __awaiter(this, void 0, void 0, function () {
        var salt;
        return __generator(this, function (_a) {
            salt = Array.from(new Uint8Array(0));
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    try {
                        scrypt_async__WEBPACK_IMPORTED_MODULE_0___default()(password, salt, {
                            N: 16384,
                            r: 8,
                            p: 1,
                            dkLen: 16,
                            encoding: 'binary'
                        }, function (derivedKey) {
                            if (!derivedKey)
                                throw new Error('Derived key is empty');
                            resolve(derivedKey);
                        });
                    }
                    catch (ex) {
                        reject(ex);
                    }
                })];
        });
    });
}


/***/ }),

/***/ "./src/utils/types.ts":
/*!****************************!*\
  !*** ./src/utils/types.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompatibilityType": () => (/* binding */ CompatibilityType),
/* harmony export */   "FormFields": () => (/* binding */ FormFields),
/* harmony export */   "PageType": () => (/* binding */ PageType),
/* harmony export */   "UploadType": () => (/* binding */ UploadType)
/* harmony export */ });
var PageType;
(function (PageType) {
    PageType[PageType["Upload"] = 0] = "Upload";
    PageType[PageType["Download"] = 1] = "Download";
})(PageType || (PageType = {}));
var UploadType;
(function (UploadType) {
    UploadType[UploadType["Text"] = 0] = "Text";
    UploadType[UploadType["Image"] = 1] = "Image";
    UploadType[UploadType["File"] = 2] = "File";
})(UploadType || (UploadType = {}));
var CompatibilityType;
(function (CompatibilityType) {
    CompatibilityType[CompatibilityType["Maximum"] = 0] = "Maximum";
    CompatibilityType[CompatibilityType["Modern"] = 1] = "Modern";
})(CompatibilityType || (CompatibilityType = {}));
var FormFields;
(function (FormFields) {
    FormFields["Compatibility"] = "compatibility";
    FormFields["TextData"] = "textdata";
    FormFields["ImageData"] = "imagedata";
    FormFields["FileData"] = "filedata";
    FormFields["Password"] = "password";
})(FormFields || (FormFields = {}));


/***/ }),

/***/ "./src/utils/use-effect-async.ts":
/*!***************************************!*\
  !*** ./src/utils/use-effect-async.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useEffectAsync": () => (/* binding */ useEffectAsync)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");

function useEffectAsync(effect, deps) {
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () { effect(); }, deps);
}


/***/ }),

/***/ "./src/utils/vanilla-helpers.ts":
/*!**************************************!*\
  !*** ./src/utils/vanilla-helpers.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertStringToUint8": () => (/* binding */ convertStringToUint8),
/* harmony export */   "convertUint8ToString": () => (/* binding */ convertUint8ToString),
/* harmony export */   "objectEntries": () => (/* binding */ objectEntries)
/* harmony export */ });
function objectEntries(obj) {
    return Object.entries(obj).map(function (_a) {
        var key = _a[0], item = _a[1];
        return [key, item];
    });
}
function convertStringToUint8(data) {
    var encoder = new TextEncoder();
    return encoder.encode(data);
}
function convertUint8ToString(data) {
    var decoder = new TextDecoder();
    return decoder.decode(data);
}


/***/ }),

/***/ "./node_modules/use-debounce/dist/index.module.js":
/*!********************************************************!*\
  !*** ./node_modules/use-debounce/dist/index.module.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useDebounce": () => (/* binding */ o),
/* harmony export */   "useDebouncedCallback": () => (/* binding */ c),
/* harmony export */   "useThrottledCallback": () => (/* binding */ f)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
function c(u,e,c){var i=this,a=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),o=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0),f=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),l=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]),m=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),v=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),d=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(u),p=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!0);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function(){d.current=u},[u]);var g=!e&&0!==e&&"undefined"!=typeof window;if("function"!=typeof u)throw new TypeError("Expected a function");e=+e||0;var w=!!(c=c||{}).leading,s=!("trailing"in c)||!!c.trailing,x="maxWait"in c,y=x?Math.max(+c.maxWait||0,e):null;(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function(){return p.current=!0,function(){p.current=!1}},[]);var h=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function(){var r=function(r){var n=l.current,t=m.current;return l.current=m.current=null,o.current=r,v.current=d.current.apply(t,n)},n=function(r,n){g&&cancelAnimationFrame(f.current),f.current=g?requestAnimationFrame(r):setTimeout(r,n)},t=function(r){if(!p.current)return!1;var n=r-a.current;return!a.current||n>=e||n<0||x&&r-o.current>=y},u=function(n){return f.current=null,s&&l.current?r(n):(l.current=m.current=null,v.current)},c=function r(){var c=Date.now();if(t(c))return u(c);if(p.current){var i=e-(c-a.current),f=x?Math.min(i,y-(c-o.current)):i;n(r,f)}},h=function(){var u=Date.now(),d=t(u);if(l.current=[].slice.call(arguments),m.current=i,a.current=u,d){if(!f.current&&p.current)return o.current=a.current,n(c,e),w?r(a.current):v.current;if(x)return n(c,e),r(a.current)}return f.current||n(c,e),v.current};return h.cancel=function(){f.current&&(g?cancelAnimationFrame(f.current):clearTimeout(f.current)),o.current=0,l.current=a.current=m.current=f.current=null},h.isPending=function(){return!!f.current},h.flush=function(){return f.current?u(Date.now()):v.current},h},[w,x,e,y,s,g]);return h}function i(r,n){return r===n}function a(r){return"function"==typeof r?function(){return r}:r}function o(n,t,o){var f,l,m=o&&o.equalityFn||i,v=(f=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(a(n)),l=f[1],[f[0],(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function(r){return l(a(r))},[])]),d=v[0],p=v[1],g=c((0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function(r){return p(r)},[p]),t,o),w=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(n);return m(w.current,n)||(g(n),w.current=n),[d,g]}function f(r,n,t){var u=void 0===t?{}:t,e=u.leading,i=u.trailing;return c(r,n,{maxWait:n,leading:void 0===e||e,trailing:void 0===i||i})}
//# sourceMappingURL=index.module.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App */ "./src/App.tsx");
/* harmony import */ var _components_banner_Banner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/banner/Banner */ "./src/components/banner/Banner.tsx");
/* harmony import */ var _components_container_Container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/container/Container */ "./src/components/container/Container.tsx");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");






react__WEBPACK_IMPORTED_MODULE_0__["default"].render(react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(react__WEBPACK_IMPORTED_MODULE_0__["default"].Fragment, null,
    react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_components_banner_Banner__WEBPACK_IMPORTED_MODULE_2__["default"], null),
    react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_components_container_Container__WEBPACK_IMPORTED_MODULE_3__["default"], null,
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_App__WEBPACK_IMPORTED_MODULE_1__["default"], null))), document.querySelector('#root'));

})();

/******/ })()
;
//# sourceMappingURL=app.js.map