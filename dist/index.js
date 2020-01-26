(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Vue"] = factory();
	else
		root["Vue"] = factory();
})(window, function() {
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/generator.js":
/*!**************************!*\
  !*** ./src/generator.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

;
eval("__webpack_require__.r(__webpack_exports__);\n\n\n// 生成虚拟的元素节点\nfunction createElement() {}\n// 生成虚拟的文本节点\nfunction createTextNode() {}\n\n\n// 生成元素节点代码\nfunction generateElement(node) {\n  const directives = node.directives;\n  const data = genData(node);\n  \n  const children = genChildren(node);\n  let code = `_e(\"${node.tag}\"${data ? `,${data}` : \"\"}${children ? `,${children}` : \"\"})`\n  if(directives && directives.length) {\n    let dir = directives[0];\n    if(dir.type == 'if') {\n      let expr = dir.expr;\n      code = `${expr} ? ${code} : _t(\"\")`;\n    } else if(dir.type == 'for') {\n      let [item, ,list] = dir.expr.trim().split(' ')\n      code = `...(_l(${list},(${item}, index)=>{return ${code};}))`\n    }\n  }\n  return code;\n}\n// 生成文本节点代码\nfunction generateText(node) {\n  return `_t(${node.type==2 ? node.expression : JSON.stringify(node.text)})`\n}\nfunction genData(node) {\n  if(node.attrs) {\n    let hash = {};\n    for (let attr of node.attrs) {\n      hash[attr[1]] = attr[2];\n    }\n    let data = JSON.stringify(hash);\n    data = data.replace(/\\\"\\{\\{(.+)\\}\\}\"/, \"$1\")\n    return data;\n  }\n  return;\n}\n// 生成节点代码\nfunction genNode(node) {\n  if(node.type==1) {\n    return generateElement(node);\n  } else {\n    return generateText(node);\n  }\n}\n// 递归生成子节点的代码（子节点可能是元素，也可能是文本）\nfunction genChildren(node) {\n  const children = node.children;\n  if(children && children.length) {\n    return `[${children.map(c => genNode(c)).join(',')}]`\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (generateElement);\n\n\n//# sourceURL=webpack://Vue/./src/generator.js?");

/***/ }),

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

;
eval("__webpack_require__.r(__webpack_exports__);\nfunction createElement(vnode) {\n  let node = document.createElement(vnode.tag);\n  if(vnode.data) {\n    for (let key in vnode.data) {\n      node.setAttribute(key, vnode.data[key])\n    }\n  }\n  return node;\n}\nconst e = createElement;//document.createElement.bind(document);\nconst t = document.createTextNode.bind(document);\n\nfunction createDOM(vnode) {\n  let dom = vnode.tag ? e(vnode) : t(vnode.text);\n  if(vnode.children && vnode.children.length) {\n    vnode.children.forEach(child => {\n      dom.appendChild(createDOM(child))\n    });\n  }\n  return dom;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  createDOM\n});\n\n//# sourceURL=webpack://Vue/./src/helper.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

;
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Vue; });\n/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parser */ \"./src/parser.js\");\n/* harmony import */ var _optimizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./optimizer */ \"./src/optimizer.js\");\n/* harmony import */ var _generator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generator */ \"./src/generator.js\");\n/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vnode */ \"./src/vnode.js\");\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helper */ \"./src/helper.js\");\n\n\n\n\n\n\n\nclass Vue {\n  constructor(options) {\n    let el;\n    if(options.el==undefined || (el = document.querySelector(options.el)) == null) {\n      throw new Error('el must be specified in Vue constructor');\n    }\n    this.el = el;\n    this.template = this.el.outerHTML;\n    this.options = options || {};\n    this.context = Object.assign(options.data || {}, _vnode__WEBPACK_IMPORTED_MODULE_3__);\n    \n    this.ast = null;\n    this.code = null;\n    this.vnode = null;\n    this.render = null;\n\n    this.main();\n    this.el.remove();\n  }\n\n  main() {\n    this.parseTemplate();\n    console.log(this.ast);\n    this.optimize(this.ast);\n    this.render = this.genCode();\n    this.vnode = this.render.call(this.context)\n    debugger;\n    this.paint();\n  }\n\n  genCode() {\n    let code =  'with(this){return ' + Object(_generator__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this.ast) + ';}';\n    code = code.replace(/\\n/g, '');\n    console.log(code);\n    let func = new Function(code);\n    return func;\n  }\n\n  optimize() {\n    Object(_optimizer__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.ast); \n  }\n\n  parseTemplate() {\n    let parent, stack = [];\n    let _ = this;\n    \n    Object(_parser__WEBPACK_IMPORTED_MODULE_0__[\"parseHTML\"])(this.template, {\n      start(tag, attrs, unary, directives) {\n        var node = { type: 1, tag, attrs, unary, parent, children:[], directives };\n        if(parent && parent.children) {\n          parent.children.push(node);\n        }\n        if(stack.length == 0) {\n          node.isRoot = true;\n          _.ast = node;\n        }\n        if(!node.unary) {\n          stack.push(node);\n          parent =  node;\n        }\n      },\n      end() {\n        parent = parent.parent;\n        stack.pop();\n      },\n      chars(text) {\n        if(parent && parent.children) {\n          // var node = { type: 3, text, parent };\n          var expression;\n          if(expression=Object(_parser__WEBPACK_IMPORTED_MODULE_0__[\"parseText\"])(text)) {\n            parent.children.push({ type: 2, text, parent, expression })\n          } else {\n            parent.children.push({ type: 3, text, parent })\n          }\n        }\n      }\n    })\n  }\n\n  paint() {\n    var newNode = _helper__WEBPACK_IMPORTED_MODULE_4__[\"default\"].createDOM(this.vnode);\n    let parentNode = this.el.parentElement;\n   \n    parentNode.insertBefore(newNode, this.el)\n  }\n}\n\n// with(this){\n//   return _e(\"div\",\n//   {\"id\":\"app\"},\n//   [\n//     _t(\"\\n    \"),\n//     _e(\"h3\",{},\n//     [\n//       _t(\"hello \"+_v(name))\n//     ]\n//     ),\n//     _t(\"you wanna to goto \"+_v(companyName)+\" in \"+_v(city))\n//   ]\n// );\n// }\n// import Vue from './src/index';\n\n\n//# sourceURL=webpack://Vue/./src/index.js?");

