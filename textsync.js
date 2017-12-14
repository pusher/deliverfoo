/*! TextSync client (development build) version 4e2b98a8a1e090b566dbd3eeb6cd71498a9f03f5 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TextSync"] = factory();
	else
		root["TextSync"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 44);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(35);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Noty = __webpack_require__(31);
__webpack_require__(42);
var NOTY_THEME = 'mint';
var NOTIFICATION_TIMEOUT_MS = 4000;
var NotificationType;
(function (NotificationType) {
    NotificationType[NotificationType["Error"] = 0] = "Error";
    NotificationType[NotificationType["Info"] = 1] = "Info";
    NotificationType[NotificationType["Warning"] = 2] = "Warning";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
var Notifier = (function () {
    function Notifier(enabled, onError) {
        this.enabled = enabled;
        this.onError = onError;
    }
    Notifier.prototype.notify = function (message, toastType, permanent) {
        if (toastType === void 0) { toastType = NotificationType.Info; }
        if (permanent === void 0) { permanent = false; }
        if (this.onError) {
            onErrorNotification(message, toastType, this.onError);
        }
        if (this.enabled) {
            notyNotification(message, toastType, permanent);
        }
    };
    return Notifier;
}());
exports.Notifier = Notifier;
function onErrorNotification(message, toastType, onError) {
    var notificationType;
    switch (toastType) {
        case NotificationType.Error:
            notificationType = 'error';
            break;
        case NotificationType.Info:
            notificationType = 'info';
            break;
        case NotificationType.Warning:
            notificationType = 'warning';
            break;
    }
    onError({
        notificationType: notificationType,
        message: message
    });
}
function notyNotification(message, toastType, permanent) {
    var notyType;
    switch (toastType) {
        case NotificationType.Error:
            notyType = 'error';
            break;
        case NotificationType.Info:
            notyType = 'information';
            break;
        case NotificationType.Warning:
            notyType = 'warning';
            break;
    }
    var notyOptions = {
        type: notyType,
        theme: NOTY_THEME,
        text: message
    };
    if (!permanent) {
        notyOptions['timeout'] = NOTIFICATION_TIMEOUT_MS;
    }
    new Noty(notyOptions).show();
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__(28);
var isArguments = __webpack_require__(27);

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

    // 7.3. Other pairs that do not both pass typeof value == 'object',
    // equivalence is determined by ==.
  } else if (!actual || !expected || (typeof actual === 'undefined' ? 'undefined' : _typeof(actual)) != 'object' && (typeof expected === 'undefined' ? 'undefined' : _typeof(expected)) != 'object') {
    return opts.strict ? actual === expected : actual == expected;

    // 7.4. For all other Object pairs, including Array objects, equivalence is
    // determined by having the same number of owned properties (as verified
    // with Object.prototype.hasOwnProperty.call), the same set of keys
    // (although not necessarily the same order), equivalent values for every
    // corresponding key, and an identical 'prototype' property. Note: this
    // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
};

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer(x) {
  if (!x || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {
    //happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length) return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === (typeof b === 'undefined' ? 'undefined' : _typeof(b));
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) {/**/}

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object' && typeof target !== 'function') {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var HIGH_SURROGATE_START = 0xd800;
var HIGH_SURROGATE_END = 0xdbff;

var LOW_SURROGATE_START = 0xdc00;

var REGIONAL_INDICATOR_START = 0x1f1e6;
var REGIONAL_INDICATOR_END = 0x1f1ff;

var FITZPATRICK_MODIFIER_START = 0x1f3fb;
var FITZPATRICK_MODIFIER_END = 0x1f3ff;

var VARIATION_MODIFIER_START = 0xfe00;
var VARIATION_MODIFIER_END = 0xfe0f;

var ZWJ = 0x200d;

var GRAPHEMS = [0x0308, // ( ◌̈ ) COMBINING DIAERESIS
0x0937, // ( ष ) DEVANAGARI LETTER SSA
0x0937, // ( ष ) DEVANAGARI LETTER SSA
0x093F, // ( ि ) DEVANAGARI VOWEL SIGN I
0x093F, // ( ि ) DEVANAGARI VOWEL SIGN I
0x0BA8, // ( ந ) TAMIL LETTER NA
0x0BBF, // ( ி ) TAMIL VOWEL SIGN I
0x0BCD, // ( ◌்) TAMIL SIGN VIRAMA
0x0E31, // ( ◌ั ) THAI CHARACTER MAI HAN-AKAT
0x0E33, // ( ำ ) THAI CHARACTER SARA AM
0x0E40, // ( เ ) THAI CHARACTER SARA E
0x0E49, // ( เ ) THAI CHARACTER MAI THO
0x1100, // ( ᄀ ) HANGUL CHOSEONG KIYEOK
0x1161, // ( ᅡ ) HANGUL JUNGSEONG A
0x11A8 // ( ᆨ ) HANGUL JONGSEONG KIYEOK
];

function runes(string) {
  if (typeof string !== 'string') {
    throw new Error('string cannot be undefined or null');
  }
  var result = [];
  var i = 0;
  var increment = 0;
  while (i < string.length) {
    increment += nextUnits(i + increment, string);
    if (isGraphem(string[i + increment])) {
      increment++;
    }
    if (isVariationSelector(string[i + increment])) {
      increment++;
    }
    if (isZeroWidthJoiner(string[i + increment])) {
      increment++;
      continue;
    }
    result.push(string.substring(i, i + increment));
    i += increment;
    increment = 0;
  }
  return result;
}

// Decide how many code units make up the current character.
// BMP characters: 1 code unit
// Non-BMP characters (represented by surrogate pairs): 2 code units
// Emoji with skin-tone modifiers: 4 code units (2 code points)
// Country flags: 4 code units (2 code points)
// Variations: 2 code units
function nextUnits(i, string) {
  var current = string[i];
  // If we don't have a value that is part of a surrogate pair, or we're at
  // the end, only take the value at i
  if (!isFirstOfSurrogatePair(current) || i === string.length - 1) {
    return 1;
  }

  var currentPair = current + string[i + 1];
  var nextPair = string.substring(i + 2, i + 5);

  // Country flags are comprised of two regional indicator symbols,
  // each represented by a surrogate pair.
  // See http://emojipedia.org/flags/
  // If both pairs are regional indicator symbols, take 4
  if (isRegionalIndicator(currentPair) && isRegionalIndicator(nextPair)) {
    return 4;
  }

  // If the next pair make a Fitzpatrick skin tone
  // modifier, take 4
  // See http://emojipedia.org/modifiers/
  // Technically, only some code points are meant to be
  // combined with the skin tone modifiers. This function
  // does not check the current pair to see if it is
  // one of them.
  if (isFitzpatrickModifier(nextPair)) {
    return 4;
  }
  return 2;
}

function isFirstOfSurrogatePair(string) {
  return string && betweenInclusive(string[0].charCodeAt(0), HIGH_SURROGATE_START, HIGH_SURROGATE_END);
}

function isRegionalIndicator(string) {
  return betweenInclusive(codePointFromSurrogatePair(string), REGIONAL_INDICATOR_START, REGIONAL_INDICATOR_END);
}

function isFitzpatrickModifier(string) {
  return betweenInclusive(codePointFromSurrogatePair(string), FITZPATRICK_MODIFIER_START, FITZPATRICK_MODIFIER_END);
}

function isVariationSelector(string) {
  return typeof string === 'string' && betweenInclusive(string.charCodeAt(0), VARIATION_MODIFIER_START, VARIATION_MODIFIER_END);
}

function isGraphem(string) {
  return typeof string === 'string' && GRAPHEMS.indexOf(string.charCodeAt(0)) !== -1;
}

function isZeroWidthJoiner(string) {
  return typeof string === 'string' && string.charCodeAt(0) === ZWJ;
}

function codePointFromSurrogatePair(pair) {
  var highOffset = pair.charCodeAt(0) - HIGH_SURROGATE_START;
  var lowOffset = pair.charCodeAt(1) - LOW_SURROGATE_START;
  return (highOffset << 10) + lowOffset + 0x10000;
}

function betweenInclusive(value, lower, upper) {
  return value >= lower && value <= upper;
}

function substring(string, start, width) {
  var chars = runes(string);
  if (start === undefined) {
    return string;
  }
  if (start >= chars.length) {
    return '';
  }
  var rest = chars.length - start;
  var stringWidth = width === undefined ? rest : width;
  var endIndex = start + stringWidth;
  if (endIndex > start + rest) {
    endIndex = undefined;
  }
  return chars.slice(start, endIndex).join('');
}

module.exports = runes;
module.exports.substr = substring;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// TinyColor v1.4.1
// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License

(function (Math) {

    var trimLeft = /^\s+/,
        trimRight = /\s+$/,
        tinyCounter = 0,
        mathRound = Math.round,
        mathMin = Math.min,
        mathMax = Math.max,
        mathRandom = Math.random;

    function tinycolor(color, opts) {

        color = color ? color : '';
        opts = opts || {};

        // If input is already a tinycolor, return itself
        if (color instanceof tinycolor) {
            return color;
        }
        // If we are called as a function, call using new instead
        if (!(this instanceof tinycolor)) {
            return new tinycolor(color, opts);
        }

        var rgb = inputToRGB(color);
        this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts.format || rgb.format;
        this._gradientType = opts.gradientType;

        // Don't let the range of [0,255] come back in [0,1].
        // Potentially lose a little bit of precision here, but will fix issues where
        // .5 gets interpreted as half of the total, instead of half of 1
        // If it was supposed to be 128, this was already taken care of by `inputToRgb`
        if (this._r < 1) {
            this._r = mathRound(this._r);
        }
        if (this._g < 1) {
            this._g = mathRound(this._g);
        }
        if (this._b < 1) {
            this._b = mathRound(this._b);
        }

        this._ok = rgb.ok;
        this._tc_id = tinyCounter++;
    }

    tinycolor.prototype = {
        isDark: function isDark() {
            return this.getBrightness() < 128;
        },
        isLight: function isLight() {
            return !this.isDark();
        },
        isValid: function isValid() {
            return this._ok;
        },
        getOriginalInput: function getOriginalInput() {
            return this._originalInput;
        },
        getFormat: function getFormat() {
            return this._format;
        },
        getAlpha: function getAlpha() {
            return this._a;
        },
        getBrightness: function getBrightness() {
            //http://www.w3.org/TR/AERT#color-contrast
            var rgb = this.toRgb();
            return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        },
        getLuminance: function getLuminance() {
            //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
            var rgb = this.toRgb();
            var RsRGB, GsRGB, BsRGB, R, G, B;
            RsRGB = rgb.r / 255;
            GsRGB = rgb.g / 255;
            BsRGB = rgb.b / 255;

            if (RsRGB <= 0.03928) {
                R = RsRGB / 12.92;
            } else {
                R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
            }
            if (GsRGB <= 0.03928) {
                G = GsRGB / 12.92;
            } else {
                G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
            }
            if (BsRGB <= 0.03928) {
                B = BsRGB / 12.92;
            } else {
                B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
            }
            return 0.2126 * R + 0.7152 * G + 0.0722 * B;
        },
        setAlpha: function setAlpha(value) {
            this._a = boundAlpha(value);
            this._roundA = mathRound(100 * this._a) / 100;
            return this;
        },
        toHsv: function toHsv() {
            var hsv = rgbToHsv(this._r, this._g, this._b);
            return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
        },
        toHsvString: function toHsvString() {
            var hsv = rgbToHsv(this._r, this._g, this._b);
            var h = mathRound(hsv.h * 360),
                s = mathRound(hsv.s * 100),
                v = mathRound(hsv.v * 100);
            return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
        },
        toHsl: function toHsl() {
            var hsl = rgbToHsl(this._r, this._g, this._b);
            return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
        },
        toHslString: function toHslString() {
            var hsl = rgbToHsl(this._r, this._g, this._b);
            var h = mathRound(hsl.h * 360),
                s = mathRound(hsl.s * 100),
                l = mathRound(hsl.l * 100);
            return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
        },
        toHex: function toHex(allow3Char) {
            return rgbToHex(this._r, this._g, this._b, allow3Char);
        },
        toHexString: function toHexString(allow3Char) {
            return '#' + this.toHex(allow3Char);
        },
        toHex8: function toHex8(allow4Char) {
            return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
        },
        toHex8String: function toHex8String(allow4Char) {
            return '#' + this.toHex8(allow4Char);
        },
        toRgb: function toRgb() {
            return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
        },
        toRgbString: function toRgbString() {
            return this._a == 1 ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
        },
        toPercentageRgb: function toPercentageRgb() {
            return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
        },
        toPercentageRgbString: function toPercentageRgbString() {
            return this._a == 1 ? "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" : "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
        },
        toName: function toName() {
            if (this._a === 0) {
                return "transparent";
            }

            if (this._a < 1) {
                return false;
            }

            return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
        },
        toFilter: function toFilter(secondColor) {
            var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
            var secondHex8String = hex8String;
            var gradientType = this._gradientType ? "GradientType = 1, " : "";

            if (secondColor) {
                var s = tinycolor(secondColor);
                secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
            }

            return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
        },
        toString: function toString(format) {
            var formatSet = !!format;
            format = format || this._format;

            var formattedString = false;
            var hasAlpha = this._a < 1 && this._a >= 0;
            var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

            if (needsAlphaFormat) {
                // Special case for "transparent", all other non-alpha formats
                // will return rgba when there is transparency.
                if (format === "name" && this._a === 0) {
                    return this.toName();
                }
                return this.toRgbString();
            }
            if (format === "rgb") {
                formattedString = this.toRgbString();
            }
            if (format === "prgb") {
                formattedString = this.toPercentageRgbString();
            }
            if (format === "hex" || format === "hex6") {
                formattedString = this.toHexString();
            }
            if (format === "hex3") {
                formattedString = this.toHexString(true);
            }
            if (format === "hex4") {
                formattedString = this.toHex8String(true);
            }
            if (format === "hex8") {
                formattedString = this.toHex8String();
            }
            if (format === "name") {
                formattedString = this.toName();
            }
            if (format === "hsl") {
                formattedString = this.toHslString();
            }
            if (format === "hsv") {
                formattedString = this.toHsvString();
            }

            return formattedString || this.toHexString();
        },
        clone: function clone() {
            return tinycolor(this.toString());
        },

        _applyModification: function _applyModification(fn, args) {
            var color = fn.apply(null, [this].concat([].slice.call(args)));
            this._r = color._r;
            this._g = color._g;
            this._b = color._b;
            this.setAlpha(color._a);
            return this;
        },
        lighten: function lighten() {
            return this._applyModification(_lighten, arguments);
        },
        brighten: function brighten() {
            return this._applyModification(_brighten, arguments);
        },
        darken: function darken() {
            return this._applyModification(_darken, arguments);
        },
        desaturate: function desaturate() {
            return this._applyModification(_desaturate, arguments);
        },
        saturate: function saturate() {
            return this._applyModification(_saturate, arguments);
        },
        greyscale: function greyscale() {
            return this._applyModification(_greyscale, arguments);
        },
        spin: function spin() {
            return this._applyModification(_spin, arguments);
        },

        _applyCombination: function _applyCombination(fn, args) {
            return fn.apply(null, [this].concat([].slice.call(args)));
        },
        analogous: function analogous() {
            return this._applyCombination(_analogous, arguments);
        },
        complement: function complement() {
            return this._applyCombination(_complement, arguments);
        },
        monochromatic: function monochromatic() {
            return this._applyCombination(_monochromatic, arguments);
        },
        splitcomplement: function splitcomplement() {
            return this._applyCombination(_splitcomplement, arguments);
        },
        triad: function triad() {
            return this._applyCombination(_triad, arguments);
        },
        tetrad: function tetrad() {
            return this._applyCombination(_tetrad, arguments);
        }
    };

    // If input is an object, force 1 into "1.0" to handle ratios properly
    // String input requires "1.0" as input, so 1 will be treated as 1
    tinycolor.fromRatio = function (color, opts) {
        if ((typeof color === "undefined" ? "undefined" : _typeof(color)) == "object") {
            var newColor = {};
            for (var i in color) {
                if (color.hasOwnProperty(i)) {
                    if (i === "a") {
                        newColor[i] = color[i];
                    } else {
                        newColor[i] = convertToPercentage(color[i]);
                    }
                }
            }
            color = newColor;
        }

        return tinycolor(color, opts);
    };

    // Given a string or object, convert that input to RGB
    // Possible string inputs:
    //
    //     "red"
    //     "#f00" or "f00"
    //     "#ff0000" or "ff0000"
    //     "#ff000000" or "ff000000"
    //     "rgb 255 0 0" or "rgb (255, 0, 0)"
    //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
    //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
    //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
    //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
    //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
    //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
    //
    function inputToRGB(color) {

        var rgb = { r: 0, g: 0, b: 0 };
        var a = 1;
        var s = null;
        var v = null;
        var l = null;
        var ok = false;
        var format = false;

        if (typeof color == "string") {
            color = stringInputToObject(color);
        }

        if ((typeof color === "undefined" ? "undefined" : _typeof(color)) == "object") {
            if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
                rgb = rgbToRgb(color.r, color.g, color.b);
                ok = true;
                format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
            } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
                s = convertToPercentage(color.s);
                v = convertToPercentage(color.v);
                rgb = hsvToRgb(color.h, s, v);
                ok = true;
                format = "hsv";
            } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
                s = convertToPercentage(color.s);
                l = convertToPercentage(color.l);
                rgb = hslToRgb(color.h, s, l);
                ok = true;
                format = "hsl";
            }

            if (color.hasOwnProperty("a")) {
                a = color.a;
            }
        }

        a = boundAlpha(a);

        return {
            ok: ok,
            format: color.format || format,
            r: mathMin(255, mathMax(rgb.r, 0)),
            g: mathMin(255, mathMax(rgb.g, 0)),
            b: mathMin(255, mathMax(rgb.b, 0)),
            a: a
        };
    }

    // Conversion Functions
    // --------------------

    // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
    // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

    // `rgbToRgb`
    // Handle bounds / percentage checking to conform to CSS color spec
    // <http://www.w3.org/TR/css3-color/>
    // *Assumes:* r, g, b in [0, 255] or [0, 1]
    // *Returns:* { r, g, b } in [0, 255]
    function rgbToRgb(r, g, b) {
        return {
            r: bound01(r, 255) * 255,
            g: bound01(g, 255) * 255,
            b: bound01(b, 255) * 255
        };
    }

    // `rgbToHsl`
    // Converts an RGB color value to HSL.
    // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
    // *Returns:* { h, s, l } in [0,1]
    function rgbToHsl(r, g, b) {

        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);

        var max = mathMax(r, g, b),
            min = mathMin(r, g, b);
        var h,
            s,
            l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);break;
                case g:
                    h = (b - r) / d + 2;break;
                case b:
                    h = (r - g) / d + 4;break;
            }

            h /= 6;
        }

        return { h: h, s: s, l: l };
    }

    // `hslToRgb`
    // Converts an HSL color value to RGB.
    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
    // *Returns:* { r, g, b } in the set [0, 255]
    function hslToRgb(h, s, l) {
        var r, g, b;

        h = bound01(h, 360);
        s = bound01(s, 100);
        l = bound01(l, 100);

        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return { r: r * 255, g: g * 255, b: b * 255 };
    }

    // `rgbToHsv`
    // Converts an RGB color value to HSV
    // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
    // *Returns:* { h, s, v } in [0,1]
    function rgbToHsv(r, g, b) {

        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);

        var max = mathMax(r, g, b),
            min = mathMin(r, g, b);
        var h,
            s,
            v = max;

        var d = max - min;
        s = max === 0 ? 0 : d / max;

        if (max == min) {
            h = 0; // achromatic
        } else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);break;
                case g:
                    h = (b - r) / d + 2;break;
                case b:
                    h = (r - g) / d + 4;break;
            }
            h /= 6;
        }
        return { h: h, s: s, v: v };
    }

    // `hsvToRgb`
    // Converts an HSV color value to RGB.
    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
    // *Returns:* { r, g, b } in the set [0, 255]
    function hsvToRgb(h, s, v) {

        h = bound01(h, 360) * 6;
        s = bound01(s, 100);
        v = bound01(v, 100);

        var i = Math.floor(h),
            f = h - i,
            p = v * (1 - s),
            q = v * (1 - f * s),
            t = v * (1 - (1 - f) * s),
            mod = i % 6,
            r = [v, q, p, p, t, v][mod],
            g = [t, v, v, q, p, p][mod],
            b = [p, p, t, v, v, q][mod];

        return { r: r * 255, g: g * 255, b: b * 255 };
    }

    // `rgbToHex`
    // Converts an RGB color to hex
    // Assumes r, g, and b are contained in the set [0, 255]
    // Returns a 3 or 6 character hex
    function rgbToHex(r, g, b, allow3Char) {

        var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];

        // Return a 3 character hex if possible
        if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
            return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
        }

        return hex.join("");
    }

    // `rgbaToHex`
    // Converts an RGBA color plus alpha transparency to hex
    // Assumes r, g, b are contained in the set [0, 255] and
    // a in [0, 1]. Returns a 4 or 8 character rgba hex
    function rgbaToHex(r, g, b, a, allow4Char) {

        var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16)), pad2(convertDecimalToHex(a))];

        // Return a 4 character hex if possible
        if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
            return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
        }

        return hex.join("");
    }

    // `rgbaToArgbHex`
    // Converts an RGBA color to an ARGB Hex8 string
    // Rarely used, but required for "toFilter()"
    function rgbaToArgbHex(r, g, b, a) {

        var hex = [pad2(convertDecimalToHex(a)), pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];

        return hex.join("");
    }

    // `equals`
    // Can be called with any tinycolor input
    tinycolor.equals = function (color1, color2) {
        if (!color1 || !color2) {
            return false;
        }
        return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
    };

    tinycolor.random = function () {
        return tinycolor.fromRatio({
            r: mathRandom(),
            g: mathRandom(),
            b: mathRandom()
        });
    };

    // Modification Functions
    // ----------------------
    // Thanks to less.js for some of the basics here
    // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

    function _desaturate(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
    }

    function _saturate(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
    }

    function _greyscale(color) {
        return tinycolor(color).desaturate(100);
    }

    function _lighten(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
    }

    function _brighten(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var rgb = tinycolor(color).toRgb();
        rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
        rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
        rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
        return tinycolor(rgb);
    }

    function _darken(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
    }

    // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
    // Values outside of this range will be wrapped into this range.
    function _spin(color, amount) {
        var hsl = tinycolor(color).toHsl();
        var hue = (hsl.h + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return tinycolor(hsl);
    }

    // Combination Functions
    // ---------------------
    // Thanks to jQuery xColor for some of the ideas behind these
    // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

    function _complement(color) {
        var hsl = tinycolor(color).toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return tinycolor(hsl);
    }

    function _triad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [tinycolor(color), tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })];
    }

    function _tetrad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [tinycolor(color), tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })];
    }

    function _splitcomplement(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [tinycolor(color), tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l })];
    }

    function _analogous(color, results, slices) {
        results = results || 6;
        slices = slices || 30;

        var hsl = tinycolor(color).toHsl();
        var part = 360 / slices;
        var ret = [tinycolor(color)];

        for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
            hsl.h = (hsl.h + part) % 360;
            ret.push(tinycolor(hsl));
        }
        return ret;
    }

    function _monochromatic(color, results) {
        results = results || 6;
        var hsv = tinycolor(color).toHsv();
        var h = hsv.h,
            s = hsv.s,
            v = hsv.v;
        var ret = [];
        var modification = 1 / results;

        while (results--) {
            ret.push(tinycolor({ h: h, s: s, v: v }));
            v = (v + modification) % 1;
        }

        return ret;
    }

    // Utility Functions
    // ---------------------

    tinycolor.mix = function (color1, color2, amount) {
        amount = amount === 0 ? 0 : amount || 50;

        var rgb1 = tinycolor(color1).toRgb();
        var rgb2 = tinycolor(color2).toRgb();

        var p = amount / 100;

        var rgba = {
            r: (rgb2.r - rgb1.r) * p + rgb1.r,
            g: (rgb2.g - rgb1.g) * p + rgb1.g,
            b: (rgb2.b - rgb1.b) * p + rgb1.b,
            a: (rgb2.a - rgb1.a) * p + rgb1.a
        };

        return tinycolor(rgba);
    };

    // Readability Functions
    // ---------------------
    // <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

    // `contrast`
    // Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
    tinycolor.readability = function (color1, color2) {
        var c1 = tinycolor(color1);
        var c2 = tinycolor(color2);
        return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
    };

    // `isReadable`
    // Ensure that foreground and background color combinations meet WCAG2 guidelines.
    // The third argument is an optional Object.
    //      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
    //      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
    // If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

    // *Example*
    //    tinycolor.isReadable("#000", "#111") => false
    //    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
    tinycolor.isReadable = function (color1, color2, wcag2) {
        var readability = tinycolor.readability(color1, color2);
        var wcag2Parms, out;

        out = false;

        wcag2Parms = validateWCAG2Parms(wcag2);
        switch (wcag2Parms.level + wcag2Parms.size) {
            case "AAsmall":
            case "AAAlarge":
                out = readability >= 4.5;
                break;
            case "AAlarge":
                out = readability >= 3;
                break;
            case "AAAsmall":
                out = readability >= 7;
                break;
        }
        return out;
    };

    // `mostReadable`
    // Given a base color and a list of possible foreground or background
    // colors for that base, returns the most readable color.
    // Optionally returns Black or White if the most readable color is unreadable.
    // *Example*
    //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
    //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
    //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
    //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
    tinycolor.mostReadable = function (baseColor, colorList, args) {
        var bestColor = null;
        var bestScore = 0;
        var readability;
        var includeFallbackColors, level, size;
        args = args || {};
        includeFallbackColors = args.includeFallbackColors;
        level = args.level;
        size = args.size;

        for (var i = 0; i < colorList.length; i++) {
            readability = tinycolor.readability(baseColor, colorList[i]);
            if (readability > bestScore) {
                bestScore = readability;
                bestColor = tinycolor(colorList[i]);
            }
        }

        if (tinycolor.isReadable(baseColor, bestColor, { "level": level, "size": size }) || !includeFallbackColors) {
            return bestColor;
        } else {
            args.includeFallbackColors = false;
            return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
        }
    };

    // Big List of Colors
    // ------------------
    // <http://www.w3.org/TR/css3-color/#svg-color>
    var names = tinycolor.names = {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "0ff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000",
        blanchedalmond: "ffebcd",
        blue: "00f",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        burntsienna: "ea7e5d",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "0ff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkgrey: "a9a9a9",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkslategrey: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dimgrey: "696969",
        dodgerblue: "1e90ff",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "f0f",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        grey: "808080",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgray: "d3d3d3",
        lightgreen: "90ee90",
        lightgrey: "d3d3d3",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslategray: "789",
        lightslategrey: "789",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "0f0",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "f0f",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370db",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "db7093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        rebeccapurple: "663399",
        red: "f00",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        slategrey: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        wheat: "f5deb3",
        white: "fff",
        whitesmoke: "f5f5f5",
        yellow: "ff0",
        yellowgreen: "9acd32"
    };

    // Make it easy to access colors via `hexNames[hex]`
    var hexNames = tinycolor.hexNames = flip(names);

    // Utilities
    // ---------

    // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
    function flip(o) {
        var flipped = {};
        for (var i in o) {
            if (o.hasOwnProperty(i)) {
                flipped[o[i]] = i;
            }
        }
        return flipped;
    }

    // Return a valid alpha value [0,1] with all invalid values being set to 1
    function boundAlpha(a) {
        a = parseFloat(a);

        if (isNaN(a) || a < 0 || a > 1) {
            a = 1;
        }

        return a;
    }

    // Take input from [0, n] and return it as [0, 1]
    function bound01(n, max) {
        if (isOnePointZero(n)) {
            n = "100%";
        }

        var processPercent = isPercentage(n);
        n = mathMin(max, mathMax(0, parseFloat(n)));

        // Automatically convert percentage into number
        if (processPercent) {
            n = parseInt(n * max, 10) / 100;
        }

        // Handle floating point rounding errors
        if (Math.abs(n - max) < 0.000001) {
            return 1;
        }

        // Convert into [0, 1] range if it isn't already
        return n % max / parseFloat(max);
    }

    // Force a number between 0 and 1
    function clamp01(val) {
        return mathMin(1, mathMax(0, val));
    }

    // Parse a base-16 hex value into a base-10 integer
    function parseIntFromHex(val) {
        return parseInt(val, 16);
    }

    // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
    // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
    function isOnePointZero(n) {
        return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
    }

    // Check to see if string passed in is a percentage
    function isPercentage(n) {
        return typeof n === "string" && n.indexOf('%') != -1;
    }

    // Force a hex value to have 2 characters
    function pad2(c) {
        return c.length == 1 ? '0' + c : '' + c;
    }

    // Replace a decimal with it's percentage value
    function convertToPercentage(n) {
        if (n <= 1) {
            n = n * 100 + "%";
        }

        return n;
    }

    // Converts a decimal to a hex value
    function convertDecimalToHex(d) {
        return Math.round(parseFloat(d) * 255).toString(16);
    }
    // Converts a hex value to a decimal
    function convertHexToDecimal(h) {
        return parseIntFromHex(h) / 255;
    }

    var matchers = function () {

        // <http://www.w3.org/TR/css3-values/#integers>
        var CSS_INTEGER = "[-\\+]?\\d+%?";

        // <http://www.w3.org/TR/css3-values/#number-value>
        var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

        // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
        var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

        // Actual matching.
        // Parentheses and commas are optional, but not required.
        // Whitespace can take the place of commas or opening paren
        var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
        var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

        return {
            CSS_UNIT: new RegExp(CSS_UNIT),
            rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
            rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
            hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
            hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
            hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
            hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
            hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
        };
    }();

    // `isValidCSSUnit`
    // Take in a single string / number and check to see if it looks like a CSS unit
    // (see `matchers` above for definition).
    function isValidCSSUnit(color) {
        return !!matchers.CSS_UNIT.exec(color);
    }

    // `stringInputToObject`
    // Permissive string parsing.  Take in a number of formats, and output an object
    // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
    function stringInputToObject(color) {

        color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();
        var named = false;
        if (names[color]) {
            color = names[color];
            named = true;
        } else if (color == 'transparent') {
            return { r: 0, g: 0, b: 0, a: 0, format: "name" };
        }

        // Try to match string input using regular expressions.
        // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
        // Just return an object and let the conversion functions handle that.
        // This way the result will be the same whether the tinycolor is initialized with string or object.
        var match;
        if (match = matchers.rgb.exec(color)) {
            return { r: match[1], g: match[2], b: match[3] };
        }
        if (match = matchers.rgba.exec(color)) {
            return { r: match[1], g: match[2], b: match[3], a: match[4] };
        }
        if (match = matchers.hsl.exec(color)) {
            return { h: match[1], s: match[2], l: match[3] };
        }
        if (match = matchers.hsla.exec(color)) {
            return { h: match[1], s: match[2], l: match[3], a: match[4] };
        }
        if (match = matchers.hsv.exec(color)) {
            return { h: match[1], s: match[2], v: match[3] };
        }
        if (match = matchers.hsva.exec(color)) {
            return { h: match[1], s: match[2], v: match[3], a: match[4] };
        }
        if (match = matchers.hex8.exec(color)) {
            return {
                r: parseIntFromHex(match[1]),
                g: parseIntFromHex(match[2]),
                b: parseIntFromHex(match[3]),
                a: convertHexToDecimal(match[4]),
                format: named ? "name" : "hex8"
            };
        }
        if (match = matchers.hex6.exec(color)) {
            return {
                r: parseIntFromHex(match[1]),
                g: parseIntFromHex(match[2]),
                b: parseIntFromHex(match[3]),
                format: named ? "name" : "hex"
            };
        }
        if (match = matchers.hex4.exec(color)) {
            return {
                r: parseIntFromHex(match[1] + '' + match[1]),
                g: parseIntFromHex(match[2] + '' + match[2]),
                b: parseIntFromHex(match[3] + '' + match[3]),
                a: convertHexToDecimal(match[4] + '' + match[4]),
                format: named ? "name" : "hex8"
            };
        }
        if (match = matchers.hex3.exec(color)) {
            return {
                r: parseIntFromHex(match[1] + '' + match[1]),
                g: parseIntFromHex(match[2] + '' + match[2]),
                b: parseIntFromHex(match[3] + '' + match[3]),
                format: named ? "name" : "hex"
            };
        }

        return false;
    }

    function validateWCAG2Parms(parms) {
        // return valid WCAG2 parms for isReadable.
        // If input parms are invalid, return {"level":"AA", "size":"small"}
        var level, size;
        parms = parms || { "level": "AA", "size": "small" };
        level = (parms.level || "AA").toUpperCase();
        size = (parms.size || "small").toLowerCase();
        if (level !== "AA" && level !== "AAA") {
            level = "AA";
        }
        if (size !== "small" && size !== "large") {
            size = "small";
        }
        return { "level": level, "size": size };
    }

    // Node: Export function
    if (typeof module !== "undefined" && module.exports) {
        module.exports = tinycolor;
    }
    // AMD/requirejs: Define the module
    else if (true) {
            !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                return tinycolor;
            }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        }
        // Browser: Expose to window
        else {
                window.tinycolor = tinycolor;
            }
})(Math);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OpType;
(function (OpType) {
    OpType[OpType["Insert"] = 1] = "Insert";
    OpType[OpType["Delete"] = 2] = "Delete";
})(OpType = exports.OpType || (exports.OpType = {}));
function isDocOp(object) {
    return 'opType' in object;
}
exports.isDocOp = isDocOp;
function isCursorOp(object) {
    return 'range' in object;
}
exports.isCursorOp = isCursorOp;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OpType;
(function (OpType) {
    OpType[OpType["Insert"] = 1] = "Insert";
    OpType[OpType["Delete"] = 2] = "Delete";
})(OpType = exports.OpType || (exports.OpType = {}));
function isDocOp(object) {
    return 'ident' in object;
}
exports.isDocOp = isDocOp;
function isCursorOp(object) {
    return 'position' in object;
}
exports.isCursorOp = isCursorOp;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * This module describes a generic Logoot model.
 *
 * See Stephane Weiss, Pascal Urso, Pascal Molli. Logoot: a P2P collaborative editing system.
 * [Research Report] RR-6713, INRIA. 2008, pp.13
 */
Object.defineProperty(exports, "__esModule", { value: true });
var runes = __webpack_require__(6);
var Ident = (function () {
    function Ident(n, siteId) {
        this.n = n;
        this.siteId = siteId;
    }
    Ident.fromWire = function (object) {
        return new Ident(object.n, object.siteId);
    };
    Ident.prototype.toWire = function () {
        return { n: this.n, siteId: this.siteId };
    };
    Ident.prototype.compare = function (that) {
        if (this.n > that.n)
            return 1;
        if (this.n < that.n)
            return -1;
        if (this.siteId > that.siteId)
            return 1;
        if (this.siteId < that.siteId)
            return -1;
        return 0;
    };
    Ident.prototype.lt = function (that) {
        return this.compare(that) === -1;
    };
    Ident.prototype.toString = function () {
        return '(' + this.n + ', ' + this.siteId + ')';
    };
    return Ident;
}());
exports.Ident = Ident;
var Position = (function () {
    function Position(idents) {
        this.idents = idents;
    }
    Position.fromWire = function (object) {
        var is = [];
        for (var _i = 0, object_1 = object; _i < object_1.length; _i++) {
            var i = object_1[_i];
            is.push(Ident.fromWire(i));
        }
        return new Position(is);
    };
    Position.prototype.toWire = function () {
        var is = [];
        for (var _i = 0, _a = this.idents; _i < _a.length; _i++) {
            var i = _a[_i];
            is.push(i.toWire());
        }
        return is;
    };
    Object.defineProperty(Position.prototype, "length", {
        get: function () {
            return this.idents.length;
        },
        enumerable: true,
        configurable: true
    });
    Position.prototype.i = function (i) {
        return this.idents[i];
    };
    Position.prototype.slice = function (i) {
        return new Position(this.idents.slice(i));
    };
    Position.prototype.compare = function (that) {
        if (this.length === 0 && that.length === 0)
            return 0;
        if (this.length === 0)
            return -1;
        if (that.length === 0)
            return 1;
        switch (this.i(0).compare(that.i(0))) {
            case 1:
                return 1;
            case -1:
                return -1;
            case 0:
                return this.slice(1).compare(that.slice(1));
        }
        throw new Error('Impossible');
    };
    Position.prototype.toString = function () {
        return this.idents.toString();
    };
    Position.between = function (prevPos, nextPos, siteId) {
        return new Position(Position.genIdentList(siteId, prevPos.idents, nextPos.idents));
    };
    Position.genIdentList = function (siteId, prevPos, nextPos) {
        prevPos = prevPos.length > 0 ? prevPos : Logoot.min.position.idents;
        nextPos = nextPos.length > 0 ? nextPos : Logoot.max.position.idents;
        var prevHead = prevPos[0];
        var nextHead = nextPos[0];
        var prevInt = prevHead.n;
        var nextInt = nextHead.n;
        var prevSiteId = prevHead.siteId;
        switch (prevHead.compare(nextHead)) {
            case -1: {
                var diff = nextInt - prevInt;
                if (diff > 1) {
                    return [new Ident(this.genIdentIntBetween(prevInt, nextInt), siteId)];
                }
                else if (diff === 1 && siteId > prevSiteId) {
                    return [new Ident(prevInt, siteId)];
                }
                return [prevHead].concat(this.genIdentList(siteId, prevPos.slice(1), []));
            }
            case 0: {
                return [prevHead].concat(this.genIdentList(siteId, prevPos.slice(1), nextPos.slice(1)));
            }
            case 1: {
                throw new Error('"Next" position was less than "previous" position.');
            }
        }
        throw new Error('Impossible');
    };
    Position.genIdentIntBetween = function (min, max) {
        // We might do something more interesting later
        return min + 1;
    };
    return Position;
}());
exports.Position = Position;
var AtomIdent = (function () {
    function AtomIdent(position, clock) {
        this.position = position;
        this.clock = clock;
    }
    AtomIdent.fromWire = function (object) {
        return new AtomIdent(Position.fromWire(object.position), object.clock);
    };
    AtomIdent.prototype.toWire = function () {
        return { position: this.position.toWire(), clock: this.clock };
    };
    AtomIdent.between = function (prevAtomIdent, nextAtomIdent, siteId, clock) {
        return new AtomIdent(Position.between(prevAtomIdent.position, nextAtomIdent.position, siteId), clock);
    };
    AtomIdent.prototype.compare = function (that) {
        return this.position.compare(that.position);
    };
    AtomIdent.prototype.lt = function (that) {
        return this.compare(that) === -1;
    };
    AtomIdent.prototype.toString = function () {
        return '{' + this.position + ',' + this.clock + '}';
    };
    return AtomIdent;
}());
exports.AtomIdent = AtomIdent;
var Atom = (function () {
    function Atom(ident, rune) {
        this.ident = ident;
        this.rune = rune;
        var isSingleRune = runes(rune).length === 1;
        if (!isSingleRune) {
            throw new Error('Atom content must be single unicode character');
        }
    }
    Atom.fromWire = function (ident, content) {
        return new Atom(AtomIdent.fromWire(ident), content.text);
    };
    Atom.prototype.compare = function (that) {
        return this.ident.compare(that.ident);
    };
    Atom.prototype.lt = function (that) {
        return this.compare(that) === -1;
    };
    Atom.prototype.toString = function () {
        return 'Atom(' + this.ident + ')';
    };
    return Atom;
}());
exports.Atom = Atom;
var MAX_POS = 32767;
exports.ABS_MIN_ATOM_IDENT = new AtomIdent(new Position([new Ident(0, 0)]), 0);
exports.ABS_MAX_ATOM_IDENT = new AtomIdent(new Position([new Ident(MAX_POS, 0)]), 1);
var Logoot = (function () {
    function Logoot(siteId) {
        this.seq = [new Atom(Logoot.min, ' '), new Atom(Logoot.max, ' ')];
        this.siteId = siteId;
        this._clock = 0;
    }
    Logoot.prototype._insertText = function (index, content) {
        var atoms = [];
        var atomBeforeTextBlock = this.seq[index];
        var atomAfterTextBlock = this.seq[index + 1];
        var atomJustInserted;
        var runesToInsert = runes(content);
        for (var _i = 0, runesToInsert_1 = runesToInsert; _i < runesToInsert_1.length; _i++) {
            var rune = runesToInsert_1[_i];
            var prevAtom = atomJustInserted || atomBeforeTextBlock;
            var nextAtom = atomAfterTextBlock;
            var newAtom = this.newAtomBetween(prevAtom, nextAtom, rune);
            atoms.push(newAtom);
            atomJustInserted = newAtom;
        }
        (_a = this.seq).splice.apply(_a, [index + 1, 0].concat(atoms));
        return atoms;
        var _a;
    };
    /**
     * Insert atoms into the Logoot document model.
     * Returns a list of indices describing where those atoms were inserted
     * in the text domain (in the same order as the atoms were given.)
     *
     * N.B. Atoms might not be inserted at all in the case that the atom is
     * already in the Logoot model. This can happen when insert operations are
     * duplicated. In this case the index returned for that atom will be -1.
     *
     * @param {logoot.Atom[]} - Array of atoms to be inserted
     *
     * @return {number[]} - A list of indicies describing where the corresponding
     * atom was inserted. If an atom is not inserted the corresponding index will
     * be -1.
     */
    Logoot.prototype.insertAtoms = function (atoms) {
        var initialAtomOrder = atoms.slice();
        // Check that no atoms are duplicated in this batch. We support idempotency
        // but not within an operation batch.
        var existingAtoms = new Set();
        for (var _i = 0, atoms_1 = atoms; _i < atoms_1.length; _i++) {
            var atom = atoms_1[_i];
            var atomString = atom.toString();
            if (existingAtoms.has(atomString)) {
                throw new Error('Duplicate atoms found in single batch');
            }
            existingAtoms.add(atomString);
        }
        // Insert atoms in correct place in sequence.
        // This is done by linearly scanning through the sorted incoming atoms
        // and existing sequence merging into a new, sorted, sequence.
        atoms.sort(function (a, b) { return a.compare(b); });
        var atomsPointer = 0;
        var seqPointer = 0;
        var mergedSeq = [];
        while (atomsPointer < atoms.length || seqPointer < this.seq.length) {
            var atomsHead = atoms[atomsPointer];
            var seqHead = this.seq[seqPointer];
            if (!seqHead || (atomsHead && atomsHead.lt(seqHead))) {
                mergedSeq.push(atomsHead);
                atomsPointer++;
            }
            else {
                mergedSeq.push(seqHead);
                seqPointer++;
            }
        }
        // Deduplicate atoms. We need to do this because insert operations can
        // be duplicated on the wire and we need to support idempotency.
        var deduplicatedSeq = [];
        var duplicatedAtoms = new Set();
        for (var i = 0; i < mergedSeq.length; i++) {
            var currentAtom = mergedSeq[i];
            var isLastAtom = i === mergedSeq.length - 1;
            if (isLastAtom) {
                deduplicatedSeq.push(currentAtom);
                break;
            }
            var nextAtom = mergedSeq[i + 1];
            var currentAtomDuplicated = currentAtom.toString() === nextAtom.toString();
            if (currentAtomDuplicated) {
                duplicatedAtoms.add(currentAtom.toString());
            }
            else {
                deduplicatedSeq.push(currentAtom);
            }
        }
        // Generate index list.
        // Now that we have the new atoms in the correct places, we need to
        // generate a list of indices denoting where each atom was placed.
        // If the atom was removed in the deduplication process, the index should
        // be -1.
        var indexMap = {};
        for (var i = 0; i < deduplicatedSeq.length; i++) {
            var atom = deduplicatedSeq[i];
            indexMap[atom.toString()] = i - 1;
        }
        var indices = initialAtomOrder.map(function (atom) {
            if (duplicatedAtoms.has(atom.toString())) {
                return -1;
            }
            else {
                return indexMap[atom.toString()];
            }
        });
        this.seq = deduplicatedSeq;
        return indices;
    };
    Logoot.prototype.deleteAtoms = function (idents) {
        if (idents.length === 0) {
            return [];
        }
        var initialIdentOrder = idents.slice();
        idents.sort(function (a, b) { return a.compare(b); });
        var deletePointer = 0;
        var seqPointer = 0;
        var indices = [];
        var newSeq = [];
        // When deleting atoms, we don't actually use the initial logoot operation
        // for anything so rather than keeping track of a map of logootOp -
        // character index we can just keep track of the atoms we want to delete
        while (deletePointer < idents.length || seqPointer < this.seq.length) {
            var identToDelete = idents[deletePointer];
            var atomToCheck = this.seq[seqPointer];
            if (identToDelete && identToDelete.compare(atomToCheck.ident) === 0) {
                indices.push(seqPointer - indices.length - 1);
                deletePointer++;
                seqPointer++;
            }
            else if (identToDelete &&
                identToDelete.compare(atomToCheck.ident) === -1) {
                // If the atom we're trying to delete is LESS than the current atom in
                // the sequence it means we're past the point at which this atom would
                // have been if it existed, without deleting it. This means that the
                // atom we're trying to delete does not exist in this logoot doc. In
                // this scenario we want to advance to the next atom to delete, but not
                // move on the seqPointer
                deletePointer++;
            }
            else {
                newSeq.push(atomToCheck);
                seqPointer++;
            }
        }
        this.seq = newSeq;
        return indices;
    };
    Logoot.prototype.initialContent = function (content) {
        var runesToInsert = runes(content);
        var atoms = [];
        for (var i = 0; i < runesToInsert.length; i++) {
            var position = new Position([
                new Ident(MAX_POS - 1, 0),
                new Ident(i, 0)
            ]);
            var siteId = 2 + i;
            var content_1 = runesToInsert[i];
            atoms.push(new Atom(new AtomIdent(position, siteId), content_1));
        }
        this.insertAtoms(atoms);
    };
    Logoot.prototype.newAtomBetween = function (x, y, content) {
        return new Atom(AtomIdent.between(x.ident, y.ident, this.siteId, this.clock), content);
    };
    Logoot.prototype.getSurroundingAtoms = function (index) {
        var nullAtomOffset = 1;
        return [this.seq[index], this.seq[index + nullAtomOffset]];
    };
    Logoot.prototype.getAtomsToDelete = function (index, length) {
        var nullAtomOffset = 1;
        return this.seq.slice(index + nullAtomOffset, index + nullAtomOffset + length);
    };
    Object.defineProperty(Logoot.prototype, "clock", {
        get: function () {
            return this._clock++;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Logoot.prototype, "docLength", {
        get: function () {
            return this.seq.length - 2;
        },
        enumerable: true,
        configurable: true
    });
    Logoot.prototype.debugStr = function () {
        var out = '';
        for (var _i = 0, _a = this.seq; _i < _a.length; _i++) {
            var atom = _a[_i];
            out += atom.toString() + '\n';
        }
        return out;
    };
    Logoot.prototype.toJSON = function () {
        return JSON.stringify(this.seq);
    };
    Logoot.min = exports.ABS_MIN_ATOM_IDENT;
    Logoot.max = exports.ABS_MAX_ATOM_IDENT;
    return Logoot;
}());
exports.default = Logoot;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function webpackUniversalModuleDefinition(root, factory) {
    if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') exports["PusherPlatform"] = factory();else root["PusherPlatform"] = factory();
})(this, function () {
    return (/******/function (modules) {
            // webpackBootstrap
            /******/ // The module cache
            /******/var installedModules = {};
            /******/
            /******/ // The require function
            /******/function __webpack_require__(moduleId) {
                /******/
                /******/ // Check if module is in cache
                /******/if (installedModules[moduleId]) {
                    /******/return installedModules[moduleId].exports;
                    /******/
                }
                /******/ // Create a new module (and put it into the cache)
                /******/var module = installedModules[moduleId] = {
                    /******/i: moduleId,
                    /******/l: false,
                    /******/exports: {}
                    /******/ };
                /******/
                /******/ // Execute the module function
                /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                /******/
                /******/ // Flag the module as loaded
                /******/module.l = true;
                /******/
                /******/ // Return the exports of the module
                /******/return module.exports;
                /******/
            }
            /******/
            /******/
            /******/ // expose the modules object (__webpack_modules__)
            /******/__webpack_require__.m = modules;
            /******/
            /******/ // expose the module cache
            /******/__webpack_require__.c = installedModules;
            /******/
            /******/ // identity function for calling harmony imports with the correct context
            /******/__webpack_require__.i = function (value) {
                return value;
            };
            /******/
            /******/ // define getter function for harmony exports
            /******/__webpack_require__.d = function (exports, name, getter) {
                /******/if (!__webpack_require__.o(exports, name)) {
                    /******/Object.defineProperty(exports, name, {
                        /******/configurable: false,
                        /******/enumerable: true,
                        /******/get: getter
                        /******/ });
                    /******/
                }
                /******/
            };
            /******/
            /******/ // getDefaultExport function for compatibility with non-harmony modules
            /******/__webpack_require__.n = function (module) {
                /******/var getter = module && module.__esModule ?
                /******/function getDefault() {
                    return module['default'];
                } :
                /******/function getModuleExports() {
                    return module;
                };
                /******/__webpack_require__.d(getter, 'a', getter);
                /******/return getter;
                /******/
            };
            /******/
            /******/ // Object.prototype.hasOwnProperty.call
            /******/__webpack_require__.o = function (object, property) {
                return Object.prototype.hasOwnProperty.call(object, property);
            };
            /******/
            /******/ // __webpack_public_path__
            /******/__webpack_require__.p = "";
            /******/
            /******/ // Load entry module and return exports
            /******/return __webpack_require__(__webpack_require__.s = 11);
            /******/
        }(
        /************************************************************************/
        /******/[
        /* 0 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            function responseToHeadersObject(headerStr) {
                var headers = {};
                if (!headerStr) {
                    return headers;
                }
                var headerPairs = headerStr.split('\r\n');
                for (var i = 0; i < headerPairs.length; i++) {
                    var headerPair = headerPairs[i];
                    var index = headerPair.indexOf(': ');
                    if (index > 0) {
                        var key = headerPair.substring(0, index);
                        var val = headerPair.substring(index + 2);
                        headers[key] = val;
                    }
                }
                return headers;
            }
            exports.responseToHeadersObject = responseToHeadersObject;
            var ErrorResponse = /** @class */function () {
                function ErrorResponse(statusCode, headers, info) {
                    this.statusCode = statusCode;
                    this.headers = headers;
                    this.info = info;
                }
                ErrorResponse.fromXHR = function (xhr) {
                    return new ErrorResponse(xhr.status, responseToHeadersObject(xhr.getAllResponseHeaders()), xhr.responseText);
                };
                return ErrorResponse;
            }();
            exports.ErrorResponse = ErrorResponse;
            var NetworkError = /** @class */function () {
                function NetworkError(error) {
                    this.error = error;
                }
                return NetworkError;
            }();
            exports.NetworkError = NetworkError;
            // Follows https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
            var XhrReadyState;
            (function (XhrReadyState) {
                XhrReadyState[XhrReadyState["UNSENT"] = 0] = "UNSENT";
                XhrReadyState[XhrReadyState["OPENED"] = 1] = "OPENED";
                XhrReadyState[XhrReadyState["HEADERS_RECEIVED"] = 2] = "HEADERS_RECEIVED";
                XhrReadyState[XhrReadyState["LOADING"] = 3] = "LOADING";
                XhrReadyState[XhrReadyState["DONE"] = 4] = "DONE";
            })(XhrReadyState = exports.XhrReadyState || (exports.XhrReadyState = {}));

            /***/
        },
        /* 1 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            var LogLevel;
            (function (LogLevel) {
                LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
                LogLevel[LogLevel["DEBUG"] = 2] = "DEBUG";
                LogLevel[LogLevel["INFO"] = 3] = "INFO";
                LogLevel[LogLevel["WARNING"] = 4] = "WARNING";
                LogLevel[LogLevel["ERROR"] = 5] = "ERROR";
            })(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
            /**
             * Default implementation of the Logger. Wraps standards console calls.
             * Logs only calls that are at or above the threshold (verbose/debug/info/warn/error)
             * If error is passed, it will append the message to the error object.
             */
            var ConsoleLogger = /** @class */function () {
                function ConsoleLogger(threshold) {
                    if (threshold === void 0) {
                        threshold = 2;
                    }
                    this.threshold = threshold;
                }
                ConsoleLogger.prototype.log = function (logFunction, level, message, error) {
                    if (level >= this.threshold) {
                        var loggerSignature = "Logger." + LogLevel[level];
                        if (error) {
                            console.group();
                            logFunction(loggerSignature + ": " + message);
                            logFunction(error);
                            console.groupEnd();
                        } else {
                            logFunction(loggerSignature + ": " + message);
                        }
                    }
                };
                ConsoleLogger.prototype.verbose = function (message, error) {
                    this.log(console.log, LogLevel.VERBOSE, message, error);
                };
                ConsoleLogger.prototype.debug = function (message, error) {
                    this.log(console.log, LogLevel.DEBUG, message, error);
                };
                ConsoleLogger.prototype.info = function (message, error) {
                    this.log(console.info, LogLevel.INFO, message, error);
                };
                ConsoleLogger.prototype.warn = function (message, error) {
                    this.log(console.warn, LogLevel.WARNING, message, error);
                };
                ConsoleLogger.prototype.error = function (message, error) {
                    this.log(console.error, LogLevel.ERROR, message, error);
                };
                return ConsoleLogger;
            }();
            exports.ConsoleLogger = ConsoleLogger;
            var EmptyLogger = /** @class */function () {
                function EmptyLogger() {}
                EmptyLogger.prototype.verbose = function (message, error) {};
                ;
                EmptyLogger.prototype.debug = function (message, error) {};
                ;
                EmptyLogger.prototype.info = function (message, error) {};
                ;
                EmptyLogger.prototype.warn = function (message, error) {};
                ;
                EmptyLogger.prototype.error = function (message, error) {};
                ;
                return EmptyLogger;
            }();
            exports.EmptyLogger = EmptyLogger;

            /***/
        },
        /* 2 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            var network_1 = __webpack_require__(0);
            exports.createRetryStrategyOptionsOrDefault = function (options) {
                var initialTimeoutMillis = options.initialTimeoutMillis || 1000;
                var maxTimeoutMillis = options.maxTimeoutMillis || 5000;
                var limit = -1;
                if (options.limit != undefined && options.limit != null) {
                    limit = options.limit;
                }
                var increaseTimeout;
                if (options.increaseTimeout) {
                    increaseTimeout = options.increaseTimeout;
                } else {
                    increaseTimeout = function increaseTimeout(currentTimeout) {
                        if (currentTimeout * 2 > maxTimeoutMillis) {
                            return maxTimeoutMillis;
                        } else {
                            return currentTimeout * 2;
                        }
                    };
                }
                return {
                    initialTimeoutMillis: initialTimeoutMillis,
                    maxTimeoutMillis: maxTimeoutMillis,
                    limit: limit,
                    increaseTimeout: increaseTimeout
                };
            };
            var Retry = /** @class */function () {
                function Retry(waitTimeMillis) {
                    this.waitTimeMillis = waitTimeMillis;
                }
                return Retry;
            }();
            exports.Retry = Retry;
            var DoNotRetry = /** @class */function () {
                function DoNotRetry(error) {
                    this.error = error;
                }
                return DoNotRetry;
            }();
            exports.DoNotRetry = DoNotRetry;
            var requestMethodIsSafe = function requestMethodIsSafe(method) {
                method = method.toUpperCase();
                return method === 'GET' || method === 'HEAD' || method === 'OPTIONS' || method === 'SUBSCRIBE';
            };
            var RetryResolution = /** @class */function () {
                function RetryResolution(options, logger, retryUnsafeRequests) {
                    this.options = options;
                    this.logger = logger;
                    this.retryUnsafeRequests = retryUnsafeRequests;
                    this.currentRetryCount = 0;
                    this.initialTimeoutMillis = options.initialTimeoutMillis;
                    this.maxTimeoutMillis = options.maxTimeoutMillis;
                    this.limit = options.limit;
                    this.increaseTimeoutFunction = options.increaseTimeout;
                    this.currentBackoffMillis = this.initialTimeoutMillis;
                }
                RetryResolution.prototype.attemptRetry = function (error) {
                    this.logger.verbose(this.constructor.name + ":  Error received", error);
                    if (this.currentRetryCount >= this.limit && this.limit >= 0) {
                        this.logger.verbose(this.constructor.name + ":  Retry count is over the maximum limit: " + this.limit);
                        return new DoNotRetry(error);
                    }
                    if (error instanceof network_1.ErrorResponse && error.headers['Retry-After']) {
                        this.logger.verbose(this.constructor.name + ":  Retry-After header is present, retrying in " + error.headers['Retry-After']);
                        return new Retry(parseInt(error.headers['Retry-After']) * 1000);
                    }
                    if (error instanceof network_1.NetworkError || error instanceof network_1.ErrorResponse && requestMethodIsSafe(error.headers["Request-Method"]) || this.retryUnsafeRequests) {
                        return this.shouldSafeRetry(error);
                    }
                    if (error instanceof network_1.NetworkError) return this.shouldSafeRetry(error);
                    this.logger.verbose(this.constructor.name + ": Error is not retryable", error);
                    return new DoNotRetry(error);
                };
                RetryResolution.prototype.shouldSafeRetry = function (error) {
                    if (error instanceof network_1.NetworkError) {
                        this.logger.verbose(this.constructor.name + ": It's a Network Error, will retry", error);
                        return new Retry(this.calulateMillisToRetry());
                    } else if (error instanceof network_1.ErrorResponse) {
                        if (error.statusCode >= 500 && error.statusCode < 600) {
                            this.logger.verbose(this.constructor.name + ": Error 5xx, will retry");
                            return new Retry(this.calulateMillisToRetry());
                        }
                    }
                    this.logger.verbose(this.constructor.name + ": Error is not retryable", error);
                    return new DoNotRetry(error);
                };
                RetryResolution.prototype.calulateMillisToRetry = function () {
                    this.currentBackoffMillis = this.increaseTimeoutFunction(this.currentBackoffMillis);
                    this.logger.verbose(this.constructor.name + ": Retrying in " + this.currentBackoffMillis + "ms");
                    return this.currentBackoffMillis;
                };
                return RetryResolution;
            }();
            exports.RetryResolution = RetryResolution;

            /***/
        },
        /* 3 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            var retrying_subscription_1 = __webpack_require__(6);
            var resuming_subscription_1 = __webpack_require__(5);
            var request_1 = __webpack_require__(4);
            var logger_1 = __webpack_require__(1);
            var subscription_1 = __webpack_require__(13);
            var token_providing_subscription_1 = __webpack_require__(7);
            var transports_1 = __webpack_require__(8);
            var subscribe_strategy_1 = __webpack_require__(12);
            var websocket_1 = __webpack_require__(15);
            var http_1 = __webpack_require__(14);
            var BaseClient = /** @class */function () {
                function BaseClient(options) {
                    this.options = options;
                    this.host = options.host.replace(/(\/)+$/, '');
                    this.logger = options.logger || new logger_1.ConsoleLogger();
                    this.websocketTransport = new websocket_1.default(this.host);
                    this.httpTransport = new http_1.default(this.host);
                }
                BaseClient.prototype.request = function (options, tokenProvider, tokenParams) {
                    var _this = this;
                    if (tokenProvider) {
                        return tokenProvider.fetchToken(tokenParams).then(function (token) {
                            options.headers['Authorization'] = "Bearer " + token;
                            return request_1.executeNetworkRequest(function () {
                                return _this.httpTransport.request(options);
                            }, options);
                        }).catch(function (error) {
                            console.log(error);
                        });
                    } else {
                        return request_1.executeNetworkRequest(function () {
                            return _this.httpTransport.request(options);
                        }, options);
                    }
                };
                BaseClient.prototype.subscribeResuming = function (path, headers, listeners, retryStrategyOptions, initialEventId, tokenProvider) {
                    listeners = subscription_1.replaceMissingListenersWithNoOps(listeners);
                    var subscribeStrategyListeners = subscribe_strategy_1.subscribeStrategyListenersFromSubscriptionListeners(listeners);
                    var subscriptionStrategy = resuming_subscription_1.createResumingStrategy(retryStrategyOptions, initialEventId, token_providing_subscription_1.createTokenProvidingStrategy(tokenProvider, transports_1.createTransportStrategy(path, this.websocketTransport, this.logger), this.logger), this.logger);
                    var opened = false;
                    return subscriptionStrategy({
                        onOpen: function onOpen(headers) {
                            if (!opened) {
                                opened = true;
                                listeners.onOpen(headers);
                            }
                            listeners.onSubscribe();
                        },
                        onRetrying: subscribeStrategyListeners.onRetrying,
                        onError: subscribeStrategyListeners.onError,
                        onEvent: subscribeStrategyListeners.onEvent,
                        onEnd: subscribeStrategyListeners.onEnd
                    }, headers);
                };
                BaseClient.prototype.subscribeNonResuming = function (path, headers, listeners, retryStrategyOptions, tokenProvider) {
                    listeners = subscription_1.replaceMissingListenersWithNoOps(listeners);
                    var subscribeStrategyListeners = subscribe_strategy_1.subscribeStrategyListenersFromSubscriptionListeners(listeners);
                    var subscriptionStrategy = retrying_subscription_1.createRetryingStrategy(retryStrategyOptions, token_providing_subscription_1.createTokenProvidingStrategy(tokenProvider, transports_1.createTransportStrategy(path, this.websocketTransport, this.logger), this.logger), this.logger);
                    var opened = false;
                    return subscriptionStrategy({
                        onOpen: function onOpen(headers) {
                            if (!opened) {
                                opened = true;
                                listeners.onOpen(headers);
                            }
                            listeners.onSubscribe();
                        },
                        onRetrying: subscribeStrategyListeners.onRetrying,
                        onError: subscribeStrategyListeners.onError,
                        onEvent: subscribeStrategyListeners.onEvent,
                        onEnd: subscribeStrategyListeners.onEnd
                    }, headers);
                };
                return BaseClient;
            }();
            exports.BaseClient = BaseClient;

            /***/
        },
        /* 4 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            var network_1 = __webpack_require__(0);
            var PCancelable = __webpack_require__(10);
            function executeNetworkRequest(createXhr, options) {
                var cancelablePromise = new PCancelable(function (onCancel, resolve, reject) {
                    var xhr = createXhr();
                    onCancel(function () {
                        xhr.abort();
                    });
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4) {
                            if (xhr.status >= 200 && xhr.status < 300) {
                                resolve(xhr.response);
                            } else if (xhr.status !== 0) {
                                reject(network_1.ErrorResponse.fromXHR(xhr));
                            } else {
                                reject(new network_1.NetworkError("No Connection"));
                            }
                        }
                    };
                    xhr.send(JSON.stringify(options.body));
                });
                return cancelablePromise;
            }
            exports.executeNetworkRequest = executeNetworkRequest;

            /***/
        },
        /* 5 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            var retry_strategy_1 = __webpack_require__(2);
            var network_1 = __webpack_require__(0);
            exports.createResumingStrategy = function (retryOptions, initialEventId, nextSubscribeStrategy, logger) {
                retryOptions = retry_strategy_1.createRetryStrategyOptionsOrDefault(retryOptions);
                var retryResolution = new retry_strategy_1.RetryResolution(retryOptions, logger);
                var ResumingSubscription = /** @class */function () {
                    function ResumingSubscription(listeners, headers) {
                        var _this = this;
                        this.onTransition = function (newState) {
                            _this.state = newState;
                        };
                        this.unsubscribe = function () {
                            _this.state.unsubscribe();
                        };
                        var OpeningSubscriptionState = /** @class */function () {
                            function OpeningSubscriptionState(onTransition) {
                                var _this = this;
                                this.onTransition = onTransition;
                                var lastEventId = initialEventId;
                                logger.verbose("ResumingSubscription: transitioning to OpeningSubscriptionState");
                                if (lastEventId) {
                                    headers["Last-Event-Id"] = lastEventId;
                                    logger.verbose("ResumingSubscription: initialEventId is " + lastEventId);
                                }
                                this.underlyingSubscription = nextSubscribeStrategy({
                                    onOpen: function onOpen(headers) {
                                        onTransition(new OpenSubscriptionState(headers, _this.underlyingSubscription, onTransition));
                                    },
                                    onRetrying: listeners.onRetrying,
                                    onError: function onError(error) {
                                        onTransition(new ResumingSubscriptionState(error, lastEventId, onTransition));
                                    },
                                    onEvent: function onEvent(event) {
                                        lastEventId = event.eventId;
                                        listeners.onEvent(event);
                                    },
                                    onEnd: function onEnd(error) {
                                        onTransition(new EndedSubscriptionState(error));
                                    }
                                }, headers);
                            }
                            OpeningSubscriptionState.prototype.unsubscribe = function () {
                                this.onTransition(new EndingSubscriptionState());
                                this.underlyingSubscription.unsubscribe();
                            };
                            return OpeningSubscriptionState;
                        }();
                        var OpenSubscriptionState = /** @class */function () {
                            function OpenSubscriptionState(headers, underlyingSubscription, onTransition) {
                                this.underlyingSubscription = underlyingSubscription;
                                this.onTransition = onTransition;
                                logger.verbose("ResumingSubscription: transitioning to OpenSubscriptionState");
                                listeners.onOpen(headers);
                            }
                            OpenSubscriptionState.prototype.unsubscribe = function () {
                                this.onTransition(new EndingSubscriptionState());
                                this.underlyingSubscription.unsubscribe();
                            };
                            return OpenSubscriptionState;
                        }();
                        var ResumingSubscriptionState = /** @class */function () {
                            function ResumingSubscriptionState(error, lastEventId, onTransition) {
                                var _this = this;
                                this.onTransition = onTransition;
                                logger.verbose("ResumingSubscription: transitioning to ResumingSubscriptionState");
                                var executeSubscriptionOnce = function executeSubscriptionOnce(error, lastEventId) {
                                    listeners.onRetrying();
                                    var resolveError = function resolveError(error) {
                                        if (error instanceof network_1.ErrorResponse) {
                                            error.headers["Request-Method"] = "SUBSCRIBE";
                                        }
                                        return retryResolution.attemptRetry(error);
                                    };
                                    var errorResolution = resolveError(error);
                                    if (errorResolution instanceof retry_strategy_1.Retry) {
                                        _this.timeout = window.setTimeout(function () {
                                            executeNextSubscribeStrategy(lastEventId);
                                        }, errorResolution.waitTimeMillis);
                                    } else {
                                        onTransition(new FailedSubscriptionState(error));
                                    }
                                };
                                var executeNextSubscribeStrategy = function executeNextSubscribeStrategy(lastEventId) {
                                    logger.verbose("ResumingSubscription: trying to re-establish the subscription");
                                    if (lastEventId) {
                                        logger.verbose("ResumingSubscription: lastEventId: " + lastEventId);
                                        headers["Last-Event-Id"] = lastEventId;
                                    }
                                    _this.underlyingSubscription = nextSubscribeStrategy({
                                        onOpen: function onOpen(headers) {
                                            onTransition(new OpenSubscriptionState(headers, _this.underlyingSubscription, onTransition));
                                        },
                                        onRetrying: listeners.onRetrying,
                                        onError: function onError(error) {
                                            executeSubscriptionOnce(error, lastEventId);
                                        },
                                        onEvent: function onEvent(event) {
                                            lastEventId = event.eventId;
                                            listeners.onEvent(event);
                                        },
                                        onEnd: function onEnd(error) {
                                            onTransition(new EndedSubscriptionState(error));
                                        }
                                    }, headers);
                                };
                                executeSubscriptionOnce(error, lastEventId);
                            }
                            ResumingSubscriptionState.prototype.unsubscribe = function () {
                                this.onTransition(new EndingSubscriptionState());
                                window.clearTimeout(this.timeout);
                                this.underlyingSubscription.unsubscribe();
                            };
                            return ResumingSubscriptionState;
                        }();
                        var EndingSubscriptionState = /** @class */function () {
                            function EndingSubscriptionState(error) {
                                logger.verbose("ResumingSubscription: transitioning to EndingSubscriptionState");
                            }
                            EndingSubscriptionState.prototype.unsubscribe = function () {
                                throw new Error("Subscription is already ending");
                            };
                            return EndingSubscriptionState;
                        }();
                        var EndedSubscriptionState = /** @class */function () {
                            function EndedSubscriptionState(error) {
                                logger.verbose("ResumingSubscription: transitioning to EndedSubscriptionState");
                                listeners.onEnd(error);
                            }
                            EndedSubscriptionState.prototype.unsubscribe = function () {
                                throw new Error("Subscription has already ended");
                            };
                            return EndedSubscriptionState;
                        }();
                        var FailedSubscriptionState = /** @class */function () {
                            function FailedSubscriptionState(error) {
                                logger.verbose("ResumingSubscription: transitioning to FailedSubscriptionState", error);
                                listeners.onError(error);
                            }
                            FailedSubscriptionState.prototype.unsubscribe = function () {
                                throw new Error("Subscription has already ended");
                            };
                            return FailedSubscriptionState;
                        }();
                        //Here we init the state transition shenaningans
                        this.state = new OpeningSubscriptionState(this.onTransition);
                    }
                    return ResumingSubscription;
                }();
                //All the magic in the world.
                return function (listeners, headers) {
                    return new ResumingSubscription(listeners, headers);
                };
            };

            /***/
        },
        /* 6 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            var retry_strategy_1 = __webpack_require__(2);
            var network_1 = __webpack_require__(0);
            exports.createRetryingStrategy = function (retryOptions, nextSubscribeStrategy, logger) {
                retryOptions = retry_strategy_1.createRetryStrategyOptionsOrDefault(retryOptions);
                var retryResolution = new retry_strategy_1.RetryResolution(retryOptions, logger);
                var RetryingSubscription = /** @class */function () {
                    function RetryingSubscription(listeners, headers) {
                        var _this = this;
                        this.onTransition = function (newState) {
                            _this.state = newState;
                        };
                        this.unsubscribe = function () {
                            _this.state.unsubscribe();
                        };
                        var OpeningSubscriptionState = /** @class */function () {
                            function OpeningSubscriptionState(onTransition) {
                                var _this = this;
                                logger.verbose("RetryingSubscription: transitioning to OpeningSubscriptionState");
                                this.underlyingSubscription = nextSubscribeStrategy({
                                    onOpen: function onOpen(headers) {
                                        return onTransition(new OpenSubscriptionState(headers, _this.underlyingSubscription, onTransition));
                                    },
                                    onRetrying: listeners.onRetrying,
                                    onError: function onError(error) {
                                        return onTransition(new RetryingSubscriptionState(error, onTransition));
                                    },
                                    onEvent: listeners.onEvent,
                                    onEnd: function onEnd(error) {
                                        return onTransition(new EndedSubscriptionState(error));
                                    }
                                }, headers);
                            }
                            OpeningSubscriptionState.prototype.unsubscribe = function () {
                                this.underlyingSubscription.unsubscribe();
                                throw new Error("Method not implemented.");
                            };
                            return OpeningSubscriptionState;
                        }();
                        var RetryingSubscriptionState = /** @class */function () {
                            function RetryingSubscriptionState(error, onTransition) {
                                var _this = this;
                                this.onTransition = onTransition;
                                logger.verbose("RetryingSubscription: transitioning to RetryingSubscriptionState");
                                var executeSubscriptionOnce = function executeSubscriptionOnce(error) {
                                    listeners.onRetrying();
                                    var resolveError = function resolveError(error) {
                                        if (error instanceof network_1.ErrorResponse) {
                                            error.headers["Request-Method"] = "SUBSCRIBE";
                                        }
                                        return retryResolution.attemptRetry(error);
                                    };
                                    var errorResolution = resolveError(error);
                                    if (errorResolution instanceof retry_strategy_1.Retry) {
                                        _this.timeout = window.setTimeout(function () {
                                            executeNextSubscribeStrategy();
                                        }, errorResolution.waitTimeMillis);
                                    } else {
                                        onTransition(new FailedSubscriptionState(error));
                                    }
                                };
                                var executeNextSubscribeStrategy = function executeNextSubscribeStrategy() {
                                    logger.verbose("RetryingSubscription: trying to re-establish the subscription");
                                    var underlyingSubscription = nextSubscribeStrategy({
                                        onOpen: function onOpen(headers) {
                                            onTransition(new OpenSubscriptionState(headers, underlyingSubscription, onTransition));
                                        },
                                        onRetrying: listeners.onRetrying,
                                        onError: function onError(error) {
                                            return executeSubscriptionOnce(error);
                                        },
                                        onEvent: listeners.onEvent,
                                        onEnd: function onEnd(error) {
                                            return onTransition(new EndedSubscriptionState(error));
                                        }
                                    }, headers);
                                };
                                executeSubscriptionOnce(error);
                            }
                            RetryingSubscriptionState.prototype.unsubscribe = function () {
                                window.clearTimeout(this.timeout);
                                this.onTransition(new EndedSubscriptionState());
                            };
                            return RetryingSubscriptionState;
                        }();
                        var OpenSubscriptionState = /** @class */function () {
                            function OpenSubscriptionState(headers, underlyingSubscription, onTransition) {
                                this.underlyingSubscription = underlyingSubscription;
                                this.onTransition = onTransition;
                                logger.verbose("RetryingSubscription: transitioning to OpenSubscriptionState");
                                listeners.onOpen(headers);
                            }
                            OpenSubscriptionState.prototype.unsubscribe = function () {
                                this.underlyingSubscription.unsubscribe();
                                this.onTransition(new EndedSubscriptionState());
                            };
                            return OpenSubscriptionState;
                        }();
                        var EndedSubscriptionState = /** @class */function () {
                            function EndedSubscriptionState(error) {
                                logger.verbose("RetryingSubscription: transitioning to EndedSubscriptionState");
                                listeners.onEnd(error);
                            }
                            EndedSubscriptionState.prototype.unsubscribe = function () {
                                throw new Error("Subscription has already ended");
                            };
                            return EndedSubscriptionState;
                        }();
                        var FailedSubscriptionState = /** @class */function () {
                            function FailedSubscriptionState(error) {
                                logger.verbose("RetryingSubscription: transitioning to FailedSubscriptionState", error);
                                listeners.onError(error);
                            }
                            FailedSubscriptionState.prototype.unsubscribe = function () {
                                throw new Error("Subscription has already ended");
                            };
                            return FailedSubscriptionState;
                        }();
                        this.state = new OpeningSubscriptionState(this.onTransition);
                    }
                    return RetryingSubscription;
                }();
                return function (listeners, headers) {
                    return new RetryingSubscription(listeners, headers);
                };
            };

            /***/
        },
        /* 7 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            var network_1 = __webpack_require__(0);
            exports.createTokenProvidingStrategy = function (tokenProvider, nextSubscribeStrategy, logger) {
                var TokenProvidingSubscription = /** @class */function () {
                    function TokenProvidingSubscription(listeners, headers) {
                        var _this = this;
                        this.onTransition = function (newState) {
                            _this.state = newState;
                        };
                        this.unsubscribe = function () {
                            _this.state.unsubscribe();
                        };
                        var TokenProvidingState = /** @class */function () {
                            function TokenProvidingState(onTransition) {
                                var _this = this;
                                this.onTransition = onTransition;
                                logger.verbose("TokenProvidingSubscription: transitioning to TokenProvidingState");
                                var isTokenExpiredError = function isTokenExpiredError(error) {
                                    return error instanceof network_1.ErrorResponse && error.statusCode === 401 && error.info === "authentication/expired";
                                };
                                var fetchTokenAndExecuteSubscription = function fetchTokenAndExecuteSubscription() {
                                    _this.tokenPromise = tokenProvider.fetchToken().then(function (token) {
                                        _this.putTokenIntoHeader(token);
                                        _this.underlyingSubscription = nextSubscribeStrategy({
                                            onOpen: function onOpen(headers) {
                                                onTransition(new OpenSubscriptionState(headers, _this.underlyingSubscription, onTransition));
                                            },
                                            onRetrying: listeners.onRetrying,
                                            onError: function onError(error) {
                                                if (isTokenExpiredError(error)) {
                                                    tokenProvider.clearToken(token);
                                                    fetchTokenAndExecuteSubscription();
                                                } else {
                                                    onTransition(new FailedSubscriptionState(error));
                                                }
                                            },
                                            onEvent: listeners.onEvent,
                                            onEnd: function onEnd(error) {
                                                onTransition(new EndedSubscriptionState(error));
                                            }
                                        }, headers);
                                    }).catch(function (error) {
                                        (function (error) {
                                            onTransition(new FailedSubscriptionState(error));
                                        });
                                    });
                                };
                                fetchTokenAndExecuteSubscription();
                            }
                            TokenProvidingState.prototype.unsubscribe = function () {
                                if (this.tokenPromise) this.tokenPromise.cancel();
                                this.underlyingSubscription.unsubscribe();
                                this.onTransition(new EndedSubscriptionState());
                            };
                            TokenProvidingState.prototype.putTokenIntoHeader = function (token) {
                                if (token) {
                                    headers['Authorization'] = "Bearer " + token;
                                    logger.verbose("TokenProvidingSubscription: token fetched: " + token);
                                }
                            };
                            return TokenProvidingState;
                        }();
                        var OpenSubscriptionState = /** @class */function () {
                            function OpenSubscriptionState(headers, underlyingSubscription, onTransition) {
                                this.headers = headers;
                                this.underlyingSubscription = underlyingSubscription;
                                this.onTransition = onTransition;
                                logger.verbose("TokenProvidingSubscription: transitioning to OpenSubscriptionState");
                                listeners.onOpen(headers);
                            }
                            OpenSubscriptionState.prototype.unsubscribe = function () {
                                this.underlyingSubscription.unsubscribe();
                                this.onTransition(new EndedSubscriptionState());
                            };
                            return OpenSubscriptionState;
                        }();
                        var FailedSubscriptionState = /** @class */function () {
                            function FailedSubscriptionState(error) {
                                logger.verbose("TokenProvidingSubscription: transitioning to FailedSubscriptionState", error);
                                listeners.onError(error);
                            }
                            FailedSubscriptionState.prototype.unsubscribe = function () {
                                throw new Error("Subscription has already ended");
                            };
                            return FailedSubscriptionState;
                        }();
                        var EndedSubscriptionState = /** @class */function () {
                            function EndedSubscriptionState(error) {
                                logger.verbose("TokenProvidingSubscription: transitioning to EndedSubscriptionState");
                                listeners.onEnd(error);
                            }
                            EndedSubscriptionState.prototype.unsubscribe = function () {
                                throw new Error("Subscription has already ended");
                            };
                            return EndedSubscriptionState;
                        }();
                        this.state = new TokenProvidingState(this.onTransition);
                    }
                    return TokenProvidingSubscription;
                }();
                //Token provider might not be there. If missing, go straight to the underlying subscribe strategy
                if (tokenProvider) {
                    return function (listeners, headers) {
                        return new TokenProvidingSubscription(listeners, headers);
                    };
                } else {
                    return function (listeners, headers) {
                        return nextSubscribeStrategy(listeners, headers);
                    };
                }
            };

            /***/
        },
        /* 8 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.createTransportStrategy = function (path, transport, logger) {
                var strategy = function strategy(listeners, headers) {
                    return transport.subscribe(path, listeners, headers);
                };
                return strategy;
            };

            /***/
        },
        /* 9 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            var base_client_1 = __webpack_require__(3);
            var logger_1 = __webpack_require__(1);
            var HOST_BASE = "pusherplatform.io";
            var Instance = /** @class */function () {
                function Instance(options) {
                    if (!options.locator) throw new Error('Expected `locator` property in Instance options!');
                    if (options.locator.split(":").length !== 3) throw new Error('The locator property is in the wrong format!');
                    if (!options.serviceName) throw new Error('Expected `serviceName` property in Instance options!');
                    if (!options.serviceVersion) throw new Error('Expected `serviceVersion` property in Instance otpions!');
                    var splitLocator = options.locator.split(":");
                    this.platformVersion = splitLocator[0];
                    this.cluster = splitLocator[1];
                    this.id = splitLocator[2];
                    this.serviceName = options.serviceName;
                    this.serviceVersion = options.serviceVersion;
                    this.host = options.host || this.cluster + "." + HOST_BASE;
                    this.logger = options.logger || new logger_1.ConsoleLogger();
                    this.client = options.client || new base_client_1.BaseClient({
                        encrypted: options.encrypted,
                        host: this.host,
                        logger: this.logger
                    });
                    this.tokenProvider = options.tokenProvider;
                }
                Instance.prototype.request = function (options, tokenProvider, tokenParams) {
                    options.path = this.absPath(options.path);
                    if (options.headers == null || options.headers == undefined) {
                        options.headers = {};
                    }
                    var tokenProviderToUse = tokenProvider || this.tokenProvider;
                    return this.client.request(options, tokenProviderToUse, tokenParams);
                };
                Instance.prototype.subscribeNonResuming = function (options) {
                    var headers = options.headers || {};
                    var retryStrategyOptions = options.retryStrategyOptions || {};
                    var tokenProvider = options.tokenProvider || this.tokenProvider;
                    return this.client.subscribeNonResuming(this.absPath(options.path), headers, options.listeners, retryStrategyOptions, tokenProvider);
                };
                Instance.prototype.subscribeResuming = function (options) {
                    var headers = options.headers || {};
                    var retryStrategyOptions = options.retryStrategyOptions || {};
                    var tokenProvider = options.tokenProvider || this.tokenProvider;
                    return this.client.subscribeResuming(this.absPath(options.path), headers, options.listeners, retryStrategyOptions, options.initialEventId, tokenProvider);
                };
                Instance.prototype.absPath = function (relativePath) {
                    return ("/services/" + this.serviceName + "/" + this.serviceVersion + "/" + this.id + "/" + relativePath).replace(/\/+/g, "/").replace(/\/+$/, "");
                };
                return Instance;
            }();
            exports.default = Instance;

            /***/
        },
        /* 10 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var CancelError = function (_Error) {
                _inherits(CancelError, _Error);

                function CancelError() {
                    _classCallCheck(this, CancelError);

                    var _this2 = _possibleConstructorReturn(this, (CancelError.__proto__ || Object.getPrototypeOf(CancelError)).call(this, 'Promise was canceled'));

                    _this2.name = 'CancelError';
                    return _this2;
                }

                return CancelError;
            }(Error);

            var PCancelable = function () {
                _createClass(PCancelable, null, [{
                    key: 'fn',
                    value: function fn(_fn) {
                        return function () {
                            var args = [].slice.apply(arguments);
                            return new PCancelable(function (onCancel, resolve, reject) {
                                args.unshift(onCancel);
                                _fn.apply(null, args).then(resolve, reject);
                            });
                        };
                    }
                }]);

                function PCancelable(executor) {
                    var _this3 = this;

                    _classCallCheck(this, PCancelable);

                    this._pending = true;
                    this._canceled = false;

                    this._promise = new Promise(function (resolve, reject) {
                        _this3._reject = reject;

                        return executor(function (fn) {
                            _this3._cancel = fn;
                        }, function (val) {
                            _this3._pending = false;
                            resolve(val);
                        }, function (err) {
                            _this3._pending = false;
                            reject(err);
                        });
                    });
                }

                _createClass(PCancelable, [{
                    key: 'then',
                    value: function then() {
                        return this._promise.then.apply(this._promise, arguments);
                    }
                }, {
                    key: 'catch',
                    value: function _catch() {
                        return this._promise.catch.apply(this._promise, arguments);
                    }
                }, {
                    key: 'cancel',
                    value: function cancel() {
                        if (!this._pending || this._canceled) {
                            return;
                        }

                        if (typeof this._cancel === 'function') {
                            try {
                                this._cancel();
                            } catch (err) {
                                this._reject(err);
                            }
                        }

                        this._canceled = true;
                        this._reject(new CancelError());
                    }
                }, {
                    key: 'canceled',
                    get: function get() {
                        return this._canceled;
                    }
                }]);

                return PCancelable;
            }();

            Object.setPrototypeOf(PCancelable.prototype, Promise.prototype);

            module.exports = PCancelable;
            module.exports.CancelError = CancelError;

            /***/
        },
        /* 11 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            var transports_1 = __webpack_require__(8);
            exports.createTransportStrategy = transports_1.createTransportStrategy;
            var request_1 = __webpack_require__(4);
            exports.executeNetworkRequest = request_1.executeNetworkRequest;
            var resuming_subscription_1 = __webpack_require__(5);
            exports.createResumingStrategy = resuming_subscription_1.createResumingStrategy;
            var retry_strategy_1 = __webpack_require__(2);
            exports.createRetryStrategyOptionsOrDefault = retry_strategy_1.createRetryStrategyOptionsOrDefault;
            exports.DoNotRetry = retry_strategy_1.DoNotRetry;
            exports.Retry = retry_strategy_1.Retry;
            exports.RetryResolution = retry_strategy_1.RetryResolution;
            var instance_1 = __webpack_require__(9);
            exports.Instance = instance_1.default;
            var base_client_1 = __webpack_require__(3);
            exports.BaseClient = base_client_1.BaseClient;
            var logger_1 = __webpack_require__(1);
            exports.ConsoleLogger = logger_1.ConsoleLogger;
            exports.EmptyLogger = logger_1.EmptyLogger;
            var retrying_subscription_1 = __webpack_require__(6);
            exports.createRetryingStrategy = retrying_subscription_1.createRetryingStrategy;
            var token_providing_subscription_1 = __webpack_require__(7);
            exports.createTokenProvidingStrategy = token_providing_subscription_1.createTokenProvidingStrategy;
            var network_1 = __webpack_require__(0);
            exports.ErrorResponse = network_1.ErrorResponse;
            exports.NetworkError = network_1.NetworkError;
            exports.responseToHeadersObject = network_1.responseToHeadersObject;
            exports.XhrReadyState = network_1.XhrReadyState;
            exports.default = {
                Instance: instance_1.default,
                BaseClient: base_client_1.BaseClient,
                ConsoleLogger: logger_1.ConsoleLogger, EmptyLogger: logger_1.EmptyLogger
            };

            /***/
        },
        /* 12 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.subscribeStrategyListenersFromSubscriptionListeners = function (subListeners) {
                return {
                    onOpen: subListeners.onOpen,
                    onRetrying: subListeners.onRetrying,
                    onError: subListeners.onError,
                    onEvent: subListeners.onEvent,
                    onEnd: subListeners.onEnd
                };
            };

            /***/
        },
        /* 13 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            ;
            //Move this util somewhere else?
            var noop = function noop(arg) {};
            exports.replaceMissingListenersWithNoOps = function (listeners) {
                var onOpen = listeners.onOpen || noop;
                var onSubscribe = listeners.onSubscribe || noop;
                var onEvent = listeners.onEvent || noop;
                var onError = listeners.onError || noop;
                var onEnd = listeners.onEnd || noop;
                var onRetrying = listeners.onRetrying || noop;
                return {
                    onOpen: onOpen,
                    onSubscribe: onSubscribe,
                    onRetrying: onRetrying,
                    onEvent: onEvent,
                    onError: onError,
                    onEnd: onEnd
                };
            };

            /***/
        },
        /* 14 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            var network_1 = __webpack_require__(0);
            var HttpTransportState;
            (function (HttpTransportState) {
                HttpTransportState[HttpTransportState["UNOPENED"] = 0] = "UNOPENED";
                HttpTransportState[HttpTransportState["OPENING"] = 1] = "OPENING";
                HttpTransportState[HttpTransportState["OPEN"] = 2] = "OPEN";
                HttpTransportState[HttpTransportState["ENDING"] = 3] = "ENDING";
                HttpTransportState[HttpTransportState["ENDED"] = 4] = "ENDED"; // called onEnd() or onError(err)
            })(HttpTransportState = exports.HttpTransportState || (exports.HttpTransportState = {}));
            ;
            var HttpSubscription = /** @class */function () {
                function HttpSubscription(xhr, listeners) {
                    var _this = this;
                    this.state = HttpTransportState.UNOPENED;
                    this.lastNewlineIndex = 0;
                    this.gotEOS = false;
                    this.xhr = xhr;
                    this.listeners = listeners;
                    this.xhr.onreadystatechange = function () {
                        switch (_this.xhr.readyState) {
                            case network_1.XhrReadyState.UNSENT:
                            case network_1.XhrReadyState.OPENED:
                            case network_1.XhrReadyState.HEADERS_RECEIVED:
                                _this.assertStateIsIn(HttpTransportState.OPENING);
                                break;
                            case network_1.XhrReadyState.LOADING:
                                _this.onLoading();
                                break;
                            case network_1.XhrReadyState.DONE:
                                _this.onDone();
                                break;
                        }
                    };
                    this.state = HttpTransportState.OPENING;
                    this.xhr.send();
                    return this;
                }
                HttpSubscription.prototype.unsubscribe = function () {
                    this.state = HttpTransportState.ENDED;
                    this.xhr.abort();
                    this.listeners.onEnd(null);
                };
                HttpSubscription.prototype.onLoading = function () {
                    this.assertStateIsIn(HttpTransportState.OPENING, HttpTransportState.OPEN, HttpTransportState.ENDING);
                    if (this.xhr.status === 200) {
                        //Check if we just transitioned to the open state
                        if (this.state === HttpTransportState.OPENING) {
                            this.state = HttpTransportState.OPEN;
                            console.log(network_1.responseToHeadersObject(this.xhr.getAllResponseHeaders()));
                            this.listeners.onOpen(network_1.responseToHeadersObject(this.xhr.getAllResponseHeaders()));
                        }
                        this.assertStateIsIn(HttpTransportState.OPEN);
                        var err = this.onChunk(); // might transition our state from OPEN -> ENDING
                        this.assertStateIsIn(HttpTransportState.OPEN, HttpTransportState.ENDING);
                        if (err) {
                            this.state = HttpTransportState.ENDED;
                            if (err instanceof network_1.ErrorResponse && err.statusCode != 204) {
                                this.listeners.onError(err);
                            }
                            // Because we abort()ed, we will get no more calls to our onreadystatechange handler,
                            // and so we will not call the event handler again.
                            // Finish with options.onError instead of the options.onEnd.
                        } else {
                                // We consumed some response text, and all's fine. We expect more text.
                            }
                    }
                };
                HttpSubscription.prototype.onDone = function () {
                    if (this.xhr.status === 200) {
                        if (this.state === HttpTransportState.OPENING) {
                            this.state = HttpTransportState.OPEN;
                            this.listeners.onOpen(network_1.responseToHeadersObject(this.xhr.getAllResponseHeaders()));
                        }
                        this.assertStateIsIn(HttpTransportState.OPEN, HttpTransportState.ENDING);
                        var err = this.onChunk();
                        if (err) {
                            this.state = HttpTransportState.ENDED;
                            if (err.statusCode === 204) {
                                this.listeners.onEnd(null);
                            } else {
                                this.listeners.onError(err);
                            }
                        } else if (this.state <= HttpTransportState.ENDING) {
                            this.listeners.onError(new Error("HTTP response ended without receiving EOS message"));
                        } else {
                            // Stream ended normally.
                            this.listeners.onEnd(null);
                        }
                    } else {
                        this.assertStateIsIn(HttpTransportState.OPENING, HttpTransportState.OPEN, HttpTransportState.ENDED);
                        if (this.state === HttpTransportState.ENDED) {
                            // We aborted the request deliberately, and called onError/onEnd elsewhere.
                            return;
                        } else if (this.xhr.status === 0) {
                            this.listeners.onError(new network_1.NetworkError("Connection lost."));
                        } else {
                            this.listeners.onError(network_1.ErrorResponse.fromXHR(this.xhr));
                        }
                    }
                };
                HttpSubscription.prototype.onChunk = function () {
                    this.assertStateIsIn(HttpTransportState.OPEN);
                    var response = this.xhr.responseText;
                    var newlineIndex = response.lastIndexOf("\n");
                    if (newlineIndex > this.lastNewlineIndex) {
                        var rawEvents = response.slice(this.lastNewlineIndex, newlineIndex).split("\n");
                        this.lastNewlineIndex = newlineIndex;
                        for (var _i = 0, rawEvents_1 = rawEvents; _i < rawEvents_1.length; _i++) {
                            var rawEvent = rawEvents_1[_i];
                            if (rawEvent.length === 0) {
                                continue; // FIXME why? This should be a protocol error
                            }
                            var data = JSON.parse(rawEvent);
                            var err = this.onMessage(data);
                            if (err != null) {
                                return err;
                            }
                        }
                    }
                };
                HttpSubscription.prototype.assertStateIsIn = function () {
                    var _this = this;
                    var validStates = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        validStates[_i] = arguments[_i];
                    }
                    var stateIsValid = validStates.some(function (validState) {
                        return validState === _this.state;
                    });
                    if (!stateIsValid) {
                        var expectedStates = validStates.map(function (state) {
                            return HttpTransportState[state];
                        }).join(', ');
                        var actualState = HttpTransportState[this.state];
                        console.warn("Expected this.state to be one of [" + expectedStates + "] but it is " + actualState);
                    }
                };
                /**
                * Calls options.onEvent 0+ times, then returns an Error or null
                * Also asserts the message is formatted correctly and we're in an allowed state (not terminated).
                */
                HttpSubscription.prototype.onMessage = function (message) {
                    this.assertStateIsIn(HttpTransportState.OPEN);
                    this.verifyMessage(message);
                    switch (message[0]) {
                        case 0:
                            return null;
                        case 1:
                            return this.onEventMessage(message);
                        case 255:
                            return this.onEOSMessage(message);
                        default:
                            return new Error("Unknown Message: " + JSON.stringify(message));
                    }
                };
                // EITHER calls options.onEvent, OR returns an error
                HttpSubscription.prototype.onEventMessage = function (eventMessage) {
                    this.assertStateIsIn(HttpTransportState.OPEN);
                    if (eventMessage.length !== 4) {
                        return new Error("Event message has " + eventMessage.length + " elements (expected 4)");
                    }
                    var _ = eventMessage[0],
                        id = eventMessage[1],
                        headers = eventMessage[2],
                        body = eventMessage[3];
                    if (typeof id !== "string") {
                        return new Error("Invalid event ID in message: " + JSON.stringify(eventMessage));
                    }
                    if ((typeof headers === 'undefined' ? 'undefined' : _typeof(headers)) !== "object" || Array.isArray(headers)) {
                        return new Error("Invalid event headers in message: " + JSON.stringify(eventMessage));
                    }
                    this.listeners.onEvent({ eventId: id, headers: headers, body: body });
                };
                /**
                * EOS message received. Sets subscription state to Ending and returns an error with given status code
                * @param eosMessage final message of the subscription
                */
                HttpSubscription.prototype.onEOSMessage = function (eosMessage) {
                    this.assertStateIsIn(HttpTransportState.OPEN);
                    if (eosMessage.length !== 4) {
                        return new Error("EOS message has " + eosMessage.length + " elements (expected 4)");
                    }
                    var _ = eosMessage[0],
                        statusCode = eosMessage[1],
                        headers = eosMessage[2],
                        info = eosMessage[3];
                    if (typeof statusCode !== "number") {
                        return new Error("Invalid EOS Status Code");
                    }
                    if ((typeof headers === 'undefined' ? 'undefined' : _typeof(headers)) !== "object" || Array.isArray(headers)) {
                        return new Error("Invalid EOS ElementsHeaders");
                    }
                    this.state = HttpTransportState.ENDING;
                    return new network_1.ErrorResponse(statusCode, headers, info);
                };
                /**
                * Check if a single subscription message is in the right format.
                * @param message The message to check.
                * @returns null or error if the message is wrong.
                */
                HttpSubscription.prototype.verifyMessage = function (message) {
                    if (this.gotEOS) {
                        return new Error("Got another message after EOS message");
                    }
                    if (!Array.isArray(message)) {
                        return new Error("Message is not an array");
                    }
                    if (message.length < 1) {
                        return new Error("Message is empty array");
                    }
                };
                return HttpSubscription;
            }();
            var HttpTransport = /** @class */function () {
                function HttpTransport(host, encrypted) {
                    this.baseURL = (encrypted !== false ? "https" : "http") + "://" + host;
                }
                HttpTransport.prototype.request = function (requestOptions) {
                    return this.createXHR(this.baseURL, requestOptions);
                };
                HttpTransport.prototype.subscribe = function (path, listeners, headers) {
                    var requestOptions = {
                        method: "SUBSCRIBE",
                        path: path,
                        headers: headers
                    };
                    return new HttpSubscription(this.createXHR(this.baseURL, requestOptions), listeners);
                };
                HttpTransport.prototype.createXHR = function (baseURL, options) {
                    var XMLHttpRequest = window.XMLHttpRequest;
                    var xhr = new XMLHttpRequest();
                    var path = options.path.replace(/^\/+/, "");
                    var endpoint = baseURL + "/" + path;
                    xhr.open(options.method.toUpperCase(), endpoint, true);
                    if (options.body) {
                        xhr.setRequestHeader("content-type", "application/json");
                    }
                    if (options.jwt) {
                        xhr.setRequestHeader("authorization", "Bearer " + options.jwt);
                    }
                    for (var key in options.headers) {
                        xhr.setRequestHeader(key, options.headers[key]);
                    }
                    return xhr;
                };
                return HttpTransport;
            }();
            exports.default = HttpTransport;

            /***/
        },
        /* 15 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var __assign = this && this.__assign || Object.assign || function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                }
                return t;
            };
            Object.defineProperty(exports, "__esModule", { value: true });
            var network_1 = __webpack_require__(0);
            var SubscribeMessageType = 100;
            var OpenMessageType = 101;
            var EventMessageType = 102;
            var UnsubscribeMessageType = 198;
            var EosMessageType = 199;
            var PingMessageType = 16;
            var PongMessageType = 17;
            var CloseMessageType = 99;
            var WSReadyState;
            (function (WSReadyState) {
                WSReadyState[WSReadyState["Connecting"] = 0] = "Connecting";
                WSReadyState[WSReadyState["Open"] = 1] = "Open";
                WSReadyState[WSReadyState["Closing"] = 2] = "Closing";
                WSReadyState[WSReadyState["Closed"] = 3] = "Closed";
            })(WSReadyState = exports.WSReadyState || (exports.WSReadyState = {}));
            ;
            var WsSubscriptions = /** @class */function () {
                function WsSubscriptions() {
                    this.subscriptions = {};
                }
                WsSubscriptions.prototype.add = function (subID, path, listeners, headers) {
                    this.subscriptions[subID] = {
                        path: path,
                        listeners: listeners,
                        headers: headers
                    };
                    return subID;
                };
                WsSubscriptions.prototype.has = function (subID) {
                    return this.subscriptions[subID] != undefined;
                };
                WsSubscriptions.prototype.isEmpty = function () {
                    return Object.keys(this.subscriptions).length === 0;
                };
                WsSubscriptions.prototype.remove = function (subID) {
                    return delete this.subscriptions[subID];
                };
                WsSubscriptions.prototype.get = function (subID) {
                    return this.subscriptions[subID];
                };
                WsSubscriptions.prototype.getAll = function () {
                    return this.subscriptions;
                };
                WsSubscriptions.prototype.getAllAsArray = function () {
                    var _this = this;
                    return Object.keys(this.subscriptions).map(function (subID) {
                        return __assign({ subID: parseInt(subID) }, _this.subscriptions[subID]);
                    });
                };
                WsSubscriptions.prototype.removeAll = function () {
                    this.subscriptions = {};
                };
                return WsSubscriptions;
            }();
            var WsSubscription = /** @class */function () {
                function WsSubscription(wsTransport, subID) {
                    this.wsTransport = wsTransport;
                    this.subID = subID;
                }
                WsSubscription.prototype.unsubscribe = function () {
                    this.wsTransport.unsubscribe(this.subID);
                };
                return WsSubscription;
            }();
            var pingIntervalMs = 30000;
            var pingTimeoutMs = 10000;
            var WebSocketTransport = /** @class */function () {
                function WebSocketTransport(host) {
                    this.webSocketPath = '/ws';
                    this.forcedClose = false;
                    this.closedError = null;
                    this.baseURL = "wss://" + host + this.webSocketPath;
                    this.lastSubscriptionID = 0;
                    this.subscriptions = new WsSubscriptions();
                    this.pendingSubscriptions = new WsSubscriptions();
                    this.connect();
                }
                WebSocketTransport.prototype.connect = function () {
                    var _this = this;
                    this.close();
                    this.forcedClose = false;
                    this.closedError = null;
                    this.socket = new WebSocket(this.baseURL);
                    this.socket.addEventListener('open', function (event) {
                        var allPendingSubscriptions = _this.pendingSubscriptions.getAllAsArray();
                        // Re-subscribe old subscriptions for new connection
                        allPendingSubscriptions.forEach(function (subscription) {
                            var subID = subscription.subID,
                                path = subscription.path,
                                listeners = subscription.listeners,
                                headers = subscription.headers;
                            _this.subscribePending(path, listeners, headers, subID);
                        });
                        _this.pendingSubscriptions.removeAll();
                        _this.pingInterval = setInterval(function () {
                            if (_this.pongTimeout) {
                                return;
                            }
                            var now = new Date().getTime();
                            if (pingTimeoutMs > now - _this.lastMessageReceivedTimestamp) {
                                return;
                            }
                            _this.sendMessage(_this.getMessage(PingMessageType, now));
                            _this.lastSentPingID = now;
                            _this.pongTimeout = setTimeout(function () {
                                var now = new Date().getTime();
                                if (pingTimeoutMs > now - _this.lastMessageReceivedTimestamp) {
                                    _this.pongTimeout = null;
                                    return;
                                }
                                _this.close(new network_1.NetworkError("Pong response wasn't received until timeout."));
                            }, pingTimeoutMs);
                        }, pingIntervalMs);
                    });
                    this.socket.addEventListener('message', function (event) {
                        return _this.receiveMessage(event);
                    });
                    this.socket.addEventListener('error', function (event) {
                        _this.close(new network_1.NetworkError('Connection was lost.'));
                    });
                    this.socket.addEventListener('close', function (event) {
                        if (!_this.forcedClose) {
                            _this.tryReconnectIfNeeded();
                            return;
                        }
                        var callback = _this.closedError ? function (subscription) {
                            return subscription.listeners.onError(_this.closedError);
                        } : function (subscription) {
                            return subscription.listeners.onEnd(null);
                        };
                        var allSubscriptions = _this.pendingSubscriptions.isEmpty() === false ? _this.pendingSubscriptions : _this.subscriptions;
                        allSubscriptions.getAllAsArray().forEach(callback);
                        allSubscriptions.removeAll();
                        if (_this.closedError) {
                            _this.tryReconnectIfNeeded();
                        }
                    });
                };
                WebSocketTransport.prototype.close = function (error) {
                    if (!(this.socket instanceof WebSocket)) {
                        return;
                    }
                    this.forcedClose = true;
                    this.closedError = error;
                    this.socket.close();
                    clearTimeout(this.pingInterval);
                    clearTimeout(this.pongTimeout);
                    delete this.pongTimeout;
                    this.lastSentPingID = null;
                };
                WebSocketTransport.prototype.tryReconnectIfNeeded = function () {
                    if (this.socket.readyState !== WSReadyState.Closed) {
                        return;
                    }
                    this.connect();
                };
                WebSocketTransport.prototype.subscribe = function (path, listeners, headers) {
                    // If connection was closed, try to reconnect
                    this.tryReconnectIfNeeded();
                    var subID = this.lastSubscriptionID++;
                    // Add subscription to pending if socket is not open
                    if (this.socket.readyState !== WSReadyState.Open) {
                        this.pendingSubscriptions.add(subID, path, listeners, headers);
                        return new WsSubscription(this, subID);
                    }
                    // Add or select subscription
                    this.subscriptions.add(subID, path, listeners, headers);
                    this.sendMessage(this.getMessage(SubscribeMessageType, subID, path, headers));
                    return new WsSubscription(this, subID);
                };
                WebSocketTransport.prototype.subscribePending = function (path, listeners, headers, subID) {
                    // Add or select subscription
                    this.subscriptions.add(subID, path, listeners, headers);
                    this.sendMessage(this.getMessage(SubscribeMessageType, subID, path, headers));
                };
                WebSocketTransport.prototype.unsubscribe = function (subID) {
                    this.sendMessage(this.getMessage(UnsubscribeMessageType, subID));
                    this.subscriptions.get(subID).listeners.onEnd(null);
                    this.subscriptions.remove(subID);
                };
                WebSocketTransport.prototype.getMessage = function (messageType, id, path, headers) {
                    return [messageType, id, path, headers];
                };
                WebSocketTransport.prototype.sendMessage = function (message) {
                    if (this.socket.readyState !== WSReadyState.Open) {
                        return console.warn("Can't send in \"" + WSReadyState[this.socket.readyState] + "\" state");
                    }
                    this.socket.send(JSON.stringify(message));
                };
                WebSocketTransport.prototype.subscription = function (subID) {
                    return this.subscriptions.get(subID);
                };
                WebSocketTransport.prototype.receiveMessage = function (event) {
                    this.lastMessageReceivedTimestamp = new Date().getTime();
                    // First try to parse event to JSON message.
                    var message;
                    try {
                        message = JSON.parse(event.data);
                    } catch (err) {
                        this.close(new Error("Message is not valid JSON format. Getting " + event.data));
                        return;
                    }
                    // Validate structure of message.
                    // Close connection if not valid.
                    var nonValidMessageError = this.validateMessage(message);
                    if (nonValidMessageError) {
                        this.close(new Error(nonValidMessageError.message));
                        return;
                    }
                    var messageType = message.shift();
                    // Try to handle connection level messages first
                    switch (messageType) {
                        case PongMessageType:
                            this.onPongMessage(message);
                            return;
                        case PingMessageType:
                            this.onPingMessage(message);
                            return;
                        case CloseMessageType:
                            this.onCloseMessage(message);
                            return;
                    }
                    var subID = message.shift();
                    var subscription = this.subscription(subID);
                    if (!subscription) {
                        this.close(new Error("Received message for non existing subscription id: \"" + subID + "\""));
                        return;
                    }
                    var listeners = subscription.listeners;
                    // Handle subscription level messages. 
                    switch (messageType) {
                        case OpenMessageType:
                            this.onOpenMessage(message, subID, listeners);
                            break;
                        case EventMessageType:
                            this.onEventMessage(message, listeners);
                            break;
                        case EosMessageType:
                            this.onEOSMessage(message, subID, listeners);
                            break;
                        default:
                            this.close(new Error('Received non existing type of message.'));
                    }
                };
                /**
                * Check if a single subscription message is in the right format.
                * @param message The message to check.
                * @returns null or error if the message is wrong.
                */
                WebSocketTransport.prototype.validateMessage = function (message) {
                    if (!Array.isArray(message)) {
                        return new Error("Message is expected to be an array. Getting: " + JSON.stringify(message));
                    }
                    if (message.length < 1) {
                        return new Error("Message is empty array: " + JSON.stringify(message));
                    }
                    return null;
                };
                WebSocketTransport.prototype.onOpenMessage = function (message, subID, subscriptionListeners) {
                    subscriptionListeners.onOpen(message[1]);
                };
                WebSocketTransport.prototype.onEventMessage = function (eventMessage, subscriptionListeners) {
                    if (eventMessage.length !== 3) {
                        return new Error('Event message has ' + eventMessage.length + ' elements (expected 4)');
                    }
                    var eventId = eventMessage[0],
                        headers = eventMessage[1],
                        body = eventMessage[2];
                    if (typeof eventId !== 'string') {
                        return new Error("Invalid event ID in message: " + JSON.stringify(eventMessage));
                    }
                    if ((typeof headers === 'undefined' ? 'undefined' : _typeof(headers)) !== 'object' || Array.isArray(headers)) {
                        return new Error("Invalid event headers in message: " + JSON.stringify(eventMessage));
                    }
                    subscriptionListeners.onEvent({ eventId: eventId, headers: headers, body: body });
                };
                WebSocketTransport.prototype.onEOSMessage = function (eosMessage, subID, subscriptionListeners) {
                    this.subscriptions.remove(subID);
                    if (eosMessage.length !== 3) {
                        return subscriptionListeners.onError(new Error("EOS message has " + eosMessage.length + " elements (expected 4)"));
                    }
                    var statusCode = eosMessage[0],
                        headers = eosMessage[1],
                        body = eosMessage[2];
                    if (typeof statusCode !== 'number') {
                        return subscriptionListeners.onError(new Error('Invalid EOS Status Code'));
                    }
                    if ((typeof headers === 'undefined' ? 'undefined' : _typeof(headers)) !== 'object' || Array.isArray(headers)) {
                        return subscriptionListeners.onError(new Error('Invalid EOS ElementsHeaders'));
                    }
                    if (statusCode === 204) {
                        return subscriptionListeners.onEnd(null);
                    }
                    return subscriptionListeners.onError(new network_1.ErrorResponse(statusCode, headers, body));
                };
                WebSocketTransport.prototype.onCloseMessage = function (closeMessage) {
                    var statusCode = closeMessage[0],
                        headers = closeMessage[1],
                        body = closeMessage[2];
                    if (typeof statusCode !== 'number') {
                        return this.close(new Error('Close message: Invalid EOS Status Code'));
                    }
                    if ((typeof headers === 'undefined' ? 'undefined' : _typeof(headers)) !== 'object' || Array.isArray(headers)) {
                        return this.close(new Error('Close message: Invalid EOS ElementsHeaders'));
                    }
                    this.close();
                };
                WebSocketTransport.prototype.onPongMessage = function (message) {
                    var receviedPongID = message[0];
                    if (this.lastSentPingID !== receviedPongID) {
                        // Close with protocol error status code
                        this.close(new network_1.NetworkError("Didn't received pong with proper ID"));
                    }
                    clearTimeout(this.pongTimeout);
                    delete this.pongTimeout;
                    this.lastSentPingID = null;
                };
                WebSocketTransport.prototype.onPingMessage = function (message) {
                    var receviedPingID = message[0];
                    this.sendMessage(this.getMessage(PongMessageType, receviedPingID));
                };
                return WebSocketTransport;
            }();
            exports.default = WebSocketTransport;

            /***/
        }]
        /******/)
    );
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer, module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Quill Editor v1.2.6
 * https://quilljs.com/
 * Copyright (c) 2014, Jason Chen
 * Copyright (c) 2013, salesforce.com
 */
(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? 'undefined' : _typeof2(exports)) === 'object' && ( false ? 'undefined' : _typeof2(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object') exports["Quill"] = factory();else root["Quill"] = factory();
})(this, function () {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/var installedModules = {};
      /******/
      /******/ // The require function
      /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
          /******/return installedModules[moduleId].exports;
          /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
          /******/i: moduleId,
          /******/l: false,
          /******/exports: {}
          /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
      }
      /******/
      /******/
      /******/ // expose the modules object (__webpack_modules__)
      /******/__webpack_require__.m = modules;
      /******/
      /******/ // expose the module cache
      /******/__webpack_require__.c = installedModules;
      /******/
      /******/ // identity function for calling harmony imports with the correct context
      /******/__webpack_require__.i = function (value) {
        return value;
      };
      /******/
      /******/ // define getter function for harmony exports
      /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
          /******/Object.defineProperty(exports, name, {
            /******/configurable: false,
            /******/enumerable: true,
            /******/get: getter
            /******/ });
          /******/
        }
        /******/
      };
      /******/
      /******/ // getDefaultExport function for compatibility with non-harmony modules
      /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
          return module['default'];
        } :
        /******/function getModuleExports() {
          return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
      };
      /******/
      /******/ // Object.prototype.hasOwnProperty.call
      /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/
      /******/ // __webpack_public_path__
      /******/__webpack_require__.p = "";
      /******/
      /******/ // Load entry module and return exports
      /******/return __webpack_require__(__webpack_require__.s = 137);
      /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", { value: true });
      var container_1 = __webpack_require__(21);
      var format_1 = __webpack_require__(22);
      var leaf_1 = __webpack_require__(23);
      var scroll_1 = __webpack_require__(59);
      var inline_1 = __webpack_require__(58);
      var block_1 = __webpack_require__(56);
      var embed_1 = __webpack_require__(57);
      var text_1 = __webpack_require__(60);
      var attributor_1 = __webpack_require__(13);
      var class_1 = __webpack_require__(32);
      var style_1 = __webpack_require__(34);
      var store_1 = __webpack_require__(33);
      var Registry = __webpack_require__(1);
      var Parchment = {
        Scope: Registry.Scope,
        create: Registry.create,
        find: Registry.find,
        query: Registry.query,
        register: Registry.register,
        Container: container_1.default,
        Format: format_1.default,
        Leaf: leaf_1.default,
        Embed: embed_1.default,
        Scroll: scroll_1.default,
        Block: block_1.default,
        Inline: inline_1.default,
        Text: text_1.default,
        Attributor: {
          Attribute: attributor_1.default,
          Class: class_1.default,
          Style: style_1.default,
          Store: store_1.default
        }
      };
      exports.default = Parchment;

      /***/
    },
    /* 1 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };
        return function (d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var ParchmentError = function (_super) {
        __extends(ParchmentError, _super);
        function ParchmentError(message) {
          var _this = this;
          message = '[Parchment] ' + message;
          _this = _super.call(this, message) || this;
          _this.message = message;
          _this.name = _this.constructor.name;
          return _this;
        }
        return ParchmentError;
      }(Error);
      exports.ParchmentError = ParchmentError;
      var attributes = {};
      var classes = {};
      var tags = {};
      var types = {};
      exports.DATA_KEY = '__blot';
      var Scope;
      (function (Scope) {
        Scope[Scope["TYPE"] = 3] = "TYPE";
        Scope[Scope["LEVEL"] = 12] = "LEVEL";
        Scope[Scope["ATTRIBUTE"] = 13] = "ATTRIBUTE";
        Scope[Scope["BLOT"] = 14] = "BLOT";
        Scope[Scope["INLINE"] = 7] = "INLINE";
        Scope[Scope["BLOCK"] = 11] = "BLOCK";
        Scope[Scope["BLOCK_BLOT"] = 10] = "BLOCK_BLOT";
        Scope[Scope["INLINE_BLOT"] = 6] = "INLINE_BLOT";
        Scope[Scope["BLOCK_ATTRIBUTE"] = 9] = "BLOCK_ATTRIBUTE";
        Scope[Scope["INLINE_ATTRIBUTE"] = 5] = "INLINE_ATTRIBUTE";
        Scope[Scope["ANY"] = 15] = "ANY";
      })(Scope = exports.Scope || (exports.Scope = {}));
      ;
      function create(input, value) {
        var match = query(input);
        if (match == null) {
          throw new ParchmentError("Unable to create " + input + " blot");
        }
        var BlotClass = match;
        var node = input instanceof Node || input['nodeType'] === Node.TEXT_NODE ? input : BlotClass.create(value);
        return new BlotClass(node, value);
      }
      exports.create = create;
      function find(node, bubble) {
        if (bubble === void 0) {
          bubble = false;
        }
        if (node == null) return null;
        if (node[exports.DATA_KEY] != null) return node[exports.DATA_KEY].blot;
        if (bubble) return find(node.parentNode, bubble);
        return null;
      }
      exports.find = find;
      function query(query, scope) {
        if (scope === void 0) {
          scope = Scope.ANY;
        }
        var match;
        if (typeof query === 'string') {
          match = types[query] || attributes[query];
        } else if (query instanceof Text || query['nodeType'] === Node.TEXT_NODE) {
          match = types['text'];
        } else if (typeof query === 'number') {
          if (query & Scope.LEVEL & Scope.BLOCK) {
            match = types['block'];
          } else if (query & Scope.LEVEL & Scope.INLINE) {
            match = types['inline'];
          }
        } else if (query instanceof HTMLElement) {
          var names = (query.getAttribute('class') || '').split(/\s+/);
          for (var i in names) {
            match = classes[names[i]];
            if (match) break;
          }
          match = match || tags[query.tagName];
        }
        if (match == null) return null;
        if (scope & Scope.LEVEL & match.scope && scope & Scope.TYPE & match.scope) return match;
        return null;
      }
      exports.query = query;
      function register() {
        var Definitions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          Definitions[_i] = arguments[_i];
        }
        if (Definitions.length > 1) {
          return Definitions.map(function (d) {
            return register(d);
          });
        }
        var Definition = Definitions[0];
        if (typeof Definition.blotName !== 'string' && typeof Definition.attrName !== 'string') {
          throw new ParchmentError('Invalid definition');
        } else if (Definition.blotName === 'abstract') {
          throw new ParchmentError('Cannot register abstract class');
        }
        types[Definition.blotName || Definition.attrName] = Definition;
        if (typeof Definition.keyName === 'string') {
          attributes[Definition.keyName] = Definition;
        } else {
          if (Definition.className != null) {
            classes[Definition.className] = Definition;
          }
          if (Definition.tagName != null) {
            if (Array.isArray(Definition.tagName)) {
              Definition.tagName = Definition.tagName.map(function (tagName) {
                return tagName.toUpperCase();
              });
            } else {
              Definition.tagName = Definition.tagName.toUpperCase();
            }
            var tagNames = Array.isArray(Definition.tagName) ? Definition.tagName : [Definition.tagName];
            tagNames.forEach(function (tag) {
              if (tags[tag] == null || Definition.className == null) {
                tags[tag] = Definition;
              }
            });
          }
        }
        return Definition;
      }
      exports.register = register;

      /***/
    },
    /* 2 */
    /***/function (module, exports, __webpack_require__) {

      var diff = __webpack_require__(54);
      var equal = __webpack_require__(11);
      var extend = __webpack_require__(3);
      var op = __webpack_require__(20);

      var NULL_CHARACTER = String.fromCharCode(0); // Placeholder char for embed in diff()


      var Delta = function Delta(ops) {
        // Assume we are given a well formed ops
        if (Array.isArray(ops)) {
          this.ops = ops;
        } else if (ops != null && Array.isArray(ops.ops)) {
          this.ops = ops.ops;
        } else {
          this.ops = [];
        }
      };

      Delta.prototype.insert = function (text, attributes) {
        var newOp = {};
        if (text.length === 0) return this;
        newOp.insert = text;
        if (attributes != null && (typeof attributes === 'undefined' ? 'undefined' : _typeof2(attributes)) === 'object' && Object.keys(attributes).length > 0) {
          newOp.attributes = attributes;
        }
        return this.push(newOp);
      };

      Delta.prototype['delete'] = function (length) {
        if (length <= 0) return this;
        return this.push({ 'delete': length });
      };

      Delta.prototype.retain = function (length, attributes) {
        if (length <= 0) return this;
        var newOp = { retain: length };
        if (attributes != null && (typeof attributes === 'undefined' ? 'undefined' : _typeof2(attributes)) === 'object' && Object.keys(attributes).length > 0) {
          newOp.attributes = attributes;
        }
        return this.push(newOp);
      };

      Delta.prototype.push = function (newOp) {
        var index = this.ops.length;
        var lastOp = this.ops[index - 1];
        newOp = extend(true, {}, newOp);
        if ((typeof lastOp === 'undefined' ? 'undefined' : _typeof2(lastOp)) === 'object') {
          if (typeof newOp['delete'] === 'number' && typeof lastOp['delete'] === 'number') {
            this.ops[index - 1] = { 'delete': lastOp['delete'] + newOp['delete'] };
            return this;
          }
          // Since it does not matter if we insert before or after deleting at the same index,
          // always prefer to insert first
          if (typeof lastOp['delete'] === 'number' && newOp.insert != null) {
            index -= 1;
            lastOp = this.ops[index - 1];
            if ((typeof lastOp === 'undefined' ? 'undefined' : _typeof2(lastOp)) !== 'object') {
              this.ops.unshift(newOp);
              return this;
            }
          }
          if (equal(newOp.attributes, lastOp.attributes)) {
            if (typeof newOp.insert === 'string' && typeof lastOp.insert === 'string') {
              this.ops[index - 1] = { insert: lastOp.insert + newOp.insert };
              if (_typeof2(newOp.attributes) === 'object') this.ops[index - 1].attributes = newOp.attributes;
              return this;
            } else if (typeof newOp.retain === 'number' && typeof lastOp.retain === 'number') {
              this.ops[index - 1] = { retain: lastOp.retain + newOp.retain };
              if (_typeof2(newOp.attributes) === 'object') this.ops[index - 1].attributes = newOp.attributes;
              return this;
            }
          }
        }
        if (index === this.ops.length) {
          this.ops.push(newOp);
        } else {
          this.ops.splice(index, 0, newOp);
        }
        return this;
      };

      Delta.prototype.filter = function (predicate) {
        return this.ops.filter(predicate);
      };

      Delta.prototype.forEach = function (predicate) {
        this.ops.forEach(predicate);
      };

      Delta.prototype.map = function (predicate) {
        return this.ops.map(predicate);
      };

      Delta.prototype.partition = function (predicate) {
        var passed = [],
            failed = [];
        this.forEach(function (op) {
          var target = predicate(op) ? passed : failed;
          target.push(op);
        });
        return [passed, failed];
      };

      Delta.prototype.reduce = function (predicate, initial) {
        return this.ops.reduce(predicate, initial);
      };

      Delta.prototype.chop = function () {
        var lastOp = this.ops[this.ops.length - 1];
        if (lastOp && lastOp.retain && !lastOp.attributes) {
          this.ops.pop();
        }
        return this;
      };

      Delta.prototype.length = function () {
        return this.reduce(function (length, elem) {
          return length + op.length(elem);
        }, 0);
      };

      Delta.prototype.slice = function (start, end) {
        start = start || 0;
        if (typeof end !== 'number') end = Infinity;
        var ops = [];
        var iter = op.iterator(this.ops);
        var index = 0;
        while (index < end && iter.hasNext()) {
          var nextOp;
          if (index < start) {
            nextOp = iter.next(start - index);
          } else {
            nextOp = iter.next(end - index);
            ops.push(nextOp);
          }
          index += op.length(nextOp);
        }
        return new Delta(ops);
      };

      Delta.prototype.compose = function (other) {
        var thisIter = op.iterator(this.ops);
        var otherIter = op.iterator(other.ops);
        var delta = new Delta();
        while (thisIter.hasNext() || otherIter.hasNext()) {
          if (otherIter.peekType() === 'insert') {
            delta.push(otherIter.next());
          } else if (thisIter.peekType() === 'delete') {
            delta.push(thisIter.next());
          } else {
            var length = Math.min(thisIter.peekLength(), otherIter.peekLength());
            var thisOp = thisIter.next(length);
            var otherOp = otherIter.next(length);
            if (typeof otherOp.retain === 'number') {
              var newOp = {};
              if (typeof thisOp.retain === 'number') {
                newOp.retain = length;
              } else {
                newOp.insert = thisOp.insert;
              }
              // Preserve null when composing with a retain, otherwise remove it for inserts
              var attributes = op.attributes.compose(thisOp.attributes, otherOp.attributes, typeof thisOp.retain === 'number');
              if (attributes) newOp.attributes = attributes;
              delta.push(newOp);
              // Other op should be delete, we could be an insert or retain
              // Insert + delete cancels out
            } else if (typeof otherOp['delete'] === 'number' && typeof thisOp.retain === 'number') {
              delta.push(otherOp);
            }
          }
        }
        return delta.chop();
      };

      Delta.prototype.concat = function (other) {
        var delta = new Delta(this.ops.slice());
        if (other.ops.length > 0) {
          delta.push(other.ops[0]);
          delta.ops = delta.ops.concat(other.ops.slice(1));
        }
        return delta;
      };

      Delta.prototype.diff = function (other, index) {
        if (this.ops === other.ops) {
          return new Delta();
        }
        var strings = [this, other].map(function (delta) {
          return delta.map(function (op) {
            if (op.insert != null) {
              return typeof op.insert === 'string' ? op.insert : NULL_CHARACTER;
            }
            var prep = delta === other ? 'on' : 'with';
            throw new Error('diff() called ' + prep + ' non-document');
          }).join('');
        });
        var delta = new Delta();
        var diffResult = diff(strings[0], strings[1], index);
        var thisIter = op.iterator(this.ops);
        var otherIter = op.iterator(other.ops);
        diffResult.forEach(function (component) {
          var length = component[1].length;
          while (length > 0) {
            var opLength = 0;
            switch (component[0]) {
              case diff.INSERT:
                opLength = Math.min(otherIter.peekLength(), length);
                delta.push(otherIter.next(opLength));
                break;
              case diff.DELETE:
                opLength = Math.min(length, thisIter.peekLength());
                thisIter.next(opLength);
                delta['delete'](opLength);
                break;
              case diff.EQUAL:
                opLength = Math.min(thisIter.peekLength(), otherIter.peekLength(), length);
                var thisOp = thisIter.next(opLength);
                var otherOp = otherIter.next(opLength);
                if (equal(thisOp.insert, otherOp.insert)) {
                  delta.retain(opLength, op.attributes.diff(thisOp.attributes, otherOp.attributes));
                } else {
                  delta.push(otherOp)['delete'](opLength);
                }
                break;
            }
            length -= opLength;
          }
        });
        return delta.chop();
      };

      Delta.prototype.eachLine = function (predicate, newline) {
        newline = newline || '\n';
        var iter = op.iterator(this.ops);
        var line = new Delta();
        var i = 0;
        while (iter.hasNext()) {
          if (iter.peekType() !== 'insert') return;
          var thisOp = iter.peek();
          var start = op.length(thisOp) - iter.peekLength();
          var index = typeof thisOp.insert === 'string' ? thisOp.insert.indexOf(newline, start) - start : -1;
          if (index < 0) {
            line.push(iter.next());
          } else if (index > 0) {
            line.push(iter.next(index));
          } else {
            if (predicate(line, iter.next(1).attributes || {}, i) === false) {
              return;
            }
            i += 1;
            line = new Delta();
          }
        }
        if (line.length() > 0) {
          predicate(line, {}, i);
        }
      };

      Delta.prototype.transform = function (other, priority) {
        priority = !!priority;
        if (typeof other === 'number') {
          return this.transformPosition(other, priority);
        }
        var thisIter = op.iterator(this.ops);
        var otherIter = op.iterator(other.ops);
        var delta = new Delta();
        while (thisIter.hasNext() || otherIter.hasNext()) {
          if (thisIter.peekType() === 'insert' && (priority || otherIter.peekType() !== 'insert')) {
            delta.retain(op.length(thisIter.next()));
          } else if (otherIter.peekType() === 'insert') {
            delta.push(otherIter.next());
          } else {
            var length = Math.min(thisIter.peekLength(), otherIter.peekLength());
            var thisOp = thisIter.next(length);
            var otherOp = otherIter.next(length);
            if (thisOp['delete']) {
              // Our delete either makes their delete redundant or removes their retain
              continue;
            } else if (otherOp['delete']) {
              delta.push(otherOp);
            } else {
              // We retain either their retain or insert
              delta.retain(length, op.attributes.transform(thisOp.attributes, otherOp.attributes, priority));
            }
          }
        }
        return delta.chop();
      };

      Delta.prototype.transformPosition = function (index, priority) {
        priority = !!priority;
        var thisIter = op.iterator(this.ops);
        var offset = 0;
        while (thisIter.hasNext() && offset <= index) {
          var length = thisIter.peekLength();
          var nextType = thisIter.peekType();
          thisIter.next();
          if (nextType === 'delete') {
            index -= Math.min(length, index - offset);
            continue;
          } else if (nextType === 'insert' && (offset < index || !priority)) {
            index += length;
          }
          offset += length;
        }
        return index;
      };

      module.exports = Delta;

      /***/
    },
    /* 3 */
    /***/function (module, exports) {

      'use strict';

      var hasOwn = Object.prototype.hasOwnProperty;
      var toStr = Object.prototype.toString;

      var isArray = function isArray(arr) {
        if (typeof Array.isArray === 'function') {
          return Array.isArray(arr);
        }

        return toStr.call(arr) === '[object Array]';
      };

      var isPlainObject = function isPlainObject(obj) {
        if (!obj || toStr.call(obj) !== '[object Object]') {
          return false;
        }

        var hasOwnConstructor = hasOwn.call(obj, 'constructor');
        var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
        // Not own constructor property must be Object
        if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
          return false;
        }

        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.
        var key;
        for (key in obj) {/**/}

        return typeof key === 'undefined' || hasOwn.call(obj, key);
      };

      module.exports = function extend() {
        var options, name, src, copy, copyIsArray, clone;
        var target = arguments[0];
        var i = 1;
        var length = arguments.length;
        var deep = false;

        // Handle a deep copy situation
        if (typeof target === 'boolean') {
          deep = target;
          target = arguments[1] || {};
          // skip the boolean and the target
          i = 2;
        }
        if (target == null || (typeof target === 'undefined' ? 'undefined' : _typeof2(target)) !== 'object' && typeof target !== 'function') {
          target = {};
        }

        for (; i < length; ++i) {
          options = arguments[i];
          // Only deal with non-null/undefined values
          if (options != null) {
            // Extend the base object
            for (name in options) {
              src = target[name];
              copy = options[name];

              // Prevent never-ending loop
              if (target !== copy) {
                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                  if (copyIsArray) {
                    copyIsArray = false;
                    clone = src && isArray(src) ? src : [];
                  } else {
                    clone = src && isPlainObject(src) ? src : {};
                  }

                  // Never move original objects, clone them
                  target[name] = extend(deep, clone, copy);

                  // Don't bring in undefined values
                } else if (typeof copy !== 'undefined') {
                  target[name] = copy;
                }
              }
            }
          }
        }

        // Return the modified object
        return target;
      };

      /***/
    },
    /* 4 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = exports.BlockEmbed = exports.bubbleFormats = undefined;

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _extend = __webpack_require__(3);

      var _extend2 = _interopRequireDefault(_extend);

      var _quillDelta = __webpack_require__(2);

      var _quillDelta2 = _interopRequireDefault(_quillDelta);

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      var _break = __webpack_require__(17);

      var _break2 = _interopRequireDefault(_break);

      var _embed = __webpack_require__(7);

      var _embed2 = _interopRequireDefault(_embed);

      var _inline = __webpack_require__(8);

      var _inline2 = _interopRequireDefault(_inline);

      var _text = __webpack_require__(12);

      var _text2 = _interopRequireDefault(_text);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var NEWLINE_LENGTH = 1;

      var BlockEmbed = function (_Embed) {
        _inherits(BlockEmbed, _Embed);

        function BlockEmbed() {
          _classCallCheck(this, BlockEmbed);

          return _possibleConstructorReturn(this, (BlockEmbed.__proto__ || Object.getPrototypeOf(BlockEmbed)).apply(this, arguments));
        }

        _createClass(BlockEmbed, [{
          key: 'attach',
          value: function attach() {
            _get(BlockEmbed.prototype.__proto__ || Object.getPrototypeOf(BlockEmbed.prototype), 'attach', this).call(this);
            this.attributes = new _parchment2.default.Attributor.Store(this.domNode);
          }
        }, {
          key: 'delta',
          value: function delta() {
            return new _quillDelta2.default().insert(this.value(), (0, _extend2.default)(this.formats(), this.attributes.values()));
          }
        }, {
          key: 'format',
          value: function format(name, value) {
            var attribute = _parchment2.default.query(name, _parchment2.default.Scope.BLOCK_ATTRIBUTE);
            if (attribute != null) {
              this.attributes.attribute(attribute, value);
            }
          }
        }, {
          key: 'formatAt',
          value: function formatAt(index, length, name, value) {
            this.format(name, value);
          }
        }, {
          key: 'insertAt',
          value: function insertAt(index, value, def) {
            if (typeof value === 'string' && value.endsWith('\n')) {
              var block = _parchment2.default.create(Block.blotName);
              this.parent.insertBefore(block, index === 0 ? this : this.next);
              block.insertAt(0, value.slice(0, -1));
            } else {
              _get(BlockEmbed.prototype.__proto__ || Object.getPrototypeOf(BlockEmbed.prototype), 'insertAt', this).call(this, index, value, def);
            }
          }
        }]);

        return BlockEmbed;
      }(_embed2.default);

      BlockEmbed.scope = _parchment2.default.Scope.BLOCK_BLOT;
      // It is important for cursor behavior BlockEmbeds use tags that are block level elements


      var Block = function (_Parchment$Block) {
        _inherits(Block, _Parchment$Block);

        function Block(domNode) {
          _classCallCheck(this, Block);

          var _this2 = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, domNode));

          _this2.cache = {};
          return _this2;
        }

        _createClass(Block, [{
          key: 'delta',
          value: function delta() {
            if (this.cache.delta == null) {
              this.cache.delta = this.descendants(_parchment2.default.Leaf).reduce(function (delta, leaf) {
                if (leaf.length() === 0) {
                  return delta;
                } else {
                  return delta.insert(leaf.value(), bubbleFormats(leaf));
                }
              }, new _quillDelta2.default()).insert('\n', bubbleFormats(this));
            }
            return this.cache.delta;
          }
        }, {
          key: 'deleteAt',
          value: function deleteAt(index, length) {
            _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'deleteAt', this).call(this, index, length);
            this.cache = {};
          }
        }, {
          key: 'formatAt',
          value: function formatAt(index, length, name, value) {
            if (length <= 0) return;
            if (_parchment2.default.query(name, _parchment2.default.Scope.BLOCK)) {
              if (index + length === this.length()) {
                this.format(name, value);
              }
            } else {
              _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'formatAt', this).call(this, index, Math.min(length, this.length() - index - 1), name, value);
            }
            this.cache = {};
          }
        }, {
          key: 'insertAt',
          value: function insertAt(index, value, def) {
            if (def != null) return _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'insertAt', this).call(this, index, value, def);
            if (value.length === 0) return;
            var lines = value.split('\n');
            var text = lines.shift();
            if (text.length > 0) {
              if (index < this.length() - 1 || this.children.tail == null) {
                _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'insertAt', this).call(this, Math.min(index, this.length() - 1), text);
              } else {
                this.children.tail.insertAt(this.children.tail.length(), text);
              }
              this.cache = {};
            }
            var block = this;
            lines.reduce(function (index, line) {
              block = block.split(index, true);
              block.insertAt(0, line);
              return line.length;
            }, index + text.length);
          }
        }, {
          key: 'insertBefore',
          value: function insertBefore(blot, ref) {
            var head = this.children.head;
            _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'insertBefore', this).call(this, blot, ref);
            if (head instanceof _break2.default) {
              head.remove();
            }
            this.cache = {};
          }
        }, {
          key: 'length',
          value: function length() {
            if (this.cache.length == null) {
              this.cache.length = _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'length', this).call(this) + NEWLINE_LENGTH;
            }
            return this.cache.length;
          }
        }, {
          key: 'moveChildren',
          value: function moveChildren(target, ref) {
            _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'moveChildren', this).call(this, target, ref);
            this.cache = {};
          }
        }, {
          key: 'optimize',
          value: function optimize() {
            _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'optimize', this).call(this);
            this.cache = {};
          }
        }, {
          key: 'path',
          value: function path(index) {
            return _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'path', this).call(this, index, true);
          }
        }, {
          key: 'removeChild',
          value: function removeChild(child) {
            _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'removeChild', this).call(this, child);
            this.cache = {};
          }
        }, {
          key: 'split',
          value: function split(index) {
            var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (force && (index === 0 || index >= this.length() - NEWLINE_LENGTH)) {
              var clone = this.clone();
              if (index === 0) {
                this.parent.insertBefore(clone, this);
                return this;
              } else {
                this.parent.insertBefore(clone, this.next);
                return clone;
              }
            } else {
              var next = _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'split', this).call(this, index, force);
              this.cache = {};
              return next;
            }
          }
        }]);

        return Block;
      }(_parchment2.default.Block);

      Block.blotName = 'block';
      Block.tagName = 'P';
      Block.defaultChild = 'break';
      Block.allowedChildren = [_inline2.default, _embed2.default, _text2.default];

      function bubbleFormats(blot) {
        var formats = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (blot == null) return formats;
        if (typeof blot.formats === 'function') {
          formats = (0, _extend2.default)(formats, blot.formats());
        }
        if (blot.parent == null || blot.parent.blotName == 'scroll' || blot.parent.statics.scope !== blot.statics.scope) {
          return formats;
        }
        return bubbleFormats(blot.parent, formats);
      }

      exports.bubbleFormats = bubbleFormats;
      exports.BlockEmbed = BlockEmbed;
      exports.default = Block;

      /***/
    },
    /* 5 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _eventemitter = __webpack_require__(53);

      var _eventemitter2 = _interopRequireDefault(_eventemitter);

      var _logger = __webpack_require__(10);

      var _logger2 = _interopRequireDefault(_logger);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var debug = (0, _logger2.default)('quill:events');

      var Emitter = function (_EventEmitter) {
        _inherits(Emitter, _EventEmitter);

        function Emitter() {
          _classCallCheck(this, Emitter);

          var _this = _possibleConstructorReturn(this, (Emitter.__proto__ || Object.getPrototypeOf(Emitter)).call(this));

          _this.on('error', debug.error);
          return _this;
        }

        _createClass(Emitter, [{
          key: 'emit',
          value: function emit() {
            debug.log.apply(debug, arguments);
            _get(Emitter.prototype.__proto__ || Object.getPrototypeOf(Emitter.prototype), 'emit', this).apply(this, arguments);
          }
        }]);

        return Emitter;
      }(_eventemitter2.default);

      Emitter.events = {
        EDITOR_CHANGE: 'editor-change',
        SCROLL_BEFORE_UPDATE: 'scroll-before-update',
        SCROLL_OPTIMIZE: 'scroll-optimize',
        SCROLL_UPDATE: 'scroll-update',
        SELECTION_CHANGE: 'selection-change',
        TEXT_CHANGE: 'text-change'
      };
      Emitter.sources = {
        API: 'api',
        SILENT: 'silent',
        USER: 'user'
      };

      exports.default = Emitter;

      /***/
    },
    /* 6 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = exports.overload = exports.expandConfig = undefined;

      var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      };

      var _slicedToArray = function () {
        function sliceIterator(arr, i) {
          var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;_e = err;
          } finally {
            try {
              if (!_n && _i["return"]) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }return _arr;
        }return function (arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      __webpack_require__(44);

      var _quillDelta = __webpack_require__(2);

      var _quillDelta2 = _interopRequireDefault(_quillDelta);

      var _editor = __webpack_require__(14);

      var _editor2 = _interopRequireDefault(_editor);

      var _emitter3 = __webpack_require__(5);

      var _emitter4 = _interopRequireDefault(_emitter3);

      var _module = __webpack_require__(9);

      var _module2 = _interopRequireDefault(_module);

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      var _selection = __webpack_require__(15);

      var _selection2 = _interopRequireDefault(_selection);

      var _extend = __webpack_require__(3);

      var _extend2 = _interopRequireDefault(_extend);

      var _logger = __webpack_require__(10);

      var _logger2 = _interopRequireDefault(_logger);

      var _theme = __webpack_require__(30);

      var _theme2 = _interopRequireDefault(_theme);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key] = value;
        }return obj;
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var debug = (0, _logger2.default)('quill');

      var Quill = function () {
        _createClass(Quill, null, [{
          key: 'debug',
          value: function debug(limit) {
            if (limit === true) {
              limit = 'log';
            }
            _logger2.default.level(limit);
          }
        }, {
          key: 'find',
          value: function find(node) {
            return node.__quill || _parchment2.default.find(node);
          }
        }, {
          key: 'import',
          value: function _import(name) {
            if (this.imports[name] == null) {
              debug.error('Cannot import ' + name + '. Are you sure it was registered?');
            }
            return this.imports[name];
          }
        }, {
          key: 'register',
          value: function register(path, target) {
            var _this = this;

            var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (typeof path !== 'string') {
              var name = path.attrName || path.blotName;
              if (typeof name === 'string') {
                // register(Blot | Attributor, overwrite)
                this.register('formats/' + name, path, target);
              } else {
                Object.keys(path).forEach(function (key) {
                  _this.register(key, path[key], target);
                });
              }
            } else {
              if (this.imports[path] != null && !overwrite) {
                debug.warn('Overwriting ' + path + ' with', target);
              }
              this.imports[path] = target;
              if ((path.startsWith('blots/') || path.startsWith('formats/')) && target.blotName !== 'abstract') {
                _parchment2.default.register(target);
              } else if (path.startsWith('modules') && typeof target.register === 'function') {
                target.register();
              }
            }
          }
        }]);

        function Quill(container) {
          var _this2 = this;

          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          _classCallCheck(this, Quill);

          this.options = expandConfig(container, options);
          this.container = this.options.container;
          if (this.container == null) {
            return debug.error('Invalid Quill container', container);
          }
          if (this.options.debug) {
            Quill.debug(this.options.debug);
          }
          var html = this.container.innerHTML.trim();
          this.container.classList.add('ql-container');
          this.container.innerHTML = '';
          this.container.__quill = this;
          this.root = this.addContainer('ql-editor');
          this.root.classList.add('ql-blank');
          this.root.setAttribute('data-gramm', false);
          this.scrollingContainer = this.options.scrollingContainer || this.root;
          this.emitter = new _emitter4.default();
          this.scroll = _parchment2.default.create(this.root, {
            emitter: this.emitter,
            scrollingContainer: this.scrollingContainer,
            whitelist: this.options.formats
          });
          this.editor = new _editor2.default(this.scroll);
          this.selection = new _selection2.default(this.scroll, this.emitter);
          this.theme = new this.options.theme(this, this.options);
          this.keyboard = this.theme.addModule('keyboard');
          this.clipboard = this.theme.addModule('clipboard');
          this.history = this.theme.addModule('history');
          this.theme.init();
          this.emitter.on(_emitter4.default.events.EDITOR_CHANGE, function (type) {
            if (type === _emitter4.default.events.TEXT_CHANGE) {
              _this2.root.classList.toggle('ql-blank', _this2.editor.isBlank());
            }
          });
          this.emitter.on(_emitter4.default.events.SCROLL_UPDATE, function (source, mutations) {
            var range = _this2.selection.lastRange;
            var index = range && range.length === 0 ? range.index : undefined;
            modify.call(_this2, function () {
              return _this2.editor.update(null, mutations, index);
            }, source);
          });
          var contents = this.clipboard.convert('<div class=\'ql-editor\' style="white-space: normal;">' + html + '<p><br></p></div>');
          this.setContents(contents);
          this.history.clear();
          if (this.options.placeholder) {
            this.root.setAttribute('data-placeholder', this.options.placeholder);
          }
          if (this.options.readOnly) {
            this.disable();
          }
        }

        _createClass(Quill, [{
          key: 'addContainer',
          value: function addContainer(container) {
            var refNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (typeof container === 'string') {
              var className = container;
              container = document.createElement('div');
              container.classList.add(className);
            }
            this.container.insertBefore(container, refNode);
            return container;
          }
        }, {
          key: 'blur',
          value: function blur() {
            this.selection.setRange(null);
          }
        }, {
          key: 'deleteText',
          value: function deleteText(index, length, source) {
            var _this3 = this;

            var _overload = overload(index, length, source);

            var _overload2 = _slicedToArray(_overload, 4);

            index = _overload2[0];
            length = _overload2[1];
            source = _overload2[3];

            return modify.call(this, function () {
              return _this3.editor.deleteText(index, length);
            }, source, index, -1 * length);
          }
        }, {
          key: 'disable',
          value: function disable() {
            this.enable(false);
          }
        }, {
          key: 'enable',
          value: function enable() {
            var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            this.scroll.enable(enabled);
            this.container.classList.toggle('ql-disabled', !enabled);
          }
        }, {
          key: 'focus',
          value: function focus() {
            var scrollTop = this.scrollingContainer.scrollTop;
            this.selection.focus();
            this.scrollingContainer.scrollTop = scrollTop;
            this.selection.scrollIntoView();
          }
        }, {
          key: 'format',
          value: function format(name, value) {
            var _this4 = this;

            var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _emitter4.default.sources.API;

            return modify.call(this, function () {
              var range = _this4.getSelection(true);
              var change = new _quillDelta2.default();
              if (range == null) {
                return change;
              } else if (_parchment2.default.query(name, _parchment2.default.Scope.BLOCK)) {
                change = _this4.editor.formatLine(range.index, range.length, _defineProperty({}, name, value));
              } else if (range.length === 0) {
                _this4.selection.format(name, value);
                return change;
              } else {
                change = _this4.editor.formatText(range.index, range.length, _defineProperty({}, name, value));
              }
              _this4.setSelection(range, _emitter4.default.sources.SILENT);
              return change;
            }, source);
          }
        }, {
          key: 'formatLine',
          value: function formatLine(index, length, name, value, source) {
            var _this5 = this;

            var formats = void 0;

            var _overload3 = overload(index, length, name, value, source);

            var _overload4 = _slicedToArray(_overload3, 4);

            index = _overload4[0];
            length = _overload4[1];
            formats = _overload4[2];
            source = _overload4[3];

            return modify.call(this, function () {
              return _this5.editor.formatLine(index, length, formats);
            }, source, index, 0);
          }
        }, {
          key: 'formatText',
          value: function formatText(index, length, name, value, source) {
            var _this6 = this;

            var formats = void 0;

            var _overload5 = overload(index, length, name, value, source);

            var _overload6 = _slicedToArray(_overload5, 4);

            index = _overload6[0];
            length = _overload6[1];
            formats = _overload6[2];
            source = _overload6[3];

            return modify.call(this, function () {
              return _this6.editor.formatText(index, length, formats);
            }, source, index, 0);
          }
        }, {
          key: 'getBounds',
          value: function getBounds(index) {
            var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var bounds = void 0;
            if (typeof index === 'number') {
              bounds = this.selection.getBounds(index, length);
            } else {
              bounds = this.selection.getBounds(index.index, index.length);
            }
            var containerBounds = this.container.getBoundingClientRect();
            return {
              bottom: bounds.bottom - containerBounds.top,
              height: bounds.height,
              left: bounds.left - containerBounds.left,
              right: bounds.right - containerBounds.left,
              top: bounds.top - containerBounds.top,
              width: bounds.width
            };
          }
        }, {
          key: 'getContents',
          value: function getContents() {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getLength() - index;

            var _overload7 = overload(index, length);

            var _overload8 = _slicedToArray(_overload7, 2);

            index = _overload8[0];
            length = _overload8[1];

            return this.editor.getContents(index, length);
          }
        }, {
          key: 'getFormat',
          value: function getFormat() {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getSelection();
            var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (typeof index === 'number') {
              return this.editor.getFormat(index, length);
            } else {
              return this.editor.getFormat(index.index, index.length);
            }
          }
        }, {
          key: 'getIndex',
          value: function getIndex(blot) {
            return blot.offset(this.scroll);
          }
        }, {
          key: 'getLength',
          value: function getLength() {
            return this.scroll.length();
          }
        }, {
          key: 'getLeaf',
          value: function getLeaf(index) {
            return this.scroll.leaf(index);
          }
        }, {
          key: 'getLine',
          value: function getLine(index) {
            return this.scroll.line(index);
          }
        }, {
          key: 'getLines',
          value: function getLines() {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MAX_VALUE;

            if (typeof index !== 'number') {
              return this.scroll.lines(index.index, index.length);
            } else {
              return this.scroll.lines(index, length);
            }
          }
        }, {
          key: 'getModule',
          value: function getModule(name) {
            return this.theme.modules[name];
          }
        }, {
          key: 'getSelection',
          value: function getSelection() {
            var focus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (focus) this.focus();
            this.update(); // Make sure we access getRange with editor in consistent state
            return this.selection.getRange()[0];
          }
        }, {
          key: 'getText',
          value: function getText() {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getLength() - index;

            var _overload9 = overload(index, length);

            var _overload10 = _slicedToArray(_overload9, 2);

            index = _overload10[0];
            length = _overload10[1];

            return this.editor.getText(index, length);
          }
        }, {
          key: 'hasFocus',
          value: function hasFocus() {
            return this.selection.hasFocus();
          }
        }, {
          key: 'insertEmbed',
          value: function insertEmbed(index, embed, value) {
            var _this7 = this;

            var source = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Quill.sources.API;

            return modify.call(this, function () {
              return _this7.editor.insertEmbed(index, embed, value);
            }, source, index);
          }
        }, {
          key: 'insertText',
          value: function insertText(index, text, name, value, source) {
            var _this8 = this;

            var formats = void 0;

            var _overload11 = overload(index, 0, name, value, source);

            var _overload12 = _slicedToArray(_overload11, 4);

            index = _overload12[0];
            formats = _overload12[2];
            source = _overload12[3];

            return modify.call(this, function () {
              return _this8.editor.insertText(index, text, formats);
            }, source, index, text.length);
          }
        }, {
          key: 'isEnabled',
          value: function isEnabled() {
            return !this.container.classList.contains('ql-disabled');
          }
        }, {
          key: 'off',
          value: function off() {
            return this.emitter.off.apply(this.emitter, arguments);
          }
        }, {
          key: 'on',
          value: function on() {
            return this.emitter.on.apply(this.emitter, arguments);
          }
        }, {
          key: 'once',
          value: function once() {
            return this.emitter.once.apply(this.emitter, arguments);
          }
        }, {
          key: 'pasteHTML',
          value: function pasteHTML(index, html, source) {
            this.clipboard.dangerouslyPasteHTML(index, html, source);
          }
        }, {
          key: 'removeFormat',
          value: function removeFormat(index, length, source) {
            var _this9 = this;

            var _overload13 = overload(index, length, source);

            var _overload14 = _slicedToArray(_overload13, 4);

            index = _overload14[0];
            length = _overload14[1];
            source = _overload14[3];

            return modify.call(this, function () {
              return _this9.editor.removeFormat(index, length);
            }, source, index);
          }
        }, {
          key: 'setContents',
          value: function setContents(delta) {
            var _this10 = this;

            var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _emitter4.default.sources.API;

            return modify.call(this, function () {
              delta = new _quillDelta2.default(delta);
              var length = _this10.getLength();
              var deleted = _this10.editor.deleteText(0, length);
              var applied = _this10.editor.applyDelta(delta);
              var lastOp = applied.ops[applied.ops.length - 1];
              if (lastOp != null && typeof lastOp.insert === 'string' && lastOp.insert[lastOp.insert.length - 1] === '\n') {
                _this10.editor.deleteText(_this10.getLength() - 1, 1);
                applied.delete(1);
              }
              var ret = deleted.compose(applied);
              return ret;
            }, source);
          }
        }, {
          key: 'setSelection',
          value: function setSelection(index, length, source) {
            if (index == null) {
              this.selection.setRange(null, length || Quill.sources.API);
            } else {
              var _overload15 = overload(index, length, source);

              var _overload16 = _slicedToArray(_overload15, 4);

              index = _overload16[0];
              length = _overload16[1];
              source = _overload16[3];

              this.selection.setRange(new _selection.Range(index, length), source);
            }
            if (source !== _emitter4.default.sources.SILENT) {
              this.selection.scrollIntoView();
            }
          }
        }, {
          key: 'setText',
          value: function setText(text) {
            var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _emitter4.default.sources.API;

            var delta = new _quillDelta2.default().insert(text);
            return this.setContents(delta, source);
          }
        }, {
          key: 'update',
          value: function update() {
            var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _emitter4.default.sources.USER;

            var change = this.scroll.update(source); // Will update selection before selection.update() does if text changes
            this.selection.update(source);
            return change;
          }
        }, {
          key: 'updateContents',
          value: function updateContents(delta) {
            var _this11 = this;

            var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _emitter4.default.sources.API;

            return modify.call(this, function () {
              delta = new _quillDelta2.default(delta);
              return _this11.editor.applyDelta(delta, source);
            }, source, true);
          }
        }]);

        return Quill;
      }();

      Quill.DEFAULTS = {
        bounds: null,
        formats: null,
        modules: {},
        placeholder: '',
        readOnly: false,
        scrollingContainer: null,
        strict: true,
        theme: 'default'
      };
      Quill.events = _emitter4.default.events;
      Quill.sources = _emitter4.default.sources;
      // eslint-disable-next-line no-undef
      Quill.version = false ? 'dev' : "1.2.6";

      Quill.imports = {
        'delta': _quillDelta2.default,
        'parchment': _parchment2.default,
        'core/module': _module2.default,
        'core/theme': _theme2.default
      };

      function expandConfig(container, userConfig) {
        userConfig = (0, _extend2.default)(true, {
          container: container,
          modules: {
            clipboard: true,
            keyboard: true,
            history: true
          }
        }, userConfig);
        if (!userConfig.theme || userConfig.theme === Quill.DEFAULTS.theme) {
          userConfig.theme = _theme2.default;
        } else {
          userConfig.theme = Quill.import('themes/' + userConfig.theme);
          if (userConfig.theme == null) {
            throw new Error('Invalid theme ' + userConfig.theme + '. Did you register it?');
          }
        }
        var themeConfig = (0, _extend2.default)(true, {}, userConfig.theme.DEFAULTS);
        [themeConfig, userConfig].forEach(function (config) {
          config.modules = config.modules || {};
          Object.keys(config.modules).forEach(function (module) {
            if (config.modules[module] === true) {
              config.modules[module] = {};
            }
          });
        });
        var moduleNames = Object.keys(themeConfig.modules).concat(Object.keys(userConfig.modules));
        var moduleConfig = moduleNames.reduce(function (config, name) {
          var moduleClass = Quill.import('modules/' + name);
          if (moduleClass == null) {
            debug.error('Cannot load ' + name + ' module. Are you sure you registered it?');
          } else {
            config[name] = moduleClass.DEFAULTS || {};
          }
          return config;
        }, {});
        // Special case toolbar shorthand
        if (userConfig.modules != null && userConfig.modules.toolbar && userConfig.modules.toolbar.constructor !== Object) {
          userConfig.modules.toolbar = {
            container: userConfig.modules.toolbar
          };
        }
        userConfig = (0, _extend2.default)(true, {}, Quill.DEFAULTS, { modules: moduleConfig }, themeConfig, userConfig);
        ['bounds', 'container', 'scrollingContainer'].forEach(function (key) {
          if (typeof userConfig[key] === 'string') {
            userConfig[key] = document.querySelector(userConfig[key]);
          }
        });
        userConfig.modules = Object.keys(userConfig.modules).reduce(function (config, name) {
          if (userConfig.modules[name]) {
            config[name] = userConfig.modules[name];
          }
          return config;
        }, {});
        return userConfig;
      }

      // Handle selection preservation and TEXT_CHANGE emission
      // common to modification APIs
      function modify(modifier, source, index, shift) {
        if (this.options.strict && !this.isEnabled() && source === _emitter4.default.sources.USER) {
          return new _quillDelta2.default();
        }
        var range = index == null ? null : this.getSelection();
        var oldDelta = this.editor.delta;
        var change = modifier();
        if (range != null) {
          if (index === true) index = range.index;
          if (shift == null) {
            range = shiftRange(range, change, source);
          } else if (shift !== 0) {
            range = shiftRange(range, index, shift, source);
          }
          this.setSelection(range, _emitter4.default.sources.SILENT);
        }
        if (change.length() > 0) {
          var _emitter;

          var args = [_emitter4.default.events.TEXT_CHANGE, change, oldDelta, source];
          (_emitter = this.emitter).emit.apply(_emitter, [_emitter4.default.events.EDITOR_CHANGE].concat(args));
          if (source !== _emitter4.default.sources.SILENT) {
            var _emitter2;

            (_emitter2 = this.emitter).emit.apply(_emitter2, args);
          }
        }
        return change;
      }

      function overload(index, length, name, value, source) {
        var formats = {};
        if (typeof index.index === 'number' && typeof index.length === 'number') {
          // Allow for throwaway end (used by insertText/insertEmbed)
          if (typeof length !== 'number') {
            source = value, value = name, name = length, length = index.length, index = index.index;
          } else {
            length = index.length, index = index.index;
          }
        } else if (typeof length !== 'number') {
          source = value, value = name, name = length, length = 0;
        }
        // Handle format being object, two format name/value strings or excluded
        if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
          formats = name;
          source = value;
        } else if (typeof name === 'string') {
          if (value != null) {
            formats[name] = value;
          } else {
            source = name;
          }
        }
        // Handle optional source
        source = source || _emitter4.default.sources.API;
        return [index, length, formats, source];
      }

      function shiftRange(range, index, length, source) {
        if (range == null) return null;
        var start = void 0,
            end = void 0;
        if (index instanceof _quillDelta2.default) {
          var _map = [range.index, range.index + range.length].map(function (pos) {
            return index.transformPosition(pos, source !== _emitter4.default.sources.USER);
          });

          var _map2 = _slicedToArray(_map, 2);

          start = _map2[0];
          end = _map2[1];
        } else {
          var _map3 = [range.index, range.index + range.length].map(function (pos) {
            if (pos < index || pos === index && source === _emitter4.default.sources.USER) return pos;
            if (length >= 0) {
              return pos + length;
            } else {
              return Math.max(index, pos + length);
            }
          });

          var _map4 = _slicedToArray(_map3, 2);

          start = _map4[0];
          end = _map4[1];
        }
        return new _selection.Range(start, end - start);
      }

      exports.expandConfig = expandConfig;
      exports.overload = overload;
      exports.default = Quill;

      /***/
    },
    /* 7 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Embed = function (_Parchment$Embed) {
        _inherits(Embed, _Parchment$Embed);

        function Embed() {
          _classCallCheck(this, Embed);

          return _possibleConstructorReturn(this, (Embed.__proto__ || Object.getPrototypeOf(Embed)).apply(this, arguments));
        }

        return Embed;
      }(_parchment2.default.Embed);

      exports.default = Embed;

      /***/
    },
    /* 8 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _embed = __webpack_require__(7);

      var _embed2 = _interopRequireDefault(_embed);

      var _text = __webpack_require__(12);

      var _text2 = _interopRequireDefault(_text);

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Inline = function (_Parchment$Inline) {
        _inherits(Inline, _Parchment$Inline);

        function Inline() {
          _classCallCheck(this, Inline);

          return _possibleConstructorReturn(this, (Inline.__proto__ || Object.getPrototypeOf(Inline)).apply(this, arguments));
        }

        _createClass(Inline, [{
          key: 'formatAt',
          value: function formatAt(index, length, name, value) {
            if (Inline.compare(this.statics.blotName, name) < 0 && _parchment2.default.query(name, _parchment2.default.Scope.BLOT)) {
              var blot = this.isolate(index, length);
              if (value) {
                blot.wrap(name, value);
              }
            } else {
              _get(Inline.prototype.__proto__ || Object.getPrototypeOf(Inline.prototype), 'formatAt', this).call(this, index, length, name, value);
            }
          }
        }, {
          key: 'optimize',
          value: function optimize() {
            _get(Inline.prototype.__proto__ || Object.getPrototypeOf(Inline.prototype), 'optimize', this).call(this);
            if (this.parent instanceof Inline && Inline.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
              var parent = this.parent.isolate(this.offset(), this.length());
              this.moveChildren(parent);
              parent.wrap(this);
            }
          }
        }], [{
          key: 'compare',
          value: function compare(self, other) {
            var selfIndex = Inline.order.indexOf(self);
            var otherIndex = Inline.order.indexOf(other);
            if (selfIndex >= 0 || otherIndex >= 0) {
              return selfIndex - otherIndex;
            } else if (self === other) {
              return 0;
            } else if (self < other) {
              return -1;
            } else {
              return 1;
            }
          }
        }]);

        return Inline;
      }(_parchment2.default.Inline);

      Inline.allowedChildren = [Inline, _embed2.default, _text2.default];
      // Lower index means deeper in the DOM tree, since not found (-1) is for embeds
      Inline.order = ['cursor', 'inline', // Must be lower
      'code', 'underline', 'strike', 'italic', 'bold', 'script', 'link' // Must be higher
      ];

      exports.default = Inline;

      /***/
    },
    /* 9 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Module = function Module(quill) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Module);

        this.quill = quill;
        this.options = options;
      };

      Module.DEFAULTS = {};

      exports.default = Module;

      /***/
    },
    /* 10 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var levels = ['error', 'warn', 'log', 'info'];
      var level = 'warn';

      function debug(method) {
        if (levels.indexOf(method) <= levels.indexOf(level)) {
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          console[method].apply(console, args); // eslint-disable-line no-console
        }
      }

      function namespace(ns) {
        return levels.reduce(function (logger, method) {
          logger[method] = debug.bind(console, method, ns);
          return logger;
        }, {});
      }

      debug.level = namespace.level = function (newLevel) {
        level = newLevel;
      };

      exports.default = namespace;

      /***/
    },
    /* 11 */
    /***/function (module, exports, __webpack_require__) {

      var pSlice = Array.prototype.slice;
      var objectKeys = __webpack_require__(52);
      var isArguments = __webpack_require__(51);

      var deepEqual = module.exports = function (actual, expected, opts) {
        if (!opts) opts = {};
        // 7.1. All identical values are equivalent, as determined by ===.
        if (actual === expected) {
          return true;
        } else if (actual instanceof Date && expected instanceof Date) {
          return actual.getTime() === expected.getTime();

          // 7.3. Other pairs that do not both pass typeof value == 'object',
          // equivalence is determined by ==.
        } else if (!actual || !expected || (typeof actual === 'undefined' ? 'undefined' : _typeof2(actual)) != 'object' && (typeof expected === 'undefined' ? 'undefined' : _typeof2(expected)) != 'object') {
          return opts.strict ? actual === expected : actual == expected;

          // 7.4. For all other Object pairs, including Array objects, equivalence is
          // determined by having the same number of owned properties (as verified
          // with Object.prototype.hasOwnProperty.call), the same set of keys
          // (although not necessarily the same order), equivalent values for every
          // corresponding key, and an identical 'prototype' property. Note: this
          // accounts for both named and indexed properties on Arrays.
        } else {
          return objEquiv(actual, expected, opts);
        }
      };

      function isUndefinedOrNull(value) {
        return value === null || value === undefined;
      }

      function isBuffer(x) {
        if (!x || (typeof x === 'undefined' ? 'undefined' : _typeof2(x)) !== 'object' || typeof x.length !== 'number') return false;
        if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
          return false;
        }
        if (x.length > 0 && typeof x[0] !== 'number') return false;
        return true;
      }

      function objEquiv(a, b, opts) {
        var i, key;
        if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return false;
        // an identical 'prototype' property.
        if (a.prototype !== b.prototype) return false;
        //~~~I've managed to break Object.keys through screwy arguments passing.
        //   Converting to array solves the problem.
        if (isArguments(a)) {
          if (!isArguments(b)) {
            return false;
          }
          a = pSlice.call(a);
          b = pSlice.call(b);
          return deepEqual(a, b, opts);
        }
        if (isBuffer(a)) {
          if (!isBuffer(b)) {
            return false;
          }
          if (a.length !== b.length) return false;
          for (i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
          }
          return true;
        }
        try {
          var ka = objectKeys(a),
              kb = objectKeys(b);
        } catch (e) {
          //happens when one is a string literal and the other isn't
          return false;
        }
        // having the same number of owned properties (keys incorporates
        // hasOwnProperty)
        if (ka.length != kb.length) return false;
        //the same set of keys (although not necessarily the same order),
        ka.sort();
        kb.sort();
        //~~~cheap key test
        for (i = ka.length - 1; i >= 0; i--) {
          if (ka[i] != kb[i]) return false;
        }
        //equivalent values for every corresponding key, and
        //~~~possibly expensive deep test
        for (i = ka.length - 1; i >= 0; i--) {
          key = ka[i];
          if (!deepEqual(a[key], b[key], opts)) return false;
        }
        return (typeof a === 'undefined' ? 'undefined' : _typeof2(a)) === (typeof b === 'undefined' ? 'undefined' : _typeof2(b));
      }

      /***/
    },
    /* 12 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var TextBlot = function (_Parchment$Text) {
        _inherits(TextBlot, _Parchment$Text);

        function TextBlot() {
          _classCallCheck(this, TextBlot);

          return _possibleConstructorReturn(this, (TextBlot.__proto__ || Object.getPrototypeOf(TextBlot)).apply(this, arguments));
        }

        return TextBlot;
      }(_parchment2.default.Text);

      exports.default = TextBlot;

      /***/
    },
    /* 13 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", { value: true });
      var Registry = __webpack_require__(1);
      var Attributor = function () {
        function Attributor(attrName, keyName, options) {
          if (options === void 0) {
            options = {};
          }
          this.attrName = attrName;
          this.keyName = keyName;
          var attributeBit = Registry.Scope.TYPE & Registry.Scope.ATTRIBUTE;
          if (options.scope != null) {
            // Ignore type bits, force attribute bit
            this.scope = options.scope & Registry.Scope.LEVEL | attributeBit;
          } else {
            this.scope = Registry.Scope.ATTRIBUTE;
          }
          if (options.whitelist != null) this.whitelist = options.whitelist;
        }
        Attributor.keys = function (node) {
          return [].map.call(node.attributes, function (item) {
            return item.name;
          });
        };
        Attributor.prototype.add = function (node, value) {
          if (!this.canAdd(node, value)) return false;
          node.setAttribute(this.keyName, value);
          return true;
        };
        Attributor.prototype.canAdd = function (node, value) {
          var match = Registry.query(node, Registry.Scope.BLOT & (this.scope | Registry.Scope.TYPE));
          if (match != null && (this.whitelist == null || this.whitelist.indexOf(value) > -1)) {
            return true;
          }
          return false;
        };
        Attributor.prototype.remove = function (node) {
          node.removeAttribute(this.keyName);
        };
        Attributor.prototype.value = function (node) {
          var value = node.getAttribute(this.keyName);
          return this.canAdd(node, value) ? value : '';
        };
        return Attributor;
      }();
      exports.default = Attributor;

      /***/
    },
    /* 14 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      };

      var _slicedToArray = function () {
        function sliceIterator(arr, i) {
          var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;_e = err;
          } finally {
            try {
              if (!_n && _i["return"]) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }return _arr;
        }return function (arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _quillDelta = __webpack_require__(2);

      var _quillDelta2 = _interopRequireDefault(_quillDelta);

      var _op = __webpack_require__(20);

      var _op2 = _interopRequireDefault(_op);

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      var _code = __webpack_require__(16);

      var _code2 = _interopRequireDefault(_code);

      var _cursor = __webpack_require__(25);

      var _cursor2 = _interopRequireDefault(_cursor);

      var _block = __webpack_require__(4);

      var _block2 = _interopRequireDefault(_block);

      var _clone = __webpack_require__(19);

      var _clone2 = _interopRequireDefault(_clone);

      var _deepEqual = __webpack_require__(11);

      var _deepEqual2 = _interopRequireDefault(_deepEqual);

      var _extend = __webpack_require__(3);

      var _extend2 = _interopRequireDefault(_extend);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key] = value;
        }return obj;
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var ASCII = /^[ -~]*$/;

      var Editor = function () {
        function Editor(scroll) {
          _classCallCheck(this, Editor);

          this.scroll = scroll;
          this.delta = this.getDelta();
        }

        _createClass(Editor, [{
          key: 'applyDelta',
          value: function applyDelta(delta) {
            var _this = this;

            var consumeNextNewline = false;
            this.scroll.update();
            var scrollLength = this.scroll.length();
            this.scroll.batch = true;
            delta = normalizeDelta(delta);
            delta.reduce(function (index, op) {
              var length = op.retain || op.delete || op.insert.length || 1;
              var attributes = op.attributes || {};
              if (op.insert != null) {
                if (typeof op.insert === 'string') {
                  var text = op.insert;
                  if (text.endsWith('\n') && consumeNextNewline) {
                    consumeNextNewline = false;
                    text = text.slice(0, -1);
                  }
                  if (index >= scrollLength && !text.endsWith('\n')) {
                    consumeNextNewline = true;
                  }
                  _this.scroll.insertAt(index, text);

                  var _scroll$line = _this.scroll.line(index),
                      _scroll$line2 = _slicedToArray(_scroll$line, 2),
                      line = _scroll$line2[0],
                      offset = _scroll$line2[1];

                  var formats = (0, _extend2.default)({}, (0, _block.bubbleFormats)(line));
                  if (line instanceof _block2.default) {
                    var _line$descendant = line.descendant(_parchment2.default.Leaf, offset),
                        _line$descendant2 = _slicedToArray(_line$descendant, 1),
                        leaf = _line$descendant2[0];

                    formats = (0, _extend2.default)(formats, (0, _block.bubbleFormats)(leaf));
                  }
                  attributes = _op2.default.attributes.diff(formats, attributes) || {};
                } else if (_typeof(op.insert) === 'object') {
                  var key = Object.keys(op.insert)[0]; // There should only be one key
                  if (key == null) return index;
                  _this.scroll.insertAt(index, key, op.insert[key]);
                }
                scrollLength += length;
              }
              Object.keys(attributes).forEach(function (name) {
                _this.scroll.formatAt(index, length, name, attributes[name]);
              });
              return index + length;
            }, 0);
            delta.reduce(function (index, op) {
              if (typeof op.delete === 'number') {
                _this.scroll.deleteAt(index, op.delete);
                return index;
              }
              return index + (op.retain || op.insert.length || 1);
            }, 0);
            this.scroll.batch = false;
            this.scroll.optimize();
            return this.update(delta);
          }
        }, {
          key: 'deleteText',
          value: function deleteText(index, length) {
            this.scroll.deleteAt(index, length);
            return this.update(new _quillDelta2.default().retain(index).delete(length));
          }
        }, {
          key: 'formatLine',
          value: function formatLine(index, length) {
            var _this2 = this;

            var formats = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            this.scroll.update();
            Object.keys(formats).forEach(function (format) {
              if (_this2.scroll.whitelist != null && !_this2.scroll.whitelist[format]) return;
              var lines = _this2.scroll.lines(index, Math.max(length, 1));
              var lengthRemaining = length;
              lines.forEach(function (line) {
                var lineLength = line.length();
                if (!(line instanceof _code2.default)) {
                  line.format(format, formats[format]);
                } else {
                  var codeIndex = index - line.offset(_this2.scroll);
                  var codeLength = line.newlineIndex(codeIndex + lengthRemaining) - codeIndex + 1;
                  line.formatAt(codeIndex, codeLength, format, formats[format]);
                }
                lengthRemaining -= lineLength;
              });
            });
            this.scroll.optimize();
            return this.update(new _quillDelta2.default().retain(index).retain(length, (0, _clone2.default)(formats)));
          }
        }, {
          key: 'formatText',
          value: function formatText(index, length) {
            var _this3 = this;

            var formats = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            Object.keys(formats).forEach(function (format) {
              _this3.scroll.formatAt(index, length, format, formats[format]);
            });
            return this.update(new _quillDelta2.default().retain(index).retain(length, (0, _clone2.default)(formats)));
          }
        }, {
          key: 'getContents',
          value: function getContents(index, length) {
            return this.delta.slice(index, index + length);
          }
        }, {
          key: 'getDelta',
          value: function getDelta() {
            return this.scroll.lines().reduce(function (delta, line) {
              return delta.concat(line.delta());
            }, new _quillDelta2.default());
          }
        }, {
          key: 'getFormat',
          value: function getFormat(index) {
            var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var lines = [],
                leaves = [];
            if (length === 0) {
              this.scroll.path(index).forEach(function (path) {
                var _path = _slicedToArray(path, 1),
                    blot = _path[0];

                if (blot instanceof _block2.default) {
                  lines.push(blot);
                } else if (blot instanceof _parchment2.default.Leaf) {
                  leaves.push(blot);
                }
              });
            } else {
              lines = this.scroll.lines(index, length);
              leaves = this.scroll.descendants(_parchment2.default.Leaf, index, length);
            }
            var formatsArr = [lines, leaves].map(function (blots) {
              if (blots.length === 0) return {};
              var formats = (0, _block.bubbleFormats)(blots.shift());
              while (Object.keys(formats).length > 0) {
                var blot = blots.shift();
                if (blot == null) return formats;
                formats = combineFormats((0, _block.bubbleFormats)(blot), formats);
              }
              return formats;
            });
            return _extend2.default.apply(_extend2.default, formatsArr);
          }
        }, {
          key: 'getText',
          value: function getText(index, length) {
            return this.getContents(index, length).filter(function (op) {
              return typeof op.insert === 'string';
            }).map(function (op) {
              return op.insert;
            }).join('');
          }
        }, {
          key: 'insertEmbed',
          value: function insertEmbed(index, embed, value) {
            this.scroll.insertAt(index, embed, value);
            return this.update(new _quillDelta2.default().retain(index).insert(_defineProperty({}, embed, value)));
          }
        }, {
          key: 'insertText',
          value: function insertText(index, text) {
            var _this4 = this;

            var formats = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
            this.scroll.insertAt(index, text);
            Object.keys(formats).forEach(function (format) {
              _this4.scroll.formatAt(index, text.length, format, formats[format]);
            });
            return this.update(new _quillDelta2.default().retain(index).insert(text, (0, _clone2.default)(formats)));
          }
        }, {
          key: 'isBlank',
          value: function isBlank() {
            if (this.scroll.children.length == 0) return true;
            if (this.scroll.children.length > 1) return false;
            var child = this.scroll.children.head;
            return child.length() <= 1 && Object.keys(child.formats()).length == 0;
          }
        }, {
          key: 'removeFormat',
          value: function removeFormat(index, length) {
            var text = this.getText(index, length);

            var _scroll$line3 = this.scroll.line(index + length),
                _scroll$line4 = _slicedToArray(_scroll$line3, 2),
                line = _scroll$line4[0],
                offset = _scroll$line4[1];

            var suffixLength = 0,
                suffix = new _quillDelta2.default();
            if (line != null) {
              if (!(line instanceof _code2.default)) {
                suffixLength = line.length() - offset;
              } else {
                suffixLength = line.newlineIndex(offset) - offset + 1;
              }
              suffix = line.delta().slice(offset, offset + suffixLength - 1).insert('\n');
            }
            var contents = this.getContents(index, length + suffixLength);
            var diff = contents.diff(new _quillDelta2.default().insert(text).concat(suffix));
            var delta = new _quillDelta2.default().retain(index).concat(diff);
            return this.applyDelta(delta);
          }
        }, {
          key: 'update',
          value: function update(change) {
            var mutations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            var cursorIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

            var oldDelta = this.delta;
            if (mutations.length === 1 && mutations[0].type === 'characterData' && mutations[0].target.data.match(ASCII) && _parchment2.default.find(mutations[0].target)) {
              // Optimization for character changes
              var textBlot = _parchment2.default.find(mutations[0].target);
              var formats = (0, _block.bubbleFormats)(textBlot);
              var index = textBlot.offset(this.scroll);
              var oldValue = mutations[0].oldValue.replace(_cursor2.default.CONTENTS, '');
              var oldText = new _quillDelta2.default().insert(oldValue);
              var newText = new _quillDelta2.default().insert(textBlot.value());
              var diffDelta = new _quillDelta2.default().retain(index).concat(oldText.diff(newText, cursorIndex));
              change = diffDelta.reduce(function (delta, op) {
                if (op.insert) {
                  return delta.insert(op.insert, formats);
                } else {
                  return delta.push(op);
                }
              }, new _quillDelta2.default());
              this.delta = oldDelta.compose(change);
            } else {
              this.delta = this.getDelta();
              if (!change || !(0, _deepEqual2.default)(oldDelta.compose(change), this.delta)) {
                change = oldDelta.diff(this.delta, cursorIndex);
              }
            }
            return change;
          }
        }]);

        return Editor;
      }();

      function combineFormats(formats, combined) {
        return Object.keys(combined).reduce(function (merged, name) {
          if (formats[name] == null) return merged;
          if (combined[name] === formats[name]) {
            merged[name] = combined[name];
          } else if (Array.isArray(combined[name])) {
            if (combined[name].indexOf(formats[name]) < 0) {
              merged[name] = combined[name].concat([formats[name]]);
            }
          } else {
            merged[name] = [combined[name], formats[name]];
          }
          return merged;
        }, {});
      }

      function normalizeDelta(delta) {
        return delta.reduce(function (delta, op) {
          if (op.insert === 1) {
            var attributes = (0, _clone2.default)(op.attributes);
            delete attributes['image'];
            return delta.insert({ image: op.attributes.image }, attributes);
          }
          if (op.attributes != null && (op.attributes.list === true || op.attributes.bullet === true)) {
            op = (0, _clone2.default)(op);
            if (op.attributes.list) {
              op.attributes.list = 'ordered';
            } else {
              op.attributes.list = 'bullet';
              delete op.attributes.bullet;
            }
          }
          if (typeof op.insert === 'string') {
            var text = op.insert.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
            return delta.insert(text, op.attributes);
          }
          return delta.push(op);
        }, new _quillDelta2.default());
      }

      exports.default = Editor;

      /***/
    },
    /* 15 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = exports.Range = undefined;

      var _slicedToArray = function () {
        function sliceIterator(arr, i) {
          var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;_e = err;
          } finally {
            try {
              if (!_n && _i["return"]) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }return _arr;
        }return function (arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      var _clone = __webpack_require__(19);

      var _clone2 = _interopRequireDefault(_clone);

      var _deepEqual = __webpack_require__(11);

      var _deepEqual2 = _interopRequireDefault(_deepEqual);

      var _emitter3 = __webpack_require__(5);

      var _emitter4 = _interopRequireDefault(_emitter3);

      var _logger = __webpack_require__(10);

      var _logger2 = _interopRequireDefault(_logger);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
          }return arr2;
        } else {
          return Array.from(arr);
        }
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var debug = (0, _logger2.default)('quill:selection');

      var Range = function Range(index) {
        var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _classCallCheck(this, Range);

        this.index = index;
        this.length = length;
      };

      var Selection = function () {
        function Selection(scroll, emitter) {
          var _this = this;

          _classCallCheck(this, Selection);

          this.emitter = emitter;
          this.scroll = scroll;
          this.composing = false;
          this.root = this.scroll.domNode;
          this.root.addEventListener('compositionstart', function () {
            _this.composing = true;
          });
          this.root.addEventListener('compositionend', function () {
            _this.composing = false;
          });
          this.cursor = _parchment2.default.create('cursor', this);
          // savedRange is last non-null range
          this.lastRange = this.savedRange = new Range(0, 0);
          ['keyup', 'mouseup', 'mouseleave', 'touchend', 'touchleave', 'focus', 'blur'].forEach(function (eventName) {
            _this.root.addEventListener(eventName, function () {
              // When range used to be a selection and user click within the selection,
              // the range now being a cursor has not updated yet without setTimeout
              setTimeout(_this.update.bind(_this, _emitter4.default.sources.USER), 100);
            });
          });
          this.emitter.on(_emitter4.default.events.EDITOR_CHANGE, function (type, delta) {
            if (type === _emitter4.default.events.TEXT_CHANGE && delta.length() > 0) {
              _this.update(_emitter4.default.sources.SILENT);
            }
          });
          this.emitter.on(_emitter4.default.events.SCROLL_BEFORE_UPDATE, function () {
            if (!_this.hasFocus()) return;
            var native = _this.getNativeRange();
            if (native == null) return;
            if (native.start.node === _this.cursor.textNode) return; // cursor.restore() will handle
            // TODO unclear if this has negative side effects
            _this.emitter.once(_emitter4.default.events.SCROLL_UPDATE, function () {
              try {
                _this.setNativeRange(native.start.node, native.start.offset, native.end.node, native.end.offset);
              } catch (ignored) {}
            });
          });
          this.update(_emitter4.default.sources.SILENT);
        }

        _createClass(Selection, [{
          key: 'focus',
          value: function focus() {
            if (this.hasFocus()) return;
            this.root.focus();
            this.setRange(this.savedRange);
          }
        }, {
          key: 'format',
          value: function format(_format, value) {
            if (this.scroll.whitelist != null && !this.scroll.whitelist[_format]) return;
            this.scroll.update();
            var nativeRange = this.getNativeRange();
            if (nativeRange == null || !nativeRange.native.collapsed || _parchment2.default.query(_format, _parchment2.default.Scope.BLOCK)) return;
            if (nativeRange.start.node !== this.cursor.textNode) {
              var blot = _parchment2.default.find(nativeRange.start.node, false);
              if (blot == null) return;
              // TODO Give blot ability to not split
              if (blot instanceof _parchment2.default.Leaf) {
                var after = blot.split(nativeRange.start.offset);
                blot.parent.insertBefore(this.cursor, after);
              } else {
                blot.insertBefore(this.cursor, nativeRange.start.node); // Should never happen
              }
              this.cursor.attach();
            }
            this.cursor.format(_format, value);
            this.scroll.optimize();
            this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length);
            this.update();
          }
        }, {
          key: 'getBounds',
          value: function getBounds(index) {
            var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var scrollLength = this.scroll.length();
            index = Math.min(index, scrollLength - 1);
            length = Math.min(index + length, scrollLength - 1) - index;
            var node = void 0,
                _scroll$leaf = this.scroll.leaf(index),
                _scroll$leaf2 = _slicedToArray(_scroll$leaf, 2),
                leaf = _scroll$leaf2[0],
                offset = _scroll$leaf2[1];
            if (leaf == null) return null;

            var _leaf$position = leaf.position(offset, true);

            var _leaf$position2 = _slicedToArray(_leaf$position, 2);

            node = _leaf$position2[0];
            offset = _leaf$position2[1];

            var range = document.createRange();
            if (length > 0) {
              range.setStart(node, offset);

              var _scroll$leaf3 = this.scroll.leaf(index + length);

              var _scroll$leaf4 = _slicedToArray(_scroll$leaf3, 2);

              leaf = _scroll$leaf4[0];
              offset = _scroll$leaf4[1];

              if (leaf == null) return null;

              var _leaf$position3 = leaf.position(offset, true);

              var _leaf$position4 = _slicedToArray(_leaf$position3, 2);

              node = _leaf$position4[0];
              offset = _leaf$position4[1];

              range.setEnd(node, offset);
              return range.getBoundingClientRect();
            } else {
              var side = 'left';
              var rect = void 0;
              if (node instanceof Text) {
                if (offset < node.data.length) {
                  range.setStart(node, offset);
                  range.setEnd(node, offset + 1);
                } else {
                  range.setStart(node, offset - 1);
                  range.setEnd(node, offset);
                  side = 'right';
                }
                rect = range.getBoundingClientRect();
              } else {
                rect = leaf.domNode.getBoundingClientRect();
                if (offset > 0) side = 'right';
              }
              return {
                bottom: rect.top + rect.height,
                height: rect.height,
                left: rect[side],
                right: rect[side],
                top: rect.top,
                width: 0
              };
            }
          }
        }, {
          key: 'getNativeRange',
          value: function getNativeRange() {
            var selection = document.getSelection();
            if (selection == null || selection.rangeCount <= 0) return null;
            var nativeRange = selection.getRangeAt(0);
            if (nativeRange == null) return null;
            var range = this.normalizeNative(nativeRange);
            debug.info('getNativeRange', range);
            return range;
          }
        }, {
          key: 'getRange',
          value: function getRange() {
            var normalized = this.getNativeRange();
            if (normalized == null) return [null, null];
            var range = this.normalizedToRange(normalized);
            return [range, normalized];
          }
        }, {
          key: 'hasFocus',
          value: function hasFocus() {
            return document.activeElement === this.root;
          }
        }, {
          key: 'normalizedToRange',
          value: function normalizedToRange(range) {
            var _this2 = this;

            var positions = [[range.start.node, range.start.offset]];
            if (!range.native.collapsed) {
              positions.push([range.end.node, range.end.offset]);
            }
            var indexes = positions.map(function (position) {
              var _position = _slicedToArray(position, 2),
                  node = _position[0],
                  offset = _position[1];

              var blot = _parchment2.default.find(node, true);
              var index = blot.offset(_this2.scroll);
              if (offset === 0) {
                return index;
              } else if (blot instanceof _parchment2.default.Container) {
                return index + blot.length();
              } else {
                return index + blot.index(node, offset);
              }
            });
            var end = Math.min(Math.max.apply(Math, _toConsumableArray(indexes)), this.scroll.length() - 1);
            var start = Math.min.apply(Math, [end].concat(_toConsumableArray(indexes)));
            return new Range(start, end - start);
          }
        }, {
          key: 'normalizeNative',
          value: function normalizeNative(nativeRange) {
            if (!contains(this.root, nativeRange.startContainer) || !nativeRange.collapsed && !contains(this.root, nativeRange.endContainer)) {
              return null;
            }
            var range = {
              start: { node: nativeRange.startContainer, offset: nativeRange.startOffset },
              end: { node: nativeRange.endContainer, offset: nativeRange.endOffset },
              native: nativeRange
            };
            [range.start, range.end].forEach(function (position) {
              var node = position.node,
                  offset = position.offset;
              while (!(node instanceof Text) && node.childNodes.length > 0) {
                if (node.childNodes.length > offset) {
                  node = node.childNodes[offset];
                  offset = 0;
                } else if (node.childNodes.length === offset) {
                  node = node.lastChild;
                  offset = node instanceof Text ? node.data.length : node.childNodes.length + 1;
                } else {
                  break;
                }
              }
              position.node = node, position.offset = offset;
            });
            return range;
          }
        }, {
          key: 'rangeToNative',
          value: function rangeToNative(range) {
            var _this3 = this;

            var indexes = range.collapsed ? [range.index] : [range.index, range.index + range.length];
            var args = [];
            var scrollLength = this.scroll.length();
            indexes.forEach(function (index, i) {
              index = Math.min(scrollLength - 1, index);
              var node = void 0,
                  _scroll$leaf5 = _this3.scroll.leaf(index),
                  _scroll$leaf6 = _slicedToArray(_scroll$leaf5, 2),
                  leaf = _scroll$leaf6[0],
                  offset = _scroll$leaf6[1];
              var _leaf$position5 = leaf.position(offset, i !== 0);

              var _leaf$position6 = _slicedToArray(_leaf$position5, 2);

              node = _leaf$position6[0];
              offset = _leaf$position6[1];

              args.push(node, offset);
            });
            if (args.length < 2) {
              args = args.concat(args);
            }
            return args;
          }
        }, {
          key: 'scrollIntoView',
          value: function scrollIntoView() {
            var range = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.lastRange;

            if (range == null) return;
            var bounds = this.getBounds(range.index, range.length);
            if (bounds == null) return;
            var limit = this.scroll.length() - 1;

            var _scroll$line = this.scroll.line(Math.min(range.index, limit)),
                _scroll$line2 = _slicedToArray(_scroll$line, 1),
                first = _scroll$line2[0];

            var last = first;
            if (range.length > 0) {
              var _scroll$line3 = this.scroll.line(Math.min(range.index + range.length, limit));

              var _scroll$line4 = _slicedToArray(_scroll$line3, 1);

              last = _scroll$line4[0];
            }
            if (first == null || last == null) return;
            var scroller = this.scroll.scrollingContainer;
            var scrollBounds = scroller.getBoundingClientRect();
            if (bounds.top < scrollBounds.top) {
              scroller.scrollTop -= scrollBounds.top - bounds.top;
            } else if (bounds.bottom > scrollBounds.bottom) {
              scroller.scrollTop += bounds.bottom - scrollBounds.bottom;
            }
          }
        }, {
          key: 'setNativeRange',
          value: function setNativeRange(startNode, startOffset) {
            var endNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : startNode;
            var endOffset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : startOffset;
            var force = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

            debug.info('setNativeRange', startNode, startOffset, endNode, endOffset);
            if (startNode != null && (this.root.parentNode == null || startNode.parentNode == null || endNode.parentNode == null)) {
              return;
            }
            var selection = document.getSelection();
            if (selection == null) return;
            if (startNode != null) {
              if (!this.hasFocus()) this.root.focus();
              var native = (this.getNativeRange() || {}).native;
              if (native == null || force || startNode !== native.startContainer || startOffset !== native.startOffset || endNode !== native.endContainer || endOffset !== native.endOffset) {

                if (startNode.tagName == "BR") {
                  startOffset = [].indexOf.call(startNode.parentNode.childNodes, startNode);
                  startNode = startNode.parentNode;
                }
                if (endNode.tagName == "BR") {
                  endOffset = [].indexOf.call(endNode.parentNode.childNodes, endNode);
                  endNode = endNode.parentNode;
                }
                var range = document.createRange();
                range.setStart(startNode, startOffset);
                range.setEnd(endNode, endOffset);
                selection.removeAllRanges();
                selection.addRange(range);
              }
            } else {
              selection.removeAllRanges();
              this.root.blur();
              document.body.focus(); // root.blur() not enough on IE11+Travis+SauceLabs (but not local VMs)
            }
          }
        }, {
          key: 'setRange',
          value: function setRange(range) {
            var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _emitter4.default.sources.API;

            if (typeof force === 'string') {
              source = force;
              force = false;
            }
            debug.info('setRange', range);
            if (range != null) {
              var args = this.rangeToNative(range);
              this.setNativeRange.apply(this, _toConsumableArray(args).concat([force]));
            } else {
              this.setNativeRange(null);
            }
            this.update(source);
          }
        }, {
          key: 'update',
          value: function update() {
            var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _emitter4.default.sources.USER;

            var oldRange = this.lastRange;

            var _getRange = this.getRange(),
                _getRange2 = _slicedToArray(_getRange, 2),
                lastRange = _getRange2[0],
                nativeRange = _getRange2[1];

            this.lastRange = lastRange;
            if (this.lastRange != null) {
              this.savedRange = this.lastRange;
            }
            if (!(0, _deepEqual2.default)(oldRange, this.lastRange)) {
              var _emitter;

              if (!this.composing && nativeRange != null && nativeRange.native.collapsed && nativeRange.start.node !== this.cursor.textNode) {
                this.cursor.restore();
              }
              var args = [_emitter4.default.events.SELECTION_CHANGE, (0, _clone2.default)(this.lastRange), (0, _clone2.default)(oldRange), source];
              (_emitter = this.emitter).emit.apply(_emitter, [_emitter4.default.events.EDITOR_CHANGE].concat(args));
              if (source !== _emitter4.default.sources.SILENT) {
                var _emitter2;

                (_emitter2 = this.emitter).emit.apply(_emitter2, args);
              }
            }
          }
        }]);

        return Selection;
      }();

      function contains(parent, descendant) {
        try {
          // Firefox inserts inaccessible nodes around video elements
          descendant.parentNode;
        } catch (e) {
          return false;
        }
        // IE11 has bug with Text nodes
        // https://connect.microsoft.com/IE/feedback/details/780874/node-contains-is-incorrect
        if (descendant instanceof Text) {
          descendant = descendant.parentNode;
        }
        return parent.contains(descendant);
      }

      exports.Range = Range;
      exports.default = Selection;

      /***/
    },
    /* 16 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = exports.Code = undefined;

      var _slicedToArray = function () {
        function sliceIterator(arr, i) {
          var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;_e = err;
          } finally {
            try {
              if (!_n && _i["return"]) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }return _arr;
        }return function (arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _quillDelta = __webpack_require__(2);

      var _quillDelta2 = _interopRequireDefault(_quillDelta);

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      var _block = __webpack_require__(4);

      var _block2 = _interopRequireDefault(_block);

      var _inline = __webpack_require__(8);

      var _inline2 = _interopRequireDefault(_inline);

      var _text = __webpack_require__(12);

      var _text2 = _interopRequireDefault(_text);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Code = function (_Inline) {
        _inherits(Code, _Inline);

        function Code() {
          _classCallCheck(this, Code);

          return _possibleConstructorReturn(this, (Code.__proto__ || Object.getPrototypeOf(Code)).apply(this, arguments));
        }

        return Code;
      }(_inline2.default);

      Code.blotName = 'code';
      Code.tagName = 'CODE';

      var CodeBlock = function (_Block) {
        _inherits(CodeBlock, _Block);

        function CodeBlock() {
          _classCallCheck(this, CodeBlock);

          return _possibleConstructorReturn(this, (CodeBlock.__proto__ || Object.getPrototypeOf(CodeBlock)).apply(this, arguments));
        }

        _createClass(CodeBlock, [{
          key: 'delta',
          value: function delta() {
            var _this3 = this;

            var text = this.domNode.textContent;
            if (text.endsWith('\n')) {
              // Should always be true
              text = text.slice(0, -1);
            }
            return text.split('\n').reduce(function (delta, frag) {
              return delta.insert(frag).insert('\n', _this3.formats());
            }, new _quillDelta2.default());
          }
        }, {
          key: 'format',
          value: function format(name, value) {
            if (name === this.statics.blotName && value) return;

            var _descendant = this.descendant(_text2.default, this.length() - 1),
                _descendant2 = _slicedToArray(_descendant, 1),
                text = _descendant2[0];

            if (text != null) {
              text.deleteAt(text.length() - 1, 1);
            }
            _get(CodeBlock.prototype.__proto__ || Object.getPrototypeOf(CodeBlock.prototype), 'format', this).call(this, name, value);
          }
        }, {
          key: 'formatAt',
          value: function formatAt(index, length, name, value) {
            if (length === 0) return;
            if (_parchment2.default.query(name, _parchment2.default.Scope.BLOCK) == null || name === this.statics.blotName && value === this.statics.formats(this.domNode)) {
              return;
            }
            var nextNewline = this.newlineIndex(index);
            if (nextNewline < 0 || nextNewline >= index + length) return;
            var prevNewline = this.newlineIndex(index, true) + 1;
            var isolateLength = nextNewline - prevNewline + 1;
            var blot = this.isolate(prevNewline, isolateLength);
            var next = blot.next;
            blot.format(name, value);
            if (next instanceof CodeBlock) {
              next.formatAt(0, index - prevNewline + length - isolateLength, name, value);
            }
          }
        }, {
          key: 'insertAt',
          value: function insertAt(index, value, def) {
            if (def != null) return;

            var _descendant3 = this.descendant(_text2.default, index),
                _descendant4 = _slicedToArray(_descendant3, 2),
                text = _descendant4[0],
                offset = _descendant4[1];

            text.insertAt(offset, value);
          }
        }, {
          key: 'length',
          value: function length() {
            var length = this.domNode.textContent.length;
            if (!this.domNode.textContent.endsWith('\n')) {
              return length + 1;
            }
            return length;
          }
        }, {
          key: 'newlineIndex',
          value: function newlineIndex(searchIndex) {
            var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (!reverse) {
              var offset = this.domNode.textContent.slice(searchIndex).indexOf('\n');
              return offset > -1 ? searchIndex + offset : -1;
            } else {
              return this.domNode.textContent.slice(0, searchIndex).lastIndexOf('\n');
            }
          }
        }, {
          key: 'optimize',
          value: function optimize() {
            if (!this.domNode.textContent.endsWith('\n')) {
              this.appendChild(_parchment2.default.create('text', '\n'));
            }
            _get(CodeBlock.prototype.__proto__ || Object.getPrototypeOf(CodeBlock.prototype), 'optimize', this).call(this);
            var next = this.next;
            if (next != null && next.prev === this && next.statics.blotName === this.statics.blotName && this.statics.formats(this.domNode) === next.statics.formats(next.domNode)) {
              next.optimize();
              next.moveChildren(this);
              next.remove();
            }
          }
        }, {
          key: 'replace',
          value: function replace(target) {
            _get(CodeBlock.prototype.__proto__ || Object.getPrototypeOf(CodeBlock.prototype), 'replace', this).call(this, target);
            [].slice.call(this.domNode.querySelectorAll('*')).forEach(function (node) {
              var blot = _parchment2.default.find(node);
              if (blot == null) {
                node.parentNode.removeChild(node);
              } else if (blot instanceof _parchment2.default.Embed) {
                blot.remove();
              } else {
                blot.unwrap();
              }
            });
          }
        }], [{
          key: 'create',
          value: function create(value) {
            var domNode = _get(CodeBlock.__proto__ || Object.getPrototypeOf(CodeBlock), 'create', this).call(this, value);
            domNode.setAttribute('spellcheck', false);
            return domNode;
          }
        }, {
          key: 'formats',
          value: function formats() {
            return true;
          }
        }]);

        return CodeBlock;
      }(_block2.default);

      CodeBlock.blotName = 'code-block';
      CodeBlock.tagName = 'PRE';
      CodeBlock.TAB = '  ';

      exports.Code = Code;
      exports.default = CodeBlock;

      /***/
    },
    /* 17 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _embed = __webpack_require__(7);

      var _embed2 = _interopRequireDefault(_embed);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Break = function (_Embed) {
        _inherits(Break, _Embed);

        function Break() {
          _classCallCheck(this, Break);

          return _possibleConstructorReturn(this, (Break.__proto__ || Object.getPrototypeOf(Break)).apply(this, arguments));
        }

        _createClass(Break, [{
          key: 'insertInto',
          value: function insertInto(parent, ref) {
            if (parent.children.length === 0) {
              _get(Break.prototype.__proto__ || Object.getPrototypeOf(Break.prototype), 'insertInto', this).call(this, parent, ref);
            } else {
              this.remove();
            }
          }
        }, {
          key: 'length',
          value: function length() {
            return 0;
          }
        }, {
          key: 'value',
          value: function value() {
            return '';
          }
        }], [{
          key: 'value',
          value: function value() {
            return undefined;
          }
        }]);

        return Break;
      }(_embed2.default);

      Break.blotName = 'break';
      Break.tagName = 'BR';

      exports.default = Break;

      /***/
    },
    /* 18 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _slicedToArray = function () {
        function sliceIterator(arr, i) {
          var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;_e = err;
          } finally {
            try {
              if (!_n && _i["return"]) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }return _arr;
        }return function (arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      var _emitter = __webpack_require__(5);

      var _emitter2 = _interopRequireDefault(_emitter);

      var _block = __webpack_require__(4);

      var _block2 = _interopRequireDefault(_block);

      var _break = __webpack_require__(17);

      var _break2 = _interopRequireDefault(_break);

      var _container = __webpack_require__(24);

      var _container2 = _interopRequireDefault(_container);

      var _code = __webpack_require__(16);

      var _code2 = _interopRequireDefault(_code);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      function isLine(blot) {
        return blot instanceof _block2.default || blot instanceof _block.BlockEmbed;
      }

      var Scroll = function (_Parchment$Scroll) {
        _inherits(Scroll, _Parchment$Scroll);

        function Scroll(domNode, config) {
          _classCallCheck(this, Scroll);

          var _this = _possibleConstructorReturn(this, (Scroll.__proto__ || Object.getPrototypeOf(Scroll)).call(this, domNode));

          _this.emitter = config.emitter;
          _this.scrollingContainer = config.scrollingContainer;
          if (Array.isArray(config.whitelist)) {
            _this.whitelist = config.whitelist.reduce(function (whitelist, format) {
              whitelist[format] = true;
              return whitelist;
            }, {});
          }
          // Some reason fixes composition issues with character languages in Windows/Chrome, Safari
          _this.domNode.addEventListener('DOMNodeInserted', function () {});
          _this.optimize();
          _this.enable();
          return _this;
        }

        _createClass(Scroll, [{
          key: 'deleteAt',
          value: function deleteAt(index, length) {
            var _line = this.line(index),
                _line2 = _slicedToArray(_line, 2),
                first = _line2[0],
                offset = _line2[1];

            var _line3 = this.line(index + length),
                _line4 = _slicedToArray(_line3, 1),
                last = _line4[0];

            _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'deleteAt', this).call(this, index, length);
            if (last != null && first !== last && offset > 0 && !(first instanceof _block.BlockEmbed) && !(last instanceof _block.BlockEmbed)) {
              if (last instanceof _code2.default) {
                last.deleteAt(last.length() - 1, 1);
              }
              var ref = last.children.head instanceof _break2.default ? null : last.children.head;
              first.moveChildren(last, ref);
              first.remove();
            }
            this.optimize();
          }
        }, {
          key: 'enable',
          value: function enable() {
            var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            this.domNode.setAttribute('contenteditable', enabled);
          }
        }, {
          key: 'formatAt',
          value: function formatAt(index, length, format, value) {
            if (this.whitelist != null && !this.whitelist[format]) return;
            _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'formatAt', this).call(this, index, length, format, value);
            this.optimize();
          }
        }, {
          key: 'insertAt',
          value: function insertAt(index, value, def) {
            if (def != null && this.whitelist != null && !this.whitelist[value]) return;
            if (index >= this.length()) {
              if (def == null || _parchment2.default.query(value, _parchment2.default.Scope.BLOCK) == null) {
                var blot = _parchment2.default.create(this.statics.defaultChild);
                this.appendChild(blot);
                if (def == null && value.endsWith('\n')) {
                  value = value.slice(0, -1);
                }
                blot.insertAt(0, value, def);
              } else {
                var embed = _parchment2.default.create(value, def);
                this.appendChild(embed);
              }
            } else {
              _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'insertAt', this).call(this, index, value, def);
            }
            this.optimize();
          }
        }, {
          key: 'insertBefore',
          value: function insertBefore(blot, ref) {
            if (blot.statics.scope === _parchment2.default.Scope.INLINE_BLOT) {
              var wrapper = _parchment2.default.create(this.statics.defaultChild);
              wrapper.appendChild(blot);
              blot = wrapper;
            }
            _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'insertBefore', this).call(this, blot, ref);
          }
        }, {
          key: 'leaf',
          value: function leaf(index) {
            return this.path(index).pop() || [null, -1];
          }
        }, {
          key: 'line',
          value: function line(index) {
            if (index === this.length()) {
              return this.line(index - 1);
            }
            return this.descendant(isLine, index);
          }
        }, {
          key: 'lines',
          value: function lines() {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MAX_VALUE;

            var getLines = function getLines(blot, index, length) {
              var lines = [],
                  lengthLeft = length;
              blot.children.forEachAt(index, length, function (child, index, length) {
                if (isLine(child)) {
                  lines.push(child);
                } else if (child instanceof _parchment2.default.Container) {
                  lines = lines.concat(getLines(child, index, lengthLeft));
                }
                lengthLeft -= length;
              });
              return lines;
            };
            return getLines(this, index, length);
          }
        }, {
          key: 'optimize',
          value: function optimize() {
            var mutations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            if (this.batch === true) return;
            _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'optimize', this).call(this, mutations);
            if (mutations.length > 0) {
              this.emitter.emit(_emitter2.default.events.SCROLL_OPTIMIZE, mutations);
            }
          }
        }, {
          key: 'path',
          value: function path(index) {
            return _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'path', this).call(this, index).slice(1); // Exclude self
          }
        }, {
          key: 'update',
          value: function update(mutations) {
            if (this.batch === true) return;
            var source = _emitter2.default.sources.USER;
            if (typeof mutations === 'string') {
              source = mutations;
            }
            if (!Array.isArray(mutations)) {
              mutations = this.observer.takeRecords();
            }
            if (mutations.length > 0) {
              this.emitter.emit(_emitter2.default.events.SCROLL_BEFORE_UPDATE, source, mutations);
            }
            _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'update', this).call(this, mutations.concat([])); // pass copy
            if (mutations.length > 0) {
              this.emitter.emit(_emitter2.default.events.SCROLL_UPDATE, source, mutations);
            }
          }
        }]);

        return Scroll;
      }(_parchment2.default.Scroll);

      Scroll.blotName = 'scroll';
      Scroll.className = 'ql-editor';
      Scroll.tagName = 'DIV';
      Scroll.defaultChild = 'block';
      Scroll.allowedChildren = [_block2.default, _block.BlockEmbed, _container2.default];

      exports.default = Scroll;

      /***/
    },
    /* 19 */
    /***/function (module, exports) {

      var clone = function () {
        'use strict';

        function _instanceof(obj, type) {
          return type != null && obj instanceof type;
        }

        var nativeMap;
        try {
          nativeMap = Map;
        } catch (_) {
          // maybe a reference error because no `Map`. Give it a dummy value that no
          // value will ever be an instanceof.
          nativeMap = function nativeMap() {};
        }

        var nativeSet;
        try {
          nativeSet = Set;
        } catch (_) {
          nativeSet = function nativeSet() {};
        }

        var nativePromise;
        try {
          nativePromise = Promise;
        } catch (_) {
          nativePromise = function nativePromise() {};
        }

        /**
         * Clones (copies) an Object using deep copying.
         *
         * This function supports circular references by default, but if you are certain
         * there are no circular references in your object, you can save some CPU time
         * by calling clone(obj, false).
         *
         * Caution: if `circular` is false and `parent` contains circular references,
         * your program may enter an infinite loop and crash.
         *
         * @param `parent` - the object to be cloned
         * @param `circular` - set to true if the object to be cloned may contain
         *    circular references. (optional - true by default)
         * @param `depth` - set to a number if the object is only to be cloned to
         *    a particular depth. (optional - defaults to Infinity)
         * @param `prototype` - sets the prototype to be used when cloning an object.
         *    (optional - defaults to parent prototype).
         * @param `includeNonEnumerable` - set to true if the non-enumerable properties
         *    should be cloned as well. Non-enumerable properties on the prototype
         *    chain will be ignored. (optional - false by default)
        */
        function clone(parent, circular, depth, prototype, includeNonEnumerable) {
          if ((typeof circular === 'undefined' ? 'undefined' : _typeof2(circular)) === 'object') {
            depth = circular.depth;
            prototype = circular.prototype;
            includeNonEnumerable = circular.includeNonEnumerable;
            circular = circular.circular;
          }
          // maintain two arrays for circular references, where corresponding parents
          // and children have the same index
          var allParents = [];
          var allChildren = [];

          var useBuffer = typeof Buffer != 'undefined';

          if (typeof circular == 'undefined') circular = true;

          if (typeof depth == 'undefined') depth = Infinity;

          // recurse this function so we don't reset allParents and allChildren
          function _clone(parent, depth) {
            // cloning null always returns null
            if (parent === null) return null;

            if (depth === 0) return parent;

            var child;
            var proto;
            if ((typeof parent === 'undefined' ? 'undefined' : _typeof2(parent)) != 'object') {
              return parent;
            }

            if (_instanceof(parent, nativeMap)) {
              child = new nativeMap();
            } else if (_instanceof(parent, nativeSet)) {
              child = new nativeSet();
            } else if (_instanceof(parent, nativePromise)) {
              child = new nativePromise(function (resolve, reject) {
                parent.then(function (value) {
                  resolve(_clone(value, depth - 1));
                }, function (err) {
                  reject(_clone(err, depth - 1));
                });
              });
            } else if (clone.__isArray(parent)) {
              child = [];
            } else if (clone.__isRegExp(parent)) {
              child = new RegExp(parent.source, __getRegExpFlags(parent));
              if (parent.lastIndex) child.lastIndex = parent.lastIndex;
            } else if (clone.__isDate(parent)) {
              child = new Date(parent.getTime());
            } else if (useBuffer && Buffer.isBuffer(parent)) {
              child = new Buffer(parent.length);
              parent.copy(child);
              return child;
            } else if (_instanceof(parent, Error)) {
              child = Object.create(parent);
            } else {
              if (typeof prototype == 'undefined') {
                proto = Object.getPrototypeOf(parent);
                child = Object.create(proto);
              } else {
                child = Object.create(prototype);
                proto = prototype;
              }
            }

            if (circular) {
              var index = allParents.indexOf(parent);

              if (index != -1) {
                return allChildren[index];
              }
              allParents.push(parent);
              allChildren.push(child);
            }

            if (_instanceof(parent, nativeMap)) {
              parent.forEach(function (value, key) {
                var keyChild = _clone(key, depth - 1);
                var valueChild = _clone(value, depth - 1);
                child.set(keyChild, valueChild);
              });
            }
            if (_instanceof(parent, nativeSet)) {
              parent.forEach(function (value) {
                var entryChild = _clone(value, depth - 1);
                child.add(entryChild);
              });
            }

            for (var i in parent) {
              var attrs;
              if (proto) {
                attrs = Object.getOwnPropertyDescriptor(proto, i);
              }

              if (attrs && attrs.set == null) {
                continue;
              }
              child[i] = _clone(parent[i], depth - 1);
            }

            if (Object.getOwnPropertySymbols) {
              var symbols = Object.getOwnPropertySymbols(parent);
              for (var i = 0; i < symbols.length; i++) {
                // Don't need to worry about cloning a symbol because it is a primitive,
                // like a number or string.
                var symbol = symbols[i];
                var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
                if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
                  continue;
                }
                child[symbol] = _clone(parent[symbol], depth - 1);
                if (!descriptor.enumerable) {
                  Object.defineProperty(child, symbol, {
                    enumerable: false
                  });
                }
              }
            }

            if (includeNonEnumerable) {
              var allPropertyNames = Object.getOwnPropertyNames(parent);
              for (var i = 0; i < allPropertyNames.length; i++) {
                var propertyName = allPropertyNames[i];
                var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
                if (descriptor && descriptor.enumerable) {
                  continue;
                }
                child[propertyName] = _clone(parent[propertyName], depth - 1);
                Object.defineProperty(child, propertyName, {
                  enumerable: false
                });
              }
            }

            return child;
          }

          return _clone(parent, depth);
        }

        /**
         * Simple flat clone using prototype, accepts only objects, usefull for property
         * override on FLAT configuration object (no nested props).
         *
         * USE WITH CAUTION! This may not behave as you wish if you do not know how this
         * works.
         */
        clone.clonePrototype = function clonePrototype(parent) {
          if (parent === null) return null;

          var c = function c() {};
          c.prototype = parent;
          return new c();
        };

        // private utility functions

        function __objToStr(o) {
          return Object.prototype.toString.call(o);
        }
        clone.__objToStr = __objToStr;

        function __isDate(o) {
          return (typeof o === 'undefined' ? 'undefined' : _typeof2(o)) === 'object' && __objToStr(o) === '[object Date]';
        }
        clone.__isDate = __isDate;

        function __isArray(o) {
          return (typeof o === 'undefined' ? 'undefined' : _typeof2(o)) === 'object' && __objToStr(o) === '[object Array]';
        }
        clone.__isArray = __isArray;

        function __isRegExp(o) {
          return (typeof o === 'undefined' ? 'undefined' : _typeof2(o)) === 'object' && __objToStr(o) === '[object RegExp]';
        }
        clone.__isRegExp = __isRegExp;

        function __getRegExpFlags(re) {
          var flags = '';
          if (re.global) flags += 'g';
          if (re.ignoreCase) flags += 'i';
          if (re.multiline) flags += 'm';
          return flags;
        }
        clone.__getRegExpFlags = __getRegExpFlags;

        return clone;
      }();

      if ((typeof module === 'undefined' ? 'undefined' : _typeof2(module)) === 'object' && module.exports) {
        module.exports = clone;
      }

      /***/
    },
    /* 20 */
    /***/function (module, exports, __webpack_require__) {

      var equal = __webpack_require__(11);
      var extend = __webpack_require__(3);

      var lib = {
        attributes: {
          compose: function compose(a, b, keepNull) {
            if ((typeof a === 'undefined' ? 'undefined' : _typeof2(a)) !== 'object') a = {};
            if ((typeof b === 'undefined' ? 'undefined' : _typeof2(b)) !== 'object') b = {};
            var attributes = extend(true, {}, b);
            if (!keepNull) {
              attributes = Object.keys(attributes).reduce(function (copy, key) {
                if (attributes[key] != null) {
                  copy[key] = attributes[key];
                }
                return copy;
              }, {});
            }
            for (var key in a) {
              if (a[key] !== undefined && b[key] === undefined) {
                attributes[key] = a[key];
              }
            }
            return Object.keys(attributes).length > 0 ? attributes : undefined;
          },

          diff: function diff(a, b) {
            if ((typeof a === 'undefined' ? 'undefined' : _typeof2(a)) !== 'object') a = {};
            if ((typeof b === 'undefined' ? 'undefined' : _typeof2(b)) !== 'object') b = {};
            var attributes = Object.keys(a).concat(Object.keys(b)).reduce(function (attributes, key) {
              if (!equal(a[key], b[key])) {
                attributes[key] = b[key] === undefined ? null : b[key];
              }
              return attributes;
            }, {});
            return Object.keys(attributes).length > 0 ? attributes : undefined;
          },

          transform: function transform(a, b, priority) {
            if ((typeof a === 'undefined' ? 'undefined' : _typeof2(a)) !== 'object') return b;
            if ((typeof b === 'undefined' ? 'undefined' : _typeof2(b)) !== 'object') return undefined;
            if (!priority) return b; // b simply overwrites us without priority
            var attributes = Object.keys(b).reduce(function (attributes, key) {
              if (a[key] === undefined) attributes[key] = b[key]; // null is a valid value
              return attributes;
            }, {});
            return Object.keys(attributes).length > 0 ? attributes : undefined;
          }
        },

        iterator: function iterator(ops) {
          return new Iterator(ops);
        },

        length: function length(op) {
          if (typeof op['delete'] === 'number') {
            return op['delete'];
          } else if (typeof op.retain === 'number') {
            return op.retain;
          } else {
            return typeof op.insert === 'string' ? op.insert.length : 1;
          }
        }
      };

      function Iterator(ops) {
        this.ops = ops;
        this.index = 0;
        this.offset = 0;
      };

      Iterator.prototype.hasNext = function () {
        return this.peekLength() < Infinity;
      };

      Iterator.prototype.next = function (length) {
        if (!length) length = Infinity;
        var nextOp = this.ops[this.index];
        if (nextOp) {
          var offset = this.offset;
          var opLength = lib.length(nextOp);
          if (length >= opLength - offset) {
            length = opLength - offset;
            this.index += 1;
            this.offset = 0;
          } else {
            this.offset += length;
          }
          if (typeof nextOp['delete'] === 'number') {
            return { 'delete': length };
          } else {
            var retOp = {};
            if (nextOp.attributes) {
              retOp.attributes = nextOp.attributes;
            }
            if (typeof nextOp.retain === 'number') {
              retOp.retain = length;
            } else if (typeof nextOp.insert === 'string') {
              retOp.insert = nextOp.insert.substr(offset, length);
            } else {
              // offset should === 0, length should === 1
              retOp.insert = nextOp.insert;
            }
            return retOp;
          }
        } else {
          return { retain: Infinity };
        }
      };

      Iterator.prototype.peek = function () {
        return this.ops[this.index];
      };

      Iterator.prototype.peekLength = function () {
        if (this.ops[this.index]) {
          // Should never return 0 if our index is being managed correctly
          return lib.length(this.ops[this.index]) - this.offset;
        } else {
          return Infinity;
        }
      };

      Iterator.prototype.peekType = function () {
        if (this.ops[this.index]) {
          if (typeof this.ops[this.index]['delete'] === 'number') {
            return 'delete';
          } else if (typeof this.ops[this.index].retain === 'number') {
            return 'retain';
          } else {
            return 'insert';
          }
        }
        return 'retain';
      };

      module.exports = lib;

      /***/
    },
    /* 21 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };
        return function (d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var linked_list_1 = __webpack_require__(61);
      var shadow_1 = __webpack_require__(35);
      var Registry = __webpack_require__(1);
      var ContainerBlot = function (_super) {
        __extends(ContainerBlot, _super);
        function ContainerBlot() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        ContainerBlot.prototype.appendChild = function (other) {
          this.insertBefore(other);
        };
        ContainerBlot.prototype.attach = function () {
          var _this = this;
          _super.prototype.attach.call(this);
          this.children = new linked_list_1.default();
          // Need to be reversed for if DOM nodes already in order
          [].slice.call(this.domNode.childNodes).reverse().forEach(function (node) {
            try {
              var child = makeBlot(node);
              _this.insertBefore(child, _this.children.head);
            } catch (err) {
              if (err instanceof Registry.ParchmentError) return;else throw err;
            }
          });
        };
        ContainerBlot.prototype.deleteAt = function (index, length) {
          if (index === 0 && length === this.length()) {
            return this.remove();
          }
          this.children.forEachAt(index, length, function (child, offset, length) {
            child.deleteAt(offset, length);
          });
        };
        ContainerBlot.prototype.descendant = function (criteria, index) {
          var _a = this.children.find(index),
              child = _a[0],
              offset = _a[1];
          if (criteria.blotName == null && criteria(child) || criteria.blotName != null && child instanceof criteria) {
            return [child, offset];
          } else if (child instanceof ContainerBlot) {
            return child.descendant(criteria, offset);
          } else {
            return [null, -1];
          }
        };
        ContainerBlot.prototype.descendants = function (criteria, index, length) {
          if (index === void 0) {
            index = 0;
          }
          if (length === void 0) {
            length = Number.MAX_VALUE;
          }
          var descendants = [],
              lengthLeft = length;
          this.children.forEachAt(index, length, function (child, index, length) {
            if (criteria.blotName == null && criteria(child) || criteria.blotName != null && child instanceof criteria) {
              descendants.push(child);
            }
            if (child instanceof ContainerBlot) {
              descendants = descendants.concat(child.descendants(criteria, index, lengthLeft));
            }
            lengthLeft -= length;
          });
          return descendants;
        };
        ContainerBlot.prototype.detach = function () {
          this.children.forEach(function (child) {
            child.detach();
          });
          _super.prototype.detach.call(this);
        };
        ContainerBlot.prototype.formatAt = function (index, length, name, value) {
          this.children.forEachAt(index, length, function (child, offset, length) {
            child.formatAt(offset, length, name, value);
          });
        };
        ContainerBlot.prototype.insertAt = function (index, value, def) {
          var _a = this.children.find(index),
              child = _a[0],
              offset = _a[1];
          if (child) {
            child.insertAt(offset, value, def);
          } else {
            var blot = def == null ? Registry.create('text', value) : Registry.create(value, def);
            this.appendChild(blot);
          }
        };
        ContainerBlot.prototype.insertBefore = function (childBlot, refBlot) {
          if (this.statics.allowedChildren != null && !this.statics.allowedChildren.some(function (child) {
            return childBlot instanceof child;
          })) {
            throw new Registry.ParchmentError("Cannot insert " + childBlot.statics.blotName + " into " + this.statics.blotName);
          }
          childBlot.insertInto(this, refBlot);
        };
        ContainerBlot.prototype.length = function () {
          return this.children.reduce(function (memo, child) {
            return memo + child.length();
          }, 0);
        };
        ContainerBlot.prototype.moveChildren = function (targetParent, refNode) {
          this.children.forEach(function (child) {
            targetParent.insertBefore(child, refNode);
          });
        };
        ContainerBlot.prototype.optimize = function () {
          _super.prototype.optimize.call(this);
          if (this.children.length === 0) {
            if (this.statics.defaultChild != null) {
              var child = Registry.create(this.statics.defaultChild);
              this.appendChild(child);
              child.optimize();
            } else {
              this.remove();
            }
          }
        };
        ContainerBlot.prototype.path = function (index, inclusive) {
          if (inclusive === void 0) {
            inclusive = false;
          }
          var _a = this.children.find(index, inclusive),
              child = _a[0],
              offset = _a[1];
          var position = [[this, index]];
          if (child instanceof ContainerBlot) {
            return position.concat(child.path(offset, inclusive));
          } else if (child != null) {
            position.push([child, offset]);
          }
          return position;
        };
        ContainerBlot.prototype.removeChild = function (child) {
          this.children.remove(child);
        };
        ContainerBlot.prototype.replace = function (target) {
          if (target instanceof ContainerBlot) {
            target.moveChildren(this);
          }
          _super.prototype.replace.call(this, target);
        };
        ContainerBlot.prototype.split = function (index, force) {
          if (force === void 0) {
            force = false;
          }
          if (!force) {
            if (index === 0) return this;
            if (index === this.length()) return this.next;
          }
          var after = this.clone();
          this.parent.insertBefore(after, this.next);
          this.children.forEachAt(index, this.length(), function (child, offset, length) {
            child = child.split(offset, force);
            after.appendChild(child);
          });
          return after;
        };
        ContainerBlot.prototype.unwrap = function () {
          this.moveChildren(this.parent, this.next);
          this.remove();
        };
        ContainerBlot.prototype.update = function (mutations) {
          var _this = this;
          var addedNodes = [],
              removedNodes = [];
          mutations.forEach(function (mutation) {
            if (mutation.target === _this.domNode && mutation.type === 'childList') {
              addedNodes.push.apply(addedNodes, mutation.addedNodes);
              removedNodes.push.apply(removedNodes, mutation.removedNodes);
            }
          });
          removedNodes.forEach(function (node) {
            // Check node has actually been removed
            // One exception is Chrome does not immediately remove IFRAMEs
            // from DOM but MutationRecord is correct in its reported removal
            if (node.parentNode != null && node.tagName !== 'IFRAME' && document.body.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
              return;
            }
            var blot = Registry.find(node);
            if (blot == null) return;
            if (blot.domNode.parentNode == null || blot.domNode.parentNode === _this.domNode) {
              blot.detach();
            }
          });
          addedNodes.filter(function (node) {
            return node.parentNode == _this.domNode;
          }).sort(function (a, b) {
            if (a === b) return 0;
            if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) {
              return 1;
            }
            return -1;
          }).forEach(function (node) {
            var refBlot = null;
            if (node.nextSibling != null) {
              refBlot = Registry.find(node.nextSibling);
            }
            var blot = makeBlot(node);
            if (blot.next != refBlot || blot.next == null) {
              if (blot.parent != null) {
                blot.parent.removeChild(_this);
              }
              _this.insertBefore(blot, refBlot);
            }
          });
        };
        return ContainerBlot;
      }(shadow_1.default);
      function makeBlot(node) {
        var blot = Registry.find(node);
        if (blot == null) {
          try {
            blot = Registry.create(node);
          } catch (e) {
            blot = Registry.create(Registry.Scope.INLINE);
            [].slice.call(node.childNodes).forEach(function (child) {
              blot.domNode.appendChild(child);
            });
            node.parentNode.replaceChild(blot.domNode, node);
            blot.attach();
          }
        }
        return blot;
      }
      exports.default = ContainerBlot;

      /***/
    },
    /* 22 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };
        return function (d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var attributor_1 = __webpack_require__(13);
      var store_1 = __webpack_require__(33);
      var container_1 = __webpack_require__(21);
      var Registry = __webpack_require__(1);
      var FormatBlot = function (_super) {
        __extends(FormatBlot, _super);
        function FormatBlot() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        FormatBlot.formats = function (domNode) {
          if (typeof this.tagName === 'string') {
            return true;
          } else if (Array.isArray(this.tagName)) {
            return domNode.tagName.toLowerCase();
          }
          return undefined;
        };
        FormatBlot.prototype.attach = function () {
          _super.prototype.attach.call(this);
          this.attributes = new store_1.default(this.domNode);
        };
        FormatBlot.prototype.format = function (name, value) {
          var format = Registry.query(name);
          if (format instanceof attributor_1.default) {
            this.attributes.attribute(format, value);
          } else if (value) {
            if (format != null && (name !== this.statics.blotName || this.formats()[name] !== value)) {
              this.replaceWith(name, value);
            }
          }
        };
        FormatBlot.prototype.formats = function () {
          var formats = this.attributes.values();
          var format = this.statics.formats(this.domNode);
          if (format != null) {
            formats[this.statics.blotName] = format;
          }
          return formats;
        };
        FormatBlot.prototype.replaceWith = function (name, value) {
          var replacement = _super.prototype.replaceWith.call(this, name, value);
          this.attributes.copy(replacement);
          return replacement;
        };
        FormatBlot.prototype.update = function (mutations) {
          var _this = this;
          _super.prototype.update.call(this, mutations);
          if (mutations.some(function (mutation) {
            return mutation.target === _this.domNode && mutation.type === 'attributes';
          })) {
            this.attributes.build();
          }
        };
        FormatBlot.prototype.wrap = function (name, value) {
          var wrapper = _super.prototype.wrap.call(this, name, value);
          if (wrapper instanceof FormatBlot && wrapper.statics.scope === this.statics.scope) {
            this.attributes.move(wrapper);
          }
          return wrapper;
        };
        return FormatBlot;
      }(container_1.default);
      exports.default = FormatBlot;

      /***/
    },
    /* 23 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };
        return function (d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var shadow_1 = __webpack_require__(35);
      var Registry = __webpack_require__(1);
      var LeafBlot = function (_super) {
        __extends(LeafBlot, _super);
        function LeafBlot() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        LeafBlot.value = function (domNode) {
          return true;
        };
        LeafBlot.prototype.index = function (node, offset) {
          if (node !== this.domNode) return -1;
          return Math.min(offset, 1);
        };
        LeafBlot.prototype.position = function (index, inclusive) {
          var offset = [].indexOf.call(this.parent.domNode.childNodes, this.domNode);
          if (index > 0) offset += 1;
          return [this.parent.domNode, offset];
        };
        LeafBlot.prototype.value = function () {
          return _a = {}, _a[this.statics.blotName] = this.statics.value(this.domNode) || true, _a;
          var _a;
        };
        return LeafBlot;
      }(shadow_1.default);
      LeafBlot.scope = Registry.Scope.INLINE_BLOT;
      exports.default = LeafBlot;

      /***/
    },
    /* 24 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      var _block = __webpack_require__(4);

      var _block2 = _interopRequireDefault(_block);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Container = function (_Parchment$Container) {
        _inherits(Container, _Parchment$Container);

        function Container() {
          _classCallCheck(this, Container);

          return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).apply(this, arguments));
        }

        return Container;
      }(_parchment2.default.Container);

      Container.allowedChildren = [_block2.default, _block.BlockEmbed, Container];

      exports.default = Container;

      /***/
    },
    /* 25 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _slicedToArray = function () {
        function sliceIterator(arr, i) {
          var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;_e = err;
          } finally {
            try {
              if (!_n && _i["return"]) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }return _arr;
        }return function (arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      var _embed = __webpack_require__(7);

      var _embed2 = _interopRequireDefault(_embed);

      var _text = __webpack_require__(12);

      var _text2 = _interopRequireDefault(_text);

      var _emitter = __webpack_require__(5);

      var _emitter2 = _interopRequireDefault(_emitter);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Cursor = function (_Embed) {
        _inherits(Cursor, _Embed);

        _createClass(Cursor, null, [{
          key: 'value',
          value: function value() {
            return undefined;
          }
        }]);

        function Cursor(domNode, selection) {
          _classCallCheck(this, Cursor);

          var _this = _possibleConstructorReturn(this, (Cursor.__proto__ || Object.getPrototypeOf(Cursor)).call(this, domNode));

          _this.selection = selection;
          _this.textNode = document.createTextNode(Cursor.CONTENTS);
          _this.domNode.appendChild(_this.textNode);
          _this._length = 0;
          return _this;
        }

        _createClass(Cursor, [{
          key: 'detach',
          value: function detach() {
            // super.detach() will also clear domNode.__blot
            if (this.parent != null) this.parent.removeChild(this);
          }
        }, {
          key: 'format',
          value: function format(name, value) {
            if (this._length !== 0) {
              return _get(Cursor.prototype.__proto__ || Object.getPrototypeOf(Cursor.prototype), 'format', this).call(this, name, value);
            }
            var target = this,
                index = 0;
            while (target != null && target.statics.scope !== _parchment2.default.Scope.BLOCK_BLOT) {
              index += target.offset(target.parent);
              target = target.parent;
            }
            if (target != null) {
              this._length = Cursor.CONTENTS.length;
              target.optimize();
              target.formatAt(index, Cursor.CONTENTS.length, name, value);
              this._length = 0;
            }
          }
        }, {
          key: 'index',
          value: function index(node, offset) {
            if (node === this.textNode) return 0;
            return _get(Cursor.prototype.__proto__ || Object.getPrototypeOf(Cursor.prototype), 'index', this).call(this, node, offset);
          }
        }, {
          key: 'length',
          value: function length() {
            return this._length;
          }
        }, {
          key: 'position',
          value: function position() {
            return [this.textNode, this.textNode.data.length];
          }
        }, {
          key: 'remove',
          value: function remove() {
            _get(Cursor.prototype.__proto__ || Object.getPrototypeOf(Cursor.prototype), 'remove', this).call(this);
            this.parent = null;
          }
        }, {
          key: 'restore',
          value: function restore() {
            var _this2 = this;

            if (this.selection.composing) return;
            if (this.parent == null) return;
            var textNode = this.textNode;
            var range = this.selection.getNativeRange();
            var restoreText = void 0,
                start = void 0,
                end = void 0;
            if (range != null && range.start.node === textNode && range.end.node === textNode) {
              var _ref = [textNode, range.start.offset, range.end.offset];
              restoreText = _ref[0];
              start = _ref[1];
              end = _ref[2];
            }
            // Link format will insert text outside of anchor tag
            while (this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode) {
              this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
            }
            if (this.textNode.data !== Cursor.CONTENTS) {
              var text = this.textNode.data.split(Cursor.CONTENTS).join('');
              if (this.next instanceof _text2.default) {
                restoreText = this.next.domNode;
                this.next.insertAt(0, text);
                this.textNode.data = Cursor.CONTENTS;
              } else {
                this.textNode.data = text;
                this.parent.insertBefore(_parchment2.default.create(this.textNode), this);
                this.textNode = document.createTextNode(Cursor.CONTENTS);
                this.domNode.appendChild(this.textNode);
              }
            }
            this.remove();
            if (start == null) return;
            this.selection.emitter.once(_emitter2.default.events.SCROLL_OPTIMIZE, function () {
              var _map = [start, end].map(function (offset) {
                return Math.max(0, Math.min(restoreText.data.length, offset - 1));
              });

              var _map2 = _slicedToArray(_map, 2);

              start = _map2[0];
              end = _map2[1];

              _this2.selection.setNativeRange(restoreText, start, restoreText, end);
            });
          }
        }, {
          key: 'update',
          value: function update(mutations) {
            var _this3 = this;

            mutations.forEach(function (mutation) {
              if (mutation.type === 'characterData' && mutation.target === _this3.textNode) {
                _this3.restore();
              }
            });
          }
        }, {
          key: 'value',
          value: function value() {
            return '';
          }
        }]);

        return Cursor;
      }(_embed2.default);

      Cursor.blotName = 'cursor';
      Cursor.className = 'ql-cursor';
      Cursor.tagName = 'span';
      Cursor.CONTENTS = '\uFEFF'; // Zero width no break space


      exports.default = Cursor;

      /***/
    },
    /* 26 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ColorStyle = exports.ColorClass = exports.ColorAttributor = undefined;

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var ColorAttributor = function (_Parchment$Attributor) {
        _inherits(ColorAttributor, _Parchment$Attributor);

        function ColorAttributor() {
          _classCallCheck(this, ColorAttributor);

          return _possibleConstructorReturn(this, (ColorAttributor.__proto__ || Object.getPrototypeOf(ColorAttributor)).apply(this, arguments));
        }

        _createClass(ColorAttributor, [{
          key: 'value',
          value: function value(domNode) {
            var value = _get(ColorAttributor.prototype.__proto__ || Object.getPrototypeOf(ColorAttributor.prototype), 'value', this).call(this, domNode);
            if (!value.startsWith('rgb(')) return value;
            value = value.replace(/^[^\d]+/, '').replace(/[^\d]+$/, '');
            return '#' + value.split(',').map(function (component) {
              return ('00' + parseInt(component).toString(16)).slice(-2);
            }).join('');
          }
        }]);

        return ColorAttributor;
      }(_parchment2.default.Attributor.Style);

      var ColorClass = new _parchment2.default.Attributor.Class('color', 'ql-color', {
        scope: _parchment2.default.Scope.INLINE
      });
      var ColorStyle = new ColorAttributor('color', 'color', {
        scope: _parchment2.default.Scope.INLINE
      });

      exports.ColorAttributor = ColorAttributor;
      exports.ColorClass = ColorClass;
      exports.ColorStyle = ColorStyle;

      /***/
    },
    /* 27 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.sanitize = exports.default = undefined;

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _inline = __webpack_require__(8);

      var _inline2 = _interopRequireDefault(_inline);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Link = function (_Inline) {
        _inherits(Link, _Inline);

        function Link() {
          _classCallCheck(this, Link);

          return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).apply(this, arguments));
        }

        _createClass(Link, [{
          key: 'format',
          value: function format(name, value) {
            if (name !== this.statics.blotName || !value) return _get(Link.prototype.__proto__ || Object.getPrototypeOf(Link.prototype), 'format', this).call(this, name, value);
            value = this.constructor.sanitize(value);
            this.domNode.setAttribute('href', value);
          }
        }], [{
          key: 'create',
          value: function create(value) {
            var node = _get(Link.__proto__ || Object.getPrototypeOf(Link), 'create', this).call(this, value);
            value = this.sanitize(value);
            node.setAttribute('href', value);
            node.setAttribute('target', '_blank');
            return node;
          }
        }, {
          key: 'formats',
          value: function formats(domNode) {
            return domNode.getAttribute('href');
          }
        }, {
          key: 'sanitize',
          value: function sanitize(url) {
            return _sanitize(url, ['http', 'https', 'mailto']) ? url : this.SANITIZED_URL;
          }
        }]);

        return Link;
      }(_inline2.default);

      Link.blotName = 'link';
      Link.tagName = 'A';
      Link.SANITIZED_URL = 'about:blank';

      function _sanitize(url, protocols) {
        var anchor = document.createElement('a');
        anchor.href = url;
        var protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
        return protocols.indexOf(protocol) > -1;
      }

      exports.default = Link;
      exports.sanitize = _sanitize;

      /***/
    },
    /* 28 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _dropdown = __webpack_require__(88);

      var _dropdown2 = _interopRequireDefault(_dropdown);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Picker = function () {
        function Picker(select) {
          var _this = this;

          _classCallCheck(this, Picker);

          this.select = select;
          this.container = document.createElement('span');
          this.buildPicker();
          this.select.style.display = 'none';
          this.select.parentNode.insertBefore(this.container, this.select);
          this.label.addEventListener('mousedown', function () {
            _this.container.classList.toggle('ql-expanded');
          });
          this.select.addEventListener('change', this.update.bind(this));
        }

        _createClass(Picker, [{
          key: 'buildItem',
          value: function buildItem(option) {
            var _this2 = this;

            var item = document.createElement('span');
            item.classList.add('ql-picker-item');
            if (option.hasAttribute('value')) {
              item.setAttribute('data-value', option.getAttribute('value'));
            }
            if (option.textContent) {
              item.setAttribute('data-label', option.textContent);
            }
            item.addEventListener('click', function () {
              _this2.selectItem(item, true);
            });
            return item;
          }
        }, {
          key: 'buildLabel',
          value: function buildLabel() {
            var label = document.createElement('span');
            label.classList.add('ql-picker-label');
            label.innerHTML = _dropdown2.default;
            this.container.appendChild(label);
            return label;
          }
        }, {
          key: 'buildOptions',
          value: function buildOptions() {
            var _this3 = this;

            var options = document.createElement('span');
            options.classList.add('ql-picker-options');
            [].slice.call(this.select.options).forEach(function (option) {
              var item = _this3.buildItem(option);
              options.appendChild(item);
              if (option.hasAttribute('selected')) {
                _this3.selectItem(item);
              }
            });
            this.container.appendChild(options);
          }
        }, {
          key: 'buildPicker',
          value: function buildPicker() {
            var _this4 = this;

            [].slice.call(this.select.attributes).forEach(function (item) {
              _this4.container.setAttribute(item.name, item.value);
            });
            this.container.classList.add('ql-picker');
            this.label = this.buildLabel();
            this.buildOptions();
          }
        }, {
          key: 'close',
          value: function close() {
            this.container.classList.remove('ql-expanded');
          }
        }, {
          key: 'selectItem',
          value: function selectItem(item) {
            var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var selected = this.container.querySelector('.ql-selected');
            if (item === selected) return;
            if (selected != null) {
              selected.classList.remove('ql-selected');
            }
            if (item == null) return;
            item.classList.add('ql-selected');
            this.select.selectedIndex = [].indexOf.call(item.parentNode.children, item);
            if (item.hasAttribute('data-value')) {
              this.label.setAttribute('data-value', item.getAttribute('data-value'));
            } else {
              this.label.removeAttribute('data-value');
            }
            if (item.hasAttribute('data-label')) {
              this.label.setAttribute('data-label', item.getAttribute('data-label'));
            } else {
              this.label.removeAttribute('data-label');
            }
            if (trigger) {
              if (typeof Event === 'function') {
                this.select.dispatchEvent(new Event('change'));
              } else if ((typeof Event === 'undefined' ? 'undefined' : _typeof(Event)) === 'object') {
                // IE11
                var event = document.createEvent('Event');
                event.initEvent('change', true, true);
                this.select.dispatchEvent(event);
              }
              this.close();
            }
          }
        }, {
          key: 'update',
          value: function update() {
            var option = void 0;
            if (this.select.selectedIndex > -1) {
              var item = this.container.querySelector('.ql-picker-options').children[this.select.selectedIndex];
              option = this.select.options[this.select.selectedIndex];
              this.selectItem(item);
            } else {
              this.selectItem(null);
            }
            var isActive = option != null && option !== this.select.querySelector('option[selected]');
            this.label.classList.toggle('ql-active', isActive);
          }
        }]);

        return Picker;
      }();

      exports.default = Picker;

      /***/
    },
    /* 29 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      var _quill = __webpack_require__(6);

      var _quill2 = _interopRequireDefault(_quill);

      var _block = __webpack_require__(4);

      var _block2 = _interopRequireDefault(_block);

      var _break = __webpack_require__(17);

      var _break2 = _interopRequireDefault(_break);

      var _container = __webpack_require__(24);

      var _container2 = _interopRequireDefault(_container);

      var _cursor = __webpack_require__(25);

      var _cursor2 = _interopRequireDefault(_cursor);

      var _embed = __webpack_require__(7);

      var _embed2 = _interopRequireDefault(_embed);

      var _inline = __webpack_require__(8);

      var _inline2 = _interopRequireDefault(_inline);

      var _scroll = __webpack_require__(18);

      var _scroll2 = _interopRequireDefault(_scroll);

      var _text = __webpack_require__(12);

      var _text2 = _interopRequireDefault(_text);

      var _clipboard = __webpack_require__(46);

      var _clipboard2 = _interopRequireDefault(_clipboard);

      var _history = __webpack_require__(42);

      var _history2 = _interopRequireDefault(_history);

      var _keyboard = __webpack_require__(31);

      var _keyboard2 = _interopRequireDefault(_keyboard);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      _quill2.default.register({
        'blots/block': _block2.default,
        'blots/block/embed': _block.BlockEmbed,
        'blots/break': _break2.default,
        'blots/container': _container2.default,
        'blots/cursor': _cursor2.default,
        'blots/embed': _embed2.default,
        'blots/inline': _inline2.default,
        'blots/scroll': _scroll2.default,
        'blots/text': _text2.default,

        'modules/clipboard': _clipboard2.default,
        'modules/history': _history2.default,
        'modules/keyboard': _keyboard2.default
      });

      _parchment2.default.register(_block2.default, _break2.default, _cursor2.default, _inline2.default, _scroll2.default, _text2.default);

      module.exports = _quill2.default;

      /***/
    },
    /* 30 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Theme = function () {
        function Theme(quill, options) {
          _classCallCheck(this, Theme);

          this.quill = quill;
          this.options = options;
          this.modules = {};
        }

        _createClass(Theme, [{
          key: 'init',
          value: function init() {
            var _this = this;

            Object.keys(this.options.modules).forEach(function (name) {
              if (_this.modules[name] == null) {
                _this.addModule(name);
              }
            });
          }
        }, {
          key: 'addModule',
          value: function addModule(name) {
            var moduleClass = this.quill.constructor.import('modules/' + name);
            this.modules[name] = new moduleClass(this.quill, this.options.modules[name] || {});
            return this.modules[name];
          }
        }]);

        return Theme;
      }();

      Theme.DEFAULTS = {
        modules: {}
      };
      Theme.themes = {
        'default': Theme
      };

      exports.default = Theme;

      /***/
    },
    /* 31 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.SHORTKEY = exports.default = undefined;

      var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      };

      var _slicedToArray = function () {
        function sliceIterator(arr, i) {
          var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;_e = err;
          } finally {
            try {
              if (!_n && _i["return"]) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }return _arr;
        }return function (arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _clone = __webpack_require__(19);

      var _clone2 = _interopRequireDefault(_clone);

      var _deepEqual = __webpack_require__(11);

      var _deepEqual2 = _interopRequireDefault(_deepEqual);

      var _extend = __webpack_require__(3);

      var _extend2 = _interopRequireDefault(_extend);

      var _op = __webpack_require__(20);

      var _op2 = _interopRequireDefault(_op);

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      var _quill = __webpack_require__(6);

      var _quill2 = _interopRequireDefault(_quill);

      var _logger = __webpack_require__(10);

      var _logger2 = _interopRequireDefault(_logger);

      var _module = __webpack_require__(9);

      var _module2 = _interopRequireDefault(_module);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var debug = (0, _logger2.default)('quill:keyboard');

      var SHORTKEY = /Mac/i.test(navigator.platform) ? 'metaKey' : 'ctrlKey';

      var Keyboard = function (_Module) {
        _inherits(Keyboard, _Module);

        _createClass(Keyboard, null, [{
          key: 'match',
          value: function match(evt, binding) {
            binding = normalize(binding);
            if (['altKey', 'ctrlKey', 'metaKey', 'shiftKey'].some(function (key) {
              return !!binding[key] !== evt[key] && binding[key] !== null;
            })) {
              return false;
            }
            return binding.key === (evt.which || evt.keyCode);
          }
        }]);

        function Keyboard(quill, options) {
          _classCallCheck(this, Keyboard);

          var _this = _possibleConstructorReturn(this, (Keyboard.__proto__ || Object.getPrototypeOf(Keyboard)).call(this, quill, options));

          _this.bindings = {};
          Object.keys(_this.options.bindings).forEach(function (name) {
            if (_this.options.bindings[name]) {
              _this.addBinding(_this.options.bindings[name]);
            }
          });
          _this.addBinding({ key: Keyboard.keys.ENTER, shiftKey: null }, handleEnter);
          _this.addBinding({ key: Keyboard.keys.ENTER, metaKey: null, ctrlKey: null, altKey: null }, function () {});
          if (/Firefox/i.test(navigator.userAgent)) {
            // Need to handle delete and backspace for Firefox in the general case #1171
            _this.addBinding({ key: Keyboard.keys.BACKSPACE }, { collapsed: true }, handleBackspace);
            _this.addBinding({ key: Keyboard.keys.DELETE }, { collapsed: true }, handleDelete);
          } else {
            _this.addBinding({ key: Keyboard.keys.BACKSPACE }, { collapsed: true, prefix: /^.?$/ }, handleBackspace);
            _this.addBinding({ key: Keyboard.keys.DELETE }, { collapsed: true, suffix: /^.?$/ }, handleDelete);
          }
          _this.addBinding({ key: Keyboard.keys.BACKSPACE }, { collapsed: false }, handleDeleteRange);
          _this.addBinding({ key: Keyboard.keys.DELETE }, { collapsed: false }, handleDeleteRange);
          _this.addBinding({ key: Keyboard.keys.BACKSPACE, altKey: null, ctrlKey: null, metaKey: null, shiftKey: null }, { collapsed: true, offset: 0 }, handleBackspace);
          _this.listen();
          return _this;
        }

        _createClass(Keyboard, [{
          key: 'addBinding',
          value: function addBinding(key) {
            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var handler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var binding = normalize(key);
            if (binding == null || binding.key == null) {
              return debug.warn('Attempted to add invalid keyboard binding', binding);
            }
            if (typeof context === 'function') {
              context = { handler: context };
            }
            if (typeof handler === 'function') {
              handler = { handler: handler };
            }
            binding = (0, _extend2.default)(binding, context, handler);
            this.bindings[binding.key] = this.bindings[binding.key] || [];
            this.bindings[binding.key].push(binding);
          }
        }, {
          key: 'listen',
          value: function listen() {
            var _this2 = this;

            this.quill.root.addEventListener('keydown', function (evt) {
              if (evt.defaultPrevented) return;
              var which = evt.which || evt.keyCode;
              var bindings = (_this2.bindings[which] || []).filter(function (binding) {
                return Keyboard.match(evt, binding);
              });
              if (bindings.length === 0) return;
              var range = _this2.quill.getSelection();
              if (range == null || !_this2.quill.hasFocus()) return;

              var _quill$getLine = _this2.quill.getLine(range.index),
                  _quill$getLine2 = _slicedToArray(_quill$getLine, 2),
                  line = _quill$getLine2[0],
                  offset = _quill$getLine2[1];

              var _quill$getLeaf = _this2.quill.getLeaf(range.index),
                  _quill$getLeaf2 = _slicedToArray(_quill$getLeaf, 2),
                  leafStart = _quill$getLeaf2[0],
                  offsetStart = _quill$getLeaf2[1];

              var _ref = range.length === 0 ? [leafStart, offsetStart] : _this2.quill.getLeaf(range.index + range.length),
                  _ref2 = _slicedToArray(_ref, 2),
                  leafEnd = _ref2[0],
                  offsetEnd = _ref2[1];

              var prefixText = leafStart instanceof _parchment2.default.Text ? leafStart.value().slice(0, offsetStart) : '';
              var suffixText = leafEnd instanceof _parchment2.default.Text ? leafEnd.value().slice(offsetEnd) : '';
              var curContext = {
                collapsed: range.length === 0,
                empty: range.length === 0 && line.length() <= 1,
                format: _this2.quill.getFormat(range),
                offset: offset,
                prefix: prefixText,
                suffix: suffixText
              };
              var prevented = bindings.some(function (binding) {
                if (binding.collapsed != null && binding.collapsed !== curContext.collapsed) return false;
                if (binding.empty != null && binding.empty !== curContext.empty) return false;
                if (binding.offset != null && binding.offset !== curContext.offset) return false;
                if (Array.isArray(binding.format)) {
                  // any format is present
                  if (binding.format.every(function (name) {
                    return curContext.format[name] == null;
                  })) {
                    return false;
                  }
                } else if (_typeof(binding.format) === 'object') {
                  // all formats must match
                  if (!Object.keys(binding.format).every(function (name) {
                    if (binding.format[name] === true) return curContext.format[name] != null;
                    if (binding.format[name] === false) return curContext.format[name] == null;
                    return (0, _deepEqual2.default)(binding.format[name], curContext.format[name]);
                  })) {
                    return false;
                  }
                }
                if (binding.prefix != null && !binding.prefix.test(curContext.prefix)) return false;
                if (binding.suffix != null && !binding.suffix.test(curContext.suffix)) return false;
                return binding.handler.call(_this2, range, curContext) !== true;
              });
              if (prevented) {
                evt.preventDefault();
              }
            });
          }
        }]);

        return Keyboard;
      }(_module2.default);

      Keyboard.keys = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        ESCAPE: 27,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DELETE: 46
      };

      Keyboard.DEFAULTS = {
        bindings: {
          'bold': makeFormatHandler('bold'),
          'italic': makeFormatHandler('italic'),
          'underline': makeFormatHandler('underline'),
          'indent': {
            // highlight tab or tab at beginning of list, indent or blockquote
            key: Keyboard.keys.TAB,
            format: ['blockquote', 'indent', 'list'],
            handler: function handler(range, context) {
              if (context.collapsed && context.offset !== 0) return true;
              this.quill.format('indent', '+1', _quill2.default.sources.USER);
            }
          },
          'outdent': {
            key: Keyboard.keys.TAB,
            shiftKey: true,
            format: ['blockquote', 'indent', 'list'],
            // highlight tab or tab at beginning of list, indent or blockquote
            handler: function handler(range, context) {
              if (context.collapsed && context.offset !== 0) return true;
              this.quill.format('indent', '-1', _quill2.default.sources.USER);
            }
          },
          'outdent backspace': {
            key: Keyboard.keys.BACKSPACE,
            collapsed: true,
            shiftKey: null,
            metaKey: null,
            ctrlKey: null,
            altKey: null,
            format: ['blockquote', 'indent', 'list'],
            offset: 0,
            handler: function handler(range, context) {
              if (context.format.indent != null) {
                this.quill.format('indent', '-1', _quill2.default.sources.USER);
              } else if (context.format.blockquote != null) {
                this.quill.format('blockquote', false, _quill2.default.sources.USER);
              } else if (context.format.list != null) {
                this.quill.format('list', false, _quill2.default.sources.USER);
              }
            }
          },
          'indent code-block': makeCodeBlockHandler(true),
          'outdent code-block': makeCodeBlockHandler(false),
          'remove tab': {
            key: Keyboard.keys.TAB,
            shiftKey: true,
            collapsed: true,
            prefix: /\t$/,
            handler: function handler(range) {
              this.quill.deleteText(range.index - 1, 1, _quill2.default.sources.USER);
            }
          },
          'tab': {
            key: Keyboard.keys.TAB,
            handler: function handler(range, context) {
              if (!context.collapsed) {
                this.quill.scroll.deleteAt(range.index, range.length);
              }
              this.quill.insertText(range.index, '\t', _quill2.default.sources.USER);
              this.quill.setSelection(range.index + 1, _quill2.default.sources.SILENT);
            }
          },
          'list empty enter': {
            key: Keyboard.keys.ENTER,
            collapsed: true,
            format: ['list'],
            empty: true,
            handler: function handler(range, context) {
              this.quill.format('list', false, _quill2.default.sources.USER);
              if (context.format.indent) {
                this.quill.format('indent', false, _quill2.default.sources.USER);
              }
            }
          },
          'checklist enter': {
            key: Keyboard.keys.ENTER,
            collapsed: true,
            format: { list: 'checked' },
            handler: function handler(range) {
              this.quill.scroll.insertAt(range.index, '\n');

              var _quill$getLine3 = this.quill.getLine(range.index + 1),
                  _quill$getLine4 = _slicedToArray(_quill$getLine3, 1),
                  line = _quill$getLine4[0];

              line.format('list', 'unchecked');
              this.quill.update(_quill2.default.sources.USER);
              this.quill.setSelection(range.index + 1, _quill2.default.sources.SILENT);
              this.quill.selection.scrollIntoView();
            }
          },
          'header enter': {
            key: Keyboard.keys.ENTER,
            collapsed: true,
            format: ['header'],
            suffix: /^$/,
            handler: function handler(range) {
              this.quill.scroll.insertAt(range.index, '\n');
              this.quill.formatText(range.index + 1, 1, 'header', false, _quill2.default.sources.USER);
              this.quill.setSelection(range.index + 1, _quill2.default.sources.SILENT);
              this.quill.selection.scrollIntoView();
            }
          },
          'list autofill': {
            key: ' ',
            collapsed: true,
            format: { list: false },
            prefix: /^\s*?(1\.|-|\[ ?\]|\[x\])$/,
            handler: function handler(range, context) {
              if (this.quill.scroll.whitelist != null && !this.quill.scroll.whitelist['list']) return true;
              var length = context.prefix.length;
              var value = void 0;
              switch (context.prefix.trim()) {
                case '[]':case '[ ]':
                  value = 'unchecked';
                  break;
                case '[x]':
                  value = 'checked';
                  break;
                case '-':
                  value = 'bullet';
                  break;
                default:
                  value = 'ordered';
              }
              this.quill.scroll.deleteAt(range.index - length, length);
              this.quill.formatLine(range.index - length, 1, 'list', value, _quill2.default.sources.USER);
              this.quill.setSelection(range.index - length, _quill2.default.sources.SILENT);
            }
          },
          'code exit': {
            key: Keyboard.keys.ENTER,
            collapsed: true,
            format: ['code-block'],
            prefix: /\n\n$/,
            suffix: /^\s+$/,
            handler: function handler(range) {
              this.quill.format('code-block', false, _quill2.default.sources.USER);
              this.quill.deleteText(range.index - 2, 1, _quill2.default.sources.USER);
            }
          }
        }
      };

      function handleBackspace(range, context) {
        if (range.index === 0 || this.quill.getLength() <= 1) return;

        var _quill$getLine5 = this.quill.getLine(range.index),
            _quill$getLine6 = _slicedToArray(_quill$getLine5, 1),
            line = _quill$getLine6[0];

        var formats = {};
        if (context.offset === 0) {
          var _quill$getLine7 = this.quill.getLine(range.index - 1),
              _quill$getLine8 = _slicedToArray(_quill$getLine7, 1),
              prev = _quill$getLine8[0];

          if (prev != null && prev.length() > 1) {
            var curFormats = line.formats();
            var prevFormats = this.quill.getFormat(range.index - 1, 1);
            formats = _op2.default.attributes.diff(curFormats, prevFormats) || {};
          }
        }
        // Check for astral symbols
        var length = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(context.prefix) ? 2 : 1;
        this.quill.deleteText(range.index - length, length, _quill2.default.sources.USER);
        if (Object.keys(formats).length > 0) {
          this.quill.formatLine(range.index - length, length, formats, _quill2.default.sources.USER);
        }
        this.quill.selection.scrollIntoView();
      }

      function handleDelete(range, context) {
        // Check for astral symbols
        var length = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(context.suffix) ? 2 : 1;
        if (range.index >= this.quill.getLength() - length) return;
        var formats = {},
            nextLength = 0;

        var _quill$getLine9 = this.quill.getLine(range.index),
            _quill$getLine10 = _slicedToArray(_quill$getLine9, 1),
            line = _quill$getLine10[0];

        if (context.offset >= line.length() - 1) {
          var _quill$getLine11 = this.quill.getLine(range.index + 1),
              _quill$getLine12 = _slicedToArray(_quill$getLine11, 1),
              next = _quill$getLine12[0];

          if (next) {
            var curFormats = line.formats();
            var nextFormats = this.quill.getFormat(range.index, 1);
            formats = _op2.default.attributes.diff(curFormats, nextFormats) || {};
            nextLength = next.length();
          }
        }
        this.quill.deleteText(range.index, length, _quill2.default.sources.USER);
        if (Object.keys(formats).length > 0) {
          this.quill.formatLine(range.index + nextLength - 1, length, formats, _quill2.default.sources.USER);
        }
      }

      function handleDeleteRange(range) {
        this.quill.deleteText(range, _quill2.default.sources.USER);
        this.quill.setSelection(range.index, _quill2.default.sources.SILENT);
        this.quill.selection.scrollIntoView();
      }

      function handleEnter(range, context) {
        var _this3 = this;

        if (range.length > 0) {
          this.quill.scroll.deleteAt(range.index, range.length); // So we do not trigger text-change
        }
        var lineFormats = Object.keys(context.format).reduce(function (lineFormats, format) {
          if (_parchment2.default.query(format, _parchment2.default.Scope.BLOCK) && !Array.isArray(context.format[format])) {
            lineFormats[format] = context.format[format];
          }
          return lineFormats;
        }, {});
        this.quill.insertText(range.index, '\n', lineFormats, _quill2.default.sources.USER);
        // Earlier scroll.deleteAt might have messed up our selection,
        // so insertText's built in selection preservation is not reliable
        this.quill.setSelection(range.index + 1, _quill2.default.sources.SILENT);
        this.quill.selection.scrollIntoView();
        Object.keys(context.format).forEach(function (name) {
          if (lineFormats[name] != null) return;
          if (Array.isArray(context.format[name])) return;
          if (name === 'link') return;
          _this3.quill.format(name, context.format[name], _quill2.default.sources.USER);
        });
      }

      function makeCodeBlockHandler(indent) {
        return {
          key: Keyboard.keys.TAB,
          shiftKey: !indent,
          format: { 'code-block': true },
          handler: function handler(range) {
            var CodeBlock = _parchment2.default.query('code-block');
            var index = range.index,
                length = range.length;

            var _quill$scroll$descend = this.quill.scroll.descendant(CodeBlock, index),
                _quill$scroll$descend2 = _slicedToArray(_quill$scroll$descend, 2),
                block = _quill$scroll$descend2[0],
                offset = _quill$scroll$descend2[1];

            if (block == null) return;
            var scrollIndex = this.quill.getIndex(block);
            var start = block.newlineIndex(offset, true) + 1;
            var end = block.newlineIndex(scrollIndex + offset + length);
            var lines = block.domNode.textContent.slice(start, end).split('\n');
            offset = 0;
            lines.forEach(function (line, i) {
              if (indent) {
                block.insertAt(start + offset, CodeBlock.TAB);
                offset += CodeBlock.TAB.length;
                if (i === 0) {
                  index += CodeBlock.TAB.length;
                } else {
                  length += CodeBlock.TAB.length;
                }
              } else if (line.startsWith(CodeBlock.TAB)) {
                block.deleteAt(start + offset, CodeBlock.TAB.length);
                offset -= CodeBlock.TAB.length;
                if (i === 0) {
                  index -= CodeBlock.TAB.length;
                } else {
                  length -= CodeBlock.TAB.length;
                }
              }
              offset += line.length + 1;
            });
            this.quill.update(_quill2.default.sources.USER);
            this.quill.setSelection(index, length, _quill2.default.sources.SILENT);
          }
        };
      }

      function makeFormatHandler(format) {
        return {
          key: format[0].toUpperCase(),
          shortKey: true,
          handler: function handler(range, context) {
            this.quill.format(format, !context.format[format], _quill2.default.sources.USER);
          }
        };
      }

      function normalize(binding) {
        if (typeof binding === 'string' || typeof binding === 'number') {
          return normalize({ key: binding });
        }
        if ((typeof binding === 'undefined' ? 'undefined' : _typeof(binding)) === 'object') {
          binding = (0, _clone2.default)(binding, false);
        }
        if (typeof binding.key === 'string') {
          if (Keyboard.keys[binding.key.toUpperCase()] != null) {
            binding.key = Keyboard.keys[binding.key.toUpperCase()];
          } else if (binding.key.length === 1) {
            binding.key = binding.key.toUpperCase().charCodeAt(0);
          } else {
            return null;
          }
        }
        if (binding.shortKey) {
          binding[SHORTKEY] = binding.shortKey;
          delete binding.shortKey;
        }
        return binding;
      }

      exports.default = Keyboard;
      exports.SHORTKEY = SHORTKEY;

      /***/
    },
    /* 32 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };
        return function (d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var attributor_1 = __webpack_require__(13);
      function match(node, prefix) {
        var className = node.getAttribute('class') || '';
        return className.split(/\s+/).filter(function (name) {
          return name.indexOf(prefix + "-") === 0;
        });
      }
      var ClassAttributor = function (_super) {
        __extends(ClassAttributor, _super);
        function ClassAttributor() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        ClassAttributor.keys = function (node) {
          return (node.getAttribute('class') || '').split(/\s+/).map(function (name) {
            return name.split('-').slice(0, -1).join('-');
          });
        };
        ClassAttributor.prototype.add = function (node, value) {
          if (!this.canAdd(node, value)) return false;
          this.remove(node);
          node.classList.add(this.keyName + "-" + value);
          return true;
        };
        ClassAttributor.prototype.remove = function (node) {
          var matches = match(node, this.keyName);
          matches.forEach(function (name) {
            node.classList.remove(name);
          });
          if (node.classList.length === 0) {
            node.removeAttribute('class');
          }
        };
        ClassAttributor.prototype.value = function (node) {
          var result = match(node, this.keyName)[0] || '';
          var value = result.slice(this.keyName.length + 1); // +1 for hyphen
          return this.canAdd(node, value) ? value : '';
        };
        return ClassAttributor;
      }(attributor_1.default);
      exports.default = ClassAttributor;

      /***/
    },
    /* 33 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", { value: true });
      var attributor_1 = __webpack_require__(13);
      var class_1 = __webpack_require__(32);
      var style_1 = __webpack_require__(34);
      var Registry = __webpack_require__(1);
      var AttributorStore = function () {
        function AttributorStore(domNode) {
          this.attributes = {};
          this.domNode = domNode;
          this.build();
        }
        AttributorStore.prototype.attribute = function (attribute, value) {
          if (value) {
            if (attribute.add(this.domNode, value)) {
              if (attribute.value(this.domNode) != null) {
                this.attributes[attribute.attrName] = attribute;
              } else {
                delete this.attributes[attribute.attrName];
              }
            }
          } else {
            attribute.remove(this.domNode);
            delete this.attributes[attribute.attrName];
          }
        };
        AttributorStore.prototype.build = function () {
          var _this = this;
          this.attributes = {};
          var attributes = attributor_1.default.keys(this.domNode);
          var classes = class_1.default.keys(this.domNode);
          var styles = style_1.default.keys(this.domNode);
          attributes.concat(classes).concat(styles).forEach(function (name) {
            var attr = Registry.query(name, Registry.Scope.ATTRIBUTE);
            if (attr instanceof attributor_1.default) {
              _this.attributes[attr.attrName] = attr;
            }
          });
        };
        AttributorStore.prototype.copy = function (target) {
          var _this = this;
          Object.keys(this.attributes).forEach(function (key) {
            var value = _this.attributes[key].value(_this.domNode);
            target.format(key, value);
          });
        };
        AttributorStore.prototype.move = function (target) {
          var _this = this;
          this.copy(target);
          Object.keys(this.attributes).forEach(function (key) {
            _this.attributes[key].remove(_this.domNode);
          });
          this.attributes = {};
        };
        AttributorStore.prototype.values = function () {
          var _this = this;
          return Object.keys(this.attributes).reduce(function (attributes, name) {
            attributes[name] = _this.attributes[name].value(_this.domNode);
            return attributes;
          }, {});
        };
        return AttributorStore;
      }();
      exports.default = AttributorStore;

      /***/
    },
    /* 34 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };
        return function (d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var attributor_1 = __webpack_require__(13);
      function camelize(name) {
        var parts = name.split('-');
        var rest = parts.slice(1).map(function (part) {
          return part[0].toUpperCase() + part.slice(1);
        }).join('');
        return parts[0] + rest;
      }
      var StyleAttributor = function (_super) {
        __extends(StyleAttributor, _super);
        function StyleAttributor() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        StyleAttributor.keys = function (node) {
          return (node.getAttribute('style') || '').split(';').map(function (value) {
            var arr = value.split(':');
            return arr[0].trim();
          });
        };
        StyleAttributor.prototype.add = function (node, value) {
          if (!this.canAdd(node, value)) return false;
          node.style[camelize(this.keyName)] = value;
          return true;
        };
        StyleAttributor.prototype.remove = function (node) {
          node.style[camelize(this.keyName)] = '';
          if (!node.getAttribute('style')) {
            node.removeAttribute('style');
          }
        };
        StyleAttributor.prototype.value = function (node) {
          var value = node.style[camelize(this.keyName)];
          return this.canAdd(node, value) ? value : '';
        };
        return StyleAttributor;
      }(attributor_1.default);
      exports.default = StyleAttributor;

      /***/
    },
    /* 35 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", { value: true });
      var Registry = __webpack_require__(1);
      var ShadowBlot = function () {
        function ShadowBlot(domNode) {
          this.domNode = domNode;
          this.attach();
        }
        Object.defineProperty(ShadowBlot.prototype, "statics", {
          // Hack for accessing inherited static methods
          get: function get() {
            return this.constructor;
          },
          enumerable: true,
          configurable: true
        });
        ShadowBlot.create = function (value) {
          if (this.tagName == null) {
            throw new Registry.ParchmentError('Blot definition missing tagName');
          }
          var node;
          if (Array.isArray(this.tagName)) {
            if (typeof value === 'string') {
              value = value.toUpperCase();
              if (parseInt(value).toString() === value) {
                value = parseInt(value);
              }
            }
            if (typeof value === 'number') {
              node = document.createElement(this.tagName[value - 1]);
            } else if (this.tagName.indexOf(value) > -1) {
              node = document.createElement(value);
            } else {
              node = document.createElement(this.tagName[0]);
            }
          } else {
            node = document.createElement(this.tagName);
          }
          if (this.className) {
            node.classList.add(this.className);
          }
          return node;
        };
        ShadowBlot.prototype.attach = function () {
          this.domNode[Registry.DATA_KEY] = { blot: this };
        };
        ShadowBlot.prototype.clone = function () {
          var domNode = this.domNode.cloneNode();
          return Registry.create(domNode);
        };
        ShadowBlot.prototype.detach = function () {
          if (this.parent != null) this.parent.removeChild(this);
          delete this.domNode[Registry.DATA_KEY];
        };
        ShadowBlot.prototype.deleteAt = function (index, length) {
          var blot = this.isolate(index, length);
          blot.remove();
        };
        ShadowBlot.prototype.formatAt = function (index, length, name, value) {
          var blot = this.isolate(index, length);
          if (Registry.query(name, Registry.Scope.BLOT) != null && value) {
            blot.wrap(name, value);
          } else if (Registry.query(name, Registry.Scope.ATTRIBUTE) != null) {
            var parent = Registry.create(this.statics.scope);
            blot.wrap(parent);
            parent.format(name, value);
          }
        };
        ShadowBlot.prototype.insertAt = function (index, value, def) {
          var blot = def == null ? Registry.create('text', value) : Registry.create(value, def);
          var ref = this.split(index);
          this.parent.insertBefore(blot, ref);
        };
        ShadowBlot.prototype.insertInto = function (parentBlot, refBlot) {
          if (this.parent != null) {
            this.parent.children.remove(this);
          }
          parentBlot.children.insertBefore(this, refBlot);
          if (refBlot != null) {
            var refDomNode = refBlot.domNode;
          }
          if (this.next == null || this.domNode.nextSibling != refDomNode) {
            parentBlot.domNode.insertBefore(this.domNode, typeof refDomNode !== 'undefined' ? refDomNode : null);
          }
          this.parent = parentBlot;
        };
        ShadowBlot.prototype.isolate = function (index, length) {
          var target = this.split(index);
          target.split(length);
          return target;
        };
        ShadowBlot.prototype.length = function () {
          return 1;
        };
        ;
        ShadowBlot.prototype.offset = function (root) {
          if (root === void 0) {
            root = this.parent;
          }
          if (this.parent == null || this == root) return 0;
          return this.parent.children.offset(this) + this.parent.offset(root);
        };
        ShadowBlot.prototype.optimize = function () {
          // TODO clean up once we use WeakMap
          if (this.domNode[Registry.DATA_KEY] != null) {
            delete this.domNode[Registry.DATA_KEY].mutations;
          }
        };
        ShadowBlot.prototype.remove = function () {
          if (this.domNode.parentNode != null) {
            this.domNode.parentNode.removeChild(this.domNode);
          }
          this.detach();
        };
        ShadowBlot.prototype.replace = function (target) {
          if (target.parent == null) return;
          target.parent.insertBefore(this, target.next);
          target.remove();
        };
        ShadowBlot.prototype.replaceWith = function (name, value) {
          var replacement = typeof name === 'string' ? Registry.create(name, value) : name;
          replacement.replace(this);
          return replacement;
        };
        ShadowBlot.prototype.split = function (index, force) {
          return index === 0 ? this : this.next;
        };
        ShadowBlot.prototype.update = function (mutations) {
          if (mutations === void 0) {
            mutations = [];
          }
          // Nothing to do by default
        };
        ShadowBlot.prototype.wrap = function (name, value) {
          var wrapper = typeof name === 'string' ? Registry.create(name, value) : name;
          if (this.parent != null) {
            this.parent.insertBefore(wrapper, this.next);
          }
          wrapper.appendChild(this);
          return wrapper;
        };
        return ShadowBlot;
      }();
      ShadowBlot.blotName = 'abstract';
      exports.default = ShadowBlot;

      /***/
    },
    /* 36 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.AlignStyle = exports.AlignClass = exports.AlignAttribute = undefined;

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var config = {
        scope: _parchment2.default.Scope.BLOCK,
        whitelist: ['right', 'center', 'justify']
      };

      var AlignAttribute = new _parchment2.default.Attributor.Attribute('align', 'align', config);
      var AlignClass = new _parchment2.default.Attributor.Class('align', 'ql-align', config);
      var AlignStyle = new _parchment2.default.Attributor.Style('align', 'text-align', config);

      exports.AlignAttribute = AlignAttribute;
      exports.AlignClass = AlignClass;
      exports.AlignStyle = AlignStyle;

      /***/
    },
    /* 37 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.BackgroundStyle = exports.BackgroundClass = undefined;

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      var _color = __webpack_require__(26);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var BackgroundClass = new _parchment2.default.Attributor.Class('background', 'ql-bg', {
        scope: _parchment2.default.Scope.INLINE
      });
      var BackgroundStyle = new _color.ColorAttributor('background', 'background-color', {
        scope: _parchment2.default.Scope.INLINE
      });

      exports.BackgroundClass = BackgroundClass;
      exports.BackgroundStyle = BackgroundStyle;

      /***/
    },
    /* 38 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.DirectionStyle = exports.DirectionClass = exports.DirectionAttribute = undefined;

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var config = {
        scope: _parchment2.default.Scope.BLOCK,
        whitelist: ['rtl']
      };

      var DirectionAttribute = new _parchment2.default.Attributor.Attribute('direction', 'dir', config);
      var DirectionClass = new _parchment2.default.Attributor.Class('direction', 'ql-direction', config);
      var DirectionStyle = new _parchment2.default.Attributor.Style('direction', 'direction', config);

      exports.DirectionAttribute = DirectionAttribute;
      exports.DirectionClass = DirectionClass;
      exports.DirectionStyle = DirectionStyle;

      /***/
    },
    /* 39 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.FontClass = exports.FontStyle = undefined;

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var config = {
        scope: _parchment2.default.Scope.INLINE,
        whitelist: ['serif', 'monospace']
      };

      var FontClass = new _parchment2.default.Attributor.Class('font', 'ql-font', config);

      var FontStyleAttributor = function (_Parchment$Attributor) {
        _inherits(FontStyleAttributor, _Parchment$Attributor);

        function FontStyleAttributor() {
          _classCallCheck(this, FontStyleAttributor);

          return _possibleConstructorReturn(this, (FontStyleAttributor.__proto__ || Object.getPrototypeOf(FontStyleAttributor)).apply(this, arguments));
        }

        _createClass(FontStyleAttributor, [{
          key: 'value',
          value: function value(node) {
            return _get(FontStyleAttributor.prototype.__proto__ || Object.getPrototypeOf(FontStyleAttributor.prototype), 'value', this).call(this, node).replace(/["']/g, '');
          }
        }]);

        return FontStyleAttributor;
      }(_parchment2.default.Attributor.Style);

      var FontStyle = new FontStyleAttributor('font', 'font-family', config);

      exports.FontStyle = FontStyle;
      exports.FontClass = FontClass;

      /***/
    },
    /* 40 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.SizeStyle = exports.SizeClass = undefined;

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var SizeClass = new _parchment2.default.Attributor.Class('size', 'ql-size', {
        scope: _parchment2.default.Scope.INLINE,
        whitelist: ['small', 'large', 'huge']
      });
      var SizeStyle = new _parchment2.default.Attributor.Style('size', 'font-size', {
        scope: _parchment2.default.Scope.INLINE,
        whitelist: ['10px', '18px', '32px']
      });

      exports.SizeClass = SizeClass;
      exports.SizeStyle = SizeStyle;

      /***/
    },
    /* 41 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      module.exports = {
        'align': {
          '': __webpack_require__(79),
          'center': __webpack_require__(77),
          'right': __webpack_require__(80),
          'justify': __webpack_require__(78)
        },
        'background': __webpack_require__(81),
        'blockquote': __webpack_require__(82),
        'bold': __webpack_require__(83),
        'clean': __webpack_require__(84),
        'code': __webpack_require__(55),
        'code-block': __webpack_require__(55),
        'color': __webpack_require__(85),
        'direction': {
          '': __webpack_require__(86),
          'rtl': __webpack_require__(87)
        },
        'float': {
          'center': __webpack_require__(89),
          'full': __webpack_require__(90),
          'left': __webpack_require__(91),
          'right': __webpack_require__(92)
        },
        'formula': __webpack_require__(93),
        'header': {
          '1': __webpack_require__(95),
          '2': __webpack_require__(94)
        },
        'italic': __webpack_require__(98),
        'image': __webpack_require__(96),
        'indent': {
          '+1': __webpack_require__(97),
          '-1': __webpack_require__(103)
        },
        'link': __webpack_require__(99),
        'list': {
          'ordered': __webpack_require__(102),
          'bullet': __webpack_require__(100),
          'check': __webpack_require__(101)
        },
        'script': {
          'sub': __webpack_require__(105),
          'super': __webpack_require__(106)
        },
        'strike': __webpack_require__(104),
        'underline': __webpack_require__(107),
        'video': __webpack_require__(108)
      };

      /***/
    },
    /* 42 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.getLastChangeIndex = exports.default = undefined;

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      var _quill = __webpack_require__(6);

      var _quill2 = _interopRequireDefault(_quill);

      var _module = __webpack_require__(9);

      var _module2 = _interopRequireDefault(_module);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var History = function (_Module) {
        _inherits(History, _Module);

        function History(quill, options) {
          _classCallCheck(this, History);

          var _this = _possibleConstructorReturn(this, (History.__proto__ || Object.getPrototypeOf(History)).call(this, quill, options));

          _this.lastRecorded = 0;
          _this.ignoreChange = false;
          _this.clear();
          _this.quill.on(_quill2.default.events.EDITOR_CHANGE, function (eventName, delta, oldDelta, source) {
            if (eventName !== _quill2.default.events.TEXT_CHANGE || _this.ignoreChange) return;
            if (!_this.options.userOnly || source === _quill2.default.sources.USER) {
              _this.record(delta, oldDelta);
            } else {
              _this.transform(delta);
            }
          });
          _this.quill.keyboard.addBinding({ key: 'Z', shortKey: true }, _this.undo.bind(_this));
          _this.quill.keyboard.addBinding({ key: 'Z', shortKey: true, shiftKey: true }, _this.redo.bind(_this));
          if (/Win/i.test(navigator.platform)) {
            _this.quill.keyboard.addBinding({ key: 'Y', shortKey: true }, _this.redo.bind(_this));
          }
          return _this;
        }

        _createClass(History, [{
          key: 'change',
          value: function change(source, dest) {
            if (this.stack[source].length === 0) return;
            var delta = this.stack[source].pop();
            this.lastRecorded = 0;
            this.ignoreChange = true;
            this.quill.updateContents(delta[source], _quill2.default.sources.USER);
            this.ignoreChange = false;
            var index = getLastChangeIndex(delta[source]);
            this.quill.setSelection(index);
            this.quill.selection.scrollIntoView();
            this.stack[dest].push(delta);
          }
        }, {
          key: 'clear',
          value: function clear() {
            this.stack = { undo: [], redo: [] };
          }
        }, {
          key: 'record',
          value: function record(changeDelta, oldDelta) {
            if (changeDelta.ops.length === 0) return;
            this.stack.redo = [];
            var undoDelta = this.quill.getContents().diff(oldDelta);
            var timestamp = Date.now();
            if (this.lastRecorded + this.options.delay > timestamp && this.stack.undo.length > 0) {
              var delta = this.stack.undo.pop();
              undoDelta = undoDelta.compose(delta.undo);
              changeDelta = delta.redo.compose(changeDelta);
            } else {
              this.lastRecorded = timestamp;
            }
            this.stack.undo.push({
              redo: changeDelta,
              undo: undoDelta
            });
            if (this.stack.undo.length > this.options.maxStack) {
              this.stack.undo.shift();
            }
          }
        }, {
          key: 'redo',
          value: function redo() {
            this.change('redo', 'undo');
          }
        }, {
          key: 'transform',
          value: function transform(delta) {
            this.stack.undo.forEach(function (change) {
              change.undo = delta.transform(change.undo, true);
              change.redo = delta.transform(change.redo, true);
            });
            this.stack.redo.forEach(function (change) {
              change.undo = delta.transform(change.undo, true);
              change.redo = delta.transform(change.redo, true);
            });
          }
        }, {
          key: 'undo',
          value: function undo() {
            this.change('undo', 'redo');
          }
        }]);

        return History;
      }(_module2.default);

      History.DEFAULTS = {
        delay: 1000,
        maxStack: 100,
        userOnly: false
      };

      function endsWithNewlineChange(delta) {
        var lastOp = delta.ops[delta.ops.length - 1];
        if (lastOp == null) return false;
        if (lastOp.insert != null) {
          return typeof lastOp.insert === 'string' && lastOp.insert.endsWith('\n');
        }
        if (lastOp.attributes != null) {
          return Object.keys(lastOp.attributes).some(function (attr) {
            return _parchment2.default.query(attr, _parchment2.default.Scope.BLOCK) != null;
          });
        }
        return false;
      }

      function getLastChangeIndex(delta) {
        var deleteLength = delta.reduce(function (length, op) {
          length += op.delete || 0;
          return length;
        }, 0);
        var changeIndex = delta.length() - deleteLength;
        if (endsWithNewlineChange(delta)) {
          changeIndex -= 1;
        }
        return changeIndex;
      }

      exports.default = History;
      exports.getLastChangeIndex = getLastChangeIndex;

      /***/
    },
    /* 43 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = exports.BaseTooltip = undefined;

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _extend = __webpack_require__(3);

      var _extend2 = _interopRequireDefault(_extend);

      var _quillDelta = __webpack_require__(2);

      var _quillDelta2 = _interopRequireDefault(_quillDelta);

      var _emitter = __webpack_require__(5);

      var _emitter2 = _interopRequireDefault(_emitter);

      var _keyboard = __webpack_require__(31);

      var _keyboard2 = _interopRequireDefault(_keyboard);

      var _theme = __webpack_require__(30);

      var _theme2 = _interopRequireDefault(_theme);

      var _colorPicker = __webpack_require__(48);

      var _colorPicker2 = _interopRequireDefault(_colorPicker);

      var _iconPicker = __webpack_require__(49);

      var _iconPicker2 = _interopRequireDefault(_iconPicker);

      var _picker = __webpack_require__(28);

      var _picker2 = _interopRequireDefault(_picker);

      var _tooltip = __webpack_require__(50);

      var _tooltip2 = _interopRequireDefault(_tooltip);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var ALIGNS = [false, 'center', 'right', 'justify'];

      var COLORS = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"];

      var FONTS = [false, 'serif', 'monospace'];

      var HEADERS = ['1', '2', '3', false];

      var SIZES = ['small', false, 'large', 'huge'];

      var BaseTheme = function (_Theme) {
        _inherits(BaseTheme, _Theme);

        function BaseTheme(quill, options) {
          _classCallCheck(this, BaseTheme);

          var _this = _possibleConstructorReturn(this, (BaseTheme.__proto__ || Object.getPrototypeOf(BaseTheme)).call(this, quill, options));

          var listener = function listener(e) {
            if (!document.body.contains(quill.root)) {
              return document.body.removeEventListener('click', listener);
            }
            if (_this.tooltip != null && !_this.tooltip.root.contains(e.target) && document.activeElement !== _this.tooltip.textbox && !_this.quill.hasFocus()) {
              _this.tooltip.hide();
            }
            if (_this.pickers != null) {
              _this.pickers.forEach(function (picker) {
                if (!picker.container.contains(e.target)) {
                  picker.close();
                }
              });
            }
          };
          document.body.addEventListener('click', listener);
          return _this;
        }

        _createClass(BaseTheme, [{
          key: 'addModule',
          value: function addModule(name) {
            var module = _get(BaseTheme.prototype.__proto__ || Object.getPrototypeOf(BaseTheme.prototype), 'addModule', this).call(this, name);
            if (name === 'toolbar') {
              this.extendToolbar(module);
            }
            return module;
          }
        }, {
          key: 'buildButtons',
          value: function buildButtons(buttons, icons) {
            buttons.forEach(function (button) {
              var className = button.getAttribute('class') || '';
              className.split(/\s+/).forEach(function (name) {
                if (!name.startsWith('ql-')) return;
                name = name.slice('ql-'.length);
                if (icons[name] == null) return;
                if (name === 'direction') {
                  button.innerHTML = icons[name][''] + icons[name]['rtl'];
                } else if (typeof icons[name] === 'string') {
                  button.innerHTML = icons[name];
                } else {
                  var value = button.value || '';
                  if (value != null && icons[name][value]) {
                    button.innerHTML = icons[name][value];
                  }
                }
              });
            });
          }
        }, {
          key: 'buildPickers',
          value: function buildPickers(selects, icons) {
            var _this2 = this;

            this.pickers = selects.map(function (select) {
              if (select.classList.contains('ql-align')) {
                if (select.querySelector('option') == null) {
                  fillSelect(select, ALIGNS);
                }
                return new _iconPicker2.default(select, icons.align);
              } else if (select.classList.contains('ql-background') || select.classList.contains('ql-color')) {
                var format = select.classList.contains('ql-background') ? 'background' : 'color';
                if (select.querySelector('option') == null) {
                  fillSelect(select, COLORS, format === 'background' ? '#ffffff' : '#000000');
                }
                return new _colorPicker2.default(select, icons[format]);
              } else {
                if (select.querySelector('option') == null) {
                  if (select.classList.contains('ql-font')) {
                    fillSelect(select, FONTS);
                  } else if (select.classList.contains('ql-header')) {
                    fillSelect(select, HEADERS);
                  } else if (select.classList.contains('ql-size')) {
                    fillSelect(select, SIZES);
                  }
                }
                return new _picker2.default(select);
              }
            });
            var update = function update() {
              _this2.pickers.forEach(function (picker) {
                picker.update();
              });
            };
            this.quill.on(_emitter2.default.events.EDITOR_CHANGE, update);
          }
        }]);

        return BaseTheme;
      }(_theme2.default);

      BaseTheme.DEFAULTS = (0, _extend2.default)(true, {}, _theme2.default.DEFAULTS, {
        modules: {
          toolbar: {
            handlers: {
              formula: function formula() {
                this.quill.theme.tooltip.edit('formula');
              },
              image: function image() {
                var _this3 = this;

                var fileInput = this.container.querySelector('input.ql-image[type=file]');
                if (fileInput == null) {
                  fileInput = document.createElement('input');
                  fileInput.setAttribute('type', 'file');
                  fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
                  fileInput.classList.add('ql-image');
                  fileInput.addEventListener('change', function () {
                    if (fileInput.files != null && fileInput.files[0] != null) {
                      var reader = new FileReader();
                      reader.onload = function (e) {
                        var range = _this3.quill.getSelection(true);
                        _this3.quill.updateContents(new _quillDelta2.default().retain(range.index).delete(range.length).insert({ image: e.target.result }), _emitter2.default.sources.USER);
                        fileInput.value = "";
                      };
                      reader.readAsDataURL(fileInput.files[0]);
                    }
                  });
                  this.container.appendChild(fileInput);
                }
                fileInput.click();
              },
              video: function video() {
                this.quill.theme.tooltip.edit('video');
              }
            }
          }
        }
      });

      var BaseTooltip = function (_Tooltip) {
        _inherits(BaseTooltip, _Tooltip);

        function BaseTooltip(quill, boundsContainer) {
          _classCallCheck(this, BaseTooltip);

          var _this4 = _possibleConstructorReturn(this, (BaseTooltip.__proto__ || Object.getPrototypeOf(BaseTooltip)).call(this, quill, boundsContainer));

          _this4.textbox = _this4.root.querySelector('input[type="text"]');
          _this4.listen();
          return _this4;
        }

        _createClass(BaseTooltip, [{
          key: 'listen',
          value: function listen() {
            var _this5 = this;

            this.textbox.addEventListener('keydown', function (event) {
              if (_keyboard2.default.match(event, 'enter')) {
                _this5.save();
                event.preventDefault();
              } else if (_keyboard2.default.match(event, 'escape')) {
                _this5.cancel();
                event.preventDefault();
              }
            });
          }
        }, {
          key: 'cancel',
          value: function cancel() {
            this.hide();
          }
        }, {
          key: 'edit',
          value: function edit() {
            var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'link';
            var preview = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            this.root.classList.remove('ql-hidden');
            this.root.classList.add('ql-editing');
            if (preview != null) {
              this.textbox.value = preview;
            } else if (mode !== this.root.getAttribute('data-mode')) {
              this.textbox.value = '';
            }
            this.position(this.quill.getBounds(this.quill.selection.savedRange));
            this.textbox.select();
            this.textbox.setAttribute('placeholder', this.textbox.getAttribute('data-' + mode) || '');
            this.root.setAttribute('data-mode', mode);
          }
        }, {
          key: 'restoreFocus',
          value: function restoreFocus() {
            var scrollTop = this.quill.scrollingContainer.scrollTop;
            this.quill.focus();
            this.quill.scrollingContainer.scrollTop = scrollTop;
          }
        }, {
          key: 'save',
          value: function save() {
            var value = this.textbox.value;
            switch (this.root.getAttribute('data-mode')) {
              case 'link':
                {
                  var scrollTop = this.quill.root.scrollTop;
                  if (this.linkRange) {
                    this.quill.formatText(this.linkRange, 'link', value, _emitter2.default.sources.USER);
                    delete this.linkRange;
                  } else {
                    this.restoreFocus();
                    this.quill.format('link', value, _emitter2.default.sources.USER);
                  }
                  this.quill.root.scrollTop = scrollTop;
                  break;
                }
              case 'video':
                {
                  value = extractVideoUrl(value);
                } // eslint-disable-next-line no-fallthrough
              case 'formula':
                {
                  if (!value) break;
                  var range = this.quill.getSelection(true);
                  if (range != null) {
                    var index = range.index + range.length;
                    this.quill.insertEmbed(index, this.root.getAttribute('data-mode'), value, _emitter2.default.sources.USER);
                    if (this.root.getAttribute('data-mode') === 'formula') {
                      this.quill.insertText(index + 1, ' ', _emitter2.default.sources.USER);
                    }
                    this.quill.setSelection(index + 2, _emitter2.default.sources.USER);
                  }
                  break;
                }
              default:
            }
            this.textbox.value = '';
            this.hide();
          }
        }]);

        return BaseTooltip;
      }(_tooltip2.default);

      function extractVideoUrl(url) {
        var match = url.match(/^(https?):\/\/(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || url.match(/^(https?):\/\/(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
        if (match) {
          return match[1] + '://www.youtube.com/embed/' + match[2] + '?showinfo=0';
        }
        if (match = url.match(/^(https?):\/\/(?:www\.)?vimeo\.com\/(\d+)/)) {
          // eslint-disable-line no-cond-assign
          return match[1] + '://player.vimeo.com/video/' + match[2] + '/';
        }
        return url;
      }

      function fillSelect(select, values) {
        var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        values.forEach(function (value) {
          var option = document.createElement('option');
          if (value === defaultValue) {
            option.setAttribute('selected', 'selected');
          } else {
            option.setAttribute('value', value);
          }
          select.appendChild(option);
        });
      }

      exports.BaseTooltip = BaseTooltip;
      exports.default = BaseTheme;

      /***/
    },
    /* 44 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var elem = document.createElement('div');
      elem.classList.toggle('test-class', false);
      if (elem.classList.contains('test-class')) {
        var _toggle = DOMTokenList.prototype.toggle;
        DOMTokenList.prototype.toggle = function (token, force) {
          if (arguments.length > 1 && !this.contains(token) === !force) {
            return force;
          } else {
            return _toggle.call(this, token);
          }
        };
      }

      if (!String.prototype.startsWith) {
        String.prototype.startsWith = function (searchString, position) {
          position = position || 0;
          return this.substr(position, searchString.length) === searchString;
        };
      }

      if (!String.prototype.endsWith) {
        String.prototype.endsWith = function (searchString, position) {
          var subjectString = this.toString();
          if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
          }
          position -= searchString.length;
          var lastIndex = subjectString.indexOf(searchString, position);
          return lastIndex !== -1 && lastIndex === position;
        };
      }

      if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, "find", {
          value: function value(predicate) {
            if (this === null) {
              throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
              throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
              value = list[i];
              if (predicate.call(thisArg, value, i, list)) {
                return value;
              }
            }
            return undefined;
          }
        });
      }

      document.addEventListener("DOMContentLoaded", function () {
        // Disable resizing in Firefox
        document.execCommand("enableObjectResizing", false, false);
        // Disable automatic linkifying in IE11
        document.execCommand("autoUrlDetect", false, false);
      });

      /***/
    },
    /* 45 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _inline = __webpack_require__(8);

      var _inline2 = _interopRequireDefault(_inline);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Bold = function (_Inline) {
        _inherits(Bold, _Inline);

        function Bold() {
          _classCallCheck(this, Bold);

          return _possibleConstructorReturn(this, (Bold.__proto__ || Object.getPrototypeOf(Bold)).apply(this, arguments));
        }

        _createClass(Bold, [{
          key: 'optimize',
          value: function optimize() {
            _get(Bold.prototype.__proto__ || Object.getPrototypeOf(Bold.prototype), 'optimize', this).call(this);
            if (this.domNode.tagName !== this.statics.tagName[0]) {
              this.replaceWith(this.statics.blotName);
            }
          }
        }], [{
          key: 'create',
          value: function create() {
            return _get(Bold.__proto__ || Object.getPrototypeOf(Bold), 'create', this).call(this);
          }
        }, {
          key: 'formats',
          value: function formats() {
            return true;
          }
        }]);

        return Bold;
      }(_inline2.default);

      Bold.blotName = 'bold';
      Bold.tagName = ['STRONG', 'B'];

      exports.default = Bold;

      /***/
    },
    /* 46 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.matchText = exports.matchSpacing = exports.matchNewline = exports.matchBlot = exports.matchAttributor = exports.default = undefined;

      var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      };

      var _slicedToArray = function () {
        function sliceIterator(arr, i) {
          var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;_e = err;
          } finally {
            try {
              if (!_n && _i["return"]) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }return _arr;
        }return function (arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _extend2 = __webpack_require__(3);

      var _extend3 = _interopRequireDefault(_extend2);

      var _quillDelta = __webpack_require__(2);

      var _quillDelta2 = _interopRequireDefault(_quillDelta);

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      var _quill = __webpack_require__(6);

      var _quill2 = _interopRequireDefault(_quill);

      var _logger = __webpack_require__(10);

      var _logger2 = _interopRequireDefault(_logger);

      var _module = __webpack_require__(9);

      var _module2 = _interopRequireDefault(_module);

      var _align = __webpack_require__(36);

      var _background = __webpack_require__(37);

      var _color = __webpack_require__(26);

      var _direction = __webpack_require__(38);

      var _font = __webpack_require__(39);

      var _size = __webpack_require__(40);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key] = value;
        }return obj;
      }

      function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
          }return arr2;
        } else {
          return Array.from(arr);
        }
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var debug = (0, _logger2.default)('quill:clipboard');

      var DOM_KEY = '__ql-matcher';

      var CLIPBOARD_CONFIG = [[Node.TEXT_NODE, matchText], [Node.TEXT_NODE, matchNewline], ['br', matchBreak], [Node.ELEMENT_NODE, matchNewline], [Node.ELEMENT_NODE, matchBlot], [Node.ELEMENT_NODE, matchSpacing], [Node.ELEMENT_NODE, matchAttributor], [Node.ELEMENT_NODE, matchStyles], ['li', matchIndent], ['b', matchAlias.bind(matchAlias, 'bold')], ['i', matchAlias.bind(matchAlias, 'italic')], ['style', matchIgnore]];

      var ATTRIBUTE_ATTRIBUTORS = [_align.AlignAttribute, _direction.DirectionAttribute].reduce(function (memo, attr) {
        memo[attr.keyName] = attr;
        return memo;
      }, {});

      var STYLE_ATTRIBUTORS = [_align.AlignStyle, _background.BackgroundStyle, _color.ColorStyle, _direction.DirectionStyle, _font.FontStyle, _size.SizeStyle].reduce(function (memo, attr) {
        memo[attr.keyName] = attr;
        return memo;
      }, {});

      var Clipboard = function (_Module) {
        _inherits(Clipboard, _Module);

        function Clipboard(quill, options) {
          _classCallCheck(this, Clipboard);

          var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this, quill, options));

          _this.quill.root.addEventListener('paste', _this.onPaste.bind(_this));
          _this.container = _this.quill.addContainer('ql-clipboard');
          _this.container.setAttribute('contenteditable', true);
          _this.container.setAttribute('tabindex', -1);
          _this.matchers = [];
          CLIPBOARD_CONFIG.concat(_this.options.matchers).forEach(function (pair) {
            _this.addMatcher.apply(_this, _toConsumableArray(pair));
          });
          return _this;
        }

        _createClass(Clipboard, [{
          key: 'addMatcher',
          value: function addMatcher(selector, matcher) {
            this.matchers.push([selector, matcher]);
          }
        }, {
          key: 'convert',
          value: function convert(html) {
            if (typeof html === 'string') {
              this.container.innerHTML = html.replace(/\>\r?\n +\</g, '><'); // Remove spaces between tags
            }

            var _prepareMatching = this.prepareMatching(),
                _prepareMatching2 = _slicedToArray(_prepareMatching, 2),
                elementMatchers = _prepareMatching2[0],
                textMatchers = _prepareMatching2[1];

            var delta = traverse(this.container, elementMatchers, textMatchers);
            // Remove trailing newline
            if (deltaEndsWith(delta, '\n') && delta.ops[delta.ops.length - 1].attributes == null) {
              delta = delta.compose(new _quillDelta2.default().retain(delta.length() - 1).delete(1));
            }
            debug.log('convert', this.container.innerHTML, delta);
            this.container.innerHTML = '';
            return delta;
          }
        }, {
          key: 'dangerouslyPasteHTML',
          value: function dangerouslyPasteHTML(index, html) {
            var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _quill2.default.sources.API;

            if (typeof index === 'string') {
              return this.quill.setContents(this.convert(index), html);
            } else {
              var paste = this.convert(html);
              return this.quill.updateContents(new _quillDelta2.default().retain(index).concat(paste), source);
            }
          }
        }, {
          key: 'onPaste',
          value: function onPaste(e) {
            var _this2 = this;

            if (e.defaultPrevented || !this.quill.isEnabled()) return;
            var range = this.quill.getSelection();
            var delta = new _quillDelta2.default().retain(range.index);
            var scrollTop = this.quill.scrollingContainer.scrollTop;
            this.container.focus();
            setTimeout(function () {
              _this2.quill.selection.update(_quill2.default.sources.SILENT);
              delta = delta.concat(_this2.convert()).delete(range.length);
              _this2.quill.updateContents(delta, _quill2.default.sources.USER);
              // range.length contributes to delta.length()
              _this2.quill.setSelection(delta.length() - range.length, _quill2.default.sources.SILENT);
              _this2.quill.scrollingContainer.scrollTop = scrollTop;
              _this2.quill.selection.scrollIntoView();
            }, 1);
          }
        }, {
          key: 'prepareMatching',
          value: function prepareMatching() {
            var _this3 = this;

            var elementMatchers = [],
                textMatchers = [];
            this.matchers.forEach(function (pair) {
              var _pair = _slicedToArray(pair, 2),
                  selector = _pair[0],
                  matcher = _pair[1];

              switch (selector) {
                case Node.TEXT_NODE:
                  textMatchers.push(matcher);
                  break;
                case Node.ELEMENT_NODE:
                  elementMatchers.push(matcher);
                  break;
                default:
                  [].forEach.call(_this3.container.querySelectorAll(selector), function (node) {
                    // TODO use weakmap
                    node[DOM_KEY] = node[DOM_KEY] || [];
                    node[DOM_KEY].push(matcher);
                  });
                  break;
              }
            });
            return [elementMatchers, textMatchers];
          }
        }]);

        return Clipboard;
      }(_module2.default);

      Clipboard.DEFAULTS = {
        matchers: []
      };

      function applyFormat(delta, format, value) {
        if ((typeof format === 'undefined' ? 'undefined' : _typeof(format)) === 'object') {
          return Object.keys(format).reduce(function (delta, key) {
            return applyFormat(delta, key, format[key]);
          }, delta);
        } else {
          return delta.reduce(function (delta, op) {
            if (op.attributes && op.attributes[format]) {
              return delta.push(op);
            } else {
              return delta.insert(op.insert, (0, _extend3.default)({}, _defineProperty({}, format, value), op.attributes));
            }
          }, new _quillDelta2.default());
        }
      }

      function computeStyle(node) {
        if (node.nodeType !== Node.ELEMENT_NODE) return {};
        var DOM_KEY = '__ql-computed-style';
        return node[DOM_KEY] || (node[DOM_KEY] = window.getComputedStyle(node));
      }

      function deltaEndsWith(delta, text) {
        var endText = "";
        for (var i = delta.ops.length - 1; i >= 0 && endText.length < text.length; --i) {
          var op = delta.ops[i];
          if (typeof op.insert !== 'string') break;
          endText = op.insert + endText;
        }
        return endText.slice(-1 * text.length) === text;
      }

      function isLine(node) {
        if (node.childNodes.length === 0) return false; // Exclude embed blocks
        var style = computeStyle(node);
        return ['block', 'list-item'].indexOf(style.display) > -1;
      }

      function traverse(node, elementMatchers, textMatchers) {
        // Post-order
        if (node.nodeType === node.TEXT_NODE) {
          return textMatchers.reduce(function (delta, matcher) {
            return matcher(node, delta);
          }, new _quillDelta2.default());
        } else if (node.nodeType === node.ELEMENT_NODE) {
          return [].reduce.call(node.childNodes || [], function (delta, childNode) {
            var childrenDelta = traverse(childNode, elementMatchers, textMatchers);
            if (childNode.nodeType === node.ELEMENT_NODE) {
              childrenDelta = elementMatchers.reduce(function (childrenDelta, matcher) {
                return matcher(childNode, childrenDelta);
              }, childrenDelta);
              childrenDelta = (childNode[DOM_KEY] || []).reduce(function (childrenDelta, matcher) {
                return matcher(childNode, childrenDelta);
              }, childrenDelta);
            }
            return delta.concat(childrenDelta);
          }, new _quillDelta2.default());
        } else {
          return new _quillDelta2.default();
        }
      }

      function matchAlias(format, node, delta) {
        return applyFormat(delta, format, true);
      }

      function matchAttributor(node, delta) {
        var attributes = _parchment2.default.Attributor.Attribute.keys(node);
        var classes = _parchment2.default.Attributor.Class.keys(node);
        var styles = _parchment2.default.Attributor.Style.keys(node);
        var formats = {};
        attributes.concat(classes).concat(styles).forEach(function (name) {
          var attr = _parchment2.default.query(name, _parchment2.default.Scope.ATTRIBUTE);
          if (attr != null) {
            formats[attr.attrName] = attr.value(node);
            if (formats[attr.attrName]) return;
          }
          attr = ATTRIBUTE_ATTRIBUTORS[name];
          if (attr != null && attr.attrName === name) {
            formats[attr.attrName] = attr.value(node) || undefined;
          }
          attr = STYLE_ATTRIBUTORS[name];
          if (attr != null && attr.attrName === name) {
            attr = STYLE_ATTRIBUTORS[name];
            formats[attr.attrName] = attr.value(node) || undefined;
          }
        });
        if (Object.keys(formats).length > 0) {
          delta = applyFormat(delta, formats);
        }
        return delta;
      }

      function matchBlot(node, delta) {
        var match = _parchment2.default.query(node);
        if (match == null) return delta;
        if (match.prototype instanceof _parchment2.default.Embed) {
          var embed = {};
          var value = match.value(node);
          if (value != null) {
            embed[match.blotName] = value;
            delta = new _quillDelta2.default().insert(embed, match.formats(node));
          }
        } else if (typeof match.formats === 'function') {
          delta = applyFormat(delta, match.blotName, match.formats(node));
        }
        return delta;
      }

      function matchBreak(node, delta) {
        if (!deltaEndsWith(delta, '\n')) {
          delta.insert('\n');
        }
        return delta;
      }

      function matchIgnore() {
        return new _quillDelta2.default();
      }

      function matchIndent(node, delta) {
        var match = _parchment2.default.query(node);
        if (match == null || match.blotName !== 'list-item' || !deltaEndsWith(delta, '\n')) {
          return delta;
        }
        var indent = -1,
            parent = node.parentNode;
        while (!parent.classList.contains('ql-clipboard')) {
          if ((_parchment2.default.query(parent) || {}).blotName === 'list') {
            indent += 1;
          }
          parent = parent.parentNode;
        }
        if (indent <= 0) return delta;
        return delta.compose(new _quillDelta2.default().retain(delta.length() - 1).retain(1, { indent: indent }));
      }

      function matchNewline(node, delta) {
        if (!deltaEndsWith(delta, '\n')) {
          if (isLine(node) || delta.length() > 0 && node.nextSibling && isLine(node.nextSibling)) {
            delta.insert('\n');
          }
        }
        return delta;
      }

      function matchSpacing(node, delta) {
        if (isLine(node) && node.nextElementSibling != null && !deltaEndsWith(delta, '\n\n')) {
          var nodeHeight = node.offsetHeight + parseFloat(computeStyle(node).marginTop) + parseFloat(computeStyle(node).marginBottom);
          if (node.nextElementSibling.offsetTop > node.offsetTop + nodeHeight * 1.5) {
            delta.insert('\n');
          }
        }
        return delta;
      }

      function matchStyles(node, delta) {
        var formats = {};
        var style = node.style || {};
        if (style.fontStyle && computeStyle(node).fontStyle === 'italic') {
          formats.italic = true;
        }
        if (style.fontWeight && (computeStyle(node).fontWeight.startsWith('bold') || parseInt(computeStyle(node).fontWeight) >= 700)) {
          formats.bold = true;
        }
        if (Object.keys(formats).length > 0) {
          delta = applyFormat(delta, formats);
        }
        if (parseFloat(style.textIndent || 0) > 0) {
          // Could be 0.5in
          delta = new _quillDelta2.default().insert('\t').concat(delta);
        }
        return delta;
      }

      function matchText(node, delta) {
        var text = node.data;
        // Word represents empty line with <o:p>&nbsp;</o:p>
        if (node.parentNode.tagName === 'O:P') {
          return delta.insert(text.trim());
        }
        if (text.trim().length === 0 && node.parentNode.classList.contains('ql-clipboard')) {
          return delta;
        }
        if (!computeStyle(node.parentNode).whiteSpace.startsWith('pre')) {
          // eslint-disable-next-line func-style
          var replacer = function replacer(collapse, match) {
            match = match.replace(/[^\u00a0]/g, ''); // \u00a0 is nbsp;
            return match.length < 1 && collapse ? ' ' : match;
          };
          text = text.replace(/\r\n/g, ' ').replace(/\n/g, ' ');
          text = text.replace(/\s\s+/g, replacer.bind(replacer, true)); // collapse whitespace
          if (node.previousSibling == null && isLine(node.parentNode) || node.previousSibling != null && isLine(node.previousSibling)) {
            text = text.replace(/^\s+/, replacer.bind(replacer, false));
          }
          if (node.nextSibling == null && isLine(node.parentNode) || node.nextSibling != null && isLine(node.nextSibling)) {
            text = text.replace(/\s+$/, replacer.bind(replacer, false));
          }
        }
        return delta.insert(text);
      }

      exports.default = Clipboard;
      exports.matchAttributor = matchAttributor;
      exports.matchBlot = matchBlot;
      exports.matchNewline = matchNewline;
      exports.matchSpacing = matchSpacing;
      exports.matchText = matchText;

      /***/
    },
    /* 47 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.addControls = exports.default = undefined;

      var _slicedToArray = function () {
        function sliceIterator(arr, i) {
          var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;_e = err;
          } finally {
            try {
              if (!_n && _i["return"]) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }return _arr;
        }return function (arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _quillDelta = __webpack_require__(2);

      var _quillDelta2 = _interopRequireDefault(_quillDelta);

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      var _quill = __webpack_require__(6);

      var _quill2 = _interopRequireDefault(_quill);

      var _logger = __webpack_require__(10);

      var _logger2 = _interopRequireDefault(_logger);

      var _module = __webpack_require__(9);

      var _module2 = _interopRequireDefault(_module);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key] = value;
        }return obj;
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var debug = (0, _logger2.default)('quill:toolbar');

      var Toolbar = function (_Module) {
        _inherits(Toolbar, _Module);

        function Toolbar(quill, options) {
          _classCallCheck(this, Toolbar);

          var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, quill, options));

          if (Array.isArray(_this.options.container)) {
            var container = document.createElement('div');
            addControls(container, _this.options.container);
            quill.container.parentNode.insertBefore(container, quill.container);
            _this.container = container;
          } else if (typeof _this.options.container === 'string') {
            _this.container = document.querySelector(_this.options.container);
          } else {
            _this.container = _this.options.container;
          }
          if (!(_this.container instanceof HTMLElement)) {
            var _ret;

            return _ret = debug.error('Container required for toolbar', _this.options), _possibleConstructorReturn(_this, _ret);
          }
          _this.container.classList.add('ql-toolbar');
          _this.controls = [];
          _this.handlers = {};
          Object.keys(_this.options.handlers).forEach(function (format) {
            _this.addHandler(format, _this.options.handlers[format]);
          });
          [].forEach.call(_this.container.querySelectorAll('button, select'), function (input) {
            _this.attach(input);
          });
          _this.quill.on(_quill2.default.events.EDITOR_CHANGE, function (type, range) {
            if (type === _quill2.default.events.SELECTION_CHANGE) {
              _this.update(range);
            }
          });
          _this.quill.on(_quill2.default.events.SCROLL_OPTIMIZE, function () {
            var _this$quill$selection = _this.quill.selection.getRange(),
                _this$quill$selection2 = _slicedToArray(_this$quill$selection, 1),
                range = _this$quill$selection2[0]; // quill.getSelection triggers update


            _this.update(range);
          });
          return _this;
        }

        _createClass(Toolbar, [{
          key: 'addHandler',
          value: function addHandler(format, handler) {
            this.handlers[format] = handler;
          }
        }, {
          key: 'attach',
          value: function attach(input) {
            var _this2 = this;

            var format = [].find.call(input.classList, function (className) {
              return className.indexOf('ql-') === 0;
            });
            if (!format) return;
            format = format.slice('ql-'.length);
            if (input.tagName === 'BUTTON') {
              input.setAttribute('type', 'button');
            }
            if (this.handlers[format] == null) {
              if (this.quill.scroll.whitelist != null && this.quill.scroll.whitelist[format] == null) {
                debug.warn('ignoring attaching to disabled format', format, input);
                return;
              }
              if (_parchment2.default.query(format) == null) {
                debug.warn('ignoring attaching to nonexistent format', format, input);
                return;
              }
            }
            var eventName = input.tagName === 'SELECT' ? 'change' : 'click';
            input.addEventListener(eventName, function (e) {
              var value = void 0;
              if (input.tagName === 'SELECT') {
                if (input.selectedIndex < 0) return;
                var selected = input.options[input.selectedIndex];
                if (selected.hasAttribute('selected')) {
                  value = false;
                } else {
                  value = selected.value || false;
                }
              } else {
                if (input.classList.contains('ql-active')) {
                  value = false;
                } else {
                  value = input.value || !input.hasAttribute('value');
                }
                e.preventDefault();
              }
              _this2.quill.focus();

              var _quill$selection$getR = _this2.quill.selection.getRange(),
                  _quill$selection$getR2 = _slicedToArray(_quill$selection$getR, 1),
                  range = _quill$selection$getR2[0];

              if (_this2.handlers[format] != null) {
                _this2.handlers[format].call(_this2, value);
              } else if (_parchment2.default.query(format).prototype instanceof _parchment2.default.Embed) {
                value = prompt('Enter ' + format);
                if (!value) return;
                _this2.quill.updateContents(new _quillDelta2.default().retain(range.index).delete(range.length).insert(_defineProperty({}, format, value)), _quill2.default.sources.USER);
              } else {
                _this2.quill.format(format, value, _quill2.default.sources.USER);
              }
              _this2.update(range);
            });
            // TODO use weakmap
            this.controls.push([format, input]);
          }
        }, {
          key: 'update',
          value: function update(range) {
            var formats = range == null ? {} : this.quill.getFormat(range);
            this.controls.forEach(function (pair) {
              var _pair = _slicedToArray(pair, 2),
                  format = _pair[0],
                  input = _pair[1];

              if (input.tagName === 'SELECT') {
                var option = void 0;
                if (range == null) {
                  option = null;
                } else if (formats[format] == null) {
                  option = input.querySelector('option[selected]');
                } else if (!Array.isArray(formats[format])) {
                  var value = formats[format];
                  if (typeof value === 'string') {
                    value = value.replace(/\"/g, '\\"');
                  }
                  option = input.querySelector('option[value="' + value + '"]');
                }
                if (option == null) {
                  input.value = ''; // TODO make configurable?
                  input.selectedIndex = -1;
                } else {
                  option.selected = true;
                }
              } else {
                if (range == null) {
                  input.classList.remove('ql-active');
                } else if (input.hasAttribute('value')) {
                  // both being null should match (default values)
                  // '1' should match with 1 (headers)
                  var isActive = formats[format] === input.getAttribute('value') || formats[format] != null && formats[format].toString() === input.getAttribute('value') || formats[format] == null && !input.getAttribute('value');
                  input.classList.toggle('ql-active', isActive);
                } else {
                  input.classList.toggle('ql-active', formats[format] != null);
                }
              }
            });
          }
        }]);

        return Toolbar;
      }(_module2.default);

      Toolbar.DEFAULTS = {};

      function addButton(container, format, value) {
        var input = document.createElement('button');
        input.setAttribute('type', 'button');
        input.classList.add('ql-' + format);
        if (value != null) {
          input.value = value;
        }
        container.appendChild(input);
      }

      function addControls(container, groups) {
        if (!Array.isArray(groups[0])) {
          groups = [groups];
        }
        groups.forEach(function (controls) {
          var group = document.createElement('span');
          group.classList.add('ql-formats');
          controls.forEach(function (control) {
            if (typeof control === 'string') {
              addButton(group, control);
            } else {
              var format = Object.keys(control)[0];
              var value = control[format];
              if (Array.isArray(value)) {
                addSelect(group, format, value);
              } else {
                addButton(group, format, value);
              }
            }
          });
          container.appendChild(group);
        });
      }

      function addSelect(container, format, values) {
        var input = document.createElement('select');
        input.classList.add('ql-' + format);
        values.forEach(function (value) {
          var option = document.createElement('option');
          if (value !== false) {
            option.setAttribute('value', value);
          } else {
            option.setAttribute('selected', 'selected');
          }
          input.appendChild(option);
        });
        container.appendChild(input);
      }

      Toolbar.DEFAULTS = {
        container: null,
        handlers: {
          clean: function clean() {
            var _this3 = this;

            var range = this.quill.getSelection();
            if (range == null) return;
            if (range.length == 0) {
              var formats = this.quill.getFormat();
              Object.keys(formats).forEach(function (name) {
                // Clean functionality in existing apps only clean inline formats
                if (_parchment2.default.query(name, _parchment2.default.Scope.INLINE) != null) {
                  _this3.quill.format(name, false);
                }
              });
            } else {
              this.quill.removeFormat(range, _quill2.default.sources.USER);
            }
          },
          direction: function direction(value) {
            var align = this.quill.getFormat()['align'];
            if (value === 'rtl' && align == null) {
              this.quill.format('align', 'right', _quill2.default.sources.USER);
            } else if (!value && align === 'right') {
              this.quill.format('align', false, _quill2.default.sources.USER);
            }
            this.quill.format('direction', value, _quill2.default.sources.USER);
          },
          indent: function indent(value) {
            var range = this.quill.getSelection();
            var formats = this.quill.getFormat(range);
            var indent = parseInt(formats.indent || 0);
            if (value === '+1' || value === '-1') {
              var modifier = value === '+1' ? 1 : -1;
              if (formats.direction === 'rtl') modifier *= -1;
              this.quill.format('indent', indent + modifier, _quill2.default.sources.USER);
            }
          },
          link: function link(value) {
            if (value === true) {
              value = prompt('Enter link URL:');
            }
            this.quill.format('link', value, _quill2.default.sources.USER);
          },
          list: function list(value) {
            var range = this.quill.getSelection();
            var formats = this.quill.getFormat(range);
            if (value === 'check') {
              if (formats['list'] === 'checked' || formats['list'] === 'unchecked') {
                this.quill.format('list', false, _quill2.default.sources.USER);
              } else {
                this.quill.format('list', 'unchecked', _quill2.default.sources.USER);
              }
            } else {
              this.quill.format('list', value, _quill2.default.sources.USER);
            }
          }
        }
      };

      exports.default = Toolbar;
      exports.addControls = addControls;

      /***/
    },
    /* 48 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _picker = __webpack_require__(28);

      var _picker2 = _interopRequireDefault(_picker);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var ColorPicker = function (_Picker) {
        _inherits(ColorPicker, _Picker);

        function ColorPicker(select, label) {
          _classCallCheck(this, ColorPicker);

          var _this = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this, select));

          _this.label.innerHTML = label;
          _this.container.classList.add('ql-color-picker');
          [].slice.call(_this.container.querySelectorAll('.ql-picker-item'), 0, 7).forEach(function (item) {
            item.classList.add('ql-primary');
          });
          return _this;
        }

        _createClass(ColorPicker, [{
          key: 'buildItem',
          value: function buildItem(option) {
            var item = _get(ColorPicker.prototype.__proto__ || Object.getPrototypeOf(ColorPicker.prototype), 'buildItem', this).call(this, option);
            item.style.backgroundColor = option.getAttribute('value') || '';
            return item;
          }
        }, {
          key: 'selectItem',
          value: function selectItem(item, trigger) {
            _get(ColorPicker.prototype.__proto__ || Object.getPrototypeOf(ColorPicker.prototype), 'selectItem', this).call(this, item, trigger);
            var colorLabel = this.label.querySelector('.ql-color-label');
            var value = item ? item.getAttribute('data-value') || '' : '';
            if (colorLabel) {
              if (colorLabel.tagName === 'line') {
                colorLabel.style.stroke = value;
              } else {
                colorLabel.style.fill = value;
              }
            }
          }
        }]);

        return ColorPicker;
      }(_picker2.default);

      exports.default = ColorPicker;

      /***/
    },
    /* 49 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _picker = __webpack_require__(28);

      var _picker2 = _interopRequireDefault(_picker);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var IconPicker = function (_Picker) {
        _inherits(IconPicker, _Picker);

        function IconPicker(select, icons) {
          _classCallCheck(this, IconPicker);

          var _this = _possibleConstructorReturn(this, (IconPicker.__proto__ || Object.getPrototypeOf(IconPicker)).call(this, select));

          _this.container.classList.add('ql-icon-picker');
          [].forEach.call(_this.container.querySelectorAll('.ql-picker-item'), function (item) {
            item.innerHTML = icons[item.getAttribute('data-value') || ''];
          });
          _this.defaultItem = _this.container.querySelector('.ql-selected');
          _this.selectItem(_this.defaultItem);
          return _this;
        }

        _createClass(IconPicker, [{
          key: 'selectItem',
          value: function selectItem(item, trigger) {
            _get(IconPicker.prototype.__proto__ || Object.getPrototypeOf(IconPicker.prototype), 'selectItem', this).call(this, item, trigger);
            item = item || this.defaultItem;
            this.label.innerHTML = item.innerHTML;
          }
        }]);

        return IconPicker;
      }(_picker2.default);

      exports.default = IconPicker;

      /***/
    },
    /* 50 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Tooltip = function () {
        function Tooltip(quill, boundsContainer) {
          var _this = this;

          _classCallCheck(this, Tooltip);

          this.quill = quill;
          this.boundsContainer = boundsContainer || document.body;
          this.root = quill.addContainer('ql-tooltip');
          this.root.innerHTML = this.constructor.TEMPLATE;
          if (this.quill.root === this.quill.scrollingContainer) {
            this.quill.root.addEventListener('scroll', function () {
              _this.root.style.marginTop = -1 * _this.quill.root.scrollTop + 'px';
            });
          }
          this.hide();
        }

        _createClass(Tooltip, [{
          key: 'hide',
          value: function hide() {
            this.root.classList.add('ql-hidden');
          }
        }, {
          key: 'position',
          value: function position(reference) {
            var left = reference.left + reference.width / 2 - this.root.offsetWidth / 2;
            // root.scrollTop should be 0 if scrollContainer !== root
            var top = reference.bottom + this.quill.root.scrollTop;
            this.root.style.left = left + 'px';
            this.root.style.top = top + 'px';
            this.root.classList.remove('ql-flip');
            var containerBounds = this.boundsContainer.getBoundingClientRect();
            var rootBounds = this.root.getBoundingClientRect();
            var shift = 0;
            if (rootBounds.right > containerBounds.right) {
              shift = containerBounds.right - rootBounds.right;
              this.root.style.left = left + shift + 'px';
            }
            if (rootBounds.left < containerBounds.left) {
              shift = containerBounds.left - rootBounds.left;
              this.root.style.left = left + shift + 'px';
            }
            if (rootBounds.bottom > containerBounds.bottom) {
              var height = rootBounds.bottom - rootBounds.top;
              var verticalShift = reference.bottom - reference.top + height;
              this.root.style.top = top - verticalShift + 'px';
              this.root.classList.add('ql-flip');
            }
            return shift;
          }
        }, {
          key: 'show',
          value: function show() {
            this.root.classList.remove('ql-editing');
            this.root.classList.remove('ql-hidden');
          }
        }]);

        return Tooltip;
      }();

      exports.default = Tooltip;

      /***/
    },
    /* 51 */
    /***/function (module, exports) {

      var supportsArgumentsClass = function () {
        return Object.prototype.toString.call(arguments);
      }() == '[object Arguments]';

      exports = module.exports = supportsArgumentsClass ? supported : unsupported;

      exports.supported = supported;
      function supported(object) {
        return Object.prototype.toString.call(object) == '[object Arguments]';
      };

      exports.unsupported = unsupported;
      function unsupported(object) {
        return object && (typeof object === 'undefined' ? 'undefined' : _typeof2(object)) == 'object' && typeof object.length == 'number' && Object.prototype.hasOwnProperty.call(object, 'callee') && !Object.prototype.propertyIsEnumerable.call(object, 'callee') || false;
      };

      /***/
    },
    /* 52 */
    /***/function (module, exports) {

      exports = module.exports = typeof Object.keys === 'function' ? Object.keys : shim;

      exports.shim = shim;
      function shim(obj) {
        var keys = [];
        for (var key in obj) {
          keys.push(key);
        }return keys;
      }

      /***/
    },
    /* 53 */
    /***/function (module, exports) {

      'use strict';

      var has = Object.prototype.hasOwnProperty,
          prefix = '~';

      /**
       * Constructor to create a storage for our `EE` objects.
       * An `Events` instance is a plain object whose properties are event names.
       *
       * @constructor
       * @api private
       */
      function Events() {}

      //
      // We try to not inherit from `Object.prototype`. In some engines creating an
      // instance in this way is faster than calling `Object.create(null)` directly.
      // If `Object.create(null)` is not supported we prefix the event names with a
      // character to make sure that the built-in object properties are not
      // overridden or used as an attack vector.
      //
      if (Object.create) {
        Events.prototype = Object.create(null);

        //
        // This hack is needed because the `__proto__` property is still inherited in
        // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
        //
        if (!new Events().__proto__) prefix = false;
      }

      /**
       * Representation of a single event listener.
       *
       * @param {Function} fn The listener function.
       * @param {Mixed} context The context to invoke the listener with.
       * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
       * @constructor
       * @api private
       */
      function EE(fn, context, once) {
        this.fn = fn;
        this.context = context;
        this.once = once || false;
      }

      /**
       * Minimal `EventEmitter` interface that is molded against the Node.js
       * `EventEmitter` interface.
       *
       * @constructor
       * @api public
       */
      function EventEmitter() {
        this._events = new Events();
        this._eventsCount = 0;
      }

      /**
       * Return an array listing the events for which the emitter has registered
       * listeners.
       *
       * @returns {Array}
       * @api public
       */
      EventEmitter.prototype.eventNames = function eventNames() {
        var names = [],
            events,
            name;

        if (this._eventsCount === 0) return names;

        for (name in events = this._events) {
          if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
        }

        if (Object.getOwnPropertySymbols) {
          return names.concat(Object.getOwnPropertySymbols(events));
        }

        return names;
      };

      /**
       * Return the listeners registered for a given event.
       *
       * @param {String|Symbol} event The event name.
       * @param {Boolean} exists Only check if there are listeners.
       * @returns {Array|Boolean}
       * @api public
       */
      EventEmitter.prototype.listeners = function listeners(event, exists) {
        var evt = prefix ? prefix + event : event,
            available = this._events[evt];

        if (exists) return !!available;
        if (!available) return [];
        if (available.fn) return [available.fn];

        for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
          ee[i] = available[i].fn;
        }

        return ee;
      };

      /**
       * Calls each of the listeners registered for a given event.
       *
       * @param {String|Symbol} event The event name.
       * @returns {Boolean} `true` if the event had listeners, else `false`.
       * @api public
       */
      EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
        var evt = prefix ? prefix + event : event;

        if (!this._events[evt]) return false;

        var listeners = this._events[evt],
            len = arguments.length,
            args,
            i;

        if (listeners.fn) {
          if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

          switch (len) {
            case 1:
              return listeners.fn.call(listeners.context), true;
            case 2:
              return listeners.fn.call(listeners.context, a1), true;
            case 3:
              return listeners.fn.call(listeners.context, a1, a2), true;
            case 4:
              return listeners.fn.call(listeners.context, a1, a2, a3), true;
            case 5:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
            case 6:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
          }

          for (i = 1, args = new Array(len - 1); i < len; i++) {
            args[i - 1] = arguments[i];
          }

          listeners.fn.apply(listeners.context, args);
        } else {
          var length = listeners.length,
              j;

          for (i = 0; i < length; i++) {
            if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

            switch (len) {
              case 1:
                listeners[i].fn.call(listeners[i].context);break;
              case 2:
                listeners[i].fn.call(listeners[i].context, a1);break;
              case 3:
                listeners[i].fn.call(listeners[i].context, a1, a2);break;
              case 4:
                listeners[i].fn.call(listeners[i].context, a1, a2, a3);break;
              default:
                if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }

                listeners[i].fn.apply(listeners[i].context, args);
            }
          }
        }

        return true;
      };

      /**
       * Add a listener for a given event.
       *
       * @param {String|Symbol} event The event name.
       * @param {Function} fn The listener function.
       * @param {Mixed} [context=this] The context to invoke the listener with.
       * @returns {EventEmitter} `this`.
       * @api public
       */
      EventEmitter.prototype.on = function on(event, fn, context) {
        var listener = new EE(fn, context || this),
            evt = prefix ? prefix + event : event;

        if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;else if (!this._events[evt].fn) this._events[evt].push(listener);else this._events[evt] = [this._events[evt], listener];

        return this;
      };

      /**
       * Add a one-time listener for a given event.
       *
       * @param {String|Symbol} event The event name.
       * @param {Function} fn The listener function.
       * @param {Mixed} [context=this] The context to invoke the listener with.
       * @returns {EventEmitter} `this`.
       * @api public
       */
      EventEmitter.prototype.once = function once(event, fn, context) {
        var listener = new EE(fn, context || this, true),
            evt = prefix ? prefix + event : event;

        if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;else if (!this._events[evt].fn) this._events[evt].push(listener);else this._events[evt] = [this._events[evt], listener];

        return this;
      };

      /**
       * Remove the listeners of a given event.
       *
       * @param {String|Symbol} event The event name.
       * @param {Function} fn Only remove the listeners that match this function.
       * @param {Mixed} context Only remove the listeners that have this context.
       * @param {Boolean} once Only remove one-time listeners.
       * @returns {EventEmitter} `this`.
       * @api public
       */
      EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
        var evt = prefix ? prefix + event : event;

        if (!this._events[evt]) return this;
        if (!fn) {
          if (--this._eventsCount === 0) this._events = new Events();else delete this._events[evt];
          return this;
        }

        var listeners = this._events[evt];

        if (listeners.fn) {
          if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
            if (--this._eventsCount === 0) this._events = new Events();else delete this._events[evt];
          }
        } else {
          for (var i = 0, events = [], length = listeners.length; i < length; i++) {
            if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
              events.push(listeners[i]);
            }
          }

          //
          // Reset the array, or remove it completely if we have no more listeners.
          //
          if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;else if (--this._eventsCount === 0) this._events = new Events();else delete this._events[evt];
        }

        return this;
      };

      /**
       * Remove all listeners, or those of the specified event.
       *
       * @param {String|Symbol} [event] The event name.
       * @returns {EventEmitter} `this`.
       * @api public
       */
      EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
        var evt;

        if (event) {
          evt = prefix ? prefix + event : event;
          if (this._events[evt]) {
            if (--this._eventsCount === 0) this._events = new Events();else delete this._events[evt];
          }
        } else {
          this._events = new Events();
          this._eventsCount = 0;
        }

        return this;
      };

      //
      // Alias methods names because people roll like that.
      //
      EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
      EventEmitter.prototype.addListener = EventEmitter.prototype.on;

      //
      // This function doesn't apply anymore.
      //
      EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
        return this;
      };

      //
      // Expose the prefix.
      //
      EventEmitter.prefixed = prefix;

      //
      // Allow `EventEmitter` to be imported as module namespace.
      //
      EventEmitter.EventEmitter = EventEmitter;

      //
      // Expose the module.
      //
      if ('undefined' !== typeof module) {
        module.exports = EventEmitter;
      }

      /***/
    },
    /* 54 */
    /***/function (module, exports) {

      /**
       * This library modifies the diff-patch-match library by Neil Fraser
       * by removing the patch and match functionality and certain advanced
       * options in the diff function. The original license is as follows:
       *
       * ===
       *
       * Diff Match and Patch
       *
       * Copyright 2006 Google Inc.
       * http://code.google.com/p/google-diff-match-patch/
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */

      /**
       * The data structure representing a diff is an array of tuples:
       * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
       * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
       */
      var DIFF_DELETE = -1;
      var DIFF_INSERT = 1;
      var DIFF_EQUAL = 0;

      /**
       * Find the differences between two texts.  Simplifies the problem by stripping
       * any common prefix or suffix off the texts before diffing.
       * @param {string} text1 Old string to be diffed.
       * @param {string} text2 New string to be diffed.
       * @param {Int} cursor_pos Expected edit position in text1 (optional)
       * @return {Array} Array of diff tuples.
       */
      function diff_main(text1, text2, cursor_pos) {
        // Check for equality (speedup).
        if (text1 == text2) {
          if (text1) {
            return [[DIFF_EQUAL, text1]];
          }
          return [];
        }

        // Check cursor_pos within bounds
        if (cursor_pos < 0 || text1.length < cursor_pos) {
          cursor_pos = null;
        }

        // Trim off common prefix (speedup).
        var commonlength = diff_commonPrefix(text1, text2);
        var commonprefix = text1.substring(0, commonlength);
        text1 = text1.substring(commonlength);
        text2 = text2.substring(commonlength);

        // Trim off common suffix (speedup).
        commonlength = diff_commonSuffix(text1, text2);
        var commonsuffix = text1.substring(text1.length - commonlength);
        text1 = text1.substring(0, text1.length - commonlength);
        text2 = text2.substring(0, text2.length - commonlength);

        // Compute the diff on the middle block.
        var diffs = diff_compute_(text1, text2);

        // Restore the prefix and suffix.
        if (commonprefix) {
          diffs.unshift([DIFF_EQUAL, commonprefix]);
        }
        if (commonsuffix) {
          diffs.push([DIFF_EQUAL, commonsuffix]);
        }
        diff_cleanupMerge(diffs);
        if (cursor_pos != null) {
          diffs = fix_cursor(diffs, cursor_pos);
        }
        return diffs;
      };

      /**
       * Find the differences between two texts.  Assumes that the texts do not
       * have any common prefix or suffix.
       * @param {string} text1 Old string to be diffed.
       * @param {string} text2 New string to be diffed.
       * @return {Array} Array of diff tuples.
       */
      function diff_compute_(text1, text2) {
        var diffs;

        if (!text1) {
          // Just add some text (speedup).
          return [[DIFF_INSERT, text2]];
        }

        if (!text2) {
          // Just delete some text (speedup).
          return [[DIFF_DELETE, text1]];
        }

        var longtext = text1.length > text2.length ? text1 : text2;
        var shorttext = text1.length > text2.length ? text2 : text1;
        var i = longtext.indexOf(shorttext);
        if (i != -1) {
          // Shorter text is inside the longer text (speedup).
          diffs = [[DIFF_INSERT, longtext.substring(0, i)], [DIFF_EQUAL, shorttext], [DIFF_INSERT, longtext.substring(i + shorttext.length)]];
          // Swap insertions for deletions if diff is reversed.
          if (text1.length > text2.length) {
            diffs[0][0] = diffs[2][0] = DIFF_DELETE;
          }
          return diffs;
        }

        if (shorttext.length == 1) {
          // Single character string.
          // After the previous speedup, the character can't be an equality.
          return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
        }

        // Check to see if the problem can be split in two.
        var hm = diff_halfMatch_(text1, text2);
        if (hm) {
          // A half-match was found, sort out the return data.
          var text1_a = hm[0];
          var text1_b = hm[1];
          var text2_a = hm[2];
          var text2_b = hm[3];
          var mid_common = hm[4];
          // Send both pairs off for separate processing.
          var diffs_a = diff_main(text1_a, text2_a);
          var diffs_b = diff_main(text1_b, text2_b);
          // Merge the results.
          return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
        }

        return diff_bisect_(text1, text2);
      };

      /**
       * Find the 'middle snake' of a diff, split the problem in two
       * and return the recursively constructed diff.
       * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
       * @param {string} text1 Old string to be diffed.
       * @param {string} text2 New string to be diffed.
       * @return {Array} Array of diff tuples.
       * @private
       */
      function diff_bisect_(text1, text2) {
        // Cache the text lengths to prevent multiple calls.
        var text1_length = text1.length;
        var text2_length = text2.length;
        var max_d = Math.ceil((text1_length + text2_length) / 2);
        var v_offset = max_d;
        var v_length = 2 * max_d;
        var v1 = new Array(v_length);
        var v2 = new Array(v_length);
        // Setting all elements to -1 is faster in Chrome & Firefox than mixing
        // integers and undefined.
        for (var x = 0; x < v_length; x++) {
          v1[x] = -1;
          v2[x] = -1;
        }
        v1[v_offset + 1] = 0;
        v2[v_offset + 1] = 0;
        var delta = text1_length - text2_length;
        // If the total number of characters is odd, then the front path will collide
        // with the reverse path.
        var front = delta % 2 != 0;
        // Offsets for start and end of k loop.
        // Prevents mapping of space beyond the grid.
        var k1start = 0;
        var k1end = 0;
        var k2start = 0;
        var k2end = 0;
        for (var d = 0; d < max_d; d++) {
          // Walk the front path one step.
          for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
            var k1_offset = v_offset + k1;
            var x1;
            if (k1 == -d || k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1]) {
              x1 = v1[k1_offset + 1];
            } else {
              x1 = v1[k1_offset - 1] + 1;
            }
            var y1 = x1 - k1;
            while (x1 < text1_length && y1 < text2_length && text1.charAt(x1) == text2.charAt(y1)) {
              x1++;
              y1++;
            }
            v1[k1_offset] = x1;
            if (x1 > text1_length) {
              // Ran off the right of the graph.
              k1end += 2;
            } else if (y1 > text2_length) {
              // Ran off the bottom of the graph.
              k1start += 2;
            } else if (front) {
              var k2_offset = v_offset + delta - k1;
              if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
                // Mirror x2 onto top-left coordinate system.
                var x2 = text1_length - v2[k2_offset];
                if (x1 >= x2) {
                  // Overlap detected.
                  return diff_bisectSplit_(text1, text2, x1, y1);
                }
              }
            }
          }

          // Walk the reverse path one step.
          for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
            var k2_offset = v_offset + k2;
            var x2;
            if (k2 == -d || k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1]) {
              x2 = v2[k2_offset + 1];
            } else {
              x2 = v2[k2_offset - 1] + 1;
            }
            var y2 = x2 - k2;
            while (x2 < text1_length && y2 < text2_length && text1.charAt(text1_length - x2 - 1) == text2.charAt(text2_length - y2 - 1)) {
              x2++;
              y2++;
            }
            v2[k2_offset] = x2;
            if (x2 > text1_length) {
              // Ran off the left of the graph.
              k2end += 2;
            } else if (y2 > text2_length) {
              // Ran off the top of the graph.
              k2start += 2;
            } else if (!front) {
              var k1_offset = v_offset + delta - k2;
              if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
                var x1 = v1[k1_offset];
                var y1 = v_offset + x1 - k1_offset;
                // Mirror x2 onto top-left coordinate system.
                x2 = text1_length - x2;
                if (x1 >= x2) {
                  // Overlap detected.
                  return diff_bisectSplit_(text1, text2, x1, y1);
                }
              }
            }
          }
        }
        // Diff took too long and hit the deadline or
        // number of diffs equals number of characters, no commonality at all.
        return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
      };

      /**
       * Given the location of the 'middle snake', split the diff in two parts
       * and recurse.
       * @param {string} text1 Old string to be diffed.
       * @param {string} text2 New string to be diffed.
       * @param {number} x Index of split point in text1.
       * @param {number} y Index of split point in text2.
       * @return {Array} Array of diff tuples.
       */
      function diff_bisectSplit_(text1, text2, x, y) {
        var text1a = text1.substring(0, x);
        var text2a = text2.substring(0, y);
        var text1b = text1.substring(x);
        var text2b = text2.substring(y);

        // Compute both diffs serially.
        var diffs = diff_main(text1a, text2a);
        var diffsb = diff_main(text1b, text2b);

        return diffs.concat(diffsb);
      };

      /**
       * Determine the common prefix of two strings.
       * @param {string} text1 First string.
       * @param {string} text2 Second string.
       * @return {number} The number of characters common to the start of each
       *     string.
       */
      function diff_commonPrefix(text1, text2) {
        // Quick check for common null cases.
        if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
          return 0;
        }
        // Binary search.
        // Performance analysis: http://neil.fraser.name/news/2007/10/09/
        var pointermin = 0;
        var pointermax = Math.min(text1.length, text2.length);
        var pointermid = pointermax;
        var pointerstart = 0;
        while (pointermin < pointermid) {
          if (text1.substring(pointerstart, pointermid) == text2.substring(pointerstart, pointermid)) {
            pointermin = pointermid;
            pointerstart = pointermin;
          } else {
            pointermax = pointermid;
          }
          pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
        }
        return pointermid;
      };

      /**
       * Determine the common suffix of two strings.
       * @param {string} text1 First string.
       * @param {string} text2 Second string.
       * @return {number} The number of characters common to the end of each string.
       */
      function diff_commonSuffix(text1, text2) {
        // Quick check for common null cases.
        if (!text1 || !text2 || text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
          return 0;
        }
        // Binary search.
        // Performance analysis: http://neil.fraser.name/news/2007/10/09/
        var pointermin = 0;
        var pointermax = Math.min(text1.length, text2.length);
        var pointermid = pointermax;
        var pointerend = 0;
        while (pointermin < pointermid) {
          if (text1.substring(text1.length - pointermid, text1.length - pointerend) == text2.substring(text2.length - pointermid, text2.length - pointerend)) {
            pointermin = pointermid;
            pointerend = pointermin;
          } else {
            pointermax = pointermid;
          }
          pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
        }
        return pointermid;
      };

      /**
       * Do the two texts share a substring which is at least half the length of the
       * longer text?
       * This speedup can produce non-minimal diffs.
       * @param {string} text1 First string.
       * @param {string} text2 Second string.
       * @return {Array.<string>} Five element Array, containing the prefix of
       *     text1, the suffix of text1, the prefix of text2, the suffix of
       *     text2 and the common middle.  Or null if there was no match.
       */
      function diff_halfMatch_(text1, text2) {
        var longtext = text1.length > text2.length ? text1 : text2;
        var shorttext = text1.length > text2.length ? text2 : text1;
        if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
          return null; // Pointless.
        }

        /**
         * Does a substring of shorttext exist within longtext such that the substring
         * is at least half the length of longtext?
         * Closure, but does not reference any external variables.
         * @param {string} longtext Longer string.
         * @param {string} shorttext Shorter string.
         * @param {number} i Start index of quarter length substring within longtext.
         * @return {Array.<string>} Five element Array, containing the prefix of
         *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
         *     of shorttext and the common middle.  Or null if there was no match.
         * @private
         */
        function diff_halfMatchI_(longtext, shorttext, i) {
          // Start with a 1/4 length substring at position i as a seed.
          var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
          var j = -1;
          var best_common = '';
          var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
          while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
            var prefixLength = diff_commonPrefix(longtext.substring(i), shorttext.substring(j));
            var suffixLength = diff_commonSuffix(longtext.substring(0, i), shorttext.substring(0, j));
            if (best_common.length < suffixLength + prefixLength) {
              best_common = shorttext.substring(j - suffixLength, j) + shorttext.substring(j, j + prefixLength);
              best_longtext_a = longtext.substring(0, i - suffixLength);
              best_longtext_b = longtext.substring(i + prefixLength);
              best_shorttext_a = shorttext.substring(0, j - suffixLength);
              best_shorttext_b = shorttext.substring(j + prefixLength);
            }
          }
          if (best_common.length * 2 >= longtext.length) {
            return [best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b, best_common];
          } else {
            return null;
          }
        }

        // First check if the second quarter is the seed for a half-match.
        var hm1 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 4));
        // Check again based on the third quarter.
        var hm2 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 2));
        var hm;
        if (!hm1 && !hm2) {
          return null;
        } else if (!hm2) {
          hm = hm1;
        } else if (!hm1) {
          hm = hm2;
        } else {
          // Both matched.  Select the longest.
          hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
        }

        // A half-match was found, sort out the return data.
        var text1_a, text1_b, text2_a, text2_b;
        if (text1.length > text2.length) {
          text1_a = hm[0];
          text1_b = hm[1];
          text2_a = hm[2];
          text2_b = hm[3];
        } else {
          text2_a = hm[0];
          text2_b = hm[1];
          text1_a = hm[2];
          text1_b = hm[3];
        }
        var mid_common = hm[4];
        return [text1_a, text1_b, text2_a, text2_b, mid_common];
      };

      /**
       * Reorder and merge like edit sections.  Merge equalities.
       * Any edit section can move as long as it doesn't cross an equality.
       * @param {Array} diffs Array of diff tuples.
       */
      function diff_cleanupMerge(diffs) {
        diffs.push([DIFF_EQUAL, '']); // Add a dummy entry at the end.
        var pointer = 0;
        var count_delete = 0;
        var count_insert = 0;
        var text_delete = '';
        var text_insert = '';
        var commonlength;
        while (pointer < diffs.length) {
          switch (diffs[pointer][0]) {
            case DIFF_INSERT:
              count_insert++;
              text_insert += diffs[pointer][1];
              pointer++;
              break;
            case DIFF_DELETE:
              count_delete++;
              text_delete += diffs[pointer][1];
              pointer++;
              break;
            case DIFF_EQUAL:
              // Upon reaching an equality, check for prior redundancies.
              if (count_delete + count_insert > 1) {
                if (count_delete !== 0 && count_insert !== 0) {
                  // Factor out any common prefixies.
                  commonlength = diff_commonPrefix(text_insert, text_delete);
                  if (commonlength !== 0) {
                    if (pointer - count_delete - count_insert > 0 && diffs[pointer - count_delete - count_insert - 1][0] == DIFF_EQUAL) {
                      diffs[pointer - count_delete - count_insert - 1][1] += text_insert.substring(0, commonlength);
                    } else {
                      diffs.splice(0, 0, [DIFF_EQUAL, text_insert.substring(0, commonlength)]);
                      pointer++;
                    }
                    text_insert = text_insert.substring(commonlength);
                    text_delete = text_delete.substring(commonlength);
                  }
                  // Factor out any common suffixies.
                  commonlength = diff_commonSuffix(text_insert, text_delete);
                  if (commonlength !== 0) {
                    diffs[pointer][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
                    text_insert = text_insert.substring(0, text_insert.length - commonlength);
                    text_delete = text_delete.substring(0, text_delete.length - commonlength);
                  }
                }
                // Delete the offending records and add the merged ones.
                if (count_delete === 0) {
                  diffs.splice(pointer - count_insert, count_delete + count_insert, [DIFF_INSERT, text_insert]);
                } else if (count_insert === 0) {
                  diffs.splice(pointer - count_delete, count_delete + count_insert, [DIFF_DELETE, text_delete]);
                } else {
                  diffs.splice(pointer - count_delete - count_insert, count_delete + count_insert, [DIFF_DELETE, text_delete], [DIFF_INSERT, text_insert]);
                }
                pointer = pointer - count_delete - count_insert + (count_delete ? 1 : 0) + (count_insert ? 1 : 0) + 1;
              } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
                // Merge this equality with the previous one.
                diffs[pointer - 1][1] += diffs[pointer][1];
                diffs.splice(pointer, 1);
              } else {
                pointer++;
              }
              count_insert = 0;
              count_delete = 0;
              text_delete = '';
              text_insert = '';
              break;
          }
        }
        if (diffs[diffs.length - 1][1] === '') {
          diffs.pop(); // Remove the dummy entry at the end.
        }

        // Second pass: look for single edits surrounded on both sides by equalities
        // which can be shifted sideways to eliminate an equality.
        // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
        var changes = false;
        pointer = 1;
        // Intentionally ignore the first and last element (don't need checking).
        while (pointer < diffs.length - 1) {
          if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
            // This is a single edit surrounded by equalities.
            if (diffs[pointer][1].substring(diffs[pointer][1].length - diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
              // Shift the edit over the previous equality.
              diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(0, diffs[pointer][1].length - diffs[pointer - 1][1].length);
              diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
              diffs.splice(pointer - 1, 1);
              changes = true;
            } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) == diffs[pointer + 1][1]) {
              // Shift the edit over the next equality.
              diffs[pointer - 1][1] += diffs[pointer + 1][1];
              diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1];
              diffs.splice(pointer + 1, 1);
              changes = true;
            }
          }
          pointer++;
        }
        // If shifts were made, the diff needs reordering and another shift sweep.
        if (changes) {
          diff_cleanupMerge(diffs);
        }
      };

      var diff = diff_main;
      diff.INSERT = DIFF_INSERT;
      diff.DELETE = DIFF_DELETE;
      diff.EQUAL = DIFF_EQUAL;

      module.exports = diff;

      /*
       * Modify a diff such that the cursor position points to the start of a change:
       * E.g.
       *   cursor_normalize_diff([[DIFF_EQUAL, 'abc']], 1)
       *     => [1, [[DIFF_EQUAL, 'a'], [DIFF_EQUAL, 'bc']]]
       *   cursor_normalize_diff([[DIFF_INSERT, 'new'], [DIFF_DELETE, 'xyz']], 2)
       *     => [2, [[DIFF_INSERT, 'new'], [DIFF_DELETE, 'xy'], [DIFF_DELETE, 'z']]]
       *
       * @param {Array} diffs Array of diff tuples
       * @param {Int} cursor_pos Suggested edit position. Must not be out of bounds!
       * @return {Array} A tuple [cursor location in the modified diff, modified diff]
       */
      function cursor_normalize_diff(diffs, cursor_pos) {
        if (cursor_pos === 0) {
          return [DIFF_EQUAL, diffs];
        }
        for (var current_pos = 0, i = 0; i < diffs.length; i++) {
          var d = diffs[i];
          if (d[0] === DIFF_DELETE || d[0] === DIFF_EQUAL) {
            var next_pos = current_pos + d[1].length;
            if (cursor_pos === next_pos) {
              return [i + 1, diffs];
            } else if (cursor_pos < next_pos) {
              // copy to prevent side effects
              diffs = diffs.slice();
              // split d into two diff changes
              var split_pos = cursor_pos - current_pos;
              var d_left = [d[0], d[1].slice(0, split_pos)];
              var d_right = [d[0], d[1].slice(split_pos)];
              diffs.splice(i, 1, d_left, d_right);
              return [i + 1, diffs];
            } else {
              current_pos = next_pos;
            }
          }
        }
        throw new Error('cursor_pos is out of bounds!');
      }

      /*
       * Modify a diff such that the edit position is "shifted" to the proposed edit location (cursor_position).
       *
       * Case 1)
       *   Check if a naive shift is possible:
       *     [0, X], [ 1, Y] -> [ 1, Y], [0, X]    (if X + Y === Y + X)
       *     [0, X], [-1, Y] -> [-1, Y], [0, X]    (if X + Y === Y + X) - holds same result
       * Case 2)
       *   Check if the following shifts are possible:
       *     [0, 'pre'], [ 1, 'prefix'] -> [ 1, 'pre'], [0, 'pre'], [ 1, 'fix']
       *     [0, 'pre'], [-1, 'prefix'] -> [-1, 'pre'], [0, 'pre'], [-1, 'fix']
       *         ^            ^
       *         d          d_next
       *
       * @param {Array} diffs Array of diff tuples
       * @param {Int} cursor_pos Suggested edit position. Must not be out of bounds!
       * @return {Array} Array of diff tuples
       */
      function fix_cursor(diffs, cursor_pos) {
        var norm = cursor_normalize_diff(diffs, cursor_pos);
        var ndiffs = norm[1];
        var cursor_pointer = norm[0];
        var d = ndiffs[cursor_pointer];
        var d_next = ndiffs[cursor_pointer + 1];

        if (d == null) {
          // Text was deleted from end of original string,
          // cursor is now out of bounds in new string
          return diffs;
        } else if (d[0] !== DIFF_EQUAL) {
          // A modification happened at the cursor location.
          // This is the expected outcome, so we can return the original diff.
          return diffs;
        } else {
          if (d_next != null && d[1] + d_next[1] === d_next[1] + d[1]) {
            // Case 1)
            // It is possible to perform a naive shift
            ndiffs.splice(cursor_pointer, 2, d_next, d);
            return merge_tuples(ndiffs, cursor_pointer, 2);
          } else if (d_next != null && d_next[1].indexOf(d[1]) === 0) {
            // Case 2)
            // d[1] is a prefix of d_next[1]
            // We can assume that d_next[0] !== 0, since d[0] === 0
            // Shift edit locations..
            ndiffs.splice(cursor_pointer, 2, [d_next[0], d[1]], [0, d[1]]);
            var suffix = d_next[1].slice(d[1].length);
            if (suffix.length > 0) {
              ndiffs.splice(cursor_pointer + 2, 0, [d_next[0], suffix]);
            }
            return merge_tuples(ndiffs, cursor_pointer, 3);
          } else {
            // Not possible to perform any modification
            return diffs;
          }
        }
      }

      /*
       * Try to merge tuples with their neigbors in a given range.
       * E.g. [0, 'a'], [0, 'b'] -> [0, 'ab']
       *
       * @param {Array} diffs Array of diff tuples.
       * @param {Int} start Position of the first element to merge (diffs[start] is also merged with diffs[start - 1]).
       * @param {Int} length Number of consecutive elements to check.
       * @return {Array} Array of merged diff tuples.
       */
      function merge_tuples(diffs, start, length) {
        // Check from (start-1) to (start+length).
        for (var i = start + length - 1; i >= 0 && i >= start - 1; i--) {
          if (i + 1 < diffs.length) {
            var left_d = diffs[i];
            var right_d = diffs[i + 1];
            if (left_d[0] === right_d[1]) {
              diffs.splice(i, 2, [left_d[0], left_d[1] + right_d[1]]);
            }
          }
        }
        return diffs;
      }

      /***/
    },
    /* 55 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <polyline class=\"ql-even ql-stroke\" points=\"5 7 3 9 5 11\"></polyline> <polyline class=\"ql-even ql-stroke\" points=\"13 7 15 9 13 11\"></polyline> <line class=ql-stroke x1=10 x2=8 y1=5 y2=13></line> </svg>";

      /***/
    },
    /* 56 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };
        return function (d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var format_1 = __webpack_require__(22);
      var Registry = __webpack_require__(1);
      var BlockBlot = function (_super) {
        __extends(BlockBlot, _super);
        function BlockBlot() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        BlockBlot.formats = function (domNode) {
          var tagName = Registry.query(BlockBlot.blotName).tagName;
          if (domNode.tagName === tagName) return undefined;
          return _super.formats.call(this, domNode);
        };
        BlockBlot.prototype.format = function (name, value) {
          if (Registry.query(name, Registry.Scope.BLOCK) == null) {
            return;
          } else if (name === this.statics.blotName && !value) {
            this.replaceWith(BlockBlot.blotName);
          } else {
            _super.prototype.format.call(this, name, value);
          }
        };
        BlockBlot.prototype.formatAt = function (index, length, name, value) {
          if (Registry.query(name, Registry.Scope.BLOCK) != null) {
            this.format(name, value);
          } else {
            _super.prototype.formatAt.call(this, index, length, name, value);
          }
        };
        BlockBlot.prototype.insertAt = function (index, value, def) {
          if (def == null || Registry.query(value, Registry.Scope.INLINE) != null) {
            // Insert text or inline
            _super.prototype.insertAt.call(this, index, value, def);
          } else {
            var after = this.split(index);
            var blot = Registry.create(value, def);
            after.parent.insertBefore(blot, after);
          }
        };
        BlockBlot.prototype.update = function (mutations) {
          if (navigator.userAgent.match(/Trident/)) {
            this.attach();
          } else {
            _super.prototype.update.call(this, mutations);
          }
        };
        return BlockBlot;
      }(format_1.default);
      BlockBlot.blotName = 'block';
      BlockBlot.scope = Registry.Scope.BLOCK_BLOT;
      BlockBlot.tagName = 'P';
      exports.default = BlockBlot;

      /***/
    },
    /* 57 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };
        return function (d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var leaf_1 = __webpack_require__(23);
      var EmbedBlot = function (_super) {
        __extends(EmbedBlot, _super);
        function EmbedBlot() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        EmbedBlot.formats = function (domNode) {
          return undefined;
        };
        EmbedBlot.prototype.format = function (name, value) {
          // super.formatAt wraps, which is what we want in general,
          // but this allows subclasses to overwrite for formats
          // that just apply to particular embeds
          _super.prototype.formatAt.call(this, 0, this.length(), name, value);
        };
        EmbedBlot.prototype.formatAt = function (index, length, name, value) {
          if (index === 0 && length === this.length()) {
            this.format(name, value);
          } else {
            _super.prototype.formatAt.call(this, index, length, name, value);
          }
        };
        EmbedBlot.prototype.formats = function () {
          return this.statics.formats(this.domNode);
        };
        return EmbedBlot;
      }(leaf_1.default);
      exports.default = EmbedBlot;

      /***/
    },
    /* 58 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };
        return function (d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var format_1 = __webpack_require__(22);
      var Registry = __webpack_require__(1);
      // Shallow object comparison
      function isEqual(obj1, obj2) {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
        for (var prop in obj1) {
          if (obj1[prop] !== obj2[prop]) return false;
        }
        return true;
      }
      var InlineBlot = function (_super) {
        __extends(InlineBlot, _super);
        function InlineBlot() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        InlineBlot.formats = function (domNode) {
          if (domNode.tagName === InlineBlot.tagName) return undefined;
          return _super.formats.call(this, domNode);
        };
        InlineBlot.prototype.format = function (name, value) {
          var _this = this;
          if (name === this.statics.blotName && !value) {
            this.children.forEach(function (child) {
              if (!(child instanceof format_1.default)) {
                child = child.wrap(InlineBlot.blotName, true);
              }
              _this.attributes.copy(child);
            });
            this.unwrap();
          } else {
            _super.prototype.format.call(this, name, value);
          }
        };
        InlineBlot.prototype.formatAt = function (index, length, name, value) {
          if (this.formats()[name] != null || Registry.query(name, Registry.Scope.ATTRIBUTE)) {
            var blot = this.isolate(index, length);
            blot.format(name, value);
          } else {
            _super.prototype.formatAt.call(this, index, length, name, value);
          }
        };
        InlineBlot.prototype.optimize = function () {
          _super.prototype.optimize.call(this);
          var formats = this.formats();
          if (Object.keys(formats).length === 0) {
            return this.unwrap(); // unformatted span
          }
          var next = this.next;
          if (next instanceof InlineBlot && next.prev === this && isEqual(formats, next.formats())) {
            next.moveChildren(this);
            next.remove();
          }
        };
        return InlineBlot;
      }(format_1.default);
      InlineBlot.blotName = 'inline';
      InlineBlot.scope = Registry.Scope.INLINE_BLOT;
      InlineBlot.tagName = 'SPAN';
      exports.default = InlineBlot;

      /***/
    },
    /* 59 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };
        return function (d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var container_1 = __webpack_require__(21);
      var Registry = __webpack_require__(1);
      var OBSERVER_CONFIG = {
        attributes: true,
        characterData: true,
        characterDataOldValue: true,
        childList: true,
        subtree: true
      };
      var MAX_OPTIMIZE_ITERATIONS = 100;
      var ScrollBlot = function (_super) {
        __extends(ScrollBlot, _super);
        function ScrollBlot(node) {
          var _this = _super.call(this, node) || this;
          _this.parent = null;
          _this.observer = new MutationObserver(function (mutations) {
            _this.update(mutations);
          });
          _this.observer.observe(_this.domNode, OBSERVER_CONFIG);
          return _this;
        }
        ScrollBlot.prototype.detach = function () {
          _super.prototype.detach.call(this);
          this.observer.disconnect();
        };
        ScrollBlot.prototype.deleteAt = function (index, length) {
          this.update();
          if (index === 0 && length === this.length()) {
            this.children.forEach(function (child) {
              child.remove();
            });
          } else {
            _super.prototype.deleteAt.call(this, index, length);
          }
        };
        ScrollBlot.prototype.formatAt = function (index, length, name, value) {
          this.update();
          _super.prototype.formatAt.call(this, index, length, name, value);
        };
        ScrollBlot.prototype.insertAt = function (index, value, def) {
          this.update();
          _super.prototype.insertAt.call(this, index, value, def);
        };
        ScrollBlot.prototype.optimize = function (mutations) {
          var _this = this;
          if (mutations === void 0) {
            mutations = [];
          }
          _super.prototype.optimize.call(this);
          // We must modify mutations directly, cannot make copy and then modify
          var records = [].slice.call(this.observer.takeRecords());
          // Array.push currently seems to be implemented by a non-tail recursive function
          // so we cannot just mutations.push.apply(mutations, this.observer.takeRecords());
          while (records.length > 0) {
            mutations.push(records.pop());
          } // TODO use WeakMap
          var mark = function mark(blot, markParent) {
            if (markParent === void 0) {
              markParent = true;
            }
            if (blot == null || blot === _this) return;
            if (blot.domNode.parentNode == null) return;
            if (blot.domNode[Registry.DATA_KEY].mutations == null) {
              blot.domNode[Registry.DATA_KEY].mutations = [];
            }
            if (markParent) mark(blot.parent);
          };
          var optimize = function optimize(blot) {
            if (blot.domNode[Registry.DATA_KEY] == null || blot.domNode[Registry.DATA_KEY].mutations == null) {
              return;
            }
            if (blot instanceof container_1.default) {
              blot.children.forEach(optimize);
            }
            blot.optimize();
          };
          var remaining = mutations;
          for (var i = 0; remaining.length > 0; i += 1) {
            if (i >= MAX_OPTIMIZE_ITERATIONS) {
              throw new Error('[Parchment] Maximum optimize iterations reached');
            }
            remaining.forEach(function (mutation) {
              var blot = Registry.find(mutation.target, true);
              if (blot == null) return;
              if (blot.domNode === mutation.target) {
                if (mutation.type === 'childList') {
                  mark(Registry.find(mutation.previousSibling, false));
                  [].forEach.call(mutation.addedNodes, function (node) {
                    var child = Registry.find(node, false);
                    mark(child, false);
                    if (child instanceof container_1.default) {
                      child.children.forEach(function (grandChild) {
                        mark(grandChild, false);
                      });
                    }
                  });
                } else if (mutation.type === 'attributes') {
                  mark(blot.prev);
                }
              }
              mark(blot);
            });
            this.children.forEach(optimize);
            remaining = [].slice.call(this.observer.takeRecords());
            records = remaining.slice();
            while (records.length > 0) {
              mutations.push(records.pop());
            }
          }
        };
        ScrollBlot.prototype.update = function (mutations) {
          var _this = this;
          mutations = mutations || this.observer.takeRecords();
          // TODO use WeakMap
          mutations.map(function (mutation) {
            var blot = Registry.find(mutation.target, true);
            if (blot == null) return;
            if (blot.domNode[Registry.DATA_KEY].mutations == null) {
              blot.domNode[Registry.DATA_KEY].mutations = [mutation];
              return blot;
            } else {
              blot.domNode[Registry.DATA_KEY].mutations.push(mutation);
              return null;
            }
          }).forEach(function (blot) {
            if (blot == null || blot === _this || blot.domNode[Registry.DATA_KEY] == null) return;
            blot.update(blot.domNode[Registry.DATA_KEY].mutations || []);
          });
          if (this.domNode[Registry.DATA_KEY].mutations != null) {
            _super.prototype.update.call(this, this.domNode[Registry.DATA_KEY].mutations);
          }
          this.optimize(mutations);
        };
        return ScrollBlot;
      }(container_1.default);
      ScrollBlot.blotName = 'scroll';
      ScrollBlot.defaultChild = 'block';
      ScrollBlot.scope = Registry.Scope.BLOCK_BLOT;
      ScrollBlot.tagName = 'DIV';
      exports.default = ScrollBlot;

      /***/
    },
    /* 60 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };
        return function (d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var leaf_1 = __webpack_require__(23);
      var Registry = __webpack_require__(1);
      var TextBlot = function (_super) {
        __extends(TextBlot, _super);
        function TextBlot(node) {
          var _this = _super.call(this, node) || this;
          _this.text = _this.statics.value(_this.domNode);
          return _this;
        }
        TextBlot.create = function (value) {
          return document.createTextNode(value);
        };
        TextBlot.value = function (domNode) {
          var text = domNode.data;
          if (text["normalize"]) text = text["normalize"]();
          return text;
        };
        TextBlot.prototype.deleteAt = function (index, length) {
          this.domNode.data = this.text = this.text.slice(0, index) + this.text.slice(index + length);
        };
        TextBlot.prototype.index = function (node, offset) {
          if (this.domNode === node) {
            return offset;
          }
          return -1;
        };
        TextBlot.prototype.insertAt = function (index, value, def) {
          if (def == null) {
            this.text = this.text.slice(0, index) + value + this.text.slice(index);
            this.domNode.data = this.text;
          } else {
            _super.prototype.insertAt.call(this, index, value, def);
          }
        };
        TextBlot.prototype.length = function () {
          return this.text.length;
        };
        TextBlot.prototype.optimize = function () {
          _super.prototype.optimize.call(this);
          this.text = this.statics.value(this.domNode);
          if (this.text.length === 0) {
            this.remove();
          } else if (this.next instanceof TextBlot && this.next.prev === this) {
            this.insertAt(this.length(), this.next.value());
            this.next.remove();
          }
        };
        TextBlot.prototype.position = function (index, inclusive) {
          if (inclusive === void 0) {
            inclusive = false;
          }
          return [this.domNode, index];
        };
        TextBlot.prototype.split = function (index, force) {
          if (force === void 0) {
            force = false;
          }
          if (!force) {
            if (index === 0) return this;
            if (index === this.length()) return this.next;
          }
          var after = Registry.create(this.domNode.splitText(index));
          this.parent.insertBefore(after, this.next);
          this.text = this.statics.value(this.domNode);
          return after;
        };
        TextBlot.prototype.update = function (mutations) {
          var _this = this;
          if (mutations.some(function (mutation) {
            return mutation.type === 'characterData' && mutation.target === _this.domNode;
          })) {
            this.text = this.statics.value(this.domNode);
          }
        };
        TextBlot.prototype.value = function () {
          return this.text;
        };
        return TextBlot;
      }(leaf_1.default);
      TextBlot.blotName = 'text';
      TextBlot.scope = Registry.Scope.INLINE_BLOT;
      exports.default = TextBlot;

      /***/
    },
    /* 61 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", { value: true });
      var LinkedList = function () {
        function LinkedList() {
          this.head = this.tail = undefined;
          this.length = 0;
        }
        LinkedList.prototype.append = function () {
          var nodes = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            nodes[_i] = arguments[_i];
          }
          this.insertBefore(nodes[0], undefined);
          if (nodes.length > 1) {
            this.append.apply(this, nodes.slice(1));
          }
        };
        LinkedList.prototype.contains = function (node) {
          var cur,
              next = this.iterator();
          while (cur = next()) {
            if (cur === node) return true;
          }
          return false;
        };
        LinkedList.prototype.insertBefore = function (node, refNode) {
          node.next = refNode;
          if (refNode != null) {
            node.prev = refNode.prev;
            if (refNode.prev != null) {
              refNode.prev.next = node;
            }
            refNode.prev = node;
            if (refNode === this.head) {
              this.head = node;
            }
          } else if (this.tail != null) {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
          } else {
            node.prev = undefined;
            this.head = this.tail = node;
          }
          this.length += 1;
        };
        LinkedList.prototype.offset = function (target) {
          var index = 0,
              cur = this.head;
          while (cur != null) {
            if (cur === target) return index;
            index += cur.length();
            cur = cur.next;
          }
          return -1;
        };
        LinkedList.prototype.remove = function (node) {
          if (!this.contains(node)) return;
          if (node.prev != null) node.prev.next = node.next;
          if (node.next != null) node.next.prev = node.prev;
          if (node === this.head) this.head = node.next;
          if (node === this.tail) this.tail = node.prev;
          this.length -= 1;
        };
        LinkedList.prototype.iterator = function (curNode) {
          if (curNode === void 0) {
            curNode = this.head;
          }
          // TODO use yield when we can
          return function () {
            var ret = curNode;
            if (curNode != null) curNode = curNode.next;
            return ret;
          };
        };
        LinkedList.prototype.find = function (index, inclusive) {
          if (inclusive === void 0) {
            inclusive = false;
          }
          var cur,
              next = this.iterator();
          while (cur = next()) {
            var length = cur.length();
            if (index < length || inclusive && index === length && (cur.next == null || cur.next.length() !== 0)) {
              return [cur, index];
            }
            index -= length;
          }
          return [null, 0];
        };
        LinkedList.prototype.forEach = function (callback) {
          var cur,
              next = this.iterator();
          while (cur = next()) {
            callback(cur);
          }
        };
        LinkedList.prototype.forEachAt = function (index, length, callback) {
          if (length <= 0) return;
          var _a = this.find(index),
              startNode = _a[0],
              offset = _a[1];
          var cur,
              curIndex = index - offset,
              next = this.iterator(startNode);
          while ((cur = next()) && curIndex < index + length) {
            var curLength = cur.length();
            if (index > curIndex) {
              callback(cur, index - curIndex, Math.min(length, curIndex + curLength - index));
            } else {
              callback(cur, 0, Math.min(curLength, index + length - curIndex));
            }
            curIndex += curLength;
          }
        };
        LinkedList.prototype.map = function (callback) {
          return this.reduce(function (memo, cur) {
            memo.push(callback(cur));
            return memo;
          }, []);
        };
        LinkedList.prototype.reduce = function (callback, memo) {
          var cur,
              next = this.iterator();
          while (cur = next()) {
            memo = callback(memo, cur);
          }
          return memo;
        };
        return LinkedList;
      }();
      exports.default = LinkedList;

      /***/
    },
    /* 62 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var _core = __webpack_require__(29);

      var _core2 = _interopRequireDefault(_core);

      var _align = __webpack_require__(36);

      var _direction = __webpack_require__(38);

      var _indent = __webpack_require__(67);

      var _blockquote = __webpack_require__(64);

      var _blockquote2 = _interopRequireDefault(_blockquote);

      var _header = __webpack_require__(65);

      var _header2 = _interopRequireDefault(_header);

      var _list = __webpack_require__(69);

      var _list2 = _interopRequireDefault(_list);

      var _background = __webpack_require__(37);

      var _color = __webpack_require__(26);

      var _font = __webpack_require__(39);

      var _size = __webpack_require__(40);

      var _bold = __webpack_require__(45);

      var _bold2 = _interopRequireDefault(_bold);

      var _italic = __webpack_require__(68);

      var _italic2 = _interopRequireDefault(_italic);

      var _link = __webpack_require__(27);

      var _link2 = _interopRequireDefault(_link);

      var _script = __webpack_require__(70);

      var _script2 = _interopRequireDefault(_script);

      var _strike = __webpack_require__(71);

      var _strike2 = _interopRequireDefault(_strike);

      var _underline = __webpack_require__(72);

      var _underline2 = _interopRequireDefault(_underline);

      var _image = __webpack_require__(66);

      var _image2 = _interopRequireDefault(_image);

      var _video = __webpack_require__(73);

      var _video2 = _interopRequireDefault(_video);

      var _code = __webpack_require__(16);

      var _code2 = _interopRequireDefault(_code);

      var _formula = __webpack_require__(74);

      var _formula2 = _interopRequireDefault(_formula);

      var _syntax = __webpack_require__(75);

      var _syntax2 = _interopRequireDefault(_syntax);

      var _toolbar = __webpack_require__(47);

      var _toolbar2 = _interopRequireDefault(_toolbar);

      var _icons = __webpack_require__(41);

      var _icons2 = _interopRequireDefault(_icons);

      var _picker = __webpack_require__(28);

      var _picker2 = _interopRequireDefault(_picker);

      var _colorPicker = __webpack_require__(48);

      var _colorPicker2 = _interopRequireDefault(_colorPicker);

      var _iconPicker = __webpack_require__(49);

      var _iconPicker2 = _interopRequireDefault(_iconPicker);

      var _tooltip = __webpack_require__(50);

      var _tooltip2 = _interopRequireDefault(_tooltip);

      var _bubble = __webpack_require__(76);

      var _bubble2 = _interopRequireDefault(_bubble);

      var _snow = __webpack_require__(63);

      var _snow2 = _interopRequireDefault(_snow);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      _core2.default.register({
        'attributors/attribute/direction': _direction.DirectionAttribute,

        'attributors/class/align': _align.AlignClass,
        'attributors/class/background': _background.BackgroundClass,
        'attributors/class/color': _color.ColorClass,
        'attributors/class/direction': _direction.DirectionClass,
        'attributors/class/font': _font.FontClass,
        'attributors/class/size': _size.SizeClass,

        'attributors/style/align': _align.AlignStyle,
        'attributors/style/background': _background.BackgroundStyle,
        'attributors/style/color': _color.ColorStyle,
        'attributors/style/direction': _direction.DirectionStyle,
        'attributors/style/font': _font.FontStyle,
        'attributors/style/size': _size.SizeStyle
      }, true);

      _core2.default.register({
        'formats/align': _align.AlignClass,
        'formats/direction': _direction.DirectionClass,
        'formats/indent': _indent.IndentClass,

        'formats/background': _background.BackgroundStyle,
        'formats/color': _color.ColorStyle,
        'formats/font': _font.FontClass,
        'formats/size': _size.SizeClass,

        'formats/blockquote': _blockquote2.default,
        'formats/code-block': _code2.default,
        'formats/header': _header2.default,
        'formats/list': _list2.default,

        'formats/bold': _bold2.default,
        'formats/code': _code.Code,
        'formats/italic': _italic2.default,
        'formats/link': _link2.default,
        'formats/script': _script2.default,
        'formats/strike': _strike2.default,
        'formats/underline': _underline2.default,

        'formats/image': _image2.default,
        'formats/video': _video2.default,

        'formats/list/item': _list.ListItem,

        'modules/formula': _formula2.default,
        'modules/syntax': _syntax2.default,
        'modules/toolbar': _toolbar2.default,

        'themes/bubble': _bubble2.default,
        'themes/snow': _snow2.default,

        'ui/icons': _icons2.default,
        'ui/picker': _picker2.default,
        'ui/icon-picker': _iconPicker2.default,
        'ui/color-picker': _colorPicker2.default,
        'ui/tooltip': _tooltip2.default
      }, true);

      module.exports = _core2.default;

      /***/
    },
    /* 63 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _slicedToArray = function () {
        function sliceIterator(arr, i) {
          var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;_e = err;
          } finally {
            try {
              if (!_n && _i["return"]) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }return _arr;
        }return function (arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _extend = __webpack_require__(3);

      var _extend2 = _interopRequireDefault(_extend);

      var _emitter = __webpack_require__(5);

      var _emitter2 = _interopRequireDefault(_emitter);

      var _base = __webpack_require__(43);

      var _base2 = _interopRequireDefault(_base);

      var _link = __webpack_require__(27);

      var _link2 = _interopRequireDefault(_link);

      var _selection = __webpack_require__(15);

      var _icons = __webpack_require__(41);

      var _icons2 = _interopRequireDefault(_icons);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var TOOLBAR_CONFIG = [[{ header: ['1', '2', '3', false] }], ['bold', 'italic', 'underline', 'link'], [{ list: 'ordered' }, { list: 'bullet' }], ['clean']];

      var SnowTheme = function (_BaseTheme) {
        _inherits(SnowTheme, _BaseTheme);

        function SnowTheme(quill, options) {
          _classCallCheck(this, SnowTheme);

          if (options.modules.toolbar != null && options.modules.toolbar.container == null) {
            options.modules.toolbar.container = TOOLBAR_CONFIG;
          }

          var _this = _possibleConstructorReturn(this, (SnowTheme.__proto__ || Object.getPrototypeOf(SnowTheme)).call(this, quill, options));

          _this.quill.container.classList.add('ql-snow');
          return _this;
        }

        _createClass(SnowTheme, [{
          key: 'extendToolbar',
          value: function extendToolbar(toolbar) {
            toolbar.container.classList.add('ql-snow');
            this.buildButtons([].slice.call(toolbar.container.querySelectorAll('button')), _icons2.default);
            this.buildPickers([].slice.call(toolbar.container.querySelectorAll('select')), _icons2.default);
            this.tooltip = new SnowTooltip(this.quill, this.options.bounds);
            if (toolbar.container.querySelector('.ql-link')) {
              this.quill.keyboard.addBinding({ key: 'K', shortKey: true }, function (range, context) {
                toolbar.handlers['link'].call(toolbar, !context.format.link);
              });
            }
          }
        }]);

        return SnowTheme;
      }(_base2.default);

      SnowTheme.DEFAULTS = (0, _extend2.default)(true, {}, _base2.default.DEFAULTS, {
        modules: {
          toolbar: {
            handlers: {
              link: function link(value) {
                if (value) {
                  var range = this.quill.getSelection();
                  if (range == null || range.length == 0) return;
                  var preview = this.quill.getText(range);
                  if (/^\S+@\S+\.\S+$/.test(preview) && preview.indexOf('mailto:') !== 0) {
                    preview = 'mailto:' + preview;
                  }
                  var tooltip = this.quill.theme.tooltip;
                  tooltip.edit('link', preview);
                } else {
                  this.quill.format('link', false);
                }
              }
            }
          }
        }
      });

      var SnowTooltip = function (_BaseTooltip) {
        _inherits(SnowTooltip, _BaseTooltip);

        function SnowTooltip(quill, bounds) {
          _classCallCheck(this, SnowTooltip);

          var _this2 = _possibleConstructorReturn(this, (SnowTooltip.__proto__ || Object.getPrototypeOf(SnowTooltip)).call(this, quill, bounds));

          _this2.preview = _this2.root.querySelector('a.ql-preview');
          return _this2;
        }

        _createClass(SnowTooltip, [{
          key: 'listen',
          value: function listen() {
            var _this3 = this;

            _get(SnowTooltip.prototype.__proto__ || Object.getPrototypeOf(SnowTooltip.prototype), 'listen', this).call(this);
            this.root.querySelector('a.ql-action').addEventListener('click', function (event) {
              if (_this3.root.classList.contains('ql-editing')) {
                _this3.save();
              } else {
                _this3.edit('link', _this3.preview.textContent);
              }
              event.preventDefault();
            });
            this.root.querySelector('a.ql-remove').addEventListener('click', function (event) {
              if (_this3.linkRange != null) {
                var range = _this3.linkRange;
                _this3.restoreFocus();
                _this3.quill.formatText(range, 'link', false, _emitter2.default.sources.USER);
                delete _this3.linkRange;
              }
              event.preventDefault();
              _this3.hide();
            });
            this.quill.on(_emitter2.default.events.SELECTION_CHANGE, function (range, oldRange, source) {
              if (range == null) return;
              if (range.length === 0 && source === _emitter2.default.sources.USER) {
                var _quill$scroll$descend = _this3.quill.scroll.descendant(_link2.default, range.index),
                    _quill$scroll$descend2 = _slicedToArray(_quill$scroll$descend, 2),
                    link = _quill$scroll$descend2[0],
                    offset = _quill$scroll$descend2[1];

                if (link != null) {
                  _this3.linkRange = new _selection.Range(range.index - offset, link.length());
                  var preview = _link2.default.formats(link.domNode);
                  _this3.preview.textContent = preview;
                  _this3.preview.setAttribute('href', preview);
                  _this3.show();
                  _this3.position(_this3.quill.getBounds(_this3.linkRange));
                  return;
                }
              } else {
                delete _this3.linkRange;
              }
              _this3.hide();
            });
          }
        }, {
          key: 'show',
          value: function show() {
            _get(SnowTooltip.prototype.__proto__ || Object.getPrototypeOf(SnowTooltip.prototype), 'show', this).call(this);
            this.root.removeAttribute('data-mode');
          }
        }]);

        return SnowTooltip;
      }(_base.BaseTooltip);

      SnowTooltip.TEMPLATE = ['<a class="ql-preview" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join('');

      exports.default = SnowTheme;

      /***/
    },
    /* 64 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _block = __webpack_require__(4);

      var _block2 = _interopRequireDefault(_block);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Blockquote = function (_Block) {
        _inherits(Blockquote, _Block);

        function Blockquote() {
          _classCallCheck(this, Blockquote);

          return _possibleConstructorReturn(this, (Blockquote.__proto__ || Object.getPrototypeOf(Blockquote)).apply(this, arguments));
        }

        return Blockquote;
      }(_block2.default);

      Blockquote.blotName = 'blockquote';
      Blockquote.tagName = 'blockquote';

      exports.default = Blockquote;

      /***/
    },
    /* 65 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _block = __webpack_require__(4);

      var _block2 = _interopRequireDefault(_block);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Header = function (_Block) {
        _inherits(Header, _Block);

        function Header() {
          _classCallCheck(this, Header);

          return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
        }

        _createClass(Header, null, [{
          key: 'formats',
          value: function formats(domNode) {
            return this.tagName.indexOf(domNode.tagName) + 1;
          }
        }]);

        return Header;
      }(_block2.default);

      Header.blotName = 'header';
      Header.tagName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

      exports.default = Header;

      /***/
    },
    /* 66 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _embed = __webpack_require__(7);

      var _embed2 = _interopRequireDefault(_embed);

      var _link = __webpack_require__(27);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var ATTRIBUTES = ['alt', 'height', 'width'];

      var Image = function (_Embed) {
        _inherits(Image, _Embed);

        function Image() {
          _classCallCheck(this, Image);

          return _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).apply(this, arguments));
        }

        _createClass(Image, [{
          key: 'format',
          value: function format(name, value) {
            if (ATTRIBUTES.indexOf(name) > -1) {
              if (value) {
                this.domNode.setAttribute(name, value);
              } else {
                this.domNode.removeAttribute(name);
              }
            } else {
              _get(Image.prototype.__proto__ || Object.getPrototypeOf(Image.prototype), 'format', this).call(this, name, value);
            }
          }
        }], [{
          key: 'create',
          value: function create(value) {
            var node = _get(Image.__proto__ || Object.getPrototypeOf(Image), 'create', this).call(this, value);
            if (typeof value === 'string') {
              node.setAttribute('src', this.sanitize(value));
            }
            return node;
          }
        }, {
          key: 'formats',
          value: function formats(domNode) {
            return ATTRIBUTES.reduce(function (formats, attribute) {
              if (domNode.hasAttribute(attribute)) {
                formats[attribute] = domNode.getAttribute(attribute);
              }
              return formats;
            }, {});
          }
        }, {
          key: 'match',
          value: function match(url) {
            return (/\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url)
            );
          }
        }, {
          key: 'sanitize',
          value: function sanitize(url) {
            return (0, _link.sanitize)(url, ['http', 'https', 'data']) ? url : '//:0';
          }
        }, {
          key: 'value',
          value: function value(domNode) {
            return domNode.getAttribute('src');
          }
        }]);

        return Image;
      }(_embed2.default);

      Image.blotName = 'image';
      Image.tagName = 'IMG';

      exports.default = Image;

      /***/
    },
    /* 67 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.IndentClass = undefined;

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var IdentAttributor = function (_Parchment$Attributor) {
        _inherits(IdentAttributor, _Parchment$Attributor);

        function IdentAttributor() {
          _classCallCheck(this, IdentAttributor);

          return _possibleConstructorReturn(this, (IdentAttributor.__proto__ || Object.getPrototypeOf(IdentAttributor)).apply(this, arguments));
        }

        _createClass(IdentAttributor, [{
          key: 'add',
          value: function add(node, value) {
            if (value === '+1' || value === '-1') {
              var indent = this.value(node) || 0;
              value = value === '+1' ? indent + 1 : indent - 1;
            }
            if (value === 0) {
              this.remove(node);
              return true;
            } else {
              return _get(IdentAttributor.prototype.__proto__ || Object.getPrototypeOf(IdentAttributor.prototype), 'add', this).call(this, node, value);
            }
          }
        }, {
          key: 'canAdd',
          value: function canAdd(node, value) {
            return _get(IdentAttributor.prototype.__proto__ || Object.getPrototypeOf(IdentAttributor.prototype), 'canAdd', this).call(this, node, value) || _get(IdentAttributor.prototype.__proto__ || Object.getPrototypeOf(IdentAttributor.prototype), 'canAdd', this).call(this, node, parseInt(value));
          }
        }, {
          key: 'value',
          value: function value(node) {
            return parseInt(_get(IdentAttributor.prototype.__proto__ || Object.getPrototypeOf(IdentAttributor.prototype), 'value', this).call(this, node)) || undefined; // Don't return NaN
          }
        }]);

        return IdentAttributor;
      }(_parchment2.default.Attributor.Class);

      var IndentClass = new IdentAttributor('indent', 'ql-indent', {
        scope: _parchment2.default.Scope.BLOCK,
        whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
      });

      exports.IndentClass = IndentClass;

      /***/
    },
    /* 68 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _bold = __webpack_require__(45);

      var _bold2 = _interopRequireDefault(_bold);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Italic = function (_Bold) {
        _inherits(Italic, _Bold);

        function Italic() {
          _classCallCheck(this, Italic);

          return _possibleConstructorReturn(this, (Italic.__proto__ || Object.getPrototypeOf(Italic)).apply(this, arguments));
        }

        return Italic;
      }(_bold2.default);

      Italic.blotName = 'italic';
      Italic.tagName = ['EM', 'I'];

      exports.default = Italic;

      /***/
    },
    /* 69 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = exports.ListItem = undefined;

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      var _block = __webpack_require__(4);

      var _block2 = _interopRequireDefault(_block);

      var _container = __webpack_require__(24);

      var _container2 = _interopRequireDefault(_container);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key] = value;
        }return obj;
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var ListItem = function (_Block) {
        _inherits(ListItem, _Block);

        function ListItem() {
          _classCallCheck(this, ListItem);

          return _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
        }

        _createClass(ListItem, [{
          key: 'format',
          value: function format(name, value) {
            if (name === List.blotName && !value) {
              this.replaceWith(_parchment2.default.create(this.statics.scope));
            } else {
              _get(ListItem.prototype.__proto__ || Object.getPrototypeOf(ListItem.prototype), 'format', this).call(this, name, value);
            }
          }
        }, {
          key: 'remove',
          value: function remove() {
            if (this.prev == null && this.next == null) {
              this.parent.remove();
            } else {
              _get(ListItem.prototype.__proto__ || Object.getPrototypeOf(ListItem.prototype), 'remove', this).call(this);
            }
          }
        }, {
          key: 'replaceWith',
          value: function replaceWith(name, value) {
            this.parent.isolate(this.offset(this.parent), this.length());
            if (name === this.parent.statics.blotName) {
              this.parent.replaceWith(name, value);
              return this;
            } else {
              this.parent.unwrap();
              return _get(ListItem.prototype.__proto__ || Object.getPrototypeOf(ListItem.prototype), 'replaceWith', this).call(this, name, value);
            }
          }
        }], [{
          key: 'formats',
          value: function formats(domNode) {
            return domNode.tagName === this.tagName ? undefined : _get(ListItem.__proto__ || Object.getPrototypeOf(ListItem), 'formats', this).call(this, domNode);
          }
        }]);

        return ListItem;
      }(_block2.default);

      ListItem.blotName = 'list-item';
      ListItem.tagName = 'LI';

      var List = function (_Container) {
        _inherits(List, _Container);

        _createClass(List, null, [{
          key: 'create',
          value: function create(value) {
            var tagName = value === 'ordered' ? 'OL' : 'UL';
            var node = _get(List.__proto__ || Object.getPrototypeOf(List), 'create', this).call(this, tagName);
            if (value === 'checked' || value === 'unchecked') {
              node.setAttribute('data-checked', value === 'checked');
            }
            return node;
          }
        }, {
          key: 'formats',
          value: function formats(domNode) {
            if (domNode.tagName === 'OL') return 'ordered';
            if (domNode.tagName === 'UL') {
              if (domNode.hasAttribute('data-checked')) {
                return domNode.getAttribute('data-checked') === 'true' ? 'checked' : 'unchecked';
              } else {
                return 'bullet';
              }
            }
            return undefined;
          }
        }]);

        function List(domNode) {
          _classCallCheck(this, List);

          var _this2 = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, domNode));

          domNode.addEventListener('click', function (e) {
            if (e.target.parentNode !== domNode) return;
            var format = _this2.statics.formats(domNode);
            var blot = _parchment2.default.find(e.target);
            if (format === 'checked') {
              blot.format('list', 'unchecked');
            } else if (format === 'unchecked') {
              blot.format('list', 'checked');
            }
          });
          return _this2;
        }

        _createClass(List, [{
          key: 'format',
          value: function format(name, value) {
            if (this.children.length > 0) {
              this.children.tail.format(name, value);
            }
          }
        }, {
          key: 'formats',
          value: function formats() {
            // We don't inherit from FormatBlot
            return _defineProperty({}, this.statics.blotName, this.statics.formats(this.domNode));
          }
        }, {
          key: 'insertBefore',
          value: function insertBefore(blot, ref) {
            if (blot instanceof ListItem) {
              _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), 'insertBefore', this).call(this, blot, ref);
            } else {
              var index = ref == null ? this.length() : ref.offset(this);
              var after = this.split(index);
              after.parent.insertBefore(blot, after);
            }
          }
        }, {
          key: 'optimize',
          value: function optimize() {
            _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), 'optimize', this).call(this);
            var next = this.next;
            if (next != null && next.prev === this && next.statics.blotName === this.statics.blotName && next.domNode.tagName === this.domNode.tagName && next.domNode.getAttribute('data-checked') === this.domNode.getAttribute('data-checked')) {
              next.moveChildren(this);
              next.remove();
            }
          }
        }, {
          key: 'replace',
          value: function replace(target) {
            if (target.statics.blotName !== this.statics.blotName) {
              var item = _parchment2.default.create(this.statics.defaultChild);
              target.moveChildren(item);
              this.appendChild(item);
            }
            _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), 'replace', this).call(this, target);
          }
        }]);

        return List;
      }(_container2.default);

      List.blotName = 'list';
      List.scope = _parchment2.default.Scope.BLOCK_BLOT;
      List.tagName = ['OL', 'UL'];
      List.defaultChild = 'list-item';
      List.allowedChildren = [ListItem];

      exports.ListItem = ListItem;
      exports.default = List;

      /***/
    },
    /* 70 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _inline = __webpack_require__(8);

      var _inline2 = _interopRequireDefault(_inline);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Script = function (_Inline) {
        _inherits(Script, _Inline);

        function Script() {
          _classCallCheck(this, Script);

          return _possibleConstructorReturn(this, (Script.__proto__ || Object.getPrototypeOf(Script)).apply(this, arguments));
        }

        _createClass(Script, null, [{
          key: 'create',
          value: function create(value) {
            if (value === 'super') {
              return document.createElement('sup');
            } else if (value === 'sub') {
              return document.createElement('sub');
            } else {
              return _get(Script.__proto__ || Object.getPrototypeOf(Script), 'create', this).call(this, value);
            }
          }
        }, {
          key: 'formats',
          value: function formats(domNode) {
            if (domNode.tagName === 'SUB') return 'sub';
            if (domNode.tagName === 'SUP') return 'super';
            return undefined;
          }
        }]);

        return Script;
      }(_inline2.default);

      Script.blotName = 'script';
      Script.tagName = ['SUB', 'SUP'];

      exports.default = Script;

      /***/
    },
    /* 71 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _inline = __webpack_require__(8);

      var _inline2 = _interopRequireDefault(_inline);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Strike = function (_Inline) {
        _inherits(Strike, _Inline);

        function Strike() {
          _classCallCheck(this, Strike);

          return _possibleConstructorReturn(this, (Strike.__proto__ || Object.getPrototypeOf(Strike)).apply(this, arguments));
        }

        return Strike;
      }(_inline2.default);

      Strike.blotName = 'strike';
      Strike.tagName = 'S';

      exports.default = Strike;

      /***/
    },
    /* 72 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _inline = __webpack_require__(8);

      var _inline2 = _interopRequireDefault(_inline);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Underline = function (_Inline) {
        _inherits(Underline, _Inline);

        function Underline() {
          _classCallCheck(this, Underline);

          return _possibleConstructorReturn(this, (Underline.__proto__ || Object.getPrototypeOf(Underline)).apply(this, arguments));
        }

        return Underline;
      }(_inline2.default);

      Underline.blotName = 'underline';
      Underline.tagName = 'U';

      exports.default = Underline;

      /***/
    },
    /* 73 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _block = __webpack_require__(4);

      var _link = __webpack_require__(27);

      var _link2 = _interopRequireDefault(_link);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var ATTRIBUTES = ['height', 'width'];

      var Video = function (_BlockEmbed) {
        _inherits(Video, _BlockEmbed);

        function Video() {
          _classCallCheck(this, Video);

          return _possibleConstructorReturn(this, (Video.__proto__ || Object.getPrototypeOf(Video)).apply(this, arguments));
        }

        _createClass(Video, [{
          key: 'format',
          value: function format(name, value) {
            if (ATTRIBUTES.indexOf(name) > -1) {
              if (value) {
                this.domNode.setAttribute(name, value);
              } else {
                this.domNode.removeAttribute(name);
              }
            } else {
              _get(Video.prototype.__proto__ || Object.getPrototypeOf(Video.prototype), 'format', this).call(this, name, value);
            }
          }
        }], [{
          key: 'create',
          value: function create(value) {
            var node = _get(Video.__proto__ || Object.getPrototypeOf(Video), 'create', this).call(this, value);
            node.setAttribute('frameborder', '0');
            node.setAttribute('allowfullscreen', true);
            node.setAttribute('src', this.sanitize(value));
            return node;
          }
        }, {
          key: 'formats',
          value: function formats(domNode) {
            return ATTRIBUTES.reduce(function (formats, attribute) {
              if (domNode.hasAttribute(attribute)) {
                formats[attribute] = domNode.getAttribute(attribute);
              }
              return formats;
            }, {});
          }
        }, {
          key: 'sanitize',
          value: function sanitize(url) {
            return _link2.default.sanitize(url);
          }
        }, {
          key: 'value',
          value: function value(domNode) {
            return domNode.getAttribute('src');
          }
        }]);

        return Video;
      }(_block.BlockEmbed);

      Video.blotName = 'video';
      Video.className = 'ql-video';
      Video.tagName = 'IFRAME';

      exports.default = Video;

      /***/
    },
    /* 74 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = exports.FormulaBlot = undefined;

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _embed = __webpack_require__(7);

      var _embed2 = _interopRequireDefault(_embed);

      var _quill = __webpack_require__(6);

      var _quill2 = _interopRequireDefault(_quill);

      var _module = __webpack_require__(9);

      var _module2 = _interopRequireDefault(_module);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var FormulaBlot = function (_Embed) {
        _inherits(FormulaBlot, _Embed);

        function FormulaBlot() {
          _classCallCheck(this, FormulaBlot);

          return _possibleConstructorReturn(this, (FormulaBlot.__proto__ || Object.getPrototypeOf(FormulaBlot)).apply(this, arguments));
        }

        _createClass(FormulaBlot, [{
          key: 'index',
          value: function index() {
            return 1;
          }
        }], [{
          key: 'create',
          value: function create(value) {
            var node = _get(FormulaBlot.__proto__ || Object.getPrototypeOf(FormulaBlot), 'create', this).call(this, value);
            if (typeof value === 'string') {
              window.katex.render(value, node);
              node.setAttribute('data-value', value);
            }
            node.setAttribute('contenteditable', false);
            return node;
          }
        }, {
          key: 'value',
          value: function value(domNode) {
            return domNode.getAttribute('data-value');
          }
        }]);

        return FormulaBlot;
      }(_embed2.default);

      FormulaBlot.blotName = 'formula';
      FormulaBlot.className = 'ql-formula';
      FormulaBlot.tagName = 'SPAN';

      var Formula = function (_Module) {
        _inherits(Formula, _Module);

        _createClass(Formula, null, [{
          key: 'register',
          value: function register() {
            _quill2.default.register(FormulaBlot, true);
          }
        }]);

        function Formula() {
          _classCallCheck(this, Formula);

          var _this2 = _possibleConstructorReturn(this, (Formula.__proto__ || Object.getPrototypeOf(Formula)).call(this));

          if (window.katex == null) {
            throw new Error('Formula module requires KaTeX.');
          }
          return _this2;
        }

        return Formula;
      }(_module2.default);

      exports.FormulaBlot = FormulaBlot;
      exports.default = Formula;

      /***/
    },
    /* 75 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = exports.CodeToken = exports.CodeBlock = undefined;

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _parchment = __webpack_require__(0);

      var _parchment2 = _interopRequireDefault(_parchment);

      var _quill = __webpack_require__(6);

      var _quill2 = _interopRequireDefault(_quill);

      var _module = __webpack_require__(9);

      var _module2 = _interopRequireDefault(_module);

      var _code = __webpack_require__(16);

      var _code2 = _interopRequireDefault(_code);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var SyntaxCodeBlock = function (_CodeBlock) {
        _inherits(SyntaxCodeBlock, _CodeBlock);

        function SyntaxCodeBlock() {
          _classCallCheck(this, SyntaxCodeBlock);

          return _possibleConstructorReturn(this, (SyntaxCodeBlock.__proto__ || Object.getPrototypeOf(SyntaxCodeBlock)).apply(this, arguments));
        }

        _createClass(SyntaxCodeBlock, [{
          key: 'replaceWith',
          value: function replaceWith(block) {
            this.domNode.textContent = this.domNode.textContent;
            this.attach();
            _get(SyntaxCodeBlock.prototype.__proto__ || Object.getPrototypeOf(SyntaxCodeBlock.prototype), 'replaceWith', this).call(this, block);
          }
        }, {
          key: 'highlight',
          value: function highlight(_highlight) {
            if (this.cachedHTML !== this.domNode.innerHTML) {
              var text = this.domNode.textContent;
              if (text.trim().length > 0 || this.cachedHTML == null) {
                this.domNode.innerHTML = _highlight(text);
                this.attach();
              }
              this.cachedHTML = this.domNode.innerHTML;
            }
          }
        }]);

        return SyntaxCodeBlock;
      }(_code2.default);

      SyntaxCodeBlock.className = 'ql-syntax';

      var CodeToken = new _parchment2.default.Attributor.Class('token', 'hljs', {
        scope: _parchment2.default.Scope.INLINE
      });

      var Syntax = function (_Module) {
        _inherits(Syntax, _Module);

        _createClass(Syntax, null, [{
          key: 'register',
          value: function register() {
            _quill2.default.register(CodeToken, true);
            _quill2.default.register(SyntaxCodeBlock, true);
          }
        }]);

        function Syntax(quill, options) {
          _classCallCheck(this, Syntax);

          var _this2 = _possibleConstructorReturn(this, (Syntax.__proto__ || Object.getPrototypeOf(Syntax)).call(this, quill, options));

          if (typeof _this2.options.highlight !== 'function') {
            throw new Error('Syntax module requires highlight.js. Please include the library on the page before Quill.');
          }
          var timer = null;
          _this2.quill.on(_quill2.default.events.SCROLL_OPTIMIZE, function () {
            if (timer != null) return;
            timer = setTimeout(function () {
              _this2.highlight();
              timer = null;
            }, 100);
          });
          _this2.highlight();
          return _this2;
        }

        _createClass(Syntax, [{
          key: 'highlight',
          value: function highlight() {
            var _this3 = this;

            if (this.quill.selection.composing) return;
            var range = this.quill.getSelection();
            this.quill.scroll.descendants(SyntaxCodeBlock).forEach(function (code) {
              code.highlight(_this3.options.highlight);
            });
            this.quill.update(_quill2.default.sources.SILENT);
            if (range != null) {
              this.quill.setSelection(range, _quill2.default.sources.SILENT);
            }
          }
        }]);

        return Syntax;
      }(_module2.default);

      Syntax.DEFAULTS = {
        highlight: function () {
          if (window.hljs == null) return null;
          return function (text) {
            var result = window.hljs.highlightAuto(text);
            return result.value;
          };
        }()
      };

      exports.CodeBlock = SyntaxCodeBlock;
      exports.CodeToken = CodeToken;
      exports.default = Syntax;

      /***/
    },
    /* 76 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = exports.BubbleTooltip = undefined;

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;if (getter === undefined) {
            return undefined;
          }return getter.call(receiver);
        }
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _extend = __webpack_require__(3);

      var _extend2 = _interopRequireDefault(_extend);

      var _emitter = __webpack_require__(5);

      var _emitter2 = _interopRequireDefault(_emitter);

      var _base = __webpack_require__(43);

      var _base2 = _interopRequireDefault(_base);

      var _selection = __webpack_require__(15);

      var _icons = __webpack_require__(41);

      var _icons2 = _interopRequireDefault(_icons);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var TOOLBAR_CONFIG = [['bold', 'italic', 'link'], [{ header: 1 }, { header: 2 }, 'blockquote']];

      var BubbleTheme = function (_BaseTheme) {
        _inherits(BubbleTheme, _BaseTheme);

        function BubbleTheme(quill, options) {
          _classCallCheck(this, BubbleTheme);

          if (options.modules.toolbar != null && options.modules.toolbar.container == null) {
            options.modules.toolbar.container = TOOLBAR_CONFIG;
          }

          var _this = _possibleConstructorReturn(this, (BubbleTheme.__proto__ || Object.getPrototypeOf(BubbleTheme)).call(this, quill, options));

          _this.quill.container.classList.add('ql-bubble');
          return _this;
        }

        _createClass(BubbleTheme, [{
          key: 'extendToolbar',
          value: function extendToolbar(toolbar) {
            this.tooltip = new BubbleTooltip(this.quill, this.options.bounds);
            this.tooltip.root.appendChild(toolbar.container);
            this.buildButtons([].slice.call(toolbar.container.querySelectorAll('button')), _icons2.default);
            this.buildPickers([].slice.call(toolbar.container.querySelectorAll('select')), _icons2.default);
          }
        }]);

        return BubbleTheme;
      }(_base2.default);

      BubbleTheme.DEFAULTS = (0, _extend2.default)(true, {}, _base2.default.DEFAULTS, {
        modules: {
          toolbar: {
            handlers: {
              link: function link(value) {
                if (!value) {
                  this.quill.format('link', false);
                } else {
                  this.quill.theme.tooltip.edit();
                }
              }
            }
          }
        }
      });

      var BubbleTooltip = function (_BaseTooltip) {
        _inherits(BubbleTooltip, _BaseTooltip);

        function BubbleTooltip(quill, bounds) {
          _classCallCheck(this, BubbleTooltip);

          var _this2 = _possibleConstructorReturn(this, (BubbleTooltip.__proto__ || Object.getPrototypeOf(BubbleTooltip)).call(this, quill, bounds));

          _this2.quill.on(_emitter2.default.events.EDITOR_CHANGE, function (type, range, oldRange, source) {
            if (type !== _emitter2.default.events.SELECTION_CHANGE) return;
            if (range != null && range.length > 0 && source === _emitter2.default.sources.USER) {
              _this2.show();
              // Lock our width so we will expand beyond our offsetParent boundaries
              _this2.root.style.left = '0px';
              _this2.root.style.width = '';
              _this2.root.style.width = _this2.root.offsetWidth + 'px';
              var lines = _this2.quill.getLines(range.index, range.length);
              if (lines.length === 1) {
                _this2.position(_this2.quill.getBounds(range));
              } else {
                var lastLine = lines[lines.length - 1];
                var index = _this2.quill.getIndex(lastLine);
                var length = Math.min(lastLine.length() - 1, range.index + range.length - index);
                var _bounds = _this2.quill.getBounds(new _selection.Range(index, length));
                _this2.position(_bounds);
              }
            } else if (document.activeElement !== _this2.textbox && _this2.quill.hasFocus()) {
              _this2.hide();
            }
          });
          return _this2;
        }

        _createClass(BubbleTooltip, [{
          key: 'listen',
          value: function listen() {
            var _this3 = this;

            _get(BubbleTooltip.prototype.__proto__ || Object.getPrototypeOf(BubbleTooltip.prototype), 'listen', this).call(this);
            this.root.querySelector('.ql-close').addEventListener('click', function () {
              _this3.root.classList.remove('ql-editing');
            });
            this.quill.on(_emitter2.default.events.SCROLL_OPTIMIZE, function () {
              // Let selection be restored by toolbar handlers before repositioning
              setTimeout(function () {
                if (_this3.root.classList.contains('ql-hidden')) return;
                var range = _this3.quill.getSelection();
                if (range != null) {
                  _this3.position(_this3.quill.getBounds(range));
                }
              }, 1);
            });
          }
        }, {
          key: 'cancel',
          value: function cancel() {
            this.show();
          }
        }, {
          key: 'position',
          value: function position(reference) {
            var shift = _get(BubbleTooltip.prototype.__proto__ || Object.getPrototypeOf(BubbleTooltip.prototype), 'position', this).call(this, reference);
            var arrow = this.root.querySelector('.ql-tooltip-arrow');
            arrow.style.marginLeft = '';
            if (shift === 0) return shift;
            arrow.style.marginLeft = -1 * shift - arrow.offsetWidth / 2 + 'px';
          }
        }]);

        return BubbleTooltip;
      }(_base.BaseTooltip);

      BubbleTooltip.TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', '</div>'].join('');

      exports.BubbleTooltip = BubbleTooltip;
      exports.default = BubbleTheme;

      /***/
    },
    /* 77 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=14 x2=4 y1=14 y2=14></line> <line class=ql-stroke x1=12 x2=6 y1=4 y2=4></line> </svg>";

      /***/
    },
    /* 78 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=3 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=3 y1=4 y2=4></line> </svg>";

      /***/
    },
    /* 79 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=3 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=13 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=9 y1=4 y2=4></line> </svg>";

      /***/
    },
    /* 80 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=5 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=9 y1=4 y2=4></line> </svg>";

      /***/
    },
    /* 81 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <g class=\"ql-fill ql-color-label\"> <polygon points=\"6 6.868 6 6 5 6 5 7 5.942 7 6 6.868\"></polygon> <rect height=1 width=1 x=4 y=4></rect> <polygon points=\"6.817 5 6 5 6 6 6.38 6 6.817 5\"></polygon> <rect height=1 width=1 x=2 y=6></rect> <rect height=1 width=1 x=3 y=5></rect> <rect height=1 width=1 x=4 y=7></rect> <polygon points=\"4 11.439 4 11 3 11 3 12 3.755 12 4 11.439\"></polygon> <rect height=1 width=1 x=2 y=12></rect> <rect height=1 width=1 x=2 y=9></rect> <rect height=1 width=1 x=2 y=15></rect> <polygon points=\"4.63 10 4 10 4 11 4.192 11 4.63 10\"></polygon> <rect height=1 width=1 x=3 y=8></rect> <path d=M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z></path> <path d=M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z></path> <path d=M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z></path> <rect height=1 width=1 x=12 y=2></rect> <rect height=1 width=1 x=11 y=3></rect> <path d=M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z></path> <rect height=1 width=1 x=2 y=3></rect> <rect height=1 width=1 x=6 y=2></rect> <rect height=1 width=1 x=3 y=2></rect> <rect height=1 width=1 x=5 y=3></rect> <rect height=1 width=1 x=9 y=2></rect> <rect height=1 width=1 x=15 y=14></rect> <polygon points=\"13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174\"></polygon> <rect height=1 width=1 x=13 y=7></rect> <rect height=1 width=1 x=15 y=5></rect> <rect height=1 width=1 x=14 y=6></rect> <rect height=1 width=1 x=15 y=8></rect> <rect height=1 width=1 x=14 y=9></rect> <path d=M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z></path> <rect height=1 width=1 x=14 y=3></rect> <polygon points=\"12 6.868 12 6 11.62 6 12 6.868\"></polygon> <rect height=1 width=1 x=15 y=2></rect> <rect height=1 width=1 x=12 y=5></rect> <rect height=1 width=1 x=13 y=4></rect> <polygon points=\"12.933 9 13 9 13 8 12.495 8 12.933 9\"></polygon> <rect height=1 width=1 x=9 y=14></rect> <rect height=1 width=1 x=8 y=15></rect> <path d=M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z></path> <rect height=1 width=1 x=5 y=15></rect> <path d=M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z></path> <rect height=1 width=1 x=11 y=15></rect> <path d=M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z></path> <rect height=1 width=1 x=14 y=15></rect> <rect height=1 width=1 x=15 y=11></rect> </g> <polyline class=ql-stroke points=\"5.5 13 9 5 12.5 13\"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=11 y2=11></line> </svg>";

      /***/
    },
    /* 82 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <rect class=\"ql-fill ql-stroke\" height=3 width=3 x=4 y=5></rect> <rect class=\"ql-fill ql-stroke\" height=3 width=3 x=11 y=5></rect> <path class=\"ql-even ql-fill ql-stroke\" d=M7,8c0,4.031-3,5-3,5></path> <path class=\"ql-even ql-fill ql-stroke\" d=M14,8c0,4.031-3,5-3,5></path> </svg>";

      /***/
    },
    /* 83 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-stroke d=M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z></path> <path class=ql-stroke d=M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z></path> </svg>";

      /***/
    },
    /* 84 */
    /***/function (module, exports) {

      module.exports = "<svg class=\"\" viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=5 x2=13 y1=3 y2=3></line> <line class=ql-stroke x1=6 x2=9.35 y1=12 y2=3></line> <line class=ql-stroke x1=11 x2=15 y1=11 y2=15></line> <line class=ql-stroke x1=15 x2=11 y1=11 y2=15></line> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=7 x=2 y=14></rect> </svg>";

      /***/
    },
    /* 85 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=\"ql-color-label ql-stroke ql-transparent\" x1=3 x2=15 y1=15 y2=15></line> <polyline class=ql-stroke points=\"5.5 11 9 3 12.5 11\"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=9 y2=9></line> </svg>";

      /***/
    },
    /* 86 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <polygon class=\"ql-stroke ql-fill\" points=\"3 11 5 9 3 7 3 11\"></polygon> <line class=\"ql-stroke ql-fill\" x1=15 x2=11 y1=4 y2=4></line> <path class=ql-fill d=M11,3a3,3,0,0,0,0,6h1V3H11Z></path> <rect class=ql-fill height=11 width=1 x=11 y=4></rect> <rect class=ql-fill height=11 width=1 x=13 y=4></rect> </svg>";

      /***/
    },
    /* 87 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <polygon class=\"ql-stroke ql-fill\" points=\"15 12 13 10 15 8 15 12\"></polygon> <line class=\"ql-stroke ql-fill\" x1=9 x2=5 y1=4 y2=4></line> <path class=ql-fill d=M5,3A3,3,0,0,0,5,9H6V3H5Z></path> <rect class=ql-fill height=11 width=1 x=5 y=4></rect> <rect class=ql-fill height=11 width=1 x=7 y=4></rect> </svg>";

      /***/
    },
    /* 88 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <polygon class=ql-stroke points=\"7 11 9 13 11 11 7 11\"></polygon> <polygon class=ql-stroke points=\"7 7 9 5 11 7 7 7\"></polygon> </svg>";

      /***/
    },
    /* 89 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M14,16H4a1,1,0,0,1,0-2H14A1,1,0,0,1,14,16Z /> <path class=ql-fill d=M14,4H4A1,1,0,0,1,4,2H14A1,1,0,0,1,14,4Z /> <rect class=ql-fill x=3 y=6 width=12 height=6 rx=1 ry=1 /> </svg>";

      /***/
    },
    /* 90 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M13,16H5a1,1,0,0,1,0-2h8A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H5A1,1,0,0,1,5,2h8A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=2 y=6 width=14 height=6 rx=1 ry=1 /> </svg>";

      /***/
    },
    /* 91 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M15,8H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,8Z /> <path class=ql-fill d=M15,12H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,12Z /> <path class=ql-fill d=M15,16H5a1,1,0,0,1,0-2H15A1,1,0,0,1,15,16Z /> <path class=ql-fill d=M15,4H5A1,1,0,0,1,5,2H15A1,1,0,0,1,15,4Z /> <rect class=ql-fill x=2 y=6 width=8 height=6 rx=1 ry=1 /> </svg>";

      /***/
    },
    /* 92 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M5,8H3A1,1,0,0,1,3,6H5A1,1,0,0,1,5,8Z /> <path class=ql-fill d=M5,12H3a1,1,0,0,1,0-2H5A1,1,0,0,1,5,12Z /> <path class=ql-fill d=M13,16H3a1,1,0,0,1,0-2H13A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H3A1,1,0,0,1,3,2H13A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=8 y=6 width=8 height=6 rx=1 ry=1 transform=\"translate(24 18) rotate(-180)\"/> </svg>";

      /***/
    },
    /* 93 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z></path> <rect class=ql-fill height=1.6 rx=0.8 ry=0.8 width=5 x=5.15 y=6.2></rect> <path class=ql-fill d=M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z></path> </svg>";

      /***/
    },
    /* 94 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=3 x2=3 y1=4 y2=14></line> <line class=ql-stroke x1=11 x2=11 y1=4 y2=14></line> <line class=ql-stroke x1=11 x2=3 y1=9 y2=9></line> <path class=\"ql-stroke ql-thin\" d=M15.5,14.5h-2c0-.234,1.85-1.076,1.85-2.234a0.959,0.959,0,0,0-1.85-.109></path> </svg>";

      /***/
    },
    /* 95 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=3 x2=3 y1=4 y2=14></line> <line class=ql-stroke x1=11 x2=11 y1=4 y2=14></line> <line class=ql-stroke x1=11 x2=3 y1=9 y2=9></line> <line class=\"ql-stroke ql-thin\" x1=13.5 x2=15.5 y1=14.5 y2=14.5></line> <path class=ql-fill d=M14.5,15a0.5,0.5,0,0,1-.5-0.5V12.085l-0.276.138A0.5,0.5,0,0,1,13.053,12c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,15,11.5v3A0.5,0.5,0,0,1,14.5,15Z></path> </svg>";

      /***/
    },
    /* 96 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <rect class=ql-stroke height=10 width=12 x=3 y=4></rect> <circle class=ql-fill cx=6 cy=7 r=1></circle> <polyline class=\"ql-even ql-fill\" points=\"5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12\"></polyline> </svg>";

      /***/
    },
    /* 97 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=\"ql-fill ql-stroke\" points=\"3 7 3 11 5 9 3 7\"></polyline> </svg>";

      /***/
    },
    /* 98 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=7 x2=13 y1=4 y2=4></line> <line class=ql-stroke x1=5 x2=11 y1=14 y2=14></line> <line class=ql-stroke x1=8 x2=10 y1=14 y2=4></line> </svg>";

      /***/
    },
    /* 99 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=7 x2=11 y1=7 y2=11></line> <path class=\"ql-even ql-stroke\" d=M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z></path> <path class=\"ql-even ql-stroke\" d=M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z></path> </svg>";

      /***/
    },
    /* 100 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=6 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=6 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=6 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=3 y1=4 y2=4></line> <line class=ql-stroke x1=3 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=3 y1=14 y2=14></line> </svg>";

      /***/
    },
    /* 101 */
    /***/function (module, exports) {

      module.exports = "<svg class=\"\" viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=9 x2=15 y1=4 y2=4></line> <polyline class=ql-stroke points=\"3 4 4 5 6 3\"></polyline> <line class=ql-stroke x1=9 x2=15 y1=14 y2=14></line> <polyline class=ql-stroke points=\"3 14 4 15 6 13\"></polyline> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points=\"3 9 4 10 6 8\"></polyline> </svg>";

      /***/
    },
    /* 102 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=7 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=7 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=7 x2=15 y1=14 y2=14></line> <line class=\"ql-stroke ql-thin\" x1=2.5 x2=4.5 y1=5.5 y2=5.5></line> <path class=ql-fill d=M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z></path> <path class=\"ql-stroke ql-thin\" d=M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156></path> <path class=\"ql-stroke ql-thin\" d=M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109></path> </svg>";

      /***/
    },
    /* 103 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points=\"5 7 5 11 3 9 5 7\"></polyline> </svg>";

      /***/
    },
    /* 104 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=\"ql-stroke ql-thin\" x1=15.5 x2=2.5 y1=8.5 y2=9.5></line> <path class=ql-fill d=M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z></path> <path class=ql-fill d=M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z></path> </svg>";

      /***/
    },
    /* 105 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z /> <path class=ql-fill d=M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z /> </svg>";

      /***/
    },
    /* 106 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z /> <path class=ql-fill d=M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z /> </svg>";

      /***/
    },
    /* 107 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-stroke d=M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3></path> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=12 x=3 y=15></rect> </svg>";

      /***/
    },
    /* 108 */
    /***/function (module, exports) {

      module.exports = "<svg viewbox=\"0 0 18 18\"> <rect class=ql-stroke height=12 width=12 x=3 y=3></rect> <rect class=ql-fill height=12 width=1 x=5 y=3></rect> <rect class=ql-fill height=12 width=1 x=12 y=3></rect> <rect class=ql-fill height=2 width=8 x=5 y=8></rect> <rect class=ql-fill height=1 width=3 x=3 y=5></rect> <rect class=ql-fill height=1 width=3 x=3 y=7></rect> <rect class=ql-fill height=1 width=3 x=3 y=10></rect> <rect class=ql-fill height=1 width=3 x=3 y=12></rect> <rect class=ql-fill height=1 width=3 x=12 y=5></rect> <rect class=ql-fill height=1 width=3 x=12 y=7></rect> <rect class=ql-fill height=1 width=3 x=12 y=10></rect> <rect class=ql-fill height=1 width=3 x=12 y=12></rect> </svg>";

      /***/
    },,,,,,,,,,,,,,,,,,,,,,,,,,,,,
    /* 109 */
    /* 110 */
    /* 111 */
    /* 112 */
    /* 113 */
    /* 114 */
    /* 115 */
    /* 116 */
    /* 117 */
    /* 118 */
    /* 119 */
    /* 120 */
    /* 121 */
    /* 122 */
    /* 123 */
    /* 124 */
    /* 125 */
    /* 126 */
    /* 127 */
    /* 128 */
    /* 129 */
    /* 130 */
    /* 131 */
    /* 132 */
    /* 133 */
    /* 134 */
    /* 135 */
    /* 136 */
    /* 137 */
    /***/function (module, exports, __webpack_require__) {

      module.exports = __webpack_require__(62);

      /***/
    }]
    /******/)
  );
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(25).Buffer, __webpack_require__(3)(module)))

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["CursorsModule"] = CursorsModule;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rangefix_rangefix__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rangefix_rangefix___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rangefix_rangefix__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tinycolor2__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tinycolor2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_tinycolor2__);



var DEFAULTS = {
  template: ['<span class="ql-cursor-selections"></span>', '<span class="ql-cursor-caret-container">', '  <span class="ql-cursor-caret"></span>', '</span>', '<div class="ql-cursor-flag">', '  <small class="ql-cursor-name"></small>', '  <span class="ql-cursor-flag-flap"></span>', '</div>'].join(''),
  autoRegisterListener: true,
  hideDelay: 3000,
  hideSpeed: 400
};

function CursorsModule(quill, options) {
  this.quill = quill;
  this._initOptions(options);
  this.cursors = {};
  this.container = this.quill.addContainer('ql-cursors');

  if (this.options.autoRegisterListener) {
    this.registerTextChangeListener();
  }
  window.addEventListener('resize', this.update.bind(this));
}

CursorsModule.prototype.registerTextChangeListener = function () {
  this.quill.on(this.quill.constructor.events.TEXT_CHANGE, this._applyDelta.bind(this));
};

CursorsModule.prototype.clearCursors = function () {
  Object.keys(this.cursors).forEach(this.removeCursor.bind(this));
};

CursorsModule.prototype.moveCursor = function (userId, range) {
  var cursor = this.cursors[userId];
  if (cursor) {
    cursor.range = range;
    cursor.el.classList.remove('hidden');
    this._updateCursor(cursor);
    // TODO Implement cursor hiding timeout like 0.20/benbro?
  }
};

CursorsModule.prototype.removeCursor = function (userId) {
  var cursor = this.cursors[userId];
  if (cursor) cursor.el.parentNode.removeChild(cursor.el);
  delete this.cursors[userId];
};

CursorsModule.prototype.setCursor = function (_ref) {
  var id = _ref.id,
      range = _ref.range,
      name = _ref.name,
      color = _ref.color;

  var userId = id;
  // Init cursor if it doesn't exist
  if (!this.cursors[userId]) {
    this.cursors[userId] = {
      userId: userId,
      color: color,
      range: range,
      el: null,
      selectionEl: null,
      caretEl: null,
      flagEl: null
    };

    // Build and init the remaining cursor elements
    this._buildCursor(userId, name);
  }

  // Move and update cursor
  window.setTimeout(function () {
    this.moveCursor(userId, range);
  }.bind(this));

  return this.cursors[userId];
};

CursorsModule.prototype.shiftCursors = function (index, length) {
  var cursor;

  Object.keys(this.cursors).forEach(function (userId) {
    if ((cursor = this.cursors[userId]) && cursor.range) {
      // If characters we're added or there is no selection
      // advance start/end if it's greater or equal than index
      if (length > 0 || cursor.range.length == 0) {
        this._shiftCursor(userId, index - 1, length);
      } else {
        // Else if characters were removed
        // move start/end back if it's only greater than index
        this._shiftCursor(userId, index, length);
      }
    }
  }, this);
};

CursorsModule.prototype.update = function () {
  Object.keys(this.cursors).map(function (key) {
    this._updateCursor(this.cursors[key]);
  }.bind(this));
};

CursorsModule.prototype._initOptions = function (options) {
  this.options = DEFAULTS;
  this.options.template = options.template || this.options.template;
  this.options.autoRegisterListener = options.autoRegisterListener == false ? options.autoRegisterListener : this.options.autoRegisterListener;
  this.options.hideDelay = options.hideDelay == undefined ? this.options.hideDelay : options.hideDelay;
  this.options.hideSpeed = options.hideSpeed == undefined ? this.options.hideSpeed : options.hideSpeed;
  this.options.cursorFlagsAlwaysOn = options.cursorFlagsAlwaysOn || false;
};

CursorsModule.prototype._applyDelta = function (delta) {
  var index = 0;

  delta.ops.forEach(function (op) {
    var length = 0;

    if (op.insert) {
      length = op.insert.length || 1;
      this.shiftCursors(index, length);
    } else if (op.delete) {
      this.shiftCursors(index, -1 * op.delete);
    } else if (op.retain) {
      // Is this really needed?
      //this.shiftCursors(index, 0);
      length = op.retain;
    }

    index += length;
  }, this);

  this.update();
};

CursorsModule.prototype._buildCursor = function (userId, name) {
  var cursor = this.cursors[userId];
  var el = document.createElement('span');
  var selectionEl;
  var caretEl;
  var flagEl;

  el.classList.add('ql-cursor');
  el.innerHTML = this.options.template;
  selectionEl = el.querySelector('.ql-cursor-selections');
  caretEl = el.querySelector('.ql-cursor-caret-container');
  flagEl = el.querySelector('.ql-cursor-flag');
  if (this.options.cursorFlagsAlwaysOn) {
    flagEl.classList.add('ql-cursor-flag-always-on');
  }

  // Set color
  flagEl.style.backgroundColor = cursor.color;
  caretEl.querySelector('.ql-cursor-caret').style.backgroundColor = cursor.color;

  el.querySelector('.ql-cursor-name').innerText = name;

  // Set flag delay, speed
  flagEl.style.transitionDelay = this.options.hideDelay + 'ms';
  flagEl.style.transitionDuration = this.options.hideSpeed + 'ms';

  this.container.appendChild(el);

  // Set cursor elements
  cursor.el = el;
  cursor.selectionEl = selectionEl;
  cursor.caretEl = caretEl;
  cursor.flagEl = flagEl;
};

CursorsModule.prototype._shiftCursor = function (userId, index, length) {
  var cursor = this.cursors[userId];
  if (cursor.range.index > index) cursor.range.index += length;
};

CursorsModule.prototype._hideCursor = function (userId) {
  var cursor = this.cursors[userId];
  if (cursor) cursor.el.classList.add('hidden');
};

CursorsModule.prototype._updateCursor = function (cursor) {
  if (!cursor || !cursor.range) return;

  var containerRect = this.quill.container.getBoundingClientRect();
  var startLeaf = this.quill.getLeaf(cursor.range.index);
  var endLeaf = this.quill.getLeaf(cursor.range.index + cursor.range.length);
  var range = document.createRange();
  var rects;

  // Sanity check
  if (!startLeaf || !endLeaf || !startLeaf[0] || !endLeaf[0] || startLeaf[1] < 0 || endLeaf[1] < 0 || !startLeaf[0].domNode || !endLeaf[0].domNode) {
    return this._hideCursor(cursor.userId);
  }

  range.setStart(startLeaf[0].domNode, startLeaf[1]);
  range.setEnd(endLeaf[0].domNode, endLeaf[1]);
  rects = __WEBPACK_IMPORTED_MODULE_0_rangefix_rangefix___default.a.getClientRects(range);

  this._updateCaret(cursor, endLeaf);
  this._updateSelection(cursor, rects, containerRect);
};

CursorsModule.prototype._updateCaret = function (cursor, leaf) {
  var rect,
      index = cursor.range.index + cursor.range.length;

  // The only time a valid offset of 0 can occur is when the cursor is positioned
  // before the first character in a line, and it will be the case that the start
  // and end points of the range will be exactly the same... if they are not then
  // a block selection is taking place and we need to offset the character position
  // by -1;
  if (index > 0 && leaf[1] === 0 && cursor.range.index !== cursor.range.index + cursor.range.length) {
    index--;
  }

  rect = this.quill.getBounds(index);

  cursor.caretEl.style.top = rect.top + 'px';
  cursor.caretEl.style.left = rect.left + 'px';
  cursor.caretEl.style.height = rect.height + 'px';

  cursor.flagEl.style.top = rect.top + 'px';
  cursor.flagEl.style.left = rect.left + 'px';
};

CursorsModule.prototype._updateSelection = function (cursor, rects, containerRect) {
  function createSelectionBlock(rect) {
    var selectionBlockEl = document.createElement('span');

    selectionBlockEl.classList.add('ql-cursor-selection-block');
    selectionBlockEl.style.top = rect.top - containerRect.top + 'px';
    selectionBlockEl.style.left = rect.left - containerRect.left + 'px';
    selectionBlockEl.style.width = rect.width + 'px';
    selectionBlockEl.style.height = rect.height + 'px';
    selectionBlockEl.style.backgroundColor = __WEBPACK_IMPORTED_MODULE_1_tinycolor2___default()(cursor.color).setAlpha(0.3).toString();

    return selectionBlockEl;
  }

  // Wipe the slate clean
  cursor.selectionEl.innerHTML = null;

  var index = [];
  var rectIndex;

  [].forEach.call(rects, function (rect) {
    rectIndex = '' + rect.top + rect.left + rect.width + rect.height;

    // Note: Safari throws a rect with length 1 when caret with no selection.
    // A check was addedfor to avoid drawing those carets - they show up on blinking.
    if (!~index.indexOf(rectIndex) && rect.width > 1) {
      index.push(rectIndex);
      cursor.selectionEl.appendChild(createSelectionBlock(rect));
    }
  }, this);
};

// Quill.register('modules/cursors', CursorsModule);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(39);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"insertAt":"top"}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!../node_modules/postcss-loader/lib/index.js??ref--1-3!./editor.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!../node_modules/postcss-loader/lib/index.js??ref--1-3!./editor.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(40);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"insertAt":"top"}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!../../node_modules/postcss-loader/lib/index.js??ref--1-3!./animations.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!../../node_modules/postcss-loader/lib/index.js??ref--1-3!./animations.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(41);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"insertAt":"top"}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!../../node_modules/postcss-loader/lib/index.js??ref--1-3!./badge-styles.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!../../node_modules/postcss-loader/lib/index.js??ref--1-3!./badge-styles.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Editor = (function () {
    function Editor(quill, undisplay, disconnect) {
        this.quill = quill;
        this._undisplay = undisplay;
        this._disconnect = disconnect;
    }
    Editor.prototype.getText = function (index, length) {
        return this.quill.getText(index, length);
    };
    Editor.prototype.getContents = function (index, length) {
        var delta = this.quill.getContents(index, length);
        var contents = delta.ops.map(function (op) {
            var c = {
                text: op.insert,
                attributes: getAttributes(op.attributes)
            };
            return c;
        });
        return contents;
    };
    Editor.prototype.destroy = function () {
        // Remove editor from DOM
        this._undisplay();
        // Disconnect from server
        this._disconnect();
    };
    return Editor;
}());
exports.default = Editor;
var getAttributes = function (quillAttributes) {
    quillAttributes = quillAttributes || {};
    var attributes = {};
    attributes.bold = quillAttributes.bold || false;
    attributes.italic = quillAttributes.italic || false;
    attributes.underline = quillAttributes.underline || false;
    attributes.strikethrough = quillAttributes.strikethrough || false;
    return attributes;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// mirroring the log levels in pusher-platform-js for simplicity, though not all
// options are meaningful
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
    LogLevel[LogLevel["DEBUG"] = 2] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 3] = "INFO";
    LogLevel[LogLevel["WARNING"] = 4] = "WARNING";
    LogLevel[LogLevel["ERROR"] = 5] = "ERROR";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var Logger = (function () {
    function Logger(logLevel) {
        if (logLevel === void 0) { logLevel = 1; }
        this.logLevel = logLevel;
    }
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.apply(console, args);
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.logLevel <= LogLevel.ERROR) {
            console.error.apply(console, args);
        }
    };
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.logLevel <= LogLevel.INFO) {
            console.info.apply(console, args);
        }
    };
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.logLevel <= LogLevel.DEBUG) {
            console.debug.apply(console, args);
        }
    };
    return Logger;
}());
exports.Logger = Logger;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * This module specialises the generic Logoot model to be one which indexes
 * the text in a document.
 *
 * Each Logoot "Atom" represents a range of text
 * from the document, stored as the length of the range. The index within
 * the document for a particular atom can be found by summing the values
 * of all previous atoms.
 *
 * The document is manipulated via insert and delete methods, whose
 * parameters are expressed in the text document domain. In addition to
 * mutating the Logoot representation as requested, these methods return
 * lists of Operations expressed in the Logoot domain, which, if passed
 * to the applyOps method of another instance, will recreate the same
 * changes which were made here.
 *
 * Similarly, apply methods return a list of operations in the text document
 * domain which can be applied to a rendered view of the document when
 * applying operations from remotely.
 *
 * In summary:
 * - Changes to the text which this LogootDoc represents (i.e. interactively
 *   in an editor) are applied using insert/delete methods.
 * - insert/delete methods return Operations which can be transmitted to
 *   remote instances.
 * - Apply methods return a set of changes to the text which arose from the
 *   remote Operations.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var logoot_1 = __webpack_require__(10);
var logoot_2 = __webpack_require__(10);
var logootFormat = __webpack_require__(9);
var editorFormat = __webpack_require__(8);
var LogootDoc = (function (_super) {
    __extends(LogootDoc, _super);
    function LogootDoc(siteId) {
        return _super.call(this, siteId) || this;
    }
    /**
     * Alter the model to accommodate inserted content
     * @param {number} index - the insertion index
     * @param {string} content - the new content being inserted
     *
     * @return {logootFormat.DocOp[]} - a description of the required operations
     *   suitable for transmitting to a remote replica of the doc,
     *   such that they might apply the same insertion.
     */
    LogootDoc.prototype.insertText = function (index, content, attributes) {
        var atoms = this._insertText(index, content);
        var ops = atoms.map(function (atom) {
            return {
                opType: logootFormat.OpType.Insert,
                ident: atom.ident.toWire(),
                content: { text: atom.rune, attributes: attributes }
            };
        });
        return ops;
    };
    /**
     * Alter the model to accommodate deleted content
     * @param {number} index - the start index of the removed content
     * @param {string} length - the length of the content removed
     *
     * @return {logootFormat.DocOp[]} - a description of the required operations
     *   suitable for transmitting to a remote replica of the doc,
     *   such that they might apply the same removal.
     */
    LogootDoc.prototype.deleteText = function (index, length) {
        var ops = [];
        var atoms = this.getAtomsToDelete(index, length);
        for (var i = 0; i < length; i++) {
            var deleteOp = {
                opType: logootFormat.OpType.Delete,
                ident: atoms[i].ident.toWire()
            };
            this.applyDeletes([deleteOp]);
            ops.push(deleteOp);
        }
        return ops;
    };
    /**
     * Convert an AtomIdent to a character index
     * @param {AtomIdent} atomIdent - an atomIdent
     *
     * @return {number} - a character index
     */
    LogootDoc.prototype.atomIdentToIndex = function (atomIdent) {
        for (var i = 0; i < this.seq.length; i++) {
            var currentAtom = this.seq[i];
            var isNextIdent = currentAtom.ident.compare(atomIdent) != -1;
            if (isNextIdent) {
                return i - 1;
            }
        }
        throw new Error("Out of range: " + JSON.stringify(atomIdent));
    };
    /**
     * Convert an array of WireIdents to a character index
     * @param {WireIdent[]} wireIdents - array of wire idents
     * @param {number} siteId - the site id from which the wireIdents originate
     *
     * @return {number} - a character index
     */
    LogootDoc.prototype.wireIdentsToIndex = function (wireIdents, siteId) {
        // WireIdent[] --> Position
        var position = logoot_2.Position.fromWire(wireIdents);
        // Position --> AtomIdent
        var atomIdent = new logoot_2.AtomIdent(position, 0);
        // AtomIdent --> number
        var index = this.atomIdentToIndex(atomIdent);
        return index;
    };
    /**
     * Generate a new position at a given character index
     * @param {number} charIndex - the index at which to generate the new
     *    position
     *
     * @return {WireIdent[]} - A unique position in the document
     */
    LogootDoc.prototype.newPositionAtIndex = function (charIndex) {
        if (charIndex > this.docLength - 1) {
            throw new Error("Index out of range: " + charIndex);
        }
        var _a = this.getSurroundingAtoms(charIndex), atomBefore = _a[0], atomAfter = _a[1];
        var atomIdent = logoot_2.AtomIdent.between(atomBefore.ident, atomAfter.ident, 0, 0);
        return atomIdent.toWire().position;
    };
    /**
     * Applies a set of insert operations to the document model
     * @param {logootFormat.DocOp[]} ops - The operations to apply
     *
     * @return {editorFormat.DocOp[]} - An array of editor operations that will apply
     *   the changes described in the insert operations.
     */
    LogootDoc.prototype.applyInserts = function (ops) {
        var atomsToInsert = ops.map(function (op) { return logoot_2.Atom.fromWire(op.ident, op.content); });
        var indices = this.insertAtoms(atomsToInsert);
        var editorOps = [];
        for (var i = 0; i < indices.length; i++) {
            var op = ops[i];
            var runeIndex = indices[i];
            if (runeIndex === -1) {
                continue;
            }
            var editorOp = {
                opType: editorFormat.OpType.Insert,
                index: runeIndex,
                text: op.content.text
            };
            if (op.content.attributes) {
                editorOp['attributes'] = op.content.attributes;
            }
            editorOps.push(editorOp);
        }
        editorOps.sort(function (a, b) { return a.index - b.index; });
        return editorOps;
    };
    /**
     * Applies a set of delete operations to the document model
     * @param {logootFormat.DocOp[]} ops - The operations to apply
     *
     * @return {editorFormat.DocOp[]} - An array of editor operations that will apply
     *   the changes described in the delete operations.
     */
    LogootDoc.prototype.applyDeletes = function (ops) {
        var identsToDelete = ops.map(function (op) { return logoot_2.AtomIdent.fromWire(op.ident); });
        var indices = this.deleteAtoms(identsToDelete);
        var editorOps = [];
        for (var i = 0; i < indices.length; i++) {
            var runeIndex = indices[i];
            var editorOp = {
                opType: editorFormat.OpType.Delete,
                index: runeIndex
            };
            editorOps.push(editorOp);
        }
        editorOps.sort(function (a, b) { return a.index - b.index; });
        return editorOps;
    };
    /**
     * Applies operations to the document model
     * @param {logootFormat.DocOp[]} ops - The operations to apply
     *
     * @return {editorFormat.DocOp[]} - An array of editor operations that will apply
     *   the changes described.
     */
    LogootDoc.prototype.updateDoc = function (ops) {
        var editorOps = [];
        // Batch the operations for performance reasons.
        var insertOps = ops.filter(function (op) { return op.opType === logootFormat.OpType.Insert; });
        editorOps = editorOps.concat(this.applyInserts(insertOps));
        var deleteOps = ops.filter(function (op) { return op.opType === logootFormat.OpType.Delete; });
        editorOps = editorOps.concat(this.applyDeletes(deleteOps));
        return editorOps;
    };
    LogootDoc.prototype.toEditorCursorOps = function (ops, offset) {
        var _this = this;
        if (offset === void 0) { offset = 0; }
        var editorOps = [];
        return ops.map(function (cursorOp) {
            var startIndex = null;
            var length = 0;
            if (cursorOp.position !== null) {
                startIndex =
                    _this.wireIdentsToIndex(cursorOp.position.start, 0) + offset;
                var endIndex = cursorOp.position.end
                    ? _this.wireIdentsToIndex(cursorOp.position.end, 0)
                    : startIndex;
                length = endIndex - startIndex;
            }
            return {
                id: cursorOp.siteId,
                range: {
                    index: startIndex,
                    length: length
                },
                name: null,
                color: null
            };
        });
    };
    return LogootDoc;
}(logoot_1.default));
exports.default = LogootDoc;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Binding between the textsync document model and that of Quilljs
 */
Object.defineProperty(exports, "__esModule", { value: true });
var editorFormat = __webpack_require__(8);
var notifications = __webpack_require__(2);
__webpack_require__(43);
var Delta = __webpack_require__(32);
var runes = __webpack_require__(6);
var QuillAdaptor = (function () {
    function QuillAdaptor(quill, textsync, docId, notifier, logger) {
        this.siteId = Math.floor(Math.random() * Math.pow(2, 32));
        this.docId = docId;
        this.logger = logger;
        this.quill = quill;
        this.textsync = textsync;
        this.cursorModule = quill.getModule('cursors');
        this.notifier = notifier;
        // The "empty" Quill document is a single newline. It can't be removed, so we need
        // to initialise the textsync document with it.
        this.textsync.initialContent('\n');
        this.quill.setText('');
        this.quill.on('text-change', this.editorChange.bind(this));
        this.quill.on('selection-change', this.selectionChange.bind(this));
    }
    QuillAdaptor.prototype.applyOperations = function (operations) {
        var deltas = makeDeltas(operations);
        for (var _i = 0, deltas_1 = deltas; _i < deltas_1.length; _i++) {
            var delta = deltas_1[_i];
            this.quill.updateContents(delta, 'silent');
        }
    };
    QuillAdaptor.prototype.setCursor = function (cursorOp) {
        this.cursorModule.setCursor(cursorOp);
    };
    QuillAdaptor.prototype.removeCursor = function (siteId) {
        this.cursorModule.removeCursor(siteId);
    };
    QuillAdaptor.prototype.disable = function () {
        this.quill.disable();
    };
    QuillAdaptor.prototype.displayError = function (error) {
        this.logger.error(error);
    };
    QuillAdaptor.prototype.selectionChange = function (range, oldRange, source) {
        this.logger.debug('selection change');
        if (range) {
            this.logger.debug('range == ', range, source);
            var start = range.index;
            var end = range.length > 0 ? start + range.length : null;
            this.textsync.updateCursor(start, end);
        }
        else {
            this.logger.debug(this.siteId + " has defocussed");
            this.textsync.updateCursor(null);
        }
    };
    QuillAdaptor.prototype.editorChange = function (delta, oldDelta, source) {
        // This is a temporary ban of emoji until we have full support.
        // If you are reading this after 01/11/17 strike up a conversation
        // about why we haven't fixed emoji yet! - Jonathan Lloyd
        var shouldRejectChange = false;
        for (var _i = 0, _a = delta.ops; _i < _a.length; _i++) {
            var deltaOp = _a[_i];
            if (deltaOp.insert) {
                var containsBadRune = runes(deltaOp.insert).reduce(function (acc, val) {
                    var seenBadRune = acc;
                    var isBadRune = val.length > 1;
                    return seenBadRune || isBadRune;
                }, false);
                if (containsBadRune) {
                    shouldRejectChange = true;
                    break;
                }
            }
        }
        if (shouldRejectChange) {
            this.quill.setContents(oldDelta, 'silent');
            this.notifier.notify("Sadly we can't handle emoji at the moment. We're working on it!", notifications.NotificationType.Warning);
            return;
        }
        this.logger.debug('text change', delta, oldDelta);
        // The character index which the delta operation we are currently processing
        var changeIndex = 0;
        // The difference we need to apply when indexing in to the oldDelta by character, because
        // we have deleted characters from the document which still exist in the oldDelta.
        var oldDeltaChangeOffset = 0;
        this.logger.debug('received event from editor:', JSON.stringify(delta));
        for (var _b = 0, _c = delta.ops; _b < _c.length; _b++) {
            var deltaOp = _c[_b];
            if (deltaOp.hasOwnProperty('retain')) {
                // "retain" ops may carry an "attributes" field to indicate that the text has not
                // changed, but the attributes have.
                if (deltaOp.hasOwnProperty('attributes')) {
                    // If the attributes have changed for a portion of text, we may have to handle
                    // this as multiple changes, because the previous attributes of the text might
                    // not be consistent for the whole span we are trying to merge a new attribute
                    // in to.
                    // We look at the previous delta (which represents the entire document before
                    // this changeset) in order to merge the new attribute set in to each
                    // different combination of attributes that previous applied.
                    var oldDeltaIndex = changeIndex + oldDeltaChangeOffset;
                    var affectedDelta = oldDelta.slice(oldDeltaIndex, oldDeltaIndex + deltaOp.retain);
                    for (var _d = 0, _e = affectedDelta.ops; _d < _e.length; _d++) {
                        var affectedOp = _e[_d];
                        var mergedAttrs = Object.assign({}, affectedOp.attributes, deltaOp.attributes);
                        var wireAttrs = QuillAttributes.toWireAttributes(mergedAttrs);
                        if (changeIndex == this.quill.getLength() - 1) {
                            this.quill.formatText(changeIndex, 1, { header: false, list: false }, 'silent'); // fishy. formatting could be any block level, not just header
                            this.quill.insertText(changeIndex, '\n', mergedAttrs, 'silent');
                            this.textsync.insertText(changeIndex, affectedOp.insert, wireAttrs);
                        }
                        else {
                            this.textsync.deleteText(changeIndex, affectedOp.insert.length);
                            this.textsync.insertText(changeIndex, affectedOp.insert, wireAttrs);
                        }
                        changeIndex += affectedOp.insert.length;
                    }
                }
                else {
                    changeIndex += deltaOp.retain;
                }
            }
            else if (deltaOp.hasOwnProperty('insert')) {
                this.textsync.insertText(changeIndex, deltaOp.insert, QuillAttributes.toWireAttributes(deltaOp.attributes));
                changeIndex += deltaOp.insert.length;
            }
            else if (deltaOp.hasOwnProperty('delete')) {
                this.textsync.deleteText(changeIndex, deltaOp.delete);
                oldDeltaChangeOffset += deltaOp.delete;
            }
        }
    };
    return QuillAdaptor;
}());
exports.default = QuillAdaptor;
var QuillAttributes = (function () {
    function QuillAttributes() {
        this.bold = false;
        this.italic = false;
        this.underline = false;
        this.strike = false;
        this.header = false;
        this.link = undefined;
        this.size = undefined;
        this.color = undefined;
        this.background = undefined;
        this.list = undefined;
    }
    QuillAttributes.fromWireAttributes = function (wireAttrs) {
        var quillAttrs = new QuillAttributes();
        quillAttrs.bold = wireAttrs.bold || false;
        quillAttrs.italic = wireAttrs.italic || false;
        quillAttrs.underline = wireAttrs.underline || false;
        quillAttrs.strike = wireAttrs.strikethrough || false;
        quillAttrs.link = wireAttrs.hyperlink || '';
        quillAttrs.header = wireAttrs.header || false;
        quillAttrs.size = wireAttrs.size || '';
        quillAttrs.color = wireAttrs.color || '';
        quillAttrs.background = wireAttrs.background || '';
        quillAttrs.list = QuillAttributes.listFromWireAttributes(wireAttrs.list);
        return quillAttrs;
    };
    QuillAttributes.fromDeltaAttributes = function (attrs) {
        var quillAttrs = new QuillAttributes();
        if (attrs) {
            quillAttrs.bold = attrs.bold || false;
            quillAttrs.italic = attrs.italic || false;
            quillAttrs.underline = attrs.underline || false;
            quillAttrs.strike = attrs.strike || false;
            quillAttrs.link = attrs.link || '';
            quillAttrs.header = attrs.link || false;
            quillAttrs.size = attrs.size || '';
            quillAttrs.color = attrs.color || '';
            quillAttrs.background = attrs.background || '';
            quillAttrs.list = attrs.list || '';
        }
        return quillAttrs;
    };
    QuillAttributes.toWireAttributes = function (quillAttrs) {
        var attrs = {};
        if (quillAttrs) {
            if (quillAttrs.bold)
                attrs.bold = true;
            if (quillAttrs.italic)
                attrs.italic = true;
            if (quillAttrs.underline)
                attrs.underline = true;
            if (quillAttrs.strike)
                attrs.strikethrough = true;
            if (quillAttrs.link)
                attrs.hyperlink = quillAttrs.link;
            if (quillAttrs.header)
                attrs.header = quillAttrs.header;
            if (quillAttrs.size)
                attrs.size = quillAttrs.size;
            if (quillAttrs.color)
                attrs.color = quillAttrs.color;
            if (quillAttrs.background)
                attrs.background = quillAttrs.background;
            if (quillAttrs.list)
                attrs.list = QuillAttributes.listFromDeltaType(quillAttrs.list);
        }
        return attrs;
    };
    QuillAttributes.listFromDeltaType = function (deltaList) {
        if (deltaList == 'bullet') {
            return 1;
        }
        else if (deltaList == 'ordered') {
            return 2;
        }
        else {
            return undefined;
        }
    };
    QuillAttributes.listFromWireAttributes = function (e) {
        if (e == 1) {
            return 'bullet';
        }
        else if (e == 2) {
            return 'ordered';
        }
        else {
            return undefined;
        }
    };
    return QuillAttributes;
}());
exports.QuillAttributes = QuillAttributes;
function makeDeltas(docOps) {
    var deltas = [];
    var insertBuffer = '';
    for (var i = 0; i < docOps.length; i++) {
        var delta = new Delta();
        var docOp = docOps[i];
        var nextDocOp = docOps[i + 1] || null;
        var runesToRetain = void 0;
        switch (docOp.opType) {
            case editorFormat.OpType.Insert:
                var canSquashIntoNextOp = nextDocOp !== null &&
                    nextDocOp.opType === editorFormat.OpType.Insert &&
                    JSON.stringify(nextDocOp.attributes) ===
                        JSON.stringify(docOp.attributes) &&
                    nextDocOp.index === docOp.index + 1;
                if (canSquashIntoNextOp) {
                    insertBuffer += docOp.text;
                }
                else {
                    // Retain
                    runesToRetain = docOp.index - insertBuffer.length;
                    delta.retain(runesToRetain);
                    // Insert
                    var attrs = docOp.attributes || {};
                    delta.insert(insertBuffer + docOp.text, QuillAttributes.fromWireAttributes(attrs));
                    insertBuffer = '';
                    deltas.push(delta);
                }
                break;
            case editorFormat.OpType.Delete:
                runesToRetain = docOp.index;
                delta.retain(runesToRetain);
                delta.delete(1);
                deltas.push(delta);
                break;
        }
    }
    return deltas;
}
exports.makeDeltas = makeDeltas;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Uses the textsync service to synchronise LogootDoc instances
 */
Object.defineProperty(exports, "__esModule", { value: true });
var wireFormat = __webpack_require__(50);
var model_1 = __webpack_require__(48);
var controller_1 = __webpack_require__(46);
var notifications = __webpack_require__(2);
var name_generator_1 = __webpack_require__(49);
var MIN_BROADCAST_PERIOD_MS = 1;
var MAX_BROADCAST_PERIOD_MS = 10000;
var BROADCAST_BACKOFF = 1.2;
var TextSync = (function () {
    function TextSync(logoot, pusher, docId, siteId, options, presenceElement, notifier, logger) {
        this.logoot = logoot;
        this.pusher = pusher;
        this.docId = docId;
        this.siteId = siteId;
        this.options = options;
        this.presenceElement = presenceElement;
        this.outstandingOps = [];
        this.broadcastPeriod = MIN_BROADCAST_PERIOD_MS;
        this.running = true;
        this.defaultText = options.defaultText;
        this.logger = logger;
        this.notifier = notifier;
        this.broadcastOps();
        // Remove when we have JWT
        this.name = this.options.name || name_generator_1.createAnonName();
        this.email = this.options.email;
    }
    TextSync.prototype.insertText = function (index, content, attributes) {
        this.sendOps(this.logoot.insertText(index, content, attributes));
    };
    TextSync.prototype.deleteText = function (index, length) {
        this.sendOps(this.logoot.deleteText(index, length));
    };
    TextSync.prototype.updateCursor = function (start, end) {
        if (end === void 0) { end = null; }
        var position = null;
        if (start !== null) {
            position = {
                start: this.logoot.newPositionAtIndex(start)
            };
            if (end !== null) {
                position.end = this.logoot.newPositionAtIndex(end);
            }
        }
        this.sendOps([
            {
                siteId: this.siteId,
                position: position
            }
        ]);
    };
    TextSync.prototype.start = function (adaptor) {
        var _this = this;
        this.adaptor = adaptor;
        var presenceConfig = {
            showBadges: this.options.collaboratorBadges,
            showCursors: this.options.cursors,
            onJoined: this.options.onCollaboratorsJoined,
            onLeft: this.options.onCollaboratorsLeft
        };
        this.initPresence(presenceConfig, this.presenceElement);
        return this.initDocument().then(function (res) {
            _this.logger.info('Received initial document state...');
            _this.logger.debug('Initial document state:', res);
            var initialState = JSON.parse(res);
            var docOps = initialState.docOps;
            if (docOps && docOps.length > 0) {
                _this.receiveDocOps(docOps);
            }
            var presOps = initialState.presOps;
            if (presOps && presOps.length) {
                _this.presenceModel.receivePresOps(presOps);
            }
            var subscribeFromId = initialState.lastSafeMessageId;
            _this.subscribe(_this.name, _this.email, subscribeFromId);
        });
    };
    TextSync.prototype.initPresence = function (presenceConfig, presenceElement) {
        var presenceController = new controller_1.default(this.siteId, presenceConfig, presenceElement, this.logger);
        this.presenceModel = new model_1.default(this.siteId, this.adaptor, this.logoot, presenceController, presenceConfig, this.logger);
    };
    TextSync.prototype.initDocument = function () {
        var _this = this;
        var path = "/docs/" + this.docId;
        if (this.defaultText) {
            path += "?defaultText=" + encodeURIComponent(this.defaultText);
        }
        return this.pusher
            .request({
            method: 'GET',
            path: path
        })
            .catch(function (err) {
            _this.logger.error('Unable to initialise document', err);
        });
    };
    TextSync.prototype.subscribe = function (name, email, subscribeFromId) {
        var _this = this;
        this.logger.info("Initialising subscription from " + subscribeFromId);
        var path = "/docs/" + this.docId + "/simple-subscribe?siteId=" + this.siteId;
        // Remove when we have JWT
        var encodedName = encodeURIComponent(name);
        path += "&name=" + encodedName;
        if (email) {
            var encodedEmail = encodeURIComponent(email);
            path += "&email=" + encodedEmail;
        }
        this.subscription = this.pusher.subscribeResuming({
            path: path,
            initialEventId: subscribeFromId,
            listeners: {
                onEvent: function (event) {
                    _this.logger.info('event received from server:', JSON.stringify(event.body));
                    if (event.body.siteId !== _this.siteId) {
                        var docOps = Object.assign([], event.body.docOps);
                        var cursorOps = Object.assign([], event.body.cursorOps);
                        var presOps = Object.assign([], event.body.presOps);
                        if (presOps.length > 0) {
                            _this.presenceModel.receivePresOps(presOps);
                        }
                        if (docOps.length > 0) {
                            var message = {
                                siteId: event.body.siteId,
                                docOps: docOps
                            };
                            _this.presenceModel.receiveDocOps(message);
                            _this.receiveDocOps(docOps);
                        }
                        else if (cursorOps && cursorOps.length > 0) {
                            // when someone clicks to a new position
                            _this.logger.debug(event.body.siteId + " has clicked.");
                            _this.receiveCursorOps(cursorOps);
                        }
                    }
                },
                onOpen: function () {
                    _this.logger.info('subscription opened successfully');
                },
                onEnd: function () {
                    _this.logger.info('subscription terminated by server');
                },
                onError: function (error) {
                    if (error.statusCode === 403) {
                        _this.logger.error('Authentication error: Invalid TextSync instance ID. ' +
                            'Double check your instance ID or ask a Pusherino for a new one.');
                        _this.adaptor.disable();
                        return;
                    }
                    _this.logger.error('subscription closed due to error', error);
                    _this.notifier.notify('Whoops! Something went wrong. Please refresh the page to reconnect.', notifications.NotificationType.Error, true);
                    _this.adaptor.disable();
                }
            }
        });
    };
    TextSync.prototype.disconnect = function () {
        this.subscription.unsubscribe();
    };
    TextSync.prototype.initialContent = function (content) {
        this.logoot.initialContent(content);
    };
    TextSync.prototype.sendOps = function (ops) {
        this.outstandingOps = this.outstandingOps.concat(ops);
    };
    TextSync.prototype.broadcastOps = function () {
        var _this = this;
        if (!this.running) {
            return;
        }
        if (this.outstandingOps.length > 0) {
            var opsToBroadcast_1 = this.outstandingOps;
            this.outstandingOps = [];
            var body = wireFormat.messageFromOps(opsToBroadcast_1, this.siteId);
            this.logger.debug('Broadcasting operations to server:', JSON.stringify(body));
            this.pusher
                .request({
                method: 'POST',
                path: "/docs/" + this.docId,
                body: body
            })
                .then(function () {
                _this.broadcastPeriod = MIN_BROADCAST_PERIOD_MS;
            })
                .catch(function (error) {
                var statusCode = error.statusCode;
                var isClientError = statusCode && 400 <= statusCode && statusCode < 500;
                if (isClientError) {
                    _this.running = false;
                }
                _this.logger.error(error);
                _this.outstandingOps = _this.outstandingOps.concat(opsToBroadcast_1);
                var newBroadcastPeriod = _this.broadcastPeriod * BROADCAST_BACKOFF;
                if (newBroadcastPeriod < MAX_BROADCAST_PERIOD_MS) {
                    _this.broadcastPeriod = newBroadcastPeriod;
                }
            });
        }
        setTimeout(function () {
            _this.broadcastOps();
        }, this.broadcastPeriod);
    };
    TextSync.prototype.receiveDocOps = function (docOps) {
        var editorDocOps = this.logoot.updateDoc(docOps);
        this.adaptor.applyOperations(editorDocOps);
    };
    TextSync.prototype.receiveCursorOps = function (cursorOps) {
        var editorCursorOps = this.logoot.toEditorCursorOps(cursorOps);
        this.presenceModel.receiveCursorOps(editorCursorOps);
    };
    return TextSync;
}());
exports.TextSync = TextSync;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.deepClone = function (obj) {
    var objType = typeof obj;
    if (objType !== 'object') {
        throw new Error("Attempting to deep clone " + objType);
    }
    var newObj = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
        if (typeof obj[key] === 'object') {
            newObj[key] = exports.deepClone(obj[key]);
        }
        else {
            newObj[key] = obj[key];
        }
    }
    return newObj;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OPTION_DEFAULTS = {
    required: ['element', 'docId'],
    optional: {
        collaboratorBadges: true,
        cursors: true,
        cursorLabelsAlwaysOn: false,
        onCollaboratorsJoined: null,
        onCollaboratorsLeft: null,
        onError: null,
        errorNotifications: true,
        richText: true,
        name: null,
        email: null
    }
};
function validateOptions(userOptions, defaults) {
    if (defaults === void 0) { defaults = OPTION_DEFAULTS; }
    var validatedOptions = {};
    for (var _i = 0, _a = defaults.required; _i < _a.length; _i++) {
        var key = _a[_i];
        if (!userOptions[key]) {
            throw new Error("Property `" + key + "` must be present when initialising TextSync");
        }
        if (key === 'docId') {
            var docId = userOptions[key];
            var validDocId = new RegExp(/^[A-Za-z0-9-]{1,32}$/);
            if (!validDocId.test(docId)) {
                throw new Error("Invalid `docId`: a valid `docId` must be no longer than 32 characters, and only contain A-Z, a-z, 0-9 and '-' (hyphen).");
            }
            validatedOptions[key] = userOptions[key];
        }
        if (key === 'element') {
            var element = userOptions[key];
            var containerElement = void 0;
            if (element instanceof HTMLElement) {
                containerElement = element;
            }
            else if (document.querySelector(element)) {
                containerElement = document.querySelector(element);
            }
            else {
                throw new Error("Could not find element " + element + " in DOM.\nValue of `element` should be a valid CSS selector or HTML element.");
            }
            validatedOptions[key] = containerElement;
        }
    }
    for (var key in defaults.optional) {
        switch (key) {
            case 'name':
                validatedOptions.name =
                    userOptions[key] || userOptions.userName || userOptions.username;
                if (!validatedOptions.name) {
                    validatedOptions.name = defaults.optional[key];
                }
                break;
            case 'email':
                validatedOptions.email = userOptions[key] || userOptions.userEmail;
                if (!validatedOptions.email) {
                    validatedOptions.email = defaults.optional[key];
                }
                break;
            case 'richText':
                if (userOptions.hasOwnProperty('richtext')) {
                    userOptions.richText = userOptions.richtext;
                }
                if (userOptions.hasOwnProperty(key)) {
                    validatedOptions.richText = userOptions[key];
                }
                else {
                    validatedOptions.richText = defaults.optional[key];
                }
                break;
            case 'onCollaboratorsJoined':
            case 'onCollaboratorsLeft':
            case 'onError':
                if (userOptions.hasOwnProperty(key)) {
                    if (typeof userOptions[key] !== 'function') {
                        throw new Error("`" + key + "` must be a function.");
                    }
                }
            default:
                if (userOptions.hasOwnProperty(key)) {
                    validatedOptions[key] = userOptions[key];
                }
                else {
                    validatedOptions[key] = defaults.optional[key];
                }
        }
    }
    return validatedOptions;
}
exports.default = validateOptions;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}

revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function placeHoldersCount(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;
}

function byteLength(b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64);
}

function toByteArray(b64) {
  var i, l, tmp, placeHolders, arr;
  var len = b64.length;
  placeHolders = placeHoldersCount(b64);

  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0; i < l; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = tmp >> 16 & 0xFF;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
    output.push(tripletToBase64(tmp));
  }
  return output.join('');
}

function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[tmp << 4 & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup[tmp >> 10];
    output += lookup[tmp >> 4 & 0x3F];
    output += lookup[tmp << 2 & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('');
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(24);
var ieee754 = __webpack_require__(30);
var isArray = __webpack_require__(26);

exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength();

function typedArraySupport() {
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function foo() {
        return 42;
      } };
    return arr.foo() === 42 && // typed array instances can be augmented
    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
  } catch (e) {
    return false;
  }
}

function kMaxLength() {
  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
}

function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length');
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }

  return that;
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer(arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length);
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error('If encoding is specified then the first argument must be a string');
    }
    return allocUnsafe(this, arg);
  }
  return from(this, arg, encodingOrOffset, length);
}

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr;
};

function from(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset);
  }

  return fromObject(that, value);
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length);
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    });
  }
}

function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}

function alloc(that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size);
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
  }
  return createBuffer(that, size);
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding);
};

function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that;
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size);
};

function fromString(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that;
}

function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that;
}

function fromObject(that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that;
    }

    obj.copy(that, 0, 0, len);
    return that;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }
      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function checked(length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
  }
  return length | 0;
}

function SlowBuffer(length) {
  if (+length != length) {
    // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length);
}

Buffer.isBuffer = function isBuffer(b) {
  return !!(b != null && b._isBuffer);
};

Buffer.compare = function compare(a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers');
  }

  if (a === b) return 0;

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

Buffer.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;
    default:
      return false;
  }
};

Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return Buffer.alloc(0);
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
};

function byteLength(string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0;

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length;
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;
      case 'hex':
        return len >>> 1;
      case 'base64':
        return base64ToBytes(string).length;
      default:
        if (loweredCase) return utf8ToBytes(string).length; // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString(encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return '';
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return '';
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return '';
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);

      case 'ascii':
        return asciiSlice(this, start, end);

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);

      case 'base64':
        return base64Slice(this, start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16() {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this;
};

Buffer.prototype.swap32 = function swap32() {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this;
};

Buffer.prototype.swap64 = function swap64() {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this;
};

Buffer.prototype.toString = function toString() {
  var length = this.length | 0;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};

Buffer.prototype.equals = function equals(b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};

Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>';
};

Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer');
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }
  if (thisStart >= thisEnd) {
    return -1;
  }
  if (start >= end) {
    return 1;
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0;

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1;

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset; // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1;else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;else return -1;
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }

  throw new TypeError('val must be string, number or Buffer');
}

function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }
      if (found) return i;
    }
  }

  return -1;
}

Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};

Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};

Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};

function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }
  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}

function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}

function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}

function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}

Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
    // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
    // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);

      case 'ascii':
        return asciiWrite(this, string, offset, length);

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length);

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};

function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf);
  } else {
    return base64.fromByteArray(buf.slice(start, end));
  }
}

function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res);
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }
  return res;
}

function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret;
}

function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret;
}

function hexSlice(buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out;
}

function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res;
}

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val;
};

Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val;
};

Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};

Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};

Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};

Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};

Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};

Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
};

Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
};

Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};

Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};

Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};

Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4);
};

Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4);
};

Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8);
};

Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8);
};

function checkInt(buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}

Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 0xff;
  return offset + 1;
};

function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};

function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};

Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};

Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};

Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};

Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};

Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};

function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}

function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}

Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};

Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};

function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0;

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds');

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean(str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return '';
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str;
}

function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        }

        // valid lead
        leadSurrogate = codePoint;

        continue;
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function asciiToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray;
}

function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray;
}

function base64ToBytes(str) {
  return base64.toByteArray(base64clean(str));
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }
  return i;
}

function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36)))

/***/ }),
/* 26 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var supportsArgumentsClass = function () {
  return Object.prototype.toString.call(arguments);
}() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object) {
  return object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object' && typeof object.length == 'number' && Object.prototype.hasOwnProperty.call(object, 'callee') && !Object.prototype.propertyIsEnumerable.call(object, 'callee') || false;
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function' ? Object.keys : shim;

exports.shim = shim;
function shim(obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
}

/***/ }),
/* 29 */
/***/ (function(module, exports) {

/**
 * This library modifies the diff-patch-match library by Neil Fraser
 * by removing the patch and match functionality and certain advanced
 * options in the diff function. The original license is as follows:
 *
 * ===
 *
 * Diff Match and Patch
 *
 * Copyright 2006 Google Inc.
 * http://code.google.com/p/google-diff-match-patch/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The data structure representing a diff is an array of tuples:
 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
 */
var DIFF_DELETE = -1;
var DIFF_INSERT = 1;
var DIFF_EQUAL = 0;

/**
 * Find the differences between two texts.  Simplifies the problem by stripping
 * any common prefix or suffix off the texts before diffing.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {Int} cursor_pos Expected edit position in text1 (optional)
 * @return {Array} Array of diff tuples.
 */
function diff_main(text1, text2, cursor_pos) {
  // Check for equality (speedup).
  if (text1 == text2) {
    if (text1) {
      return [[DIFF_EQUAL, text1]];
    }
    return [];
  }

  // Check cursor_pos within bounds
  if (cursor_pos < 0 || text1.length < cursor_pos) {
    cursor_pos = null;
  }

  // Trim off common prefix (speedup).
  var commonlength = diff_commonPrefix(text1, text2);
  var commonprefix = text1.substring(0, commonlength);
  text1 = text1.substring(commonlength);
  text2 = text2.substring(commonlength);

  // Trim off common suffix (speedup).
  commonlength = diff_commonSuffix(text1, text2);
  var commonsuffix = text1.substring(text1.length - commonlength);
  text1 = text1.substring(0, text1.length - commonlength);
  text2 = text2.substring(0, text2.length - commonlength);

  // Compute the diff on the middle block.
  var diffs = diff_compute_(text1, text2);

  // Restore the prefix and suffix.
  if (commonprefix) {
    diffs.unshift([DIFF_EQUAL, commonprefix]);
  }
  if (commonsuffix) {
    diffs.push([DIFF_EQUAL, commonsuffix]);
  }
  diff_cleanupMerge(diffs);
  if (cursor_pos != null) {
    diffs = fix_cursor(diffs, cursor_pos);
  }
  return diffs;
};

/**
 * Find the differences between two texts.  Assumes that the texts do not
 * have any common prefix or suffix.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @return {Array} Array of diff tuples.
 */
function diff_compute_(text1, text2) {
  var diffs;

  if (!text1) {
    // Just add some text (speedup).
    return [[DIFF_INSERT, text2]];
  }

  if (!text2) {
    // Just delete some text (speedup).
    return [[DIFF_DELETE, text1]];
  }

  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  var i = longtext.indexOf(shorttext);
  if (i != -1) {
    // Shorter text is inside the longer text (speedup).
    diffs = [[DIFF_INSERT, longtext.substring(0, i)], [DIFF_EQUAL, shorttext], [DIFF_INSERT, longtext.substring(i + shorttext.length)]];
    // Swap insertions for deletions if diff is reversed.
    if (text1.length > text2.length) {
      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
    }
    return diffs;
  }

  if (shorttext.length == 1) {
    // Single character string.
    // After the previous speedup, the character can't be an equality.
    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
  }

  // Check to see if the problem can be split in two.
  var hm = diff_halfMatch_(text1, text2);
  if (hm) {
    // A half-match was found, sort out the return data.
    var text1_a = hm[0];
    var text1_b = hm[1];
    var text2_a = hm[2];
    var text2_b = hm[3];
    var mid_common = hm[4];
    // Send both pairs off for separate processing.
    var diffs_a = diff_main(text1_a, text2_a);
    var diffs_b = diff_main(text1_b, text2_b);
    // Merge the results.
    return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
  }

  return diff_bisect_(text1, text2);
};

/**
 * Find the 'middle snake' of a diff, split the problem in two
 * and return the recursively constructed diff.
 * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @return {Array} Array of diff tuples.
 * @private
 */
function diff_bisect_(text1, text2) {
  // Cache the text lengths to prevent multiple calls.
  var text1_length = text1.length;
  var text2_length = text2.length;
  var max_d = Math.ceil((text1_length + text2_length) / 2);
  var v_offset = max_d;
  var v_length = 2 * max_d;
  var v1 = new Array(v_length);
  var v2 = new Array(v_length);
  // Setting all elements to -1 is faster in Chrome & Firefox than mixing
  // integers and undefined.
  for (var x = 0; x < v_length; x++) {
    v1[x] = -1;
    v2[x] = -1;
  }
  v1[v_offset + 1] = 0;
  v2[v_offset + 1] = 0;
  var delta = text1_length - text2_length;
  // If the total number of characters is odd, then the front path will collide
  // with the reverse path.
  var front = delta % 2 != 0;
  // Offsets for start and end of k loop.
  // Prevents mapping of space beyond the grid.
  var k1start = 0;
  var k1end = 0;
  var k2start = 0;
  var k2end = 0;
  for (var d = 0; d < max_d; d++) {
    // Walk the front path one step.
    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
      var k1_offset = v_offset + k1;
      var x1;
      if (k1 == -d || k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1]) {
        x1 = v1[k1_offset + 1];
      } else {
        x1 = v1[k1_offset - 1] + 1;
      }
      var y1 = x1 - k1;
      while (x1 < text1_length && y1 < text2_length && text1.charAt(x1) == text2.charAt(y1)) {
        x1++;
        y1++;
      }
      v1[k1_offset] = x1;
      if (x1 > text1_length) {
        // Ran off the right of the graph.
        k1end += 2;
      } else if (y1 > text2_length) {
        // Ran off the bottom of the graph.
        k1start += 2;
      } else if (front) {
        var k2_offset = v_offset + delta - k1;
        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
          // Mirror x2 onto top-left coordinate system.
          var x2 = text1_length - v2[k2_offset];
          if (x1 >= x2) {
            // Overlap detected.
            return diff_bisectSplit_(text1, text2, x1, y1);
          }
        }
      }
    }

    // Walk the reverse path one step.
    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
      var k2_offset = v_offset + k2;
      var x2;
      if (k2 == -d || k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1]) {
        x2 = v2[k2_offset + 1];
      } else {
        x2 = v2[k2_offset - 1] + 1;
      }
      var y2 = x2 - k2;
      while (x2 < text1_length && y2 < text2_length && text1.charAt(text1_length - x2 - 1) == text2.charAt(text2_length - y2 - 1)) {
        x2++;
        y2++;
      }
      v2[k2_offset] = x2;
      if (x2 > text1_length) {
        // Ran off the left of the graph.
        k2end += 2;
      } else if (y2 > text2_length) {
        // Ran off the top of the graph.
        k2start += 2;
      } else if (!front) {
        var k1_offset = v_offset + delta - k2;
        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
          var x1 = v1[k1_offset];
          var y1 = v_offset + x1 - k1_offset;
          // Mirror x2 onto top-left coordinate system.
          x2 = text1_length - x2;
          if (x1 >= x2) {
            // Overlap detected.
            return diff_bisectSplit_(text1, text2, x1, y1);
          }
        }
      }
    }
  }
  // Diff took too long and hit the deadline or
  // number of diffs equals number of characters, no commonality at all.
  return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
};

/**
 * Given the location of the 'middle snake', split the diff in two parts
 * and recurse.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} x Index of split point in text1.
 * @param {number} y Index of split point in text2.
 * @return {Array} Array of diff tuples.
 */
function diff_bisectSplit_(text1, text2, x, y) {
  var text1a = text1.substring(0, x);
  var text2a = text2.substring(0, y);
  var text1b = text1.substring(x);
  var text2b = text2.substring(y);

  // Compute both diffs serially.
  var diffs = diff_main(text1a, text2a);
  var diffsb = diff_main(text1b, text2b);

  return diffs.concat(diffsb);
};

/**
 * Determine the common prefix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the start of each
 *     string.
 */
function diff_commonPrefix(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerstart = 0;
  while (pointermin < pointermid) {
    if (text1.substring(pointerstart, pointermid) == text2.substring(pointerstart, pointermid)) {
      pointermin = pointermid;
      pointerstart = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};

/**
 * Determine the common suffix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of each string.
 */
function diff_commonSuffix(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerend = 0;
  while (pointermin < pointermid) {
    if (text1.substring(text1.length - pointermid, text1.length - pointerend) == text2.substring(text2.length - pointermid, text2.length - pointerend)) {
      pointermin = pointermid;
      pointerend = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};

/**
 * Do the two texts share a substring which is at least half the length of the
 * longer text?
 * This speedup can produce non-minimal diffs.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {Array.<string>} Five element Array, containing the prefix of
 *     text1, the suffix of text1, the prefix of text2, the suffix of
 *     text2 and the common middle.  Or null if there was no match.
 */
function diff_halfMatch_(text1, text2) {
  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
    return null; // Pointless.
  }

  /**
   * Does a substring of shorttext exist within longtext such that the substring
   * is at least half the length of longtext?
   * Closure, but does not reference any external variables.
   * @param {string} longtext Longer string.
   * @param {string} shorttext Shorter string.
   * @param {number} i Start index of quarter length substring within longtext.
   * @return {Array.<string>} Five element Array, containing the prefix of
   *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
   *     of shorttext and the common middle.  Or null if there was no match.
   * @private
   */
  function diff_halfMatchI_(longtext, shorttext, i) {
    // Start with a 1/4 length substring at position i as a seed.
    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
    var j = -1;
    var best_common = '';
    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
    while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
      var prefixLength = diff_commonPrefix(longtext.substring(i), shorttext.substring(j));
      var suffixLength = diff_commonSuffix(longtext.substring(0, i), shorttext.substring(0, j));
      if (best_common.length < suffixLength + prefixLength) {
        best_common = shorttext.substring(j - suffixLength, j) + shorttext.substring(j, j + prefixLength);
        best_longtext_a = longtext.substring(0, i - suffixLength);
        best_longtext_b = longtext.substring(i + prefixLength);
        best_shorttext_a = shorttext.substring(0, j - suffixLength);
        best_shorttext_b = shorttext.substring(j + prefixLength);
      }
    }
    if (best_common.length * 2 >= longtext.length) {
      return [best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b, best_common];
    } else {
      return null;
    }
  }

  // First check if the second quarter is the seed for a half-match.
  var hm1 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 4));
  // Check again based on the third quarter.
  var hm2 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 2));
  var hm;
  if (!hm1 && !hm2) {
    return null;
  } else if (!hm2) {
    hm = hm1;
  } else if (!hm1) {
    hm = hm2;
  } else {
    // Both matched.  Select the longest.
    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  }

  // A half-match was found, sort out the return data.
  var text1_a, text1_b, text2_a, text2_b;
  if (text1.length > text2.length) {
    text1_a = hm[0];
    text1_b = hm[1];
    text2_a = hm[2];
    text2_b = hm[3];
  } else {
    text2_a = hm[0];
    text2_b = hm[1];
    text1_a = hm[2];
    text1_b = hm[3];
  }
  var mid_common = hm[4];
  return [text1_a, text1_b, text2_a, text2_b, mid_common];
};

/**
 * Reorder and merge like edit sections.  Merge equalities.
 * Any edit section can move as long as it doesn't cross an equality.
 * @param {Array} diffs Array of diff tuples.
 */
function diff_cleanupMerge(diffs) {
  diffs.push([DIFF_EQUAL, '']); // Add a dummy entry at the end.
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  var commonlength;
  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_EQUAL:
        // Upon reaching an equality, check for prior redundancies.
        if (count_delete + count_insert > 1) {
          if (count_delete !== 0 && count_insert !== 0) {
            // Factor out any common prefixies.
            commonlength = diff_commonPrefix(text_insert, text_delete);
            if (commonlength !== 0) {
              if (pointer - count_delete - count_insert > 0 && diffs[pointer - count_delete - count_insert - 1][0] == DIFF_EQUAL) {
                diffs[pointer - count_delete - count_insert - 1][1] += text_insert.substring(0, commonlength);
              } else {
                diffs.splice(0, 0, [DIFF_EQUAL, text_insert.substring(0, commonlength)]);
                pointer++;
              }
              text_insert = text_insert.substring(commonlength);
              text_delete = text_delete.substring(commonlength);
            }
            // Factor out any common suffixies.
            commonlength = diff_commonSuffix(text_insert, text_delete);
            if (commonlength !== 0) {
              diffs[pointer][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
              text_insert = text_insert.substring(0, text_insert.length - commonlength);
              text_delete = text_delete.substring(0, text_delete.length - commonlength);
            }
          }
          // Delete the offending records and add the merged ones.
          if (count_delete === 0) {
            diffs.splice(pointer - count_insert, count_delete + count_insert, [DIFF_INSERT, text_insert]);
          } else if (count_insert === 0) {
            diffs.splice(pointer - count_delete, count_delete + count_insert, [DIFF_DELETE, text_delete]);
          } else {
            diffs.splice(pointer - count_delete - count_insert, count_delete + count_insert, [DIFF_DELETE, text_delete], [DIFF_INSERT, text_insert]);
          }
          pointer = pointer - count_delete - count_insert + (count_delete ? 1 : 0) + (count_insert ? 1 : 0) + 1;
        } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
          // Merge this equality with the previous one.
          diffs[pointer - 1][1] += diffs[pointer][1];
          diffs.splice(pointer, 1);
        } else {
          pointer++;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
    }
  }
  if (diffs[diffs.length - 1][1] === '') {
    diffs.pop(); // Remove the dummy entry at the end.
  }

  // Second pass: look for single edits surrounded on both sides by equalities
  // which can be shifted sideways to eliminate an equality.
  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
  var changes = false;
  pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      if (diffs[pointer][1].substring(diffs[pointer][1].length - diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
        // Shift the edit over the previous equality.
        diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(0, diffs[pointer][1].length - diffs[pointer - 1][1].length);
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) == diffs[pointer + 1][1]) {
        // Shift the edit over the next equality.
        diffs[pointer - 1][1] += diffs[pointer + 1][1];
        diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1];
        diffs.splice(pointer + 1, 1);
        changes = true;
      }
    }
    pointer++;
  }
  // If shifts were made, the diff needs reordering and another shift sweep.
  if (changes) {
    diff_cleanupMerge(diffs);
  }
};

var diff = diff_main;
diff.INSERT = DIFF_INSERT;
diff.DELETE = DIFF_DELETE;
diff.EQUAL = DIFF_EQUAL;

module.exports = diff;

/*
 * Modify a diff such that the cursor position points to the start of a change:
 * E.g.
 *   cursor_normalize_diff([[DIFF_EQUAL, 'abc']], 1)
 *     => [1, [[DIFF_EQUAL, 'a'], [DIFF_EQUAL, 'bc']]]
 *   cursor_normalize_diff([[DIFF_INSERT, 'new'], [DIFF_DELETE, 'xyz']], 2)
 *     => [2, [[DIFF_INSERT, 'new'], [DIFF_DELETE, 'xy'], [DIFF_DELETE, 'z']]]
 *
 * @param {Array} diffs Array of diff tuples
 * @param {Int} cursor_pos Suggested edit position. Must not be out of bounds!
 * @return {Array} A tuple [cursor location in the modified diff, modified diff]
 */
function cursor_normalize_diff(diffs, cursor_pos) {
  if (cursor_pos === 0) {
    return [DIFF_EQUAL, diffs];
  }
  for (var current_pos = 0, i = 0; i < diffs.length; i++) {
    var d = diffs[i];
    if (d[0] === DIFF_DELETE || d[0] === DIFF_EQUAL) {
      var next_pos = current_pos + d[1].length;
      if (cursor_pos === next_pos) {
        return [i + 1, diffs];
      } else if (cursor_pos < next_pos) {
        // copy to prevent side effects
        diffs = diffs.slice();
        // split d into two diff changes
        var split_pos = cursor_pos - current_pos;
        var d_left = [d[0], d[1].slice(0, split_pos)];
        var d_right = [d[0], d[1].slice(split_pos)];
        diffs.splice(i, 1, d_left, d_right);
        return [i + 1, diffs];
      } else {
        current_pos = next_pos;
      }
    }
  }
  throw new Error('cursor_pos is out of bounds!');
}

/*
 * Modify a diff such that the edit position is "shifted" to the proposed edit location (cursor_position).
 *
 * Case 1)
 *   Check if a naive shift is possible:
 *     [0, X], [ 1, Y] -> [ 1, Y], [0, X]    (if X + Y === Y + X)
 *     [0, X], [-1, Y] -> [-1, Y], [0, X]    (if X + Y === Y + X) - holds same result
 * Case 2)
 *   Check if the following shifts are possible:
 *     [0, 'pre'], [ 1, 'prefix'] -> [ 1, 'pre'], [0, 'pre'], [ 1, 'fix']
 *     [0, 'pre'], [-1, 'prefix'] -> [-1, 'pre'], [0, 'pre'], [-1, 'fix']
 *         ^            ^
 *         d          d_next
 *
 * @param {Array} diffs Array of diff tuples
 * @param {Int} cursor_pos Suggested edit position. Must not be out of bounds!
 * @return {Array} Array of diff tuples
 */
function fix_cursor(diffs, cursor_pos) {
  var norm = cursor_normalize_diff(diffs, cursor_pos);
  var ndiffs = norm[1];
  var cursor_pointer = norm[0];
  var d = ndiffs[cursor_pointer];
  var d_next = ndiffs[cursor_pointer + 1];

  if (d == null) {
    // Text was deleted from end of original string,
    // cursor is now out of bounds in new string
    return diffs;
  } else if (d[0] !== DIFF_EQUAL) {
    // A modification happened at the cursor location.
    // This is the expected outcome, so we can return the original diff.
    return diffs;
  } else {
    if (d_next != null && d[1] + d_next[1] === d_next[1] + d[1]) {
      // Case 1)
      // It is possible to perform a naive shift
      ndiffs.splice(cursor_pointer, 2, d_next, d);
      return merge_tuples(ndiffs, cursor_pointer, 2);
    } else if (d_next != null && d_next[1].indexOf(d[1]) === 0) {
      // Case 2)
      // d[1] is a prefix of d_next[1]
      // We can assume that d_next[0] !== 0, since d[0] === 0
      // Shift edit locations..
      ndiffs.splice(cursor_pointer, 2, [d_next[0], d[1]], [0, d[1]]);
      var suffix = d_next[1].slice(d[1].length);
      if (suffix.length > 0) {
        ndiffs.splice(cursor_pointer + 2, 0, [d_next[0], suffix]);
      }
      return merge_tuples(ndiffs, cursor_pointer, 3);
    } else {
      // Not possible to perform any modification
      return diffs;
    }
  }
}

/*
 * Try to merge tuples with their neigbors in a given range.
 * E.g. [0, 'a'], [0, 'b'] -> [0, 'ab']
 *
 * @param {Array} diffs Array of diff tuples.
 * @param {Int} start Position of the first element to merge (diffs[start] is also merged with diffs[start - 1]).
 * @param {Int} length Number of consecutive elements to check.
 * @return {Array} Array of merged diff tuples.
 */
function merge_tuples(diffs, start, length) {
  // Check from (start-1) to (start+length).
  for (var i = start + length - 1; i >= 0 && i >= start - 1; i--) {
    if (i + 1 < diffs.length) {
      var left_d = diffs[i];
      var right_d = diffs[i + 1];
      if (left_d[0] === right_d[1]) {
        diffs.splice(i, 2, [left_d[0], left_d[1] + right_d[1]]);
      }
    }
  }
  return diffs;
}

/***/ }),
/* 30 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* 
  @package NOTY - Dependency-free notification library 
  @version version: 3.1.3 
  @contributors https://github.com/needim/noty/graphs/contributors 
  @documentation Examples and Documentation - http://needim.github.com/noty 
  @license Licensed under the MIT licenses: http://www.opensource.org/licenses/mit-license.php 
*/

(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? 'undefined' : _typeof2(exports)) === 'object' && ( false ? 'undefined' : _typeof2(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object') exports["Noty"] = factory();else root["Noty"] = factory();
})(this, function () {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/var installedModules = {};
      /******/
      /******/ // The require function
      /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
          /******/return installedModules[moduleId].exports;
          /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
          /******/i: moduleId,
          /******/l: false,
          /******/exports: {}
          /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
      }
      /******/
      /******/
      /******/ // expose the modules object (__webpack_modules__)
      /******/__webpack_require__.m = modules;
      /******/
      /******/ // expose the module cache
      /******/__webpack_require__.c = installedModules;
      /******/
      /******/ // identity function for calling harmony imports with the correct context
      /******/__webpack_require__.i = function (value) {
        return value;
      };
      /******/
      /******/ // define getter function for harmony exports
      /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
          /******/Object.defineProperty(exports, name, {
            /******/configurable: false,
            /******/enumerable: true,
            /******/get: getter
            /******/ });
          /******/
        }
        /******/
      };
      /******/
      /******/ // getDefaultExport function for compatibility with non-harmony modules
      /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
          return module['default'];
        } :
        /******/function getModuleExports() {
          return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
      };
      /******/
      /******/ // Object.prototype.hasOwnProperty.call
      /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/
      /******/ // __webpack_public_path__
      /******/__webpack_require__.p = "";
      /******/
      /******/ // Load entry module and return exports
      /******/return __webpack_require__(__webpack_require__.s = 6);
      /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.css = exports.deepExtend = exports.animationEndEvents = undefined;

      var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      };

      exports.inArray = inArray;
      exports.stopPropagation = stopPropagation;
      exports.generateID = generateID;
      exports.outerHeight = outerHeight;
      exports.addListener = addListener;
      exports.hasClass = hasClass;
      exports.addClass = addClass;
      exports.removeClass = removeClass;
      exports.remove = remove;
      exports.classList = classList;
      exports.visibilityChangeFlow = visibilityChangeFlow;
      exports.createAudioElements = createAudioElements;

      var _api = __webpack_require__(1);

      var API = _interopRequireWildcard(_api);

      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
          }newObj.default = obj;return newObj;
        }
      }

      var animationEndEvents = exports.animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

      function inArray(needle, haystack, argStrict) {
        var key = void 0;
        var strict = !!argStrict;

        if (strict) {
          for (key in haystack) {
            if (haystack.hasOwnProperty(key) && haystack[key] === needle) {
              return true;
            }
          }
        } else {
          for (key in haystack) {
            if (haystack.hasOwnProperty(key) && haystack[key] === needle) {
              return true;
            }
          }
        }
        return false;
      }

      function stopPropagation(evt) {
        evt = evt || window.event;

        if (typeof evt.stopPropagation !== 'undefined') {
          evt.stopPropagation();
        } else {
          evt.cancelBubble = true;
        }
      }

      var deepExtend = exports.deepExtend = function deepExtend(out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
          var obj = arguments[i];

          if (!obj) continue;

          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (Array.isArray(obj[key])) {
                out[key] = obj[key];
              } else if (_typeof(obj[key]) === 'object' && obj[key] !== null) {
                out[key] = deepExtend(out[key], obj[key]);
              } else {
                out[key] = obj[key];
              }
            }
          }
        }

        return out;
      };

      function generateID() {
        var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        var id = 'noty_' + prefix + '_';

        id += 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0;
          var v = c === 'x' ? r : r & 0x3 | 0x8;
          return v.toString(16);
        });

        return id;
      }

      function outerHeight(el) {
        var height = el.offsetHeight;
        var style = window.getComputedStyle(el);

        height += parseInt(style.marginTop) + parseInt(style.marginBottom);
        return height;
      }

      var css = exports.css = function () {
        var cssPrefixes = ['Webkit', 'O', 'Moz', 'ms'];
        var cssProps = {};

        function camelCase(string) {
          return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function (match, letter) {
            return letter.toUpperCase();
          });
        }

        function getVendorProp(name) {
          var style = document.body.style;
          if (name in style) return name;

          var i = cssPrefixes.length;
          var capName = name.charAt(0).toUpperCase() + name.slice(1);
          var vendorName = void 0;

          while (i--) {
            vendorName = cssPrefixes[i] + capName;
            if (vendorName in style) return vendorName;
          }

          return name;
        }

        function getStyleProp(name) {
          name = camelCase(name);
          return cssProps[name] || (cssProps[name] = getVendorProp(name));
        }

        function applyCss(element, prop, value) {
          prop = getStyleProp(prop);
          element.style[prop] = value;
        }

        return function (element, properties) {
          var args = arguments;
          var prop = void 0;
          var value = void 0;

          if (args.length === 2) {
            for (prop in properties) {
              if (properties.hasOwnProperty(prop)) {
                value = properties[prop];
                if (value !== undefined && properties.hasOwnProperty(prop)) {
                  applyCss(element, prop, value);
                }
              }
            }
          } else {
            applyCss(element, args[1], args[2]);
          }
        };
      }();

      function addListener(el, events, cb) {
        var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        events = events.split(' ');
        for (var i = 0; i < events.length; i++) {
          if (document.addEventListener) {
            el.addEventListener(events[i], cb, useCapture);
          } else if (document.attachEvent) {
            el.attachEvent('on' + events[i], cb);
          }
        }
      }

      function hasClass(element, name) {
        var list = typeof element === 'string' ? element : classList(element);
        return list.indexOf(' ' + name + ' ') >= 0;
      }

      function addClass(element, name) {
        var oldList = classList(element);
        var newList = oldList + name;

        if (hasClass(oldList, name)) return;

        // Trim the opening space.
        element.className = newList.substring(1);
      }

      function removeClass(element, name) {
        var oldList = classList(element);
        var newList = void 0;

        if (!hasClass(element, name)) return;

        // Replace the class name.
        newList = oldList.replace(' ' + name + ' ', ' ');

        // Trim the opening and closing spaces.
        element.className = newList.substring(1, newList.length - 1);
      }

      function remove(element) {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }

      function classList(element) {
        return (' ' + (element && element.className || '') + ' ').replace(/\s+/gi, ' ');
      }

      function visibilityChangeFlow() {
        var hidden = void 0;
        var visibilityChange = void 0;
        if (typeof document.hidden !== 'undefined') {
          // Opera 12.10 and Firefox 18 and later support
          hidden = 'hidden';
          visibilityChange = 'visibilitychange';
        } else if (typeof document.msHidden !== 'undefined') {
          hidden = 'msHidden';
          visibilityChange = 'msvisibilitychange';
        } else if (typeof document.webkitHidden !== 'undefined') {
          hidden = 'webkitHidden';
          visibilityChange = 'webkitvisibilitychange';
        }

        function onVisibilityChange() {
          API.PageHidden = document[hidden];
          handleVisibilityChange();
        }

        function onBlur() {
          API.PageHidden = true;
          handleVisibilityChange();
        }

        function onFocus() {
          API.PageHidden = false;
          handleVisibilityChange();
        }

        function handleVisibilityChange() {
          if (API.PageHidden) stopAll();else resumeAll();
        }

        function stopAll() {
          setTimeout(function () {
            Object.keys(API.Store).forEach(function (id) {
              if (API.Store.hasOwnProperty(id)) {
                if (API.Store[id].options.visibilityControl) {
                  API.Store[id].stop();
                }
              }
            });
          }, 100);
        }

        function resumeAll() {
          setTimeout(function () {
            Object.keys(API.Store).forEach(function (id) {
              if (API.Store.hasOwnProperty(id)) {
                if (API.Store[id].options.visibilityControl) {
                  API.Store[id].resume();
                }
              }
            });
            API.queueRenderAll();
          }, 100);
        }

        addListener(document, visibilityChange, onVisibilityChange);
        addListener(window, 'blur', onBlur);
        addListener(window, 'focus', onFocus);
      }

      function createAudioElements(ref) {
        if (ref.hasSound) {
          var audioElement = document.createElement('audio');

          ref.options.sounds.sources.forEach(function (s) {
            var source = document.createElement('source');
            source.src = s;
            source.type = 'audio/' + getExtension(s);
            audioElement.appendChild(source);
          });

          if (ref.barDom) {
            ref.barDom.appendChild(audioElement);
          } else {
            document.querySelector('body').appendChild(audioElement);
          }

          audioElement.volume = ref.options.sounds.volume;

          if (!ref.soundPlayed) {
            audioElement.play();
            ref.soundPlayed = true;
          }

          audioElement.onended = function () {
            remove(audioElement);
          };
        }
      }

      function getExtension(fileName) {
        return fileName.match(/\.([^.]+)$/)[1];
      }

      /***/
    },
    /* 1 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Defaults = exports.Store = exports.Queues = exports.DefaultMaxVisible = exports.docTitle = exports.DocModalCount = exports.PageHidden = undefined;
      exports.getQueueCounts = getQueueCounts;
      exports.addToQueue = addToQueue;
      exports.removeFromQueue = removeFromQueue;
      exports.queueRender = queueRender;
      exports.queueRenderAll = queueRenderAll;
      exports.ghostFix = ghostFix;
      exports.build = build;
      exports.hasButtons = hasButtons;
      exports.handleModal = handleModal;
      exports.handleModalClose = handleModalClose;
      exports.queueClose = queueClose;
      exports.dequeueClose = dequeueClose;
      exports.fire = fire;
      exports.openFlow = openFlow;
      exports.closeFlow = closeFlow;

      var _utils = __webpack_require__(0);

      var Utils = _interopRequireWildcard(_utils);

      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
          }newObj.default = obj;return newObj;
        }
      }

      var PageHidden = exports.PageHidden = false;
      var DocModalCount = exports.DocModalCount = 0;

      var DocTitleProps = {
        originalTitle: null,
        count: 0,
        changed: false,
        timer: -1
      };

      var docTitle = exports.docTitle = {
        increment: function increment() {
          DocTitleProps.count++;

          docTitle._update();
        },

        decrement: function decrement() {
          DocTitleProps.count--;

          if (DocTitleProps.count <= 0) {
            docTitle._clear();
            return;
          }

          docTitle._update();
        },

        _update: function _update() {
          var title = document.title;

          if (!DocTitleProps.changed) {
            DocTitleProps.originalTitle = title;
            document.title = '(' + DocTitleProps.count + ') ' + title;
            DocTitleProps.changed = true;
          } else {
            document.title = '(' + DocTitleProps.count + ') ' + DocTitleProps.originalTitle;
          }
        },

        _clear: function _clear() {
          if (DocTitleProps.changed) {
            DocTitleProps.count = 0;
            document.title = DocTitleProps.originalTitle;
            DocTitleProps.changed = false;
          }
        }
      };

      var DefaultMaxVisible = exports.DefaultMaxVisible = 5;

      var Queues = exports.Queues = {
        global: {
          maxVisible: DefaultMaxVisible,
          queue: []
        }
      };

      var Store = exports.Store = {};

      var Defaults = exports.Defaults = {
        type: 'alert',
        layout: 'topRight',
        theme: 'mint',
        text: '',
        timeout: false,
        progressBar: true,
        closeWith: ['click'],
        animation: {
          open: 'noty_effects_open',
          close: 'noty_effects_close'
        },
        id: false,
        force: false,
        killer: false,
        queue: 'global',
        container: false,
        buttons: [],
        callbacks: {
          beforeShow: null,
          onShow: null,
          afterShow: null,
          onClose: null,
          afterClose: null,
          onClick: null,
          onHover: null,
          onTemplate: null
        },
        sounds: {
          sources: [],
          volume: 1,
          conditions: []
        },
        titleCount: {
          conditions: []
        },
        modal: false,
        visibilityControl: false

        /**
         * @param {string} queueName
         * @return {object}
         */
      };function getQueueCounts() {
        var queueName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'global';

        var count = 0;
        var max = DefaultMaxVisible;

        if (Queues.hasOwnProperty(queueName)) {
          max = Queues[queueName].maxVisible;
          Object.keys(Store).forEach(function (i) {
            if (Store[i].options.queue === queueName && !Store[i].closed) count++;
          });
        }

        return {
          current: count,
          maxVisible: max
        };
      }

      /**
       * @param {Noty} ref
       * @return {void}
       */
      function addToQueue(ref) {
        if (!Queues.hasOwnProperty(ref.options.queue)) {
          Queues[ref.options.queue] = { maxVisible: DefaultMaxVisible, queue: [] };
        }

        Queues[ref.options.queue].queue.push(ref);
      }

      /**
       * @param {Noty} ref
       * @return {void}
       */
      function removeFromQueue(ref) {
        if (Queues.hasOwnProperty(ref.options.queue)) {
          var queue = [];
          Object.keys(Queues[ref.options.queue].queue).forEach(function (i) {
            if (Queues[ref.options.queue].queue[i].id !== ref.id) {
              queue.push(Queues[ref.options.queue].queue[i]);
            }
          });
          Queues[ref.options.queue].queue = queue;
        }
      }

      /**
       * @param {string} queueName
       * @return {void}
       */
      function queueRender() {
        var queueName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'global';

        if (Queues.hasOwnProperty(queueName)) {
          var noty = Queues[queueName].queue.shift();

          if (noty) noty.show();
        }
      }

      /**
       * @return {void}
       */
      function queueRenderAll() {
        Object.keys(Queues).forEach(function (queueName) {
          queueRender(queueName);
        });
      }

      /**
       * @param {Noty} ref
       * @return {void}
       */
      function ghostFix(ref) {
        var ghostID = Utils.generateID('ghost');
        var ghost = document.createElement('div');
        ghost.setAttribute('id', ghostID);
        Utils.css(ghost, {
          height: Utils.outerHeight(ref.barDom) + 'px'
        });

        ref.barDom.insertAdjacentHTML('afterend', ghost.outerHTML);

        Utils.remove(ref.barDom);
        ghost = document.getElementById(ghostID);
        Utils.addClass(ghost, 'noty_fix_effects_height');
        Utils.addListener(ghost, Utils.animationEndEvents, function () {
          Utils.remove(ghost);
        });
      }

      /**
       * @param {Noty} ref
       * @return {void}
       */
      function build(ref) {
        findOrCreateContainer(ref);

        var markup = '<div class="noty_body">' + ref.options.text + '</div>' + buildButtons(ref) + '<div class="noty_progressbar"></div>';

        ref.barDom = document.createElement('div');
        ref.barDom.setAttribute('id', ref.id);
        Utils.addClass(ref.barDom, 'noty_bar noty_type__' + ref.options.type + ' noty_theme__' + ref.options.theme);

        ref.barDom.innerHTML = markup;

        fire(ref, 'onTemplate');
      }

      /**
       * @param {Noty} ref
       * @return {boolean}
       */
      function hasButtons(ref) {
        return !!(ref.options.buttons && Object.keys(ref.options.buttons).length);
      }

      /**
       * @param {Noty} ref
       * @return {string}
       */
      function buildButtons(ref) {
        if (hasButtons(ref)) {
          var buttons = document.createElement('div');
          Utils.addClass(buttons, 'noty_buttons');

          Object.keys(ref.options.buttons).forEach(function (key) {
            buttons.appendChild(ref.options.buttons[key].dom);
          });

          ref.options.buttons.forEach(function (btn) {
            buttons.appendChild(btn.dom);
          });
          return buttons.outerHTML;
        }
        return '';
      }

      /**
       * @param {Noty} ref
       * @return {void}
       */
      function handleModal(ref) {
        if (ref.options.modal) {
          if (DocModalCount === 0) {
            createModal(ref);
          }

          exports.DocModalCount = DocModalCount += 1;
        }
      }

      /**
       * @param {Noty} ref
       * @return {void}
       */
      function handleModalClose(ref) {
        if (ref.options.modal && DocModalCount > 0) {
          exports.DocModalCount = DocModalCount -= 1;

          if (DocModalCount <= 0) {
            var modal = document.querySelector('.noty_modal');

            if (modal) {
              Utils.removeClass(modal, 'noty_modal_open');
              Utils.addClass(modal, 'noty_modal_close');
              Utils.addListener(modal, Utils.animationEndEvents, function () {
                Utils.remove(modal);
              });
            }
          }
        }
      }

      /**
       * @return {void}
       */
      function createModal() {
        var body = document.querySelector('body');
        var modal = document.createElement('div');
        Utils.addClass(modal, 'noty_modal');
        body.insertBefore(modal, body.firstChild);
        Utils.addClass(modal, 'noty_modal_open');

        Utils.addListener(modal, Utils.animationEndEvents, function () {
          Utils.removeClass(modal, 'noty_modal_open');
        });
      }

      /**
       * @param {Noty} ref
       * @return {void}
       */
      function findOrCreateContainer(ref) {
        if (ref.options.container) {
          ref.layoutDom = document.querySelector(ref.options.container);
          return;
        }

        var layoutID = 'noty_layout__' + ref.options.layout;
        ref.layoutDom = document.querySelector('div#' + layoutID);

        if (!ref.layoutDom) {
          ref.layoutDom = document.createElement('div');
          ref.layoutDom.setAttribute('id', layoutID);
          Utils.addClass(ref.layoutDom, 'noty_layout');
          document.querySelector('body').appendChild(ref.layoutDom);
        }
      }

      /**
       * @param {Noty} ref
       * @return {void}
       */
      function queueClose(ref) {
        if (ref.options.timeout) {
          if (ref.options.progressBar && ref.progressDom) {
            Utils.css(ref.progressDom, {
              transition: 'width ' + ref.options.timeout + 'ms linear',
              width: '0%'
            });
          }

          clearTimeout(ref.closeTimer);

          ref.closeTimer = setTimeout(function () {
            ref.close();
          }, ref.options.timeout);
        }
      }

      /**
       * @param {Noty} ref
       * @return {void}
       */
      function dequeueClose(ref) {
        if (ref.options.timeout && ref.closeTimer) {
          clearTimeout(ref.closeTimer);
          ref.closeTimer = -1;

          if (ref.options.progressBar && ref.progressDom) {
            Utils.css(ref.progressDom, {
              transition: 'width 0ms linear',
              width: '100%'
            });
          }
        }
      }

      /**
       * @param {Noty} ref
       * @param {string} eventName
       * @return {void}
       */
      function fire(ref, eventName) {
        if (ref.listeners.hasOwnProperty(eventName)) {
          ref.listeners[eventName].forEach(function (cb) {
            if (typeof cb === 'function') {
              cb.apply(ref);
            }
          });
        }
      }

      /**
       * @param {Noty} ref
       * @return {void}
       */
      function openFlow(ref) {
        fire(ref, 'afterShow');
        queueClose(ref);

        Utils.addListener(ref.barDom, 'mouseenter', function () {
          dequeueClose(ref);
        });

        Utils.addListener(ref.barDom, 'mouseleave', function () {
          queueClose(ref);
        });
      }

      /**
       * @param {Noty} ref
       * @return {void}
       */
      function closeFlow(ref) {
        delete Store[ref.id];
        ref.closing = false;
        fire(ref, 'afterClose');

        Utils.remove(ref.barDom);

        if (ref.layoutDom.querySelectorAll('.noty_bar').length === 0 && !ref.options.container) {
          Utils.remove(ref.layoutDom);
        }

        if (Utils.inArray('docVisible', ref.options.titleCount.conditions) || Utils.inArray('docHidden', ref.options.titleCount.conditions)) {
          docTitle.decrement();
        }

        queueRender(ref.options.queue);
      }

      /***/
    },
    /* 2 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.NotyButton = undefined;

      var _utils = __webpack_require__(0);

      var Utils = _interopRequireWildcard(_utils);

      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
          }newObj.default = obj;return newObj;
        }
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var NotyButton = exports.NotyButton = function NotyButton(html, classes, cb) {
        var _this = this;

        var attributes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        _classCallCheck(this, NotyButton);

        this.dom = document.createElement('button');
        this.dom.innerHTML = html;
        this.id = attributes.id = attributes.id || Utils.generateID('button');
        this.cb = cb;
        Object.keys(attributes).forEach(function (propertyName) {
          _this.dom.setAttribute(propertyName, attributes[propertyName]);
        });
        Utils.addClass(this.dom, classes || 'noty_btn');

        return this;
      };

      /***/
    },
    /* 3 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Push = exports.Push = function () {
        function Push() {
          var workerPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/service-worker.js';

          _classCallCheck(this, Push);

          this.subData = {};
          this.workerPath = workerPath;
          this.listeners = {
            onPermissionGranted: [],
            onPermissionDenied: [],
            onSubscriptionSuccess: [],
            onSubscriptionCancel: [],
            onWorkerError: [],
            onWorkerSuccess: [],
            onWorkerNotSupported: []
          };
          return this;
        }

        /**
         * @param {string} eventName
         * @param {function} cb
         * @return {Push}
         */

        _createClass(Push, [{
          key: 'on',
          value: function on(eventName) {
            var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

            if (typeof cb === 'function' && this.listeners.hasOwnProperty(eventName)) {
              this.listeners[eventName].push(cb);
            }

            return this;
          }
        }, {
          key: 'fire',
          value: function fire(eventName) {
            var _this = this;

            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            if (this.listeners.hasOwnProperty(eventName)) {
              this.listeners[eventName].forEach(function (cb) {
                if (typeof cb === 'function') {
                  cb.apply(_this, params);
                }
              });
            }
          }
        }, {
          key: 'create',
          value: function create() {
            console.log('NOT IMPLEMENTED YET');
          }

          /**
           * @return {boolean}
           */

        }, {
          key: 'isSupported',
          value: function isSupported() {
            var result = false;

            try {
              result = window.Notification || window.webkitNotifications || navigator.mozNotification || window.external && window.external.msIsSiteMode() !== undefined;
            } catch (e) {}

            return result;
          }

          /**
           * @return {string}
           */

        }, {
          key: 'getPermissionStatus',
          value: function getPermissionStatus() {
            var perm = 'default';

            if (window.Notification && window.Notification.permissionLevel) {
              perm = window.Notification.permissionLevel;
            } else if (window.webkitNotifications && window.webkitNotifications.checkPermission) {
              switch (window.webkitNotifications.checkPermission()) {
                case 1:
                  perm = 'default';
                  break;
                case 0:
                  perm = 'granted';
                  break;
                default:
                  perm = 'denied';
              }
            } else if (window.Notification && window.Notification.permission) {
              perm = window.Notification.permission;
            } else if (navigator.mozNotification) {
              perm = 'granted';
            } else if (window.external && window.external.msIsSiteMode() !== undefined) {
              perm = window.external.msIsSiteMode() ? 'granted' : 'default';
            }

            return perm.toString().toLowerCase();
          }

          /**
           * @return {string}
           */

        }, {
          key: 'getEndpoint',
          value: function getEndpoint(subscription) {
            var endpoint = subscription.endpoint;
            var subscriptionId = subscription.subscriptionId;

            // fix for Chrome < 45
            if (subscriptionId && endpoint.indexOf(subscriptionId) === -1) {
              endpoint += '/' + subscriptionId;
            }

            return endpoint;
          }

          /**
           * @return {boolean}
           */

        }, {
          key: 'isSWRegistered',
          value: function isSWRegistered() {
            try {
              return navigator.serviceWorker.controller.state === 'activated';
            } catch (e) {
              return false;
            }
          }

          /**
           * @return {void}
           */

        }, {
          key: 'unregisterWorker',
          value: function unregisterWorker() {
            var self = this;
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.getRegistrations().then(function (registrations) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                  for (var _iterator = registrations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var registration = _step.value;

                    registration.unregister();
                    self.fire('onSubscriptionCancel');
                  }
                } catch (err) {
                  _didIteratorError = true;
                  _iteratorError = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                      _iterator.return();
                    }
                  } finally {
                    if (_didIteratorError) {
                      throw _iteratorError;
                    }
                  }
                }
              });
            }
          }

          /**
           * @return {void}
           */

        }, {
          key: 'requestSubscription',
          value: function requestSubscription() {
            var _this2 = this;

            var userVisibleOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            var self = this;
            var current = this.getPermissionStatus();
            var cb = function cb(result) {
              if (result === 'granted') {
                _this2.fire('onPermissionGranted');

                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.register(_this2.workerPath).then(function () {
                    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
                      self.fire('onWorkerSuccess');
                      serviceWorkerRegistration.pushManager.subscribe({
                        userVisibleOnly: userVisibleOnly
                      }).then(function (subscription) {
                        var key = subscription.getKey('p256dh');
                        var token = subscription.getKey('auth');

                        self.subData = {
                          endpoint: self.getEndpoint(subscription),
                          p256dh: key ? window.btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
                          auth: token ? window.btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null
                        };

                        self.fire('onSubscriptionSuccess', [self.subData]);
                      }).catch(function (err) {
                        self.fire('onWorkerError', [err]);
                      });
                    });
                  });
                } else {
                  self.fire('onWorkerNotSupported');
                }
              } else if (result === 'denied') {
                _this2.fire('onPermissionDenied');
                _this2.unregisterWorker();
              }
            };

            if (current === 'default') {
              if (window.Notification && window.Notification.requestPermission) {
                window.Notification.requestPermission(cb);
              } else if (window.webkitNotifications && window.webkitNotifications.checkPermission) {
                window.webkitNotifications.requestPermission(cb);
              }
            } else {
              cb(current);
            }
          }
        }]);

        return Push;
      }();

      /***/
    },
    /* 4 */
    /***/function (module, exports, __webpack_require__) {

      /* WEBPACK VAR INJECTION */(function (process, global) {
        var require; /*!
                     * @overview es6-promise - a tiny implementation of Promises/A+.
                     * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
                     * @license   Licensed under MIT license
                     *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
                     * @version   4.1.0
                     */

        (function (global, factory) {
          true ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.ES6Promise = factory();
        })(this, function () {
          'use strict';

          function objectOrFunction(x) {
            return typeof x === 'function' || (typeof x === 'undefined' ? 'undefined' : _typeof2(x)) === 'object' && x !== null;
          }

          function isFunction(x) {
            return typeof x === 'function';
          }

          var _isArray = undefined;
          if (!Array.isArray) {
            _isArray = function _isArray(x) {
              return Object.prototype.toString.call(x) === '[object Array]';
            };
          } else {
            _isArray = Array.isArray;
          }

          var isArray = _isArray;

          var len = 0;
          var vertxNext = undefined;
          var customSchedulerFn = undefined;

          var asap = function asap(callback, arg) {
            queue[len] = callback;
            queue[len + 1] = arg;
            len += 2;
            if (len === 2) {
              // If len is 2, that means that we need to schedule an async flush.
              // If additional callbacks are queued before the queue is flushed, they
              // will be processed by this flush that we are scheduling.
              if (customSchedulerFn) {
                customSchedulerFn(flush);
              } else {
                scheduleFlush();
              }
            }
          };

          function setScheduler(scheduleFn) {
            customSchedulerFn = scheduleFn;
          }

          function setAsap(asapFn) {
            asap = asapFn;
          }

          var browserWindow = typeof window !== 'undefined' ? window : undefined;
          var browserGlobal = browserWindow || {};
          var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
          var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

          // test for web worker but not in IE10
          var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

          // node
          function useNextTick() {
            // node version 0.10.x displays a deprecation warning when nextTick is used recursively
            // see https://github.com/cujojs/when/issues/410 for details
            return function () {
              return process.nextTick(flush);
            };
          }

          // vertx
          function useVertxTimer() {
            if (typeof vertxNext !== 'undefined') {
              return function () {
                vertxNext(flush);
              };
            }

            return useSetTimeout();
          }

          function useMutationObserver() {
            var iterations = 0;
            var observer = new BrowserMutationObserver(flush);
            var node = document.createTextNode('');
            observer.observe(node, { characterData: true });

            return function () {
              node.data = iterations = ++iterations % 2;
            };
          }

          // web worker
          function useMessageChannel() {
            var channel = new MessageChannel();
            channel.port1.onmessage = flush;
            return function () {
              return channel.port2.postMessage(0);
            };
          }

          function useSetTimeout() {
            // Store setTimeout reference so es6-promise will be unaffected by
            // other code modifying setTimeout (like sinon.useFakeTimers())
            var globalSetTimeout = setTimeout;
            return function () {
              return globalSetTimeout(flush, 1);
            };
          }

          var queue = new Array(1000);
          function flush() {
            for (var i = 0; i < len; i += 2) {
              var callback = queue[i];
              var arg = queue[i + 1];

              callback(arg);

              queue[i] = undefined;
              queue[i + 1] = undefined;
            }

            len = 0;
          }

          function attemptVertx() {
            try {
              var r = require;
              var vertx = __webpack_require__(9);
              vertxNext = vertx.runOnLoop || vertx.runOnContext;
              return useVertxTimer();
            } catch (e) {
              return useSetTimeout();
            }
          }

          var scheduleFlush = undefined;
          // Decide what async method to use to triggering processing of queued callbacks:
          if (isNode) {
            scheduleFlush = useNextTick();
          } else if (BrowserMutationObserver) {
            scheduleFlush = useMutationObserver();
          } else if (isWorker) {
            scheduleFlush = useMessageChannel();
          } else if (browserWindow === undefined && "function" === 'function') {
            scheduleFlush = attemptVertx();
          } else {
            scheduleFlush = useSetTimeout();
          }

          function then(onFulfillment, onRejection) {
            var _arguments = arguments;

            var parent = this;

            var child = new this.constructor(noop);

            if (child[PROMISE_ID] === undefined) {
              makePromise(child);
            }

            var _state = parent._state;

            if (_state) {
              (function () {
                var callback = _arguments[_state - 1];
                asap(function () {
                  return invokeCallback(_state, child, callback, parent._result);
                });
              })();
            } else {
              subscribe(parent, child, onFulfillment, onRejection);
            }

            return child;
          }

          /**
            `Promise.resolve` returns a promise that will become resolved with the
            passed `value`. It is shorthand for the following:
          
            ```javascript
            let promise = new Promise(function(resolve, reject){
              resolve(1);
            });
          
            promise.then(function(value){
              // value === 1
            });
            ```
          
            Instead of writing the above, your code now simply becomes the following:
          
            ```javascript
            let promise = Promise.resolve(1);
          
            promise.then(function(value){
              // value === 1
            });
            ```
          
            @method resolve
            @static
            @param {Any} value value that the returned promise will be resolved with
            Useful for tooling.
            @return {Promise} a promise that will become fulfilled with the given
            `value`
          */
          function resolve(object) {
            /*jshint validthis:true */
            var Constructor = this;

            if (object && (typeof object === 'undefined' ? 'undefined' : _typeof2(object)) === 'object' && object.constructor === Constructor) {
              return object;
            }

            var promise = new Constructor(noop);
            _resolve(promise, object);
            return promise;
          }

          var PROMISE_ID = Math.random().toString(36).substring(16);

          function noop() {}

          var PENDING = void 0;
          var FULFILLED = 1;
          var REJECTED = 2;

          var GET_THEN_ERROR = new ErrorObject();

          function selfFulfillment() {
            return new TypeError("You cannot resolve a promise with itself");
          }

          function cannotReturnOwn() {
            return new TypeError('A promises callback cannot return that same promise.');
          }

          function getThen(promise) {
            try {
              return promise.then;
            } catch (error) {
              GET_THEN_ERROR.error = error;
              return GET_THEN_ERROR;
            }
          }

          function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
            try {
              then.call(value, fulfillmentHandler, rejectionHandler);
            } catch (e) {
              return e;
            }
          }

          function handleForeignThenable(promise, thenable, then) {
            asap(function (promise) {
              var sealed = false;
              var error = tryThen(then, thenable, function (value) {
                if (sealed) {
                  return;
                }
                sealed = true;
                if (thenable !== value) {
                  _resolve(promise, value);
                } else {
                  fulfill(promise, value);
                }
              }, function (reason) {
                if (sealed) {
                  return;
                }
                sealed = true;

                _reject(promise, reason);
              }, 'Settle: ' + (promise._label || ' unknown promise'));

              if (!sealed && error) {
                sealed = true;
                _reject(promise, error);
              }
            }, promise);
          }

          function handleOwnThenable(promise, thenable) {
            if (thenable._state === FULFILLED) {
              fulfill(promise, thenable._result);
            } else if (thenable._state === REJECTED) {
              _reject(promise, thenable._result);
            } else {
              subscribe(thenable, undefined, function (value) {
                return _resolve(promise, value);
              }, function (reason) {
                return _reject(promise, reason);
              });
            }
          }

          function handleMaybeThenable(promise, maybeThenable, then$$) {
            if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
              handleOwnThenable(promise, maybeThenable);
            } else {
              if (then$$ === GET_THEN_ERROR) {
                _reject(promise, GET_THEN_ERROR.error);
                GET_THEN_ERROR.error = null;
              } else if (then$$ === undefined) {
                fulfill(promise, maybeThenable);
              } else if (isFunction(then$$)) {
                handleForeignThenable(promise, maybeThenable, then$$);
              } else {
                fulfill(promise, maybeThenable);
              }
            }
          }

          function _resolve(promise, value) {
            if (promise === value) {
              _reject(promise, selfFulfillment());
            } else if (objectOrFunction(value)) {
              handleMaybeThenable(promise, value, getThen(value));
            } else {
              fulfill(promise, value);
            }
          }

          function publishRejection(promise) {
            if (promise._onerror) {
              promise._onerror(promise._result);
            }

            publish(promise);
          }

          function fulfill(promise, value) {
            if (promise._state !== PENDING) {
              return;
            }

            promise._result = value;
            promise._state = FULFILLED;

            if (promise._subscribers.length !== 0) {
              asap(publish, promise);
            }
          }

          function _reject(promise, reason) {
            if (promise._state !== PENDING) {
              return;
            }
            promise._state = REJECTED;
            promise._result = reason;

            asap(publishRejection, promise);
          }

          function subscribe(parent, child, onFulfillment, onRejection) {
            var _subscribers = parent._subscribers;
            var length = _subscribers.length;

            parent._onerror = null;

            _subscribers[length] = child;
            _subscribers[length + FULFILLED] = onFulfillment;
            _subscribers[length + REJECTED] = onRejection;

            if (length === 0 && parent._state) {
              asap(publish, parent);
            }
          }

          function publish(promise) {
            var subscribers = promise._subscribers;
            var settled = promise._state;

            if (subscribers.length === 0) {
              return;
            }

            var child = undefined,
                callback = undefined,
                detail = promise._result;

            for (var i = 0; i < subscribers.length; i += 3) {
              child = subscribers[i];
              callback = subscribers[i + settled];

              if (child) {
                invokeCallback(settled, child, callback, detail);
              } else {
                callback(detail);
              }
            }

            promise._subscribers.length = 0;
          }

          function ErrorObject() {
            this.error = null;
          }

          var TRY_CATCH_ERROR = new ErrorObject();

          function tryCatch(callback, detail) {
            try {
              return callback(detail);
            } catch (e) {
              TRY_CATCH_ERROR.error = e;
              return TRY_CATCH_ERROR;
            }
          }

          function invokeCallback(settled, promise, callback, detail) {
            var hasCallback = isFunction(callback),
                value = undefined,
                error = undefined,
                succeeded = undefined,
                failed = undefined;

            if (hasCallback) {
              value = tryCatch(callback, detail);

              if (value === TRY_CATCH_ERROR) {
                failed = true;
                error = value.error;
                value.error = null;
              } else {
                succeeded = true;
              }

              if (promise === value) {
                _reject(promise, cannotReturnOwn());
                return;
              }
            } else {
              value = detail;
              succeeded = true;
            }

            if (promise._state !== PENDING) {
              // noop
            } else if (hasCallback && succeeded) {
              _resolve(promise, value);
            } else if (failed) {
              _reject(promise, error);
            } else if (settled === FULFILLED) {
              fulfill(promise, value);
            } else if (settled === REJECTED) {
              _reject(promise, value);
            }
          }

          function initializePromise(promise, resolver) {
            try {
              resolver(function resolvePromise(value) {
                _resolve(promise, value);
              }, function rejectPromise(reason) {
                _reject(promise, reason);
              });
            } catch (e) {
              _reject(promise, e);
            }
          }

          var id = 0;
          function nextId() {
            return id++;
          }

          function makePromise(promise) {
            promise[PROMISE_ID] = id++;
            promise._state = undefined;
            promise._result = undefined;
            promise._subscribers = [];
          }

          function Enumerator(Constructor, input) {
            this._instanceConstructor = Constructor;
            this.promise = new Constructor(noop);

            if (!this.promise[PROMISE_ID]) {
              makePromise(this.promise);
            }

            if (isArray(input)) {
              this._input = input;
              this.length = input.length;
              this._remaining = input.length;

              this._result = new Array(this.length);

              if (this.length === 0) {
                fulfill(this.promise, this._result);
              } else {
                this.length = this.length || 0;
                this._enumerate();
                if (this._remaining === 0) {
                  fulfill(this.promise, this._result);
                }
              }
            } else {
              _reject(this.promise, validationError());
            }
          }

          function validationError() {
            return new Error('Array Methods must be provided an Array');
          };

          Enumerator.prototype._enumerate = function () {
            var length = this.length;
            var _input = this._input;

            for (var i = 0; this._state === PENDING && i < length; i++) {
              this._eachEntry(_input[i], i);
            }
          };

          Enumerator.prototype._eachEntry = function (entry, i) {
            var c = this._instanceConstructor;
            var resolve$$ = c.resolve;

            if (resolve$$ === resolve) {
              var _then = getThen(entry);

              if (_then === then && entry._state !== PENDING) {
                this._settledAt(entry._state, i, entry._result);
              } else if (typeof _then !== 'function') {
                this._remaining--;
                this._result[i] = entry;
              } else if (c === Promise) {
                var promise = new c(noop);
                handleMaybeThenable(promise, entry, _then);
                this._willSettleAt(promise, i);
              } else {
                this._willSettleAt(new c(function (resolve$$) {
                  return resolve$$(entry);
                }), i);
              }
            } else {
              this._willSettleAt(resolve$$(entry), i);
            }
          };

          Enumerator.prototype._settledAt = function (state, i, value) {
            var promise = this.promise;

            if (promise._state === PENDING) {
              this._remaining--;

              if (state === REJECTED) {
                _reject(promise, value);
              } else {
                this._result[i] = value;
              }
            }

            if (this._remaining === 0) {
              fulfill(promise, this._result);
            }
          };

          Enumerator.prototype._willSettleAt = function (promise, i) {
            var enumerator = this;

            subscribe(promise, undefined, function (value) {
              return enumerator._settledAt(FULFILLED, i, value);
            }, function (reason) {
              return enumerator._settledAt(REJECTED, i, reason);
            });
          };

          /**
            `Promise.all` accepts an array of promises, and returns a new promise which
            is fulfilled with an array of fulfillment values for the passed promises, or
            rejected with the reason of the first passed promise to be rejected. It casts all
            elements of the passed iterable to promises as it runs this algorithm.
          
            Example:
          
            ```javascript
            let promise1 = resolve(1);
            let promise2 = resolve(2);
            let promise3 = resolve(3);
            let promises = [ promise1, promise2, promise3 ];
          
            Promise.all(promises).then(function(array){
              // The array here would be [ 1, 2, 3 ];
            });
            ```
          
            If any of the `promises` given to `all` are rejected, the first promise
            that is rejected will be given as an argument to the returned promises's
            rejection handler. For example:
          
            Example:
          
            ```javascript
            let promise1 = resolve(1);
            let promise2 = reject(new Error("2"));
            let promise3 = reject(new Error("3"));
            let promises = [ promise1, promise2, promise3 ];
          
            Promise.all(promises).then(function(array){
              // Code here never runs because there are rejected promises!
            }, function(error) {
              // error.message === "2"
            });
            ```
          
            @method all
            @static
            @param {Array} entries array of promises
            @param {String} label optional string for labeling the promise.
            Useful for tooling.
            @return {Promise} promise that is fulfilled when all `promises` have been
            fulfilled, or rejected if any of them become rejected.
            @static
          */
          function all(entries) {
            return new Enumerator(this, entries).promise;
          }

          /**
            `Promise.race` returns a new promise which is settled in the same way as the
            first passed promise to settle.
          
            Example:
          
            ```javascript
            let promise1 = new Promise(function(resolve, reject){
              setTimeout(function(){
                resolve('promise 1');
              }, 200);
            });
          
            let promise2 = new Promise(function(resolve, reject){
              setTimeout(function(){
                resolve('promise 2');
              }, 100);
            });
          
            Promise.race([promise1, promise2]).then(function(result){
              // result === 'promise 2' because it was resolved before promise1
              // was resolved.
            });
            ```
          
            `Promise.race` is deterministic in that only the state of the first
            settled promise matters. For example, even if other promises given to the
            `promises` array argument are resolved, but the first settled promise has
            become rejected before the other promises became fulfilled, the returned
            promise will become rejected:
          
            ```javascript
            let promise1 = new Promise(function(resolve, reject){
              setTimeout(function(){
                resolve('promise 1');
              }, 200);
            });
          
            let promise2 = new Promise(function(resolve, reject){
              setTimeout(function(){
                reject(new Error('promise 2'));
              }, 100);
            });
          
            Promise.race([promise1, promise2]).then(function(result){
              // Code here never runs
            }, function(reason){
              // reason.message === 'promise 2' because promise 2 became rejected before
              // promise 1 became fulfilled
            });
            ```
          
            An example real-world use case is implementing timeouts:
          
            ```javascript
            Promise.race([ajax('foo.json'), timeout(5000)])
            ```
          
            @method race
            @static
            @param {Array} promises array of promises to observe
            Useful for tooling.
            @return {Promise} a promise which settles in the same way as the first passed
            promise to settle.
          */
          function race(entries) {
            /*jshint validthis:true */
            var Constructor = this;

            if (!isArray(entries)) {
              return new Constructor(function (_, reject) {
                return reject(new TypeError('You must pass an array to race.'));
              });
            } else {
              return new Constructor(function (resolve, reject) {
                var length = entries.length;
                for (var i = 0; i < length; i++) {
                  Constructor.resolve(entries[i]).then(resolve, reject);
                }
              });
            }
          }

          /**
            `Promise.reject` returns a promise rejected with the passed `reason`.
            It is shorthand for the following:
          
            ```javascript
            let promise = new Promise(function(resolve, reject){
              reject(new Error('WHOOPS'));
            });
          
            promise.then(function(value){
              // Code here doesn't run because the promise is rejected!
            }, function(reason){
              // reason.message === 'WHOOPS'
            });
            ```
          
            Instead of writing the above, your code now simply becomes the following:
          
            ```javascript
            let promise = Promise.reject(new Error('WHOOPS'));
          
            promise.then(function(value){
              // Code here doesn't run because the promise is rejected!
            }, function(reason){
              // reason.message === 'WHOOPS'
            });
            ```
          
            @method reject
            @static
            @param {Any} reason value that the returned promise will be rejected with.
            Useful for tooling.
            @return {Promise} a promise rejected with the given `reason`.
          */
          function reject(reason) {
            /*jshint validthis:true */
            var Constructor = this;
            var promise = new Constructor(noop);
            _reject(promise, reason);
            return promise;
          }

          function needsResolver() {
            throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
          }

          function needsNew() {
            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
          }

          /**
            Promise objects represent the eventual result of an asynchronous operation. The
            primary way of interacting with a promise is through its `then` method, which
            registers callbacks to receive either a promise's eventual value or the reason
            why the promise cannot be fulfilled.
          
            Terminology
            -----------
          
            - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
            - `thenable` is an object or function that defines a `then` method.
            - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
            - `exception` is a value that is thrown using the throw statement.
            - `reason` is a value that indicates why a promise was rejected.
            - `settled` the final resting state of a promise, fulfilled or rejected.
          
            A promise can be in one of three states: pending, fulfilled, or rejected.
          
            Promises that are fulfilled have a fulfillment value and are in the fulfilled
            state.  Promises that are rejected have a rejection reason and are in the
            rejected state.  A fulfillment value is never a thenable.
          
            Promises can also be said to *resolve* a value.  If this value is also a
            promise, then the original promise's settled state will match the value's
            settled state.  So a promise that *resolves* a promise that rejects will
            itself reject, and a promise that *resolves* a promise that fulfills will
            itself fulfill.
          
          
            Basic Usage:
            ------------
          
            ```js
            let promise = new Promise(function(resolve, reject) {
              // on success
              resolve(value);
          
              // on failure
              reject(reason);
            });
          
            promise.then(function(value) {
              // on fulfillment
            }, function(reason) {
              // on rejection
            });
            ```
          
            Advanced Usage:
            ---------------
          
            Promises shine when abstracting away asynchronous interactions such as
            `XMLHttpRequest`s.
          
            ```js
            function getJSON(url) {
              return new Promise(function(resolve, reject){
                let xhr = new XMLHttpRequest();
          
                xhr.open('GET', url);
                xhr.onreadystatechange = handler;
                xhr.responseType = 'json';
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.send();
          
                function handler() {
                  if (this.readyState === this.DONE) {
                    if (this.status === 200) {
                      resolve(this.response);
                    } else {
                      reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
                    }
                  }
                };
              });
            }
          
            getJSON('/posts.json').then(function(json) {
              // on fulfillment
            }, function(reason) {
              // on rejection
            });
            ```
          
            Unlike callbacks, promises are great composable primitives.
          
            ```js
            Promise.all([
              getJSON('/posts'),
              getJSON('/comments')
            ]).then(function(values){
              values[0] // => postsJSON
              values[1] // => commentsJSON
          
              return values;
            });
            ```
          
            @class Promise
            @param {function} resolver
            Useful for tooling.
            @constructor
          */
          function Promise(resolver) {
            this[PROMISE_ID] = nextId();
            this._result = this._state = undefined;
            this._subscribers = [];

            if (noop !== resolver) {
              typeof resolver !== 'function' && needsResolver();
              this instanceof Promise ? initializePromise(this, resolver) : needsNew();
            }
          }

          Promise.all = all;
          Promise.race = race;
          Promise.resolve = resolve;
          Promise.reject = reject;
          Promise._setScheduler = setScheduler;
          Promise._setAsap = setAsap;
          Promise._asap = asap;

          Promise.prototype = {
            constructor: Promise,

            /**
              The primary way of interacting with a promise is through its `then` method,
              which registers callbacks to receive either a promise's eventual value or the
              reason why the promise cannot be fulfilled.
            
              ```js
              findUser().then(function(user){
                // user is available
              }, function(reason){
                // user is unavailable, and you are given the reason why
              });
              ```
            
              Chaining
              --------
            
              The return value of `then` is itself a promise.  This second, 'downstream'
              promise is resolved with the return value of the first promise's fulfillment
              or rejection handler, or rejected if the handler throws an exception.
            
              ```js
              findUser().then(function (user) {
                return user.name;
              }, function (reason) {
                return 'default name';
              }).then(function (userName) {
                // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
                // will be `'default name'`
              });
            
              findUser().then(function (user) {
                throw new Error('Found user, but still unhappy');
              }, function (reason) {
                throw new Error('`findUser` rejected and we're unhappy');
              }).then(function (value) {
                // never reached
              }, function (reason) {
                // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
                // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
              });
              ```
              If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
            
              ```js
              findUser().then(function (user) {
                throw new PedagogicalException('Upstream error');
              }).then(function (value) {
                // never reached
              }).then(function (value) {
                // never reached
              }, function (reason) {
                // The `PedgagocialException` is propagated all the way down to here
              });
              ```
            
              Assimilation
              ------------
            
              Sometimes the value you want to propagate to a downstream promise can only be
              retrieved asynchronously. This can be achieved by returning a promise in the
              fulfillment or rejection handler. The downstream promise will then be pending
              until the returned promise is settled. This is called *assimilation*.
            
              ```js
              findUser().then(function (user) {
                return findCommentsByAuthor(user);
              }).then(function (comments) {
                // The user's comments are now available
              });
              ```
            
              If the assimliated promise rejects, then the downstream promise will also reject.
            
              ```js
              findUser().then(function (user) {
                return findCommentsByAuthor(user);
              }).then(function (comments) {
                // If `findCommentsByAuthor` fulfills, we'll have the value here
              }, function (reason) {
                // If `findCommentsByAuthor` rejects, we'll have the reason here
              });
              ```
            
              Simple Example
              --------------
            
              Synchronous Example
            
              ```javascript
              let result;
            
              try {
                result = findResult();
                // success
              } catch(reason) {
                // failure
              }
              ```
            
              Errback Example
            
              ```js
              findResult(function(result, err){
                if (err) {
                  // failure
                } else {
                  // success
                }
              });
              ```
            
              Promise Example;
            
              ```javascript
              findResult().then(function(result){
                // success
              }, function(reason){
                // failure
              });
              ```
            
              Advanced Example
              --------------
            
              Synchronous Example
            
              ```javascript
              let author, books;
            
              try {
                author = findAuthor();
                books  = findBooksByAuthor(author);
                // success
              } catch(reason) {
                // failure
              }
              ```
            
              Errback Example
            
              ```js
            
              function foundBooks(books) {
            
              }
            
              function failure(reason) {
            
              }
            
              findAuthor(function(author, err){
                if (err) {
                  failure(err);
                  // failure
                } else {
                  try {
                    findBoooksByAuthor(author, function(books, err) {
                      if (err) {
                        failure(err);
                      } else {
                        try {
                          foundBooks(books);
                        } catch(reason) {
                          failure(reason);
                        }
                      }
                    });
                  } catch(error) {
                    failure(err);
                  }
                  // success
                }
              });
              ```
            
              Promise Example;
            
              ```javascript
              findAuthor().
                then(findBooksByAuthor).
                then(function(books){
                  // found books
              }).catch(function(reason){
                // something went wrong
              });
              ```
            
              @method then
              @param {Function} onFulfilled
              @param {Function} onRejected
              Useful for tooling.
              @return {Promise}
            */
            then: then,

            /**
              `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
              as the catch block of a try/catch statement.
            
              ```js
              function findAuthor(){
                throw new Error('couldn't find that author');
              }
            
              // synchronous
              try {
                findAuthor();
              } catch(reason) {
                // something went wrong
              }
            
              // async with promises
              findAuthor().catch(function(reason){
                // something went wrong
              });
              ```
            
              @method catch
              @param {Function} onRejection
              Useful for tooling.
              @return {Promise}
            */
            'catch': function _catch(onRejection) {
              return this.then(null, onRejection);
            }
          };

          function polyfill() {
            var local = undefined;

            if (typeof global !== 'undefined') {
              local = global;
            } else if (typeof self !== 'undefined') {
              local = self;
            } else {
              try {
                local = Function('return this')();
              } catch (e) {
                throw new Error('polyfill failed because global object is unavailable in this environment');
              }
            }

            var P = local.Promise;

            if (P) {
              var promiseToString = null;
              try {
                promiseToString = Object.prototype.toString.call(P.resolve());
              } catch (e) {
                // silently ignored
              }

              if (promiseToString === '[object Promise]' && !P.cast) {
                return;
              }
            }

            local.Promise = Promise;
          }

          // Strange compat..
          Promise.polyfill = polyfill;
          Promise.Promise = Promise;

          return Promise;
        });
        //# sourceMappingURL=es6-promise.map

        /* WEBPACK VAR INJECTION */
      }).call(exports, __webpack_require__(7), __webpack_require__(8));

      /***/
    },
    /* 5 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 6 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }(); /* global VERSION */

      __webpack_require__(5);

      var _es6Promise = __webpack_require__(4);

      var _es6Promise2 = _interopRequireDefault(_es6Promise);

      var _utils = __webpack_require__(0);

      var Utils = _interopRequireWildcard(_utils);

      var _api = __webpack_require__(1);

      var API = _interopRequireWildcard(_api);

      var _button = __webpack_require__(2);

      var _push = __webpack_require__(3);

      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
          }newObj.default = obj;return newObj;
        }
      }

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Noty = function () {
        /**
         * @param {object} options
         * @return {Noty}
         */
        function Noty() {
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          _classCallCheck(this, Noty);

          this.options = Utils.deepExtend({}, API.Defaults, options);
          this.id = this.options.id || Utils.generateID('bar');
          this.closeTimer = -1;
          this.barDom = null;
          this.layoutDom = null;
          this.progressDom = null;
          this.showing = false;
          this.shown = false;
          this.closed = false;
          this.closing = false;
          this.killable = this.options.timeout || this.options.closeWith.length > 0;
          this.hasSound = this.options.sounds.sources.length > 0;
          this.soundPlayed = false;
          this.listeners = {
            beforeShow: [],
            onShow: [],
            afterShow: [],
            onClose: [],
            afterClose: [],
            onClick: [],
            onHover: [],
            onTemplate: []
          };
          this.promises = {
            show: null,
            close: null
          };
          this.on('beforeShow', this.options.callbacks.beforeShow);
          this.on('onShow', this.options.callbacks.onShow);
          this.on('afterShow', this.options.callbacks.afterShow);
          this.on('onClose', this.options.callbacks.onClose);
          this.on('afterClose', this.options.callbacks.afterClose);
          this.on('onClick', this.options.callbacks.onClick);
          this.on('onHover', this.options.callbacks.onHover);
          this.on('onTemplate', this.options.callbacks.onTemplate);

          return this;
        }

        /**
         * @param {string} eventName
         * @param {function} cb
         * @return {Noty}
         */

        _createClass(Noty, [{
          key: 'on',
          value: function on(eventName) {
            var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

            if (typeof cb === 'function' && this.listeners.hasOwnProperty(eventName)) {
              this.listeners[eventName].push(cb);
            }

            return this;
          }

          /**
           * @return {Noty}
           */

        }, {
          key: 'show',
          value: function show() {
            var _this = this;

            if (this.options.killer === true) {
              Noty.closeAll();
            } else if (typeof this.options.killer === 'string') {
              Noty.closeAll(this.options.killer);
            }

            var queueCounts = API.getQueueCounts(this.options.queue);

            if (queueCounts.current >= queueCounts.maxVisible || API.PageHidden && this.options.visibilityControl) {
              API.addToQueue(this);

              if (API.PageHidden && this.hasSound && Utils.inArray('docHidden', this.options.sounds.conditions)) {
                Utils.createAudioElements(this);
              }

              if (API.PageHidden && Utils.inArray('docHidden', this.options.titleCount.conditions)) {
                API.docTitle.increment();
              }

              return this;
            }

            API.Store[this.id] = this;

            API.fire(this, 'beforeShow');

            this.showing = true;

            if (this.closing) {
              this.showing = false;
              return this;
            }

            API.build(this);
            API.handleModal(this);

            if (this.options.force) {
              this.layoutDom.insertBefore(this.barDom, this.layoutDom.firstChild);
            } else {
              this.layoutDom.appendChild(this.barDom);
            }

            if (this.hasSound && !this.soundPlayed && Utils.inArray('docVisible', this.options.sounds.conditions)) {
              Utils.createAudioElements(this);
            }

            if (Utils.inArray('docVisible', this.options.titleCount.conditions)) {
              API.docTitle.increment();
            }

            this.shown = true;
            this.closed = false;

            // bind button events if any
            if (API.hasButtons(this)) {
              Object.keys(this.options.buttons).forEach(function (key) {
                var btn = _this.barDom.querySelector('#' + _this.options.buttons[key].id);
                Utils.addListener(btn, 'click', function (e) {
                  Utils.stopPropagation(e);
                  _this.options.buttons[key].cb();
                });
              });
            }

            this.progressDom = this.barDom.querySelector('.noty_progressbar');

            if (Utils.inArray('click', this.options.closeWith)) {
              Utils.addClass(this.barDom, 'noty_close_with_click');
              Utils.addListener(this.barDom, 'click', function (e) {
                Utils.stopPropagation(e);
                API.fire(_this, 'onClick');
                _this.close();
              }, false);
            }

            Utils.addListener(this.barDom, 'mouseenter', function () {
              API.fire(_this, 'onHover');
            }, false);

            if (this.options.timeout) Utils.addClass(this.barDom, 'noty_has_timeout');
            if (this.options.progressBar) {
              Utils.addClass(this.barDom, 'noty_has_progressbar');
            }

            if (Utils.inArray('button', this.options.closeWith)) {
              Utils.addClass(this.barDom, 'noty_close_with_button');

              var closeButton = document.createElement('div');
              Utils.addClass(closeButton, 'noty_close_button');
              closeButton.innerHTML = '×';
              this.barDom.appendChild(closeButton);

              Utils.addListener(closeButton, 'click', function (e) {
                Utils.stopPropagation(e);
                _this.close();
              }, false);
            }

            API.fire(this, 'onShow');

            if (this.options.animation.open === null) {
              this.promises.show = new _es6Promise2.default(function (resolve) {
                resolve();
              });
            } else if (typeof this.options.animation.open === 'function') {
              this.promises.show = new _es6Promise2.default(this.options.animation.open.bind(this));
            } else {
              Utils.addClass(this.barDom, this.options.animation.open);
              this.promises.show = new _es6Promise2.default(function (resolve) {
                Utils.addListener(_this.barDom, Utils.animationEndEvents, function () {
                  Utils.removeClass(_this.barDom, _this.options.animation.open);
                  resolve();
                });
              });
            }

            this.promises.show.then(function () {
              var _t = _this;
              setTimeout(function () {
                API.openFlow(_t);
              }, 100);
            });

            return this;
          }

          /**
           * @return {Noty}
           */

        }, {
          key: 'stop',
          value: function stop() {
            API.dequeueClose(this);
            return this;
          }

          /**
           * @return {Noty}
           */

        }, {
          key: 'resume',
          value: function resume() {
            API.queueClose(this);
            return this;
          }

          /**
           * @param {int|boolean} ms
           * @return {Noty}
           */

        }, {
          key: 'setTimeout',
          value: function (_setTimeout) {
            function setTimeout(_x) {
              return _setTimeout.apply(this, arguments);
            }

            setTimeout.toString = function () {
              return _setTimeout.toString();
            };

            return setTimeout;
          }(function (ms) {
            this.stop();
            this.options.timeout = ms;

            if (this.barDom) {
              if (this.options.timeout) {
                Utils.addClass(this.barDom, 'noty_has_timeout');
              } else {
                Utils.removeClass(this.barDom, 'noty_has_timeout');
              }

              var _t = this;
              setTimeout(function () {
                // ugly fix for progressbar display bug
                _t.resume();
              }, 100);
            }

            return this;
          })

          /**
           * @param {string} html
           * @param {boolean} optionsOverride
           * @return {Noty}
           */

        }, {
          key: 'setText',
          value: function setText(html) {
            var optionsOverride = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (this.barDom) {
              this.barDom.querySelector('.noty_body').innerHTML = html;
            }

            if (optionsOverride) this.options.text = html;

            return this;
          }

          /**
           * @param {string} type
           * @param {boolean} optionsOverride
           * @return {Noty}
           */

        }, {
          key: 'setType',
          value: function setType(type) {
            var _this2 = this;

            var optionsOverride = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (this.barDom) {
              var classList = Utils.classList(this.barDom).split(' ');

              classList.forEach(function (c) {
                if (c.substring(0, 11) === 'noty_type__') {
                  Utils.removeClass(_this2.barDom, c);
                }
              });

              Utils.addClass(this.barDom, 'noty_type__' + type);
            }

            if (optionsOverride) this.options.type = type;

            return this;
          }

          /**
           * @param {string} theme
           * @param {boolean} optionsOverride
           * @return {Noty}
           */

        }, {
          key: 'setTheme',
          value: function setTheme(theme) {
            var _this3 = this;

            var optionsOverride = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (this.barDom) {
              var classList = Utils.classList(this.barDom).split(' ');

              classList.forEach(function (c) {
                if (c.substring(0, 12) === 'noty_theme__') {
                  Utils.removeClass(_this3.barDom, c);
                }
              });

              Utils.addClass(this.barDom, 'noty_theme__' + theme);
            }

            if (optionsOverride) this.options.theme = theme;

            return this;
          }

          /**
           * @return {Noty}
           */

        }, {
          key: 'close',
          value: function close() {
            var _this4 = this;

            if (this.closed) return this;

            if (!this.shown) {
              // it's in the queue
              API.removeFromQueue(this);
              return this;
            }

            API.fire(this, 'onClose');

            this.closing = true;

            if (this.options.animation.close === null) {
              this.promises.close = new _es6Promise2.default(function (resolve) {
                resolve();
              });
            } else if (typeof this.options.animation.close === 'function') {
              this.promises.close = new _es6Promise2.default(this.options.animation.close.bind(this));
            } else {
              Utils.addClass(this.barDom, this.options.animation.close);
              this.promises.close = new _es6Promise2.default(function (resolve) {
                Utils.addListener(_this4.barDom, Utils.animationEndEvents, function () {
                  if (_this4.options.force) {
                    Utils.remove(_this4.barDom);
                  } else {
                    API.ghostFix(_this4);
                  }
                  resolve();
                });
              });
            }

            this.promises.close.then(function () {
              API.closeFlow(_this4);
              API.handleModalClose(_this4);
            });

            this.closed = true;

            return this;
          }

          // API functions

          /**
           * @param {boolean|string} queueName
           * @return {Noty}
           */

        }], [{
          key: 'closeAll',
          value: function closeAll() {
            var queueName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            Object.keys(API.Store).forEach(function (id) {
              if (queueName) {
                if (API.Store[id].options.queue === queueName && API.Store[id].killable) {
                  API.Store[id].close();
                }
              } else if (API.Store[id].killable) {
                API.Store[id].close();
              }
            });
            return this;
          }

          /**
           * @param {Object} obj
           * @return {Noty}
           */

        }, {
          key: 'overrideDefaults',
          value: function overrideDefaults(obj) {
            API.Defaults = Utils.deepExtend({}, API.Defaults, obj);
            return this;
          }

          /**
           * @param {int} amount
           * @param {string} queueName
           * @return {Noty}
           */

        }, {
          key: 'setMaxVisible',
          value: function setMaxVisible() {
            var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : API.DefaultMaxVisible;
            var queueName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'global';

            if (!API.Queues.hasOwnProperty(queueName)) {
              API.Queues[queueName] = { maxVisible: amount, queue: [] };
            }

            API.Queues[queueName].maxVisible = amount;
            return this;
          }

          /**
           * @param {string} innerHtml
           * @param {String} classes
           * @param {Function} cb
           * @param {Object} attributes
           * @return {NotyButton}
           */

        }, {
          key: 'button',
          value: function button(innerHtml) {
            var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var cb = arguments[2];
            var attributes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            return new _button.NotyButton(innerHtml, classes, cb, attributes);
          }

          /**
           * @return {string}
           */

        }, {
          key: 'version',
          value: function version() {
            return "3.1.3";
          }

          /**
           * @param {String} workerPath
           * @return {Push}
           */

        }, {
          key: 'Push',
          value: function Push(workerPath) {
            return new _push.Push(workerPath);
          }
        }]);

        return Noty;
      }();

      // Document visibility change controller


      exports.default = Noty;
      Utils.visibilityChangeFlow();
      module.exports = exports['default'];

      /***/
    },
    /* 7 */
    /***/function (module, exports) {

      // shim for using process in browser
      var process = module.exports = {};

      // cached from whatever global is present so that test runners that stub it
      // don't break things.  But we need to wrap it in a try catch in case it is
      // wrapped in strict mode code which doesn't define any globals.  It's inside a
      // function because try/catches deoptimize in certain engines.

      var cachedSetTimeout;
      var cachedClearTimeout;

      function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
      }
      function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
      }
      (function () {
        try {
          if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
          }
        }
      }
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;

      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }

      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;

        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }

      process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };

      // v8 likes predictible objects
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function () {
        this.fun.apply(null, this.array);
      };
      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = ''; // empty string to avoid regexp issues
      process.versions = {};

      function noop() {}

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;
      process.prependListener = noop;
      process.prependOnceListener = noop;

      process.listeners = function (name) {
        return [];
      };

      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };

      process.cwd = function () {
        return '/';
      };
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };
      process.umask = function () {
        return 0;
      };

      /***/
    },
    /* 8 */
    /***/function (module, exports) {

      var g;

      // This works in non-strict mode
      g = function () {
        return this;
      }();

      try {
        // This works if eval is allowed (see CSP)
        g = g || Function("return this")() || (1, eval)("this");
      } catch (e) {
        // This works if the window reference is available
        if ((typeof window === 'undefined' ? 'undefined' : _typeof2(window)) === "object") g = window;
      }

      // g can still be undefined, but nothing to do about it...
      // We return undefined, instead of nothing here, so it's
      // easier to handle this case. if(!global) { ...}

      module.exports = g;

      /***/
    },
    /* 9 */
    /***/function (module, exports) {

      /* (ignored) */

      /***/}]
    /******/)
  );
});
//# sourceMappingURL=noty.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var diff = __webpack_require__(29);
var equal = __webpack_require__(4);
var extend = __webpack_require__(5);
var op = __webpack_require__(33);

var NULL_CHARACTER = String.fromCharCode(0); // Placeholder char for embed in diff()


var Delta = function Delta(ops) {
  // Assume we are given a well formed ops
  if (Array.isArray(ops)) {
    this.ops = ops;
  } else if (ops != null && Array.isArray(ops.ops)) {
    this.ops = ops.ops;
  } else {
    this.ops = [];
  }
};

Delta.prototype.insert = function (text, attributes) {
  var newOp = {};
  if (text.length === 0) return this;
  newOp.insert = text;
  if (attributes != null && (typeof attributes === 'undefined' ? 'undefined' : _typeof(attributes)) === 'object' && Object.keys(attributes).length > 0) {
    newOp.attributes = attributes;
  }
  return this.push(newOp);
};

Delta.prototype['delete'] = function (length) {
  if (length <= 0) return this;
  return this.push({ 'delete': length });
};

Delta.prototype.retain = function (length, attributes) {
  if (length <= 0) return this;
  var newOp = { retain: length };
  if (attributes != null && (typeof attributes === 'undefined' ? 'undefined' : _typeof(attributes)) === 'object' && Object.keys(attributes).length > 0) {
    newOp.attributes = attributes;
  }
  return this.push(newOp);
};

Delta.prototype.push = function (newOp) {
  var index = this.ops.length;
  var lastOp = this.ops[index - 1];
  newOp = extend(true, {}, newOp);
  if ((typeof lastOp === 'undefined' ? 'undefined' : _typeof(lastOp)) === 'object') {
    if (typeof newOp['delete'] === 'number' && typeof lastOp['delete'] === 'number') {
      this.ops[index - 1] = { 'delete': lastOp['delete'] + newOp['delete'] };
      return this;
    }
    // Since it does not matter if we insert before or after deleting at the same index,
    // always prefer to insert first
    if (typeof lastOp['delete'] === 'number' && newOp.insert != null) {
      index -= 1;
      lastOp = this.ops[index - 1];
      if ((typeof lastOp === 'undefined' ? 'undefined' : _typeof(lastOp)) !== 'object') {
        this.ops.unshift(newOp);
        return this;
      }
    }
    if (equal(newOp.attributes, lastOp.attributes)) {
      if (typeof newOp.insert === 'string' && typeof lastOp.insert === 'string') {
        this.ops[index - 1] = { insert: lastOp.insert + newOp.insert };
        if (_typeof(newOp.attributes) === 'object') this.ops[index - 1].attributes = newOp.attributes;
        return this;
      } else if (typeof newOp.retain === 'number' && typeof lastOp.retain === 'number') {
        this.ops[index - 1] = { retain: lastOp.retain + newOp.retain };
        if (_typeof(newOp.attributes) === 'object') this.ops[index - 1].attributes = newOp.attributes;
        return this;
      }
    }
  }
  if (index === this.ops.length) {
    this.ops.push(newOp);
  } else {
    this.ops.splice(index, 0, newOp);
  }
  return this;
};

Delta.prototype.filter = function (predicate) {
  return this.ops.filter(predicate);
};

Delta.prototype.forEach = function (predicate) {
  this.ops.forEach(predicate);
};

Delta.prototype.map = function (predicate) {
  return this.ops.map(predicate);
};

Delta.prototype.partition = function (predicate) {
  var passed = [],
      failed = [];
  this.forEach(function (op) {
    var target = predicate(op) ? passed : failed;
    target.push(op);
  });
  return [passed, failed];
};

Delta.prototype.reduce = function (predicate, initial) {
  return this.ops.reduce(predicate, initial);
};

Delta.prototype.chop = function () {
  var lastOp = this.ops[this.ops.length - 1];
  if (lastOp && lastOp.retain && !lastOp.attributes) {
    this.ops.pop();
  }
  return this;
};

Delta.prototype.length = function () {
  return this.reduce(function (length, elem) {
    return length + op.length(elem);
  }, 0);
};

Delta.prototype.slice = function (start, end) {
  start = start || 0;
  if (typeof end !== 'number') end = Infinity;
  var ops = [];
  var iter = op.iterator(this.ops);
  var index = 0;
  while (index < end && iter.hasNext()) {
    var nextOp;
    if (index < start) {
      nextOp = iter.next(start - index);
    } else {
      nextOp = iter.next(end - index);
      ops.push(nextOp);
    }
    index += op.length(nextOp);
  }
  return new Delta(ops);
};

Delta.prototype.compose = function (other) {
  var thisIter = op.iterator(this.ops);
  var otherIter = op.iterator(other.ops);
  var delta = new Delta();
  while (thisIter.hasNext() || otherIter.hasNext()) {
    if (otherIter.peekType() === 'insert') {
      delta.push(otherIter.next());
    } else if (thisIter.peekType() === 'delete') {
      delta.push(thisIter.next());
    } else {
      var length = Math.min(thisIter.peekLength(), otherIter.peekLength());
      var thisOp = thisIter.next(length);
      var otherOp = otherIter.next(length);
      if (typeof otherOp.retain === 'number') {
        var newOp = {};
        if (typeof thisOp.retain === 'number') {
          newOp.retain = length;
        } else {
          newOp.insert = thisOp.insert;
        }
        // Preserve null when composing with a retain, otherwise remove it for inserts
        var attributes = op.attributes.compose(thisOp.attributes, otherOp.attributes, typeof thisOp.retain === 'number');
        if (attributes) newOp.attributes = attributes;
        delta.push(newOp);
        // Other op should be delete, we could be an insert or retain
        // Insert + delete cancels out
      } else if (typeof otherOp['delete'] === 'number' && typeof thisOp.retain === 'number') {
        delta.push(otherOp);
      }
    }
  }
  return delta.chop();
};

Delta.prototype.concat = function (other) {
  var delta = new Delta(this.ops.slice());
  if (other.ops.length > 0) {
    delta.push(other.ops[0]);
    delta.ops = delta.ops.concat(other.ops.slice(1));
  }
  return delta;
};

Delta.prototype.diff = function (other, index) {
  if (this.ops === other.ops) {
    return new Delta();
  }
  var strings = [this, other].map(function (delta) {
    return delta.map(function (op) {
      if (op.insert != null) {
        return typeof op.insert === 'string' ? op.insert : NULL_CHARACTER;
      }
      var prep = delta === other ? 'on' : 'with';
      throw new Error('diff() called ' + prep + ' non-document');
    }).join('');
  });
  var delta = new Delta();
  var diffResult = diff(strings[0], strings[1], index);
  var thisIter = op.iterator(this.ops);
  var otherIter = op.iterator(other.ops);
  diffResult.forEach(function (component) {
    var length = component[1].length;
    while (length > 0) {
      var opLength = 0;
      switch (component[0]) {
        case diff.INSERT:
          opLength = Math.min(otherIter.peekLength(), length);
          delta.push(otherIter.next(opLength));
          break;
        case diff.DELETE:
          opLength = Math.min(length, thisIter.peekLength());
          thisIter.next(opLength);
          delta['delete'](opLength);
          break;
        case diff.EQUAL:
          opLength = Math.min(thisIter.peekLength(), otherIter.peekLength(), length);
          var thisOp = thisIter.next(opLength);
          var otherOp = otherIter.next(opLength);
          if (equal(thisOp.insert, otherOp.insert)) {
            delta.retain(opLength, op.attributes.diff(thisOp.attributes, otherOp.attributes));
          } else {
            delta.push(otherOp)['delete'](opLength);
          }
          break;
      }
      length -= opLength;
    }
  });
  return delta.chop();
};

Delta.prototype.eachLine = function (predicate, newline) {
  newline = newline || '\n';
  var iter = op.iterator(this.ops);
  var line = new Delta();
  var i = 0;
  while (iter.hasNext()) {
    if (iter.peekType() !== 'insert') return;
    var thisOp = iter.peek();
    var start = op.length(thisOp) - iter.peekLength();
    var index = typeof thisOp.insert === 'string' ? thisOp.insert.indexOf(newline, start) - start : -1;
    if (index < 0) {
      line.push(iter.next());
    } else if (index > 0) {
      line.push(iter.next(index));
    } else {
      if (predicate(line, iter.next(1).attributes || {}, i) === false) {
        return;
      }
      i += 1;
      line = new Delta();
    }
  }
  if (line.length() > 0) {
    predicate(line, {}, i);
  }
};

Delta.prototype.transform = function (other, priority) {
  priority = !!priority;
  if (typeof other === 'number') {
    return this.transformPosition(other, priority);
  }
  var thisIter = op.iterator(this.ops);
  var otherIter = op.iterator(other.ops);
  var delta = new Delta();
  while (thisIter.hasNext() || otherIter.hasNext()) {
    if (thisIter.peekType() === 'insert' && (priority || otherIter.peekType() !== 'insert')) {
      delta.retain(op.length(thisIter.next()));
    } else if (otherIter.peekType() === 'insert') {
      delta.push(otherIter.next());
    } else {
      var length = Math.min(thisIter.peekLength(), otherIter.peekLength());
      var thisOp = thisIter.next(length);
      var otherOp = otherIter.next(length);
      if (thisOp['delete']) {
        // Our delete either makes their delete redundant or removes their retain
        continue;
      } else if (otherOp['delete']) {
        delta.push(otherOp);
      } else {
        // We retain either their retain or insert
        delta.retain(length, op.attributes.transform(thisOp.attributes, otherOp.attributes, priority));
      }
    }
  }
  return delta.chop();
};

Delta.prototype.transformPosition = function (index, priority) {
  priority = !!priority;
  var thisIter = op.iterator(this.ops);
  var offset = 0;
  while (thisIter.hasNext() && offset <= index) {
    var length = thisIter.peekLength();
    var nextType = thisIter.peekType();
    thisIter.next();
    if (nextType === 'delete') {
      index -= Math.min(length, index - offset);
      continue;
    } else if (nextType === 'insert' && (offset < index || !priority)) {
      index += length;
    }
    offset += length;
  }
  return index;
};

module.exports = Delta;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var equal = __webpack_require__(4);
var extend = __webpack_require__(5);

var lib = {
  attributes: {
    compose: function compose(a, b, keepNull) {
      if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== 'object') a = {};
      if ((typeof b === 'undefined' ? 'undefined' : _typeof(b)) !== 'object') b = {};
      var attributes = extend(true, {}, b);
      if (!keepNull) {
        attributes = Object.keys(attributes).reduce(function (copy, key) {
          if (attributes[key] != null) {
            copy[key] = attributes[key];
          }
          return copy;
        }, {});
      }
      for (var key in a) {
        if (a[key] !== undefined && b[key] === undefined) {
          attributes[key] = a[key];
        }
      }
      return Object.keys(attributes).length > 0 ? attributes : undefined;
    },

    diff: function diff(a, b) {
      if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== 'object') a = {};
      if ((typeof b === 'undefined' ? 'undefined' : _typeof(b)) !== 'object') b = {};
      var attributes = Object.keys(a).concat(Object.keys(b)).reduce(function (attributes, key) {
        if (!equal(a[key], b[key])) {
          attributes[key] = b[key] === undefined ? null : b[key];
        }
        return attributes;
      }, {});
      return Object.keys(attributes).length > 0 ? attributes : undefined;
    },

    transform: function transform(a, b, priority) {
      if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== 'object') return b;
      if ((typeof b === 'undefined' ? 'undefined' : _typeof(b)) !== 'object') return undefined;
      if (!priority) return b; // b simply overwrites us without priority
      var attributes = Object.keys(b).reduce(function (attributes, key) {
        if (a[key] === undefined) attributes[key] = b[key]; // null is a valid value
        return attributes;
      }, {});
      return Object.keys(attributes).length > 0 ? attributes : undefined;
    }
  },

  iterator: function iterator(ops) {
    return new Iterator(ops);
  },

  length: function length(op) {
    if (typeof op['delete'] === 'number') {
      return op['delete'];
    } else if (typeof op.retain === 'number') {
      return op.retain;
    } else {
      return typeof op.insert === 'string' ? op.insert.length : 1;
    }
  }
};

function Iterator(ops) {
  this.ops = ops;
  this.index = 0;
  this.offset = 0;
};

Iterator.prototype.hasNext = function () {
  return this.peekLength() < Infinity;
};

Iterator.prototype.next = function (length) {
  if (!length) length = Infinity;
  var nextOp = this.ops[this.index];
  if (nextOp) {
    var offset = this.offset;
    var opLength = lib.length(nextOp);
    if (length >= opLength - offset) {
      length = opLength - offset;
      this.index += 1;
      this.offset = 0;
    } else {
      this.offset += length;
    }
    if (typeof nextOp['delete'] === 'number') {
      return { 'delete': length };
    } else {
      var retOp = {};
      if (nextOp.attributes) {
        retOp.attributes = nextOp.attributes;
      }
      if (typeof nextOp.retain === 'number') {
        retOp.retain = length;
      } else if (typeof nextOp.insert === 'string') {
        retOp.insert = nextOp.insert.substr(offset, length);
      } else {
        // offset should === 0, length should === 1
        retOp.insert = nextOp.insert;
      }
      return retOp;
    }
  } else {
    return { retain: Infinity };
  }
};

Iterator.prototype.peek = function () {
  return this.ops[this.index];
};

Iterator.prototype.peekLength = function () {
  if (this.ops[this.index]) {
    // Should never return 0 if our index is being managed correctly
    return lib.length(this.ops[this.index]) - this.offset;
  } else {
    return Infinity;
  }
};

Iterator.prototype.peekType = function () {
  if (this.ops[this.index]) {
    if (typeof this.ops[this.index]['delete'] === 'number') {
      return 'delete';
    } else if (typeof this.ops[this.index].retain === 'number') {
      return 'retain';
    } else {
      return 'insert';
    }
  }
  return 'retain';
};

module.exports = lib;

/***/ }),
/* 34 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * RangeFix v0.2.5
 * https://github.com/edg2s/rangefix
 *
 * Copyright 2014-17 Ed Sanders.
 * Released under the MIT license
 */
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(factory);
	} else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof exports.nodeName !== 'string') {
		// CommonJS
		module.exports = factory();
	} else {
		// Browser globals
		root.RangeFix = factory();
	}
})(this, function () {

	var broken,
	    rangeFix = {};

	/**
  * Check if bugs are present in the native functions
  *
  * For getClientRects, constructs two lines of text and
  * creates a range between them. Broken browsers will
  * return three rectangles instead of two.
  *
  * For getBoundingClientRect, create a collapsed range
  * and check if the resulting rect has non-zero offsets.
  *
  * getBoundingClientRect is also considered broken if
  * getClientRects is broken.
  *
  * For the IE zoom bug, just check the version number as
  * we can't detect the bug if the zoom level is currently 100%.
  *
  * @private
  * @return {Object} Object containing boolean properties 'getClientRects',
  *                  'getBoundingClientRect' and 'ieZoom' indicating bugs are present
  *                  in these functions/browsers.
  */
	function isBroken() {
		var boundingRect, p, span, t1, t2, img, range, jscriptVersion;

		if (broken === undefined) {
			p = document.createElement('p');
			span = document.createElement('span');
			t1 = document.createTextNode('aa');
			t2 = document.createTextNode('aa');
			img = document.createElement('img');
			img.setAttribute('src', '#null');
			range = document.createRange();

			broken = {};

			p.appendChild(t1);
			p.appendChild(span);
			span.appendChild(img);
			span.appendChild(t2);

			document.body.appendChild(p);

			range.setStart(t1, 1);
			range.setEnd(span, 0);

			// A selection ending just inside another element shouldn't select that whole element
			// Broken in Chrome <= 55 and Firefox
			broken.getClientRects = broken.getBoundingClientRect = range.getClientRects().length > 1;

			if (!broken.getClientRects) {
				// A selection across a wrapped image should give a rect for that image
				// Regression in Chrome 55
				range.setEnd(t2, 1);
				broken.getClientRects = broken.getBoundingClientRect = range.getClientRects().length < 3;
			}

			if (!broken.getBoundingClientRect) {
				// Safari doesn't return a valid bounding rect for collapsed ranges
				// Equivalent to range.collapse( true ) which isn't well supported
				range.setEnd(range.startContainer, range.startOffset);
				boundingRect = range.getBoundingClientRect();
				broken.getBoundingClientRect = boundingRect.top === 0 && boundingRect.left === 0;
			}

			document.body.removeChild(p);

			// Detect IE<=10 where zooming scaling is broken
			// eslint-disable-next-line no-new-func
			jscriptVersion = window.ActiveXObject && new Function('/*@cc_on return @_jscript_version; @*/')();
			broken.ieZoom = jscriptVersion && jscriptVersion <= 10;
		}
		return broken;
	}

	/**
  * Compensate for the current zoom level in IE<=10
  *
  * getClientRects returns values in real pixels in these browsers,
  * so using them in your CSS will result in them getting scaled again.
  *
  * @private
  * @param {ClientRectList|ClientRect[]|ClientRect|Object|null} rectOrRects Rect or list of rects to fix
  * @return {ClientRectList|ClientRect[]|ClientRect|Object|null} Fixed rect or list of rects
  */
	function zoomFix(rectOrRects) {
		var zoom;
		if (!rectOrRects) {
			return rectOrRects;
		}
		// Optimisation when zoom level is 1: return original object
		if (screen.deviceXDPI === screen.logicalXDPI) {
			return rectOrRects;
		}
		// Rect list: map this function to each rect
		if ('length' in rectOrRects) {
			return Array.prototype.map.call(rectOrRects, zoomFix);
		}
		// Single rect: Adjust by zoom factor
		zoom = screen.deviceXDPI / screen.logicalXDPI;
		return {
			top: rectOrRects.top / zoom,
			bottom: rectOrRects.bottom / zoom,
			left: rectOrRects.left / zoom,
			right: rectOrRects.right / zoom,
			width: rectOrRects.width / zoom,
			height: rectOrRects.height / zoom
		};
	}

	/**
  * Push one array-like object onto another.
  *
  * @param {Object} arr Array or array-like object. Will be modified
  * @param {Object} data Array-like object of items to insert.
  * @return {number} length of the new array
  */
	function batchPush(arr, data) {
		// We need to push insertion in batches, because of parameter list length limits which vary
		// cross-browser - 1024 seems to be a safe batch size on all browsers
		var length,
		    index = 0,
		    batchSize = 1024;
		if (batchSize >= data.length) {
			// Avoid slicing for small lists
			return Array.prototype.push.apply(arr, data);
		}
		while (index < data.length) {
			// Call arr.push( i0, i1, i2, ..., i1023 );
			length = Array.prototype.push.apply(arr, Array.prototype.slice.call(data, index, index + batchSize));
			index += batchSize;
		}
		return length;
	}

	/**
  * Get client rectangles from a range
  *
  * @param {Range} range Range
  * @return {ClientRectList|ClientRect[]} ClientRectList or list of ClientRect objects describing range
  */
	rangeFix.getClientRects = function (range) {
		var rects,
		    endContainer,
		    endOffset,
		    partialRange,
		    broken = isBroken();

		if (broken.ieZoom) {
			return zoomFix(range.getClientRects());
		} else if (!broken.getClientRects) {
			return range.getClientRects();
		}

		// Chrome gets the end container rects wrong when spanning
		// nodes so we need to traverse up the tree from the endContainer until
		// we reach the common ancestor, then we can add on from start to where
		// we got up to
		// https://code.google.com/p/chromium/issues/detail?id=324437
		rects = [];
		endContainer = range.endContainer;
		endOffset = range.endOffset;
		partialRange = document.createRange();

		while (endContainer !== range.commonAncestorContainer) {
			partialRange.setStart(endContainer, 0);
			partialRange.setEnd(endContainer, endOffset);

			batchPush(rects, partialRange.getClientRects());

			endOffset = Array.prototype.indexOf.call(endContainer.parentNode.childNodes, endContainer);
			endContainer = endContainer.parentNode;
		}

		// Once we've reached the common ancestor, add on the range from the
		// original start position to where we ended up.
		partialRange = range.cloneRange();
		partialRange.setEnd(endContainer, endOffset);
		batchPush(rects, partialRange.getClientRects());
		return rects;
	};

	/**
  * Get bounding rectangle from a range
  *
  * @param {Range} range Range
  * @return {ClientRect|Object|null} ClientRect or ClientRect-like object describing
  *                                  bounding rectangle, or null if not computable
  */
	rangeFix.getBoundingClientRect = function (range) {
		var i,
		    l,
		    boundingRect,
		    rect,
		    nativeBoundingRect,
		    broken,
		    rects = this.getClientRects(range);

		// If there are no rects return null, otherwise we'll fall through to
		// getBoundingClientRect, which in Chrome and Firefox becomes [0,0,0,0].
		if (rects.length === 0) {
			return null;
		}

		nativeBoundingRect = range.getBoundingClientRect();
		broken = isBroken();

		if (broken.ieZoom) {
			return zoomFix(nativeBoundingRect);
		} else if (!broken.getBoundingClientRect) {
			return nativeBoundingRect;
		}

		// When nativeRange is a collapsed cursor at the end of a line or
		// the start of a line, the bounding rect is [0,0,0,0] in Chrome.
		// getClientRects returns two rects, one correct, and one at the
		// end of the next line / start of the previous line. We can't tell
		// here which one to use so just pick the first. This matches
		// Firefox's behaviour, which tells you the cursor is at the end
		// of the previous line when it is at the start of the line.
		// See https://code.google.com/p/chromium/issues/detail?id=426017
		if (nativeBoundingRect.width === 0 && nativeBoundingRect.height === 0) {
			return rects[0];
		}

		for (i = 0, l = rects.length; i < l; i++) {
			rect = rects[i];
			if (!boundingRect) {
				boundingRect = {
					left: rect.left,
					top: rect.top,
					right: rect.right,
					bottom: rect.bottom
				};
			} else {
				boundingRect.left = Math.min(boundingRect.left, rect.left);
				boundingRect.top = Math.min(boundingRect.top, rect.top);
				boundingRect.right = Math.max(boundingRect.right, rect.right);
				boundingRect.bottom = Math.max(boundingRect.bottom, rect.bottom);
			}
		}
		if (boundingRect) {
			boundingRect.width = boundingRect.right - boundingRect.left;
			boundingRect.height = boundingRect.bottom - boundingRect.top;
		}
		return boundingRect;
	};

	return rangeFix;
});

/***/ }),
/* 35 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".noty_layout_mixin, #noty_layout__top, #noty_layout__topLeft, #noty_layout__topCenter, #noty_layout__topRight, #noty_layout__bottom, #noty_layout__bottomLeft, #noty_layout__bottomCenter, #noty_layout__bottomRight, #noty_layout__center, #noty_layout__centerLeft, #noty_layout__centerRight {\n  position: fixed;\n  margin: 0;\n  padding: 0;\n  z-index: 9999999;\n  -webkit-transform: translateZ(0) scale(1, 1);\n  transform: translateZ(0) scale(1, 1);\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -webkit-font-smoothing: subpixel-antialiased;\n  filter: blur(0);\n  -webkit-filter: blur(0);\n  max-width: 90%; }\n\n#noty_layout__top {\n  top: 0;\n  left: 5%;\n  width: 90%; }\n\n#noty_layout__topLeft {\n  top: 20px;\n  left: 20px;\n  width: 325px; }\n\n#noty_layout__topCenter {\n  top: 5%;\n  left: 50%;\n  width: 325px;\n  -webkit-transform: translate(calc(-50% - .5px)) translateZ(0) scale(1, 1);\n  transform: translate(calc(-50% - .5px)) translateZ(0) scale(1, 1); }\n\n#noty_layout__topRight {\n  top: 20px;\n  right: 20px;\n  width: 325px; }\n\n#noty_layout__bottom {\n  bottom: 0;\n  left: 5%;\n  width: 90%; }\n\n#noty_layout__bottomLeft {\n  bottom: 20px;\n  left: 20px;\n  width: 325px; }\n\n#noty_layout__bottomCenter {\n  bottom: 5%;\n  left: 50%;\n  width: 325px;\n  -webkit-transform: translate(calc(-50% - .5px)) translateZ(0) scale(1, 1);\n  transform: translate(calc(-50% - .5px)) translateZ(0) scale(1, 1); }\n\n#noty_layout__bottomRight {\n  bottom: 20px;\n  right: 20px;\n  width: 325px; }\n\n#noty_layout__center {\n  top: 50%;\n  left: 50%;\n  width: 325px;\n  -webkit-transform: translate(calc(-50% - .5px), calc(-50% - .5px)) translateZ(0) scale(1, 1);\n  transform: translate(calc(-50% - .5px), calc(-50% - .5px)) translateZ(0) scale(1, 1); }\n\n#noty_layout__centerLeft {\n  top: 50%;\n  left: 20px;\n  width: 325px;\n  -webkit-transform: translate(0, calc(-50% - .5px)) translateZ(0) scale(1, 1);\n  transform: translate(0, calc(-50% - .5px)) translateZ(0) scale(1, 1); }\n\n#noty_layout__centerRight {\n  top: 50%;\n  right: 20px;\n  width: 325px;\n  -webkit-transform: translate(0, calc(-50% - .5px)) translateZ(0) scale(1, 1);\n  transform: translate(0, calc(-50% - .5px)) translateZ(0) scale(1, 1); }\n\n.noty_progressbar {\n  display: none; }\n\n.noty_has_timeout.noty_has_progressbar .noty_progressbar {\n  display: block;\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  height: 3px;\n  width: 100%;\n  background-color: #646464;\n  opacity: 0.2;\n  filter: alpha(opacity=10); }\n\n.noty_bar {\n  -webkit-backface-visibility: hidden;\n  -webkit-transform: translate(0, 0) translateZ(0) scale(1, 1);\n  transform: translate(0, 0) scale(1, 1);\n  -webkit-font-smoothing: subpixel-antialiased;\n  overflow: hidden; }\n\n.noty_effects_open {\n  opacity: 0;\n  -webkit-transform: translate(50%);\n  transform: translate(50%);\n  -webkit-animation: noty_anim_in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);\n  animation: noty_anim_in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);\n  -webkit-animation-fill-mode: forwards;\n  animation-fill-mode: forwards; }\n\n.noty_effects_close {\n  -webkit-animation: noty_anim_out 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);\n  animation: noty_anim_out 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);\n  -webkit-animation-fill-mode: forwards;\n  animation-fill-mode: forwards; }\n\n.noty_fix_effects_height {\n  -webkit-animation: noty_anim_height 75ms ease-out;\n  animation: noty_anim_height 75ms ease-out; }\n\n.noty_close_with_click {\n  cursor: pointer; }\n\n.noty_close_button {\n  position: absolute;\n  top: 2px;\n  right: 2px;\n  font-weight: bold;\n  width: 20px;\n  height: 20px;\n  text-align: center;\n  line-height: 20px;\n  background-color: rgba(0, 0, 0, 0.05);\n  border-radius: 2px;\n  cursor: pointer;\n  -webkit-transition: all .2s ease-out;\n  transition: all .2s ease-out; }\n\n.noty_close_button:hover {\n  background-color: rgba(0, 0, 0, 0.1); }\n\n.noty_modal {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  background-color: #000;\n  z-index: 10000;\n  opacity: .3;\n  left: 0;\n  top: 0; }\n\n.noty_modal.noty_modal_open {\n  opacity: 0;\n  -webkit-animation: noty_modal_in .3s ease-out;\n  animation: noty_modal_in .3s ease-out; }\n\n.noty_modal.noty_modal_close {\n  -webkit-animation: noty_modal_out .3s ease-out;\n  animation: noty_modal_out .3s ease-out;\n  -webkit-animation-fill-mode: forwards;\n  animation-fill-mode: forwards; }\n\n@-webkit-keyframes noty_modal_in {\n  100% {\n    opacity: .3; } }\n\n@keyframes noty_modal_in {\n  100% {\n    opacity: .3; } }\n\n@-webkit-keyframes noty_modal_out {\n  100% {\n    opacity: 0; } }\n\n@keyframes noty_modal_out {\n  100% {\n    opacity: 0; } }\n\n@keyframes noty_modal_out {\n  100% {\n    opacity: 0; } }\n\n@-webkit-keyframes noty_anim_in {\n  100% {\n    -webkit-transform: translate(0);\n    transform: translate(0);\n    opacity: 1; } }\n\n@keyframes noty_anim_in {\n  100% {\n    -webkit-transform: translate(0);\n    transform: translate(0);\n    opacity: 1; } }\n\n@-webkit-keyframes noty_anim_out {\n  100% {\n    -webkit-transform: translate(50%);\n    transform: translate(50%);\n    opacity: 0; } }\n\n@keyframes noty_anim_out {\n  100% {\n    -webkit-transform: translate(50%);\n    transform: translate(50%);\n    opacity: 0; } }\n\n@-webkit-keyframes noty_anim_height {\n  100% {\n    height: 0; } }\n\n@keyframes noty_anim_height {\n  100% {\n    height: 0; } }\n\n.noty_theme__relax.noty_bar {\n  margin: 4px 0;\n  overflow: hidden;\n  border-radius: 2px;\n  position: relative; }\n\n.noty_theme__relax.noty_bar .noty_body {\n  padding: 10px; }\n\n.noty_theme__relax.noty_bar .noty_buttons {\n  border-top: 1px solid #e7e7e7;\n  padding: 5px 10px; }\n\n.noty_theme__relax.noty_type__alert,\n.noty_theme__relax.noty_type__notification {\n  background-color: #fff;\n  border: 1px solid #dedede;\n  color: #444; }\n\n.noty_theme__relax.noty_type__warning {\n  background-color: #FFEAA8;\n  border: 1px solid #FFC237;\n  color: #826200; }\n\n.noty_theme__relax.noty_type__warning .noty_buttons {\n  border-color: #dfaa30; }\n\n.noty_theme__relax.noty_type__error {\n  background-color: #FF8181;\n  border: 1px solid #e25353;\n  color: #FFF; }\n\n.noty_theme__relax.noty_type__error .noty_buttons {\n  border-color: darkred; }\n\n.noty_theme__relax.noty_type__info,\n.noty_theme__relax.noty_type__information {\n  background-color: #78C5E7;\n  border: 1px solid #3badd6;\n  color: #FFF; }\n\n.noty_theme__relax.noty_type__info .noty_buttons,\n.noty_theme__relax.noty_type__information .noty_buttons {\n  border-color: #0B90C4; }\n\n.noty_theme__relax.noty_type__success {\n  background-color: #BCF5BC;\n  border: 1px solid #7cdd77;\n  color: darkgreen; }\n\n.noty_theme__relax.noty_type__success .noty_buttons {\n  border-color: #50C24E; }\n\n.noty_theme__metroui.noty_bar {\n  margin: 4px 0;\n  overflow: hidden;\n  position: relative;\n  -webkit-box-shadow: rgba(0, 0, 0, 0.298039) 0 0 5px 0;\n  box-shadow: rgba(0, 0, 0, 0.298039) 0 0 5px 0; }\n\n.noty_theme__metroui.noty_bar .noty_progressbar {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  height: 3px;\n  width: 100%;\n  background-color: #000;\n  opacity: 0.2;\n  filter: alpha(opacity=20); }\n\n.noty_theme__metroui.noty_bar .noty_body {\n  padding: 1.25em;\n  font-size: 14px; }\n\n.noty_theme__metroui.noty_bar .noty_buttons {\n  padding: 0 10px .5em 10px; }\n\n.noty_theme__metroui.noty_type__alert,\n.noty_theme__metroui.noty_type__notification {\n  background-color: #fff;\n  color: #1d1d1d; }\n\n.noty_theme__metroui.noty_type__warning {\n  background-color: #FA6800;\n  color: #fff; }\n\n.noty_theme__metroui.noty_type__error {\n  background-color: #CE352C;\n  color: #FFF; }\n\n.noty_theme__metroui.noty_type__info,\n.noty_theme__metroui.noty_type__information {\n  background-color: #1BA1E2;\n  color: #FFF; }\n\n.noty_theme__metroui.noty_type__success {\n  background-color: #60A917;\n  color: #fff; }\n\n.noty_theme__mint.noty_bar {\n  margin: 4px 0;\n  overflow: hidden;\n  border-radius: 2px;\n  position: relative; }\n\n.noty_theme__mint.noty_bar .noty_body {\n  padding: 10px;\n  font-size: 14px; }\n\n.noty_theme__mint.noty_bar .noty_buttons {\n  padding: 10px; }\n\n.noty_theme__mint.noty_type__alert,\n.noty_theme__mint.noty_type__notification {\n  background-color: #fff;\n  border-bottom: 1px solid #D1D1D1;\n  color: #2F2F2F; }\n\n.noty_theme__mint.noty_type__warning {\n  background-color: #FFAE42;\n  border-bottom: 1px solid #E89F3C;\n  color: #fff; }\n\n.noty_theme__mint.noty_type__error {\n  background-color: #DE636F;\n  border-bottom: 1px solid #CA5A65;\n  color: #fff; }\n\n.noty_theme__mint.noty_type__info,\n.noty_theme__mint.noty_type__information {\n  background-color: #7F7EFF;\n  border-bottom: 1px solid #7473E8;\n  color: #fff; }\n\n.noty_theme__mint.noty_type__success {\n  background-color: #AFC765;\n  border-bottom: 1px solid #A0B55C;\n  color: #fff; }\n\n.noty_theme__sunset.noty_bar {\n  margin: 4px 0;\n  overflow: hidden;\n  border-radius: 2px;\n  position: relative; }\n\n.noty_theme__sunset.noty_bar .noty_body {\n  padding: 10px;\n  font-size: 14px;\n  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1); }\n\n.noty_theme__sunset.noty_bar .noty_buttons {\n  padding: 10px; }\n\n.noty_theme__sunset.noty_type__alert,\n.noty_theme__sunset.noty_type__notification {\n  background-color: #073B4C;\n  color: #fff; }\n\n.noty_theme__sunset.noty_type__alert .noty_progressbar,\n.noty_theme__sunset.noty_type__notification .noty_progressbar {\n  background-color: #fff; }\n\n.noty_theme__sunset.noty_type__warning {\n  background-color: #FFD166;\n  color: #fff; }\n\n.noty_theme__sunset.noty_type__error {\n  background-color: #EF476F;\n  color: #fff; }\n\n.noty_theme__sunset.noty_type__error .noty_progressbar {\n  opacity: .4; }\n\n.noty_theme__sunset.noty_type__info,\n.noty_theme__sunset.noty_type__information {\n  background-color: #118AB2;\n  color: #fff; }\n\n.noty_theme__sunset.noty_type__info .noty_progressbar,\n.noty_theme__sunset.noty_type__information .noty_progressbar {\n  opacity: .6; }\n\n.noty_theme__sunset.noty_type__success {\n  background-color: #06D6A0;\n  color: #fff; }\n\n.noty_theme__bootstrap-v3.noty_bar {\n  margin: 4px 0;\n  overflow: hidden;\n  position: relative;\n  border: 1px solid transparent;\n  border-radius: 4px; }\n\n.noty_theme__bootstrap-v3.noty_bar .noty_body {\n  padding: 15px; }\n\n.noty_theme__bootstrap-v3.noty_bar .noty_buttons {\n  padding: 10px; }\n\n.noty_theme__bootstrap-v3.noty_bar .noty_close_button {\n  font-size: 21px;\n  font-weight: 700;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  filter: alpha(opacity=20);\n  opacity: .2;\n  background: transparent; }\n\n.noty_theme__bootstrap-v3.noty_bar .noty_close_button:hover {\n  background: transparent;\n  text-decoration: none;\n  cursor: pointer;\n  filter: alpha(opacity=50);\n  opacity: .5; }\n\n.noty_theme__bootstrap-v3.noty_type__alert,\n.noty_theme__bootstrap-v3.noty_type__notification {\n  background-color: #fff;\n  color: inherit; }\n\n.noty_theme__bootstrap-v3.noty_type__warning {\n  background-color: #fcf8e3;\n  color: #8a6d3b;\n  border-color: #faebcc; }\n\n.noty_theme__bootstrap-v3.noty_type__error {\n  background-color: #f2dede;\n  color: #a94442;\n  border-color: #ebccd1; }\n\n.noty_theme__bootstrap-v3.noty_type__info,\n.noty_theme__bootstrap-v3.noty_type__information {\n  background-color: #d9edf7;\n  color: #31708f;\n  border-color: #bce8f1; }\n\n.noty_theme__bootstrap-v3.noty_type__success {\n  background-color: #dff0d8;\n  color: #3c763d;\n  border-color: #d6e9c6; }\n\n.noty_theme__bootstrap-v4.noty_bar {\n  margin: 4px 0;\n  overflow: hidden;\n  position: relative;\n  border: 1px solid transparent;\n  border-radius: .25rem; }\n\n.noty_theme__bootstrap-v4.noty_bar .noty_body {\n  padding: .75rem 1.25rem; }\n\n.noty_theme__bootstrap-v4.noty_bar .noty_buttons {\n  padding: 10px; }\n\n.noty_theme__bootstrap-v4.noty_bar .noty_close_button {\n  font-size: 1.5rem;\n  font-weight: 700;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  filter: alpha(opacity=20);\n  opacity: .5;\n  background: transparent; }\n\n.noty_theme__bootstrap-v4.noty_bar .noty_close_button:hover {\n  background: transparent;\n  text-decoration: none;\n  cursor: pointer;\n  filter: alpha(opacity=50);\n  opacity: .75; }\n\n.noty_theme__bootstrap-v4.noty_type__alert,\n.noty_theme__bootstrap-v4.noty_type__notification {\n  background-color: #fff;\n  color: inherit; }\n\n.noty_theme__bootstrap-v4.noty_type__warning {\n  background-color: #fcf8e3;\n  color: #8a6d3b;\n  border-color: #faebcc; }\n\n.noty_theme__bootstrap-v4.noty_type__error {\n  background-color: #f2dede;\n  color: #a94442;\n  border-color: #ebccd1; }\n\n.noty_theme__bootstrap-v4.noty_type__info,\n.noty_theme__bootstrap-v4.noty_type__information {\n  background-color: #d9edf7;\n  color: #31708f;\n  border-color: #bce8f1; }\n\n.noty_theme__bootstrap-v4.noty_type__success {\n  background-color: #dff0d8;\n  color: #3c763d;\n  border-color: #d6e9c6; }\n\n.noty_theme__semanticui.noty_bar {\n  margin: 4px 0;\n  overflow: hidden;\n  position: relative;\n  border: 1px solid transparent;\n  font-size: 1em;\n  border-radius: .28571429rem;\n  -webkit-box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.22) inset, 0 0 0 0 transparent;\n  box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.22) inset, 0 0 0 0 transparent; }\n\n.noty_theme__semanticui.noty_bar .noty_body {\n  padding: 1em 1.5em;\n  line-height: 1.4285em; }\n\n.noty_theme__semanticui.noty_bar .noty_buttons {\n  padding: 10px; }\n\n.noty_theme__semanticui.noty_type__alert,\n.noty_theme__semanticui.noty_type__notification {\n  background-color: #f8f8f9;\n  color: rgba(0, 0, 0, 0.87); }\n\n.noty_theme__semanticui.noty_type__warning {\n  background-color: #fffaf3;\n  color: #573a08;\n  -webkit-box-shadow: 0 0 0 1px #c9ba9b inset, 0 0 0 0 transparent;\n  box-shadow: 0 0 0 1px #c9ba9b inset, 0 0 0 0 transparent; }\n\n.noty_theme__semanticui.noty_type__error {\n  background-color: #fff6f6;\n  color: #9f3a38;\n  -webkit-box-shadow: 0 0 0 1px #e0b4b4 inset, 0 0 0 0 transparent;\n  box-shadow: 0 0 0 1px #e0b4b4 inset, 0 0 0 0 transparent; }\n\n.noty_theme__semanticui.noty_type__info,\n.noty_theme__semanticui.noty_type__information {\n  background-color: #f8ffff;\n  color: #276f86;\n  -webkit-box-shadow: 0 0 0 1px #a9d5de inset, 0 0 0 0 transparent;\n  box-shadow: 0 0 0 1px #a9d5de inset, 0 0 0 0 transparent; }\n\n.noty_theme__semanticui.noty_type__success {\n  background-color: #fcfff5;\n  color: #2c662d;\n  -webkit-box-shadow: 0 0 0 1px #a3c293 inset, 0 0 0 0 transparent;\n  box-shadow: 0 0 0 1px #a3c293 inset, 0 0 0 0 transparent; }\n\n.noty_theme__nest.noty_bar {\n  margin: 0 0 15px 0;\n  overflow: hidden;\n  border-radius: 2px;\n  position: relative;\n  -webkit-box-shadow: rgba(0, 0, 0, 0.098039) 5px 4px 10px 0;\n  box-shadow: rgba(0, 0, 0, 0.098039) 5px 4px 10px 0; }\n\n.noty_theme__nest.noty_bar .noty_body {\n  padding: 10px;\n  font-size: 14px;\n  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1); }\n\n.noty_theme__nest.noty_bar .noty_buttons {\n  padding: 10px; }\n\n.noty_layout .noty_theme__nest.noty_bar {\n  z-index: 5; }\n\n.noty_layout .noty_theme__nest.noty_bar:nth-child(2) {\n  position: absolute;\n  top: 0;\n  margin-top: 4px;\n  margin-right: -4px;\n  margin-left: 4px;\n  z-index: 4;\n  width: 100%; }\n\n.noty_layout .noty_theme__nest.noty_bar:nth-child(3) {\n  position: absolute;\n  top: 0;\n  margin-top: 8px;\n  margin-right: -8px;\n  margin-left: 8px;\n  z-index: 3;\n  width: 100%; }\n\n.noty_layout .noty_theme__nest.noty_bar:nth-child(4) {\n  position: absolute;\n  top: 0;\n  margin-top: 12px;\n  margin-right: -12px;\n  margin-left: 12px;\n  z-index: 2;\n  width: 100%; }\n\n.noty_layout .noty_theme__nest.noty_bar:nth-child(5) {\n  position: absolute;\n  top: 0;\n  margin-top: 16px;\n  margin-right: -16px;\n  margin-left: 16px;\n  z-index: 1;\n  width: 100%; }\n\n.noty_layout .noty_theme__nest.noty_bar:nth-child(n+6) {\n  position: absolute;\n  top: 0;\n  margin-top: 20px;\n  margin-right: -20px;\n  margin-left: 20px;\n  z-index: -1;\n  width: 100%; }\n\n#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(2),\n#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(2) {\n  margin-top: 4px;\n  margin-left: -4px;\n  margin-right: 4px; }\n\n#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(3),\n#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(3) {\n  margin-top: 8px;\n  margin-left: -8px;\n  margin-right: 8px; }\n\n#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(4),\n#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(4) {\n  margin-top: 12px;\n  margin-left: -12px;\n  margin-right: 12px; }\n\n#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(5),\n#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(5) {\n  margin-top: 16px;\n  margin-left: -16px;\n  margin-right: 16px; }\n\n#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(n+6),\n#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(n+6) {\n  margin-top: 20px;\n  margin-left: -20px;\n  margin-right: 20px; }\n\n.noty_theme__nest.noty_type__alert,\n.noty_theme__nest.noty_type__notification {\n  background-color: #073B4C;\n  color: #fff; }\n\n.noty_theme__nest.noty_type__alert .noty_progressbar,\n.noty_theme__nest.noty_type__notification .noty_progressbar {\n  background-color: #fff; }\n\n.noty_theme__nest.noty_type__warning {\n  background-color: #FFD166;\n  color: #fff; }\n\n.noty_theme__nest.noty_type__error {\n  background-color: #EF476F;\n  color: #fff; }\n\n.noty_theme__nest.noty_type__error .noty_progressbar {\n  opacity: .4; }\n\n.noty_theme__nest.noty_type__info,\n.noty_theme__nest.noty_type__information {\n  background-color: #118AB2;\n  color: #fff; }\n\n.noty_theme__nest.noty_type__info .noty_progressbar,\n.noty_theme__nest.noty_type__information .noty_progressbar {\n  opacity: .6; }\n\n.noty_theme__nest.noty_type__success {\n  background-color: #06D6A0;\n  color: #fff; }\n", ""]);

// exports


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "/********\n * VARS *\n ********/\n/**********\n * MIXINS *\n **********/\n/***********\n * CURSORS *\n ***********/\n.ql-container {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column; }\n\n.ql-editor {\n  position: relative;\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  outline: none;\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n  tab-size: 4;\n  white-space: pre-wrap; }\n\n.ql-cursors, .ql-cursors div {\n  position: static;\n  display: block;\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box; }\n\n.ql-cursor.hidden {\n  display: none; }\n\n.ql-cursor .ql-cursor-caret-container,\n.ql-cursor .ql-cursor-flag {\n  position: absolute; }\n\n.ql-cursor .ql-cursor-flag {\n  z-index: 1;\n  -webkit-transform: translate3d(-1px, -100%, 0);\n  transform: translate3d(-1px, -100%, 0);\n  opacity: 0;\n  color: white;\n  padding-bottom: 2px; }\n  @media screen {\n    .ql-cursor .ql-cursor-flag {\n      -webkit-transition: opacity 0ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms;\n      transition: opacity 0ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms; } }\n  .ql-cursor .ql-cursor-flag .ql-cursor-name {\n    margin-left: 5px;\n    margin-right: 2.5px;\n    display: inline-block;\n    margin-top: -2px; }\n  .ql-cursor .ql-cursor-flag .ql-cursor-flag-flap {\n    display: inline-block;\n    z-index: -1;\n    width: 5px;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    right: -2.5px;\n    border-radius: 0px;\n    background-color: inherit; }\n\n.ql-cursor .ql-cursor-flag-always-on {\n  opacity: 1; }\n\n.ql-cursor .ql-cursor-caret-container:hover + .ql-cursor-flag {\n  opacity: 1;\n  -webkit-transition: none;\n  transition: none; }\n\n.ql-cursor .ql-cursor-caret-container {\n  margin-left: -9px;\n  padding: 0 9px;\n  z-index: 1; }\n  .ql-cursor .ql-cursor-caret-container .ql-cursor-caret {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    width: 2px;\n    margin-left: -1px;\n    background-color: attr(data-color); }\n\n.ql-cursor .ql-cursor-selection-block {\n  position: absolute;\n  pointer-events: none; }\n", ""]);

// exports


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".tsync-editor-wrapper {\n  height: 100%;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column; }\n", ""]);

// exports


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@-webkit-keyframes flash {\n  0% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@keyframes flash {\n  0% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@-webkit-keyframes levitate {\n  0% {\n    top: 0; }\n  50% {\n    top: -8px; }\n  100% {\n    top: 0; } }\n\n@keyframes levitate {\n  0% {\n    top: 0; }\n  50% {\n    top: -8px; }\n  100% {\n    top: 0; } }\n\n@-webkit-keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); }\n  50% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1); }\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n@keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); }\n  50% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1); }\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n", ""]);

// exports


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".tsync-badge {\n  background-origin: border-box;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  opacity: 0;\n  -webkit-transition: opacity 1.25s ease-out;\n  transition: opacity 1.25s ease-out;\n  width: 40px;\n  height: 40px;\n  background-color: #49cfbb;\n  color: white;\n  border-radius: 50%;\n  border: 2px solid white;\n  position: relative;\n  -webkit-transition: opacity .25s ease-in-out;\n  transition: opacity .25s ease-in-out;\n  -webkit-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.2);\n  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.2); }\n\n.tsync-badge.in {\n  opacity: 1; }\n\n.tsync-badge.flashing {\n  -webkit-animation: flash 0.8s ease-in-out infinite;\n  animation: flash 0.8s ease-in-out infinite; }\n\n.tsync-badge:hover {\n  border-color: #a4a4a4; }\n\n.tsync-presence-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: reverse;\n  -ms-flex-direction: row-reverse;\n  flex-direction: row-reverse;\n  padding: 10px; }\n\n.tsync-badge-wrapper {\n  position: relative;\n  margin-right: -10px; }\n\n.tsync-badge-wrapper .tsync-tooltip {\n  position: absolute;\n  color: #FFFFFF;\n  background: #191919;\n  text-align: center;\n  padding: 10px; }\n\n.tsync-badge-wrapper .tsync-tooltip:after {\n  content: '';\n  position: absolute;\n  bottom: 100%;\n  left: 50%;\n  margin-left: -8px;\n  width: 0;\n  height: 0;\n  border-bottom: 8px solid #191919;\n  border-right: 8px solid transparent;\n  border-left: 8px solid transparent; }\n\n.tsync-badge-wrapper:not(:hover) .tsync-tooltip {\n  display: none; }\n\n.tsync-badge-wrapper:hover .tsync-tooltip {\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%);\n  opacity: 0.8;\n  z-index: 2; }\n", ""]);

// exports


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(37);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"insertAt":"top"}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!../../sass-loader/lib/loader.js!../../postcss-loader/lib/index.js??ref--1-3!./noty.css", function() {
			var newContent = require("!!../../css-loader/index.js!../../sass-loader/lib/loader.js!../../postcss-loader/lib/index.js??ref--1-3!./noty.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(38);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"insertAt":"top"}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!../../node_modules/postcss-loader/lib/index.js??ref--1-3!./cursors.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!../../node_modules/postcss-loader/lib/index.js??ref--1-3!./cursors.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Outward facing facade for TextSync of a Quilljs document.
 * It is intended to replace an existing
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Quill = __webpack_require__(12);
var PusherPlatform = __webpack_require__(11);
var logoot_doc_1 = __webpack_require__(19);
var editor_1 = __webpack_require__(17);
var textsync_1 = __webpack_require__(21);
var quill_adaptor_1 = __webpack_require__(20);
var quill_cursors_1 = __webpack_require__(13);
var notifications = __webpack_require__(2);
var validate_options_1 = __webpack_require__(23);
var logger_1 = __webpack_require__(18);
var utils_1 = __webpack_require__(22);
var DEFAULT_QUILL_CONFIG = {
    theme: 'snow',
    modules: {
        toolbar: [['bold', 'italic', 'underline', 'strike', 'link']],
        history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true
        }
    },
    formats: ['bold', 'italic', 'link', 'strike', 'underline', 'list']
};
var TextSync = (function () {
    function TextSync(config, host) {
        if (!config) {
            throw new Error('Config must be present to initialise TextSync.');
        }
        else if (!config.instanceLocator) {
            throw new Error('`instanceLocator` must be present in config when initialising TextSync.');
        }
        var logLevel = this.getLogLevel(config);
        this.logger = new logger_1.Logger(logLevel);
        this.instanceLocator = config.instanceLocator;
        this.host = host || null;
        this.app = new PusherPlatform.Instance({
            serviceName: 'textsync',
            serviceVersion: 'v1',
            locator: this.instanceLocator,
            host: this.host,
            logger: new PusherPlatform.ConsoleLogger(logLevel)
        });
    }
    TextSync.prototype.createEditor = function (options) {
        var _this = this;
        __webpack_require__(14);
        var validatedOptions = validate_options_1.default(options);
        validatedOptions.defaultText = options.defaultText || '';
        var notifier = new notifications.Notifier(validatedOptions.errorNotifications, validatedOptions.onError);
        var containerElement = document.createElement('div');
        containerElement.className = 'tsync-editor-wrapper';
        validatedOptions.element.appendChild(containerElement);
        var docId = validatedOptions.docId;
        var presenceElement = initPresenceContainer(containerElement, validatedOptions);
        var siteId = Math.floor(Math.random() * Math.pow(2, 32));
        var logootDoc = new logoot_doc_1.default(siteId);
        var textSyncInstance = new textsync_1.TextSync(logootDoc, this.app, docId, siteId, validatedOptions, presenceElement, notifier, this.logger);
        // Hide the editor element until the CSS has loaded
        var cachedDisplayStyle = containerElement.style.display;
        containerElement.style.display = 'none';
        var quillConfig = buildQuillConfig(validatedOptions);
        return injectQuillCss(quillConfig)
            .then(function () {
            containerElement.style.display = cachedDisplayStyle;
            return initEditor(containerElement, validatedOptions, quillConfig);
        })
            .then(function (quill) {
            var quillAdaptor = new quill_adaptor_1.default(quill, textSyncInstance, docId, notifier, _this.logger);
            // initialise TextSync
            return textSyncInstance.start(quillAdaptor).then(function () {
                return new editor_1.default(quill, function () { return (containerElement.innerHTML = ''); }, function () { return textSyncInstance.disconnect(); });
            });
        })
            .catch(function (err) {
            notifier.notify('Failed to create textsync editor', undefined, true);
            _this.logger.error(err);
            throw new Error("There was a problem creating the textsync editor: " + err.message);
        });
    };
    TextSync.prototype.getLogLevel = function (config) {
        var logLevel;
        if (config.debug) {
            logLevel = logger_1.LogLevel.DEBUG;
        }
        else {
            logLevel =
                 false ? logger_1.LogLevel.ERROR : logger_1.LogLevel.INFO;
        }
        return logLevel;
    };
    return TextSync;
}());
function initPresenceContainer(element, validatedOptions) {
    if (!validatedOptions.collaboratorBadges) {
        return null;
    }
    __webpack_require__(15);
    __webpack_require__(16);
    var presenceContainer = document.createElement('div');
    presenceContainer.className = 'tsync-presence-container';
    element.appendChild(presenceContainer);
    return presenceContainer;
}
function initEditor(element, validatedOptions, quillConfig) {
    var editor = document.createElement('div');
    editor.id = 'tsync-editor';
    element.appendChild(editor);
    return new Quill(editor, quillConfig);
}
function buildQuillConfig(validatedOptions) {
    var qlConfig = utils_1.deepClone(DEFAULT_QUILL_CONFIG);
    if (validatedOptions.richText === false) {
        qlConfig.formats = [];
        qlConfig.modules.toolbar = false;
    }
    // Enable cursors
    if (validatedOptions.cursors) {
        Quill.register('modules/cursors', quill_cursors_1.CursorsModule);
        qlConfig.modules.cursors = {
            cursorFlagsAlwaysOn: validatedOptions.cursorLabelsAlwaysOn
        };
    }
    return qlConfig;
}
function injectQuillCss(quillConfig) {
    quillConfig.theme = 'snow';
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://cdn.quilljs.com/1.2.4/quill.snow.css';
    document.getElementsByTagName('head')[0].appendChild(link);
    return new Promise(function (resolve, reject) {
        link.onload = resolve;
        link.onerror = reject;
    });
}
module.exports = TextSync;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Badges = (function () {
    function Badges(siteId, targetElement, logger) {
        this.siteId = siteId;
        this.logger = logger;
        this.targetElement = targetElement;
        this.addBadges = this.addBadges.bind(this);
        this.addToDOM = this.addToDOM.bind(this);
        this.removeBadge = this.removeBadge.bind(this);
        this.removeFromDOM = this.removeFromDOM.bind(this);
        this.findBadgeInDOM = this.findBadgeInDOM.bind(this);
    }
    Badges.prototype.startBadgeFlash = function (siteId) {
        var targetBadge = document.querySelector("span[data-site-id=\"" + siteId + "\"] .tsync-badge");
        if (targetBadge) {
            if (Array.from(targetBadge.classList).indexOf('flashing') === -1) {
                targetBadge.classList.add('flashing');
            }
        }
        else {
            this.logger.error("Badge for siteId " + siteId + " is missing from DOM");
        }
    };
    Badges.prototype.stopBadgeFlash = function (siteId) {
        var targetBadge = document.querySelector("span[data-site-id=\"" + siteId + "\"] .tsync-badge");
        if (targetBadge) {
            targetBadge.classList.remove('flashing');
        }
        else {
            this.logger.error("Badge for siteId " + siteId + " is missing from DOM");
        }
    };
    Badges.prototype.addBadges = function (data) {
        for (var i = 0; i < data.length; i++) {
            this.addToDOM(data[i], i);
        }
    };
    Badges.prototype.addToDOM = function (data, index) {
        this.logger.info('someone joined');
        var badgeWrapper = this.createBadge(data);
        this.targetElement.appendChild(badgeWrapper);
        // transition
        setTimeout(function () {
            var badge = badgeWrapper.children[0];
            badge.classList.add('in');
        }, 100 + 100 * index);
    };
    Badges.prototype.removeBadge = function (leavingSiteId) {
        var index = this.findBadgeInDOM(leavingSiteId);
        if (index > -1) {
            this.removeFromDOM(index);
        }
        else {
            this.logger.error(new RangeError("Badge for siteId " + leavingSiteId + " not found in DOM."));
        }
    };
    Badges.prototype.removeFromDOM = function (index) {
        this.logger.info('someone left');
        var badges = Array.from(document.querySelectorAll('.tsync-badge-wrapper'));
        var toRemove = badges[index];
        this.targetElement.removeChild(toRemove);
    };
    Badges.prototype.findBadgeInDOM = function (leavingSiteId) {
        var badges = Array.from(document.querySelectorAll('.tsync-badge-wrapper'));
        for (var i = 0; i < badges.length; i++) {
            if (badges[i].dataset.siteId === leavingSiteId.toString()) {
                return i;
            }
        }
        return -1;
    };
    Badges.prototype.createBadge = function (data) {
        var badgeWrapper = document.createElement('span');
        badgeWrapper.className = 'tsync-badge-wrapper';
        badgeWrapper.dataset.siteId = data.siteId.toString();
        var badge = document.createElement('div');
        badge.style.backgroundImage = "url(\"" + data.avatar + "\")";
        badge.className = 'tsync-badge';
        var tooltip = document.createElement('span');
        tooltip.className = 'tsync-tooltip';
        tooltip.innerText = data.name;
        if (this.siteId === data.siteId) {
            tooltip.innerText += ' (you)';
        }
        badgeWrapper.appendChild(badge);
        badgeWrapper.appendChild(tooltip);
        return badgeWrapper;
    };
    return Badges;
}());
exports.default = Badges;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var badges_1 = __webpack_require__(45);
var ANIMATION_LENGTH = 1000;
var PresenceController = (function () {
    function PresenceController(siteId, config, element, logger) {
        this.siteId = siteId;
        this.config = config;
        this.logger = logger;
        this.flashingBadges = {};
        this.badges = new badges_1.default(this.siteId, element, logger);
    }
    PresenceController.prototype.resetTimeout = function (siteId) {
        clearTimeout(this.flashingBadges[siteId]);
        this.startTimeout(siteId);
    };
    PresenceController.prototype.startTimeout = function (siteId) {
        var _this = this;
        this.flashingBadges[siteId] = setTimeout(function (siteId) {
            _this.badges.stopBadgeFlash(siteId);
            clearTimeout(_this.flashingBadges[siteId]);
            delete _this.flashingBadges[siteId];
        }, ANIMATION_LENGTH, siteId);
    };
    PresenceController.prototype.receiveJoining = function (joining) {
        if (this.config.showBadges) {
            joining.sort(function (a, b) {
                if (a.timestamp > b.timestamp) {
                    return 1;
                }
                else if (a.timestamp < b.timestamp) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
            this.badges.addBadges(joining);
        }
    };
    PresenceController.prototype.receiveLeaving = function (leavingSiteIds) {
        var _this = this;
        if (this.config.showBadges) {
            leavingSiteIds.forEach(function (siteId, i) {
                _this.badges.removeBadge(siteId);
            });
        }
    };
    /**
     * Triggers the start typing event for a collaborator
     * @param {number} siteId - site id for collaborator
     * @returns {void}
     */
    PresenceController.prototype.triggerStartTypingEvent = function (siteId) {
        if (this.flashingBadges[siteId]) {
            this.resetTimeout(siteId);
        }
        else {
            this.badges.startBadgeFlash(siteId);
            this.startTimeout(siteId);
        }
    };
    return PresenceController;
}());
exports.default = PresenceController;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OpType;
(function (OpType) {
    OpType[OpType["Joining"] = 1] = "Joining";
    OpType[OpType["Leaving"] = 2] = "Leaving";
})(OpType = exports.OpType || (exports.OpType = {}));
function filterByType(input, pred) {
    return input.reduce(function (output, el) {
        if (pred(el)) {
            output.push(el);
        }
        return output;
    }, new Array());
}
exports.filterByType = filterByType;
function isAddOp(object) {
    return object.opType === OpType.Joining;
}
exports.isAddOp = isAddOp;
function isRemoveOp(object) {
    return object.opType === OpType.Leaving;
}
exports.isRemoveOp = isRemoveOp;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var tinycolor = __webpack_require__(7);
var format_1 = __webpack_require__(47);
var SERVER_SITE_ID = 0;
var PresenceModel = (function () {
    function PresenceModel(siteId, adaptor, logootDoc, controller, presenceConfig, logger) {
        this.siteId = siteId;
        this.adaptor = adaptor;
        this.logootDoc = logootDoc;
        this.controller = controller;
        this.presenceConfig = presenceConfig;
        this._collaboratorIds = {};
        this.logger = logger;
    }
    /**
     * Processes document operations (DocOps)
     * @param {Message} wireMessage - wire message containing DocOps[]
     * @returns {void}
     */
    PresenceModel.prototype.receiveDocOps = function (wireMessage) {
        if (wireMessage.siteId !== SERVER_SITE_ID) {
            if (this.presenceConfig.showBadges) {
                this.controller.triggerStartTypingEvent(wireMessage.siteId);
            }
            if (this.presenceConfig.showCursors) {
                this.logger.debug(wireMessage.siteId + " has typed.");
                var lastDocOp = wireMessage.docOps[wireMessage.docOps.length - 1];
                var cursorOps = [
                    {
                        siteId: wireMessage.siteId,
                        position: {
                            start: lastDocOp.ident.position
                        }
                    }
                ];
                // insert op: index_of_last_char + 1
                // delete op: index_of_last_char - 1
                var offset = lastDocOp.opType === 1 ? 1 : 0;
                var editorCursorOps = this.logootDoc.toEditorCursorOps(cursorOps, offset);
                this.receiveCursorOps(editorCursorOps);
            }
        }
    };
    /**
     * Processes presence operations (PresOps)
     * @param {Message} wireMessage - wire message containing PresOp[]
     * @returns {void}
     */
    PresenceModel.prototype.receivePresOps = function (presOps) {
        var _this = this;
        var needCollaborators = (this.presenceConfig.showBadges
            || this.presenceConfig.showCursors
            || this.presenceConfig.onJoined
            || this.presenceConfig.onLeft);
        if (!needCollaborators) {
            return;
        }
        var joiningCollaborators = format_1.filterByType(presOps, format_1.isAddOp);
        var leavingCollaborators = format_1.filterByType(presOps, format_1.isRemoveOp);
        if (this.presenceConfig.onJoined) {
            this.presenceConfig.onJoined(joiningCollaborators);
        }
        if (this.presenceConfig.onLeft) {
            this.presenceConfig.onLeft(leavingCollaborators);
        }
        if (joiningCollaborators.length > 0) {
            this.add(joiningCollaborators);
        }
        if (leavingCollaborators.length > 0) {
            this.remove(leavingCollaborators);
        }
        if (this.presenceConfig.showCursors) {
            leavingCollaborators.forEach(function (el) {
                _this.adaptor.removeCursor(el.siteId);
            });
        }
    };
    /**
     * Processes cursor operations (CursorOps)
     * @param {Message} wireMessage - wire message containing CursorOp[]
     * @returns {void}
     */
    PresenceModel.prototype.receiveCursorOps = function (cursorOps) {
        var _this = this;
        if (this.presenceConfig.showCursors) {
            cursorOps.forEach(function (cursorOp) {
                if (_this._collaboratorIds.hasOwnProperty(String(cursorOp.id))) {
                    if (cursorOp.range.index === null) {
                        _this.adaptor.removeCursor(cursorOp.id);
                    }
                    else {
                        var cursorData = __assign({}, cursorOp, { color: _this._collaboratorIds[cursorOp.id].color, name: _this._collaboratorIds[cursorOp.id].name });
                        _this.adaptor.setCursor(cursorData);
                    }
                }
            });
        }
    };
    /**
     * Adds new collaborators
     * @param {AddOp[]} joining - array of 'add collaborator' operations
     * @returns {void}
     */
    PresenceModel.prototype.add = function (joining) {
        var _this = this;
        if (joining.length === 0) {
            return;
        }
        var justJoined = joining.filter(function (op) { return !_this._collaboratorIds.hasOwnProperty(String(op.siteId)); });
        // add to data store
        justJoined.forEach(function (op) {
            var value = { position: null, color: null, name: op.name };
            if (_this.presenceConfig.showCursors) {
                value.color = tinycolor.random();
            }
            _this._collaboratorIds[op.siteId] = value;
        });
        this.controller.receiveJoining(justJoined);
    };
    /**
     * Removes existing collaborators
     * @param {RemoveOp[]} leaving - array of 'remove collaborator' operations
     * @returns {void}
     */
    PresenceModel.prototype.remove = function (leaving) {
        var _this = this;
        if (leaving.length === 0) {
            return;
        }
        var justLeft = leaving.filter(function (op) {
            return _this._collaboratorIds.hasOwnProperty(String(op.siteId));
        });
        // remove from data store
        justLeft.forEach(function (op) {
            delete _this._collaboratorIds[op.siteId];
        });
        this.controller.receiveLeaving(justLeft.map(function (op) { return op.siteId; }));
    };
    return PresenceModel;
}());
exports.default = PresenceModel;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function createAnonName() {
    var adjective = randomChoice(ADJECTIVES);
    var noun = randomChoice(NOUNS);
    return capitalize(adjective + ' ' + noun);
}
exports.createAnonName = createAnonName;
function randomChoice(list) {
    var randomIndex = Math.round(Math.random() * (list.length - 1));
    return list[randomIndex];
}
function capitalize(text) {
    var words = text.split(' ');
    return words.map(function (word) { return word[0].toUpperCase() + word.slice(1); }).join(' ');
}
var ADJECTIVES = [
    'massive',
    'impressive',
    'bearded',
    'angry',
    'shaky',
    'sticky',
    'fluffy',
    'frozen',
    'bonkers',
    'harsh',
    'greedy',
    'magical',
    'confused',
    'high-end',
    'slippery',
    'vengeful',
    'stunned',
    'flickering',
    'hyperactive',
    'megalomanic',
    'hipster'
];
var NOUNS = [
    'guava jelly',
    'mango chutney',
    'ginger jam',
    'sugar snap peas',
    'mooncakes',
    'soda crackers',
    'banana split',
    'nougat',
    'gherkins',
    'gouda',
    'flan',
    'trifle',
    'dumpling',
    'avocado',
    'marmalade',
    'sushi',
    'wasabi pea',
    'falafel',
    'tofu',
    'Thai curry',
    'goulash',
    'crab cake'
];


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var logootFormat = __webpack_require__(9);
function messageFromOps(ops, siteId) {
    var docOps = [];
    var cursorOps = [];
    for (var _i = 0, ops_1 = ops; _i < ops_1.length; _i++) {
        var op = ops_1[_i];
        if (logootFormat.isDocOp(op)) {
            docOps.push(op);
        }
        else if (logootFormat.isCursorOp(op)) {
            cursorOps.push(op);
        }
    }
    return {
        docOps: docOps,
        cursorOps: cursorOps,
        siteId: siteId
    };
}
exports.messageFromOps = messageFromOps;


/***/ })
/******/ ]);
});