/***/ }),

/***/ "./src/optimizer.js":
/*!**************************!*\
  !*** ./src/optimizer.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

;
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return optimize; });\n\nfunction isStatic(node) {\n  if(node.type == 2) {\n    return false;\n  } else if(node.type == 3) {\n    return true;\n  } else {\n    // node.type == 1 需要区分普通个元素还是有 v-if v-pre 等各种directive的元素，这里先都统一返回为true，因为还没实现directive\n    return true;\n  }\n}\n\nfunction markStatic(parent) {\n  parent.static = isStatic(parent);\n  if(parent.type == 1 && parent.children) {\n    for (let i = 0; i < parent.children.length; i++) {\n      const child = parent.children[i];\n      child.static = isStatic(child);\n      markStatic(child);\n      if(!child.static) {\n        parent.static = false;\n      }\n    }\n  }\n}\n\nfunction markRootStatic(parent) {\n  if(parent.static) {\n    parent.staticRoot = true;\n    return;\n  } else {\n    parent.staticRoot = false;\n  }\n  if(parent.children) {\n    for (let i = 0; i < parent.children.length; i++) {\n      const child = parent.children[i];\n      markRootStatic(child);\n    }\n  }\n}\n\nfunction optimize(root) {\n  if(!root) return;\n\n  markStatic(root);\n  markRootStatic(root);\n}\n\n\n//# sourceURL=webpack://Vue/./src/optimizer.js?");

/***/ }),

/***/ "./src/parser.js":
/*!***********************!*\
  !*** ./src/parser.js ***!
  \***********************/
/*! exports provided: parseHTML, parseText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

;
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseHTML\", function() { return parseHTML; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseText\", function() { return parseText; });\nvar startTagOpen = /^<(\\w+)/;\nvar startTagClose = /^\\s*(\\/)?>/;\nvar attrTag = /^\\s*(([\\w_-]+)=\"([^\"]*)\")/;\nvar endTag = /^\\s*<\\/\\w+\\>\\s*/;\n\nvar advance = function(template, n) {\n  return template.substr(n);\n}\n\nfunction  parseStartTag(template){\n  var start = template.match(startTagOpen);\n  \n  if(start) {\n    let tagName = start[1];\n    var attr;\n    let end;\n    template = advance(template, start[0].length)\n  \n    var node = {\n      tagName,\n      attrs: [],\n      directives: []\n    };\n  \n    while(\n      !(end = template.match(startTagClose)) && (attr = template.match(attrTag))\n    ) {\n      if(attr[2].startsWith('v-')) {\n        let [,type] = attr[2].split('-');\n        node.directives.push({raw: attr[1], type, expr:attr[3] })\n      } else {\n        node.attrs.push([attr[1],attr[2],attr[3]]);\n      }\n      template = advance(template, attr[0].length)\n    }\n    if(end) {\n      node.unarySlash = end[1];\n      template = advance(template, end[0].length);\n    }\n    return [node, template];\n  }\n  return [];\n}\n\nfunction parseEndTag(template) {\n  var end;\n  if(end = template.match(endTag)) {\n    template = advance(template, end[0].length);\n  }\n  return [end, template];\n}\n\n// let matchStartTag = parseStartTag();\n\n// var textEndPos = template.indexOf('<');\n// if(textEndPos > 0) {\n//   text = template.substr(0, textEndPos);\n//   advance(text.length);\n// } else {\n//   text = template;\n//   html = '';\n// }\n// console.log(text);\n\n\n// parseEndTag();\n\nfunction parseHTML(template, options) {\n  while(template) {\n    var text;\n    var textEndPos = template.indexOf('<');\n    if(textEndPos < 0) {\n      text = template;\n      template = '';\n      options.chars(text);\n      break;\n    }\n\n    if(textEndPos > 0) {\n      text = template.substr(0, textEndPos);\n      template = advance(template, text.length);\n      options.chars(text);\n    }\n\n    let [matchStartTag, newTemplate1] = parseStartTag(template);\n    if(matchStartTag) {\n      options.start(matchStartTag.tagName, matchStartTag.attrs, matchStartTag.unarySlash==='/', matchStartTag.directives)\n      template = newTemplate1;\n    }\n\n    let [matchEndTag, newTemplate2] = parseEndTag(template);\n    if(matchEndTag) {\n      options.end();\n      template = newTemplate2;\n    }\n  }\n}\n\nfunction parseText(text) {\n  text = text.trim();\n\n  if(!text) return;\n\n  // expression regexp\n  var re = /\\{\\{\\w+(\\.{1}\\w+)*\\}\\}/g;\n  \n  if(re.test(text)) {\n    re.lastIndex = 0;\n    var match;\n    var tokens = [];\n    var lastIndex = 0;\n  \n    while((match = re.exec(text)) != null) {\n      if(match.index > 0) tokens.push('\"' + text.substring(lastIndex, match.index)  + '\"');\n      tokens.push('_v(' + match[0].substring(2,match[0].length-2) + ')')\n      lastIndex = re.lastIndex;\n      // console.log(lastIndex);\n    }\n    if(lastIndex < text.length) {\n      tokens.push('\"' + text.substring(lastIndex) + '\"');\n    }\n    // console.log(tokens);\n    return tokens.join('+')\n  }\n\n}\n// console.log(parseText('haha {{name}} receive offer worth {{amount}}'));\n// console.log(parseText(\"{{owner}}'s blog\"));\n\n\n\n\n\n//# sourceURL=webpack://Vue/./src/parser.js?");

/***/ }),

/***/ "./src/vnode.js":
/*!**********************!*\
  !*** ./src/vnode.js ***!
  \**********************/
/*! exports provided: default, createTextNode, createElementNode, toString, forEach, _t, _e, _v, _l */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

;
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return VNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createTextNode\", function() { return createTextNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElementNode\", function() { return createElementNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toString\", function() { return toString; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"forEach\", function() { return forEach; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"_t\", function() { return createTextNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"_e\", function() { return createElementNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"_v\", function() { return toString; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"_l\", function() { return forEach; });\nclass VNode {\n  constructor(tag, data, children, text) {\n    this.tag = tag;\n    this.data = data;\n    this.children = children;\n    this.text = text;\n  }\n}\n\nconst createTextNode = (text) => {\n  return new VNode(null, null, null, text);\n}\n\nconst createElementNode = (tag, data, children) => {\n  return new VNode(tag, data, children);\n}\n\nconst toString = function(val) {\n  return val;\n}\n\nconst forEach = function(list, handler) {\n  return list.map((item,index) => {\n    return handler(item,index);\n  })\n}\n\n\n\n//# sourceURL=webpack://Vue/./src/vnode.js?");

/***/ })

/******/ })["default"];
});