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

/***/ "./src/Dep.js":
/*!********************!*\
  !*** ./src/Dep.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

;
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Dep; });\nclass Dep {\n  constructor(){\n    this.depends = [];\n  }\n\n  depend() {\n    if(window.target) {\n      if(this.depends.indexOf(window.target) === -1) {\n        this.depends.push(window.target);\n      }\n    }\n  }\n\n  notify() {\n    for (let i = 0; i < this.depends.length; i++) {\n      const depend = this.depends[i];\n      depend.update();\n    }\n  }\n}\n\n\n//# sourceURL=webpack://Vue/./src/Dep.js?");

/***/ }),

/***/ "./src/Observer.js":
/*!*************************!*\
  !*** ./src/Observer.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

;
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Observer; });\n/* harmony import */ var _Dep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dep */ \"./src/Dep.js\");\n\n\nvar arrayMethods = Object.create(Array.prototype);\n\n['push', 'pop','shift', 'unshift'].forEach(d => {\n  var method = arrayMethods[d];\n  Object.defineProperty(arrayMethods, d, {\n    value: function(...args) {\n      const ob = this.__ob__;\n      method.call(this, ...args);\n      ob.dep.notify();\n    }\n  });\n});\n\nfunction defineReactive(data, key, val){\n  let childOb;\n  let dep = new _Dep__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n  if(typeof val === 'object') {\n    // 处理重复调用Observer，自己没重现出来会有什么问题，只是出于效率考虑？\n    if(val.__ob__ && val.__ob__ instanceof Observer) {\n      childOb = val.__ob__;\n    } else {\n      /** \n      Dep和Observer的理解是整个逻辑中最费脑的\n\n      1. Dep可以理解为任何一个结构上都有它自己的dep\n      \n      举例：\n\n      o = {s: 'halo', a: [1,2,3]}，对象o、属性s、属性a、对象[1,2,3]都有自己的dep\n\n      对于s属性的更改，直接在defineProperty中通过dep.notify通知即可\n\n      对于数组对象的操作，是无法在defineProperty感知到的\n\n      2. 我们通过修改了数组的操作方法，让数组进行了操作时候，能感知到，但是如何通知使用到数组的界面呢？\n\n      在上例中，其实 [1,2,3] 在方法的defineProperty中能拿到dep即可， Vue的设计是\n\n      在对象（包含普通对象、数组对象）上都提供了 Observer 的实例，包括a和[1,2,3]\n\n      为了让数组的操作方法上拿到dep，我们吧 Observer 的实例直接挂在对象上，即存在 a.ob [1,2,3].ob\n\n      而ob下又有dep，因此在数组操作方法中，通过 this.ob.dep即可进行通知\n      */\n      childOb = new Observer(val);\n    }\n  }\n\n  Object.defineProperty(data, key, {\n    get: function(){\n      dep.depend();\n\n      if(childOb) {\n        childOb.dep.depend();\n      }\n\n      console.log('get:' + val);\n      return val;\n    },\n    set: function(newval){\n      if(newval != val) {\n        console.log('change happen from:`' + val + '` to `' + newval + '`');\n        val = newval;\n        // ob.\n        dep.notify();\n      }\n    }\n  })\n}\n\nclass Observer {\n  constructor(value) {\n    this.dep = new _Dep__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n    value.__ob__ = this;\n\n    if(Array.isArray(value)) {\n      value.__proto__ = arrayMethods;\n    } else if(typeof value == 'object'){\n      this.walk(value);\n    }\n  }\n\n  walk(obj) {\n    const keys = Object.keys(obj);\n    for (let key of keys) {\n      if(key!='__ob__') {\n        defineReactive(obj, key, obj[key]) \n      }\n    }\n  }\n}\n\n\n//# sourceURL=webpack://Vue/./src/Observer.js?");

/***/ }),

/***/ "./src/Watcher.js":
/*!************************!*\
  !*** ./src/Watcher.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

;
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Watcher; });\nfunction parsePath(exp) {\n  const segments = exp.split('.');\n  return function(obj) {\n    for (let i = 0; i < segments.length; i++) {\n      const key = segments[i];\n      if(!obj) return;\n      obj = obj[key];\n    }\n    return obj;\n  }\n}\n\nclass Watcher {\n  constructor(vnode, exp, obj) {\n    this.vnode = vnode;\n    this.obj = obj;\n    this.getter = parsePath(exp);\n    this.value = this.get();\n    // this.render();\n  }\n\n  get() {\n    window.target = this;\n    let value = this.getter.call(this.vnode, this.obj);\n    return value;\n  }\n\n  render() {\n    // console.log('watcher render:' + this.value)\n    // debugger;\n    this.vnode.update(this.value);\n    // this.vm.innerHTML = this.value;\n  }\n\n  update() {\n    // const oldValue = this.value;\n    this.value = this.get();\n    this.render();\n  }\n}\n\n//# sourceURL=webpack://Vue/./src/Watcher.js?");

/***/ }),

/***/ "./src/generator.js":
/*!**************************!*\
  !*** ./src/generator.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

;
eval("__webpack_require__.r(__webpack_exports__);\n\n// 生成元素节点代码\nfunction generateElement(node) {\n  const directives = node.directives;\n  const data = genData(node);\n  \n  const children = genChildren(node);\n  let code = `_e(\"${node.tag}\"${data ? `,${data}` : \",{}\"}${children ? `,${children}` : \",[]\"}`\n  let expr;\n\n  if(directives && directives.length) {\n    let dir = directives[0];\n    if(dir.type == 'if') {\n      expr = dir.expr;\n      code = `${expr} ? ${code} : _t(\"\")`;\n    } else if(dir.type == 'for') {\n      let [item, ,list] = dir.expr.trim().split(' ')\n      code = `...(_l(${list},(${item}, index)=>{return ${code};}))`\n    } else if(dir.type == 'model') {\n      expr = dir.expr;\n      code = `${expr?`${code},${expr}`:\"\"}`;\n    }\n  }\n  let result = `${code})`;\n  // ,${expr?\"${expr}\":\"\"}\n  return result;\n}\n// 生成文本节点代码\nfunction generateText(node) {\n  if(node.type == 2) {\n    // return `_t(${node.expression})`;\n    let rawExpr = node.text.substring(2,node.text.length-2);\n    let t =  `_t(${node.expression}, \"${rawExpr}\",this)`  \n    return t;\n  } else {\n    return `_t(${JSON.stringify(node.text)})`\n  }\n  // let textNode = \n  // if(node.expression) {\n  //   new \n  // }\n  // return textNode;\n}\nfunction genData(node) {\n  if(node.attrs) {\n    let hash = {};\n    for (let attr of node.attrs) {\n      hash[attr[1]] = attr[2];\n    }\n    let data = JSON.stringify(hash);\n    data = data.replace(/\\\"\\{\\{(.+)\\}\\}\"/, \"$1\")\n    return data;\n  }\n  return;\n}\n// 生成节点代码\nfunction genNode(node) {\n  if(node.type==1) {\n    return generateElement(node);\n  } else {\n    return generateText(node);\n  }\n}\n// 递归生成子节点的代码（子节点可能是元素，也可能是文本）\nfunction genChildren(node) {\n  const children = node.children;\n  if(children && children.length) {\n    return `[${children.map(c => genNode(c)).join(',')}]`\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (generateElement);\n\n\n//# sourceURL=webpack://Vue/./src/generator.js?");

/***/ }),

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

;
eval("__webpack_require__.r(__webpack_exports__);\nfunction createElement(vnode) {\n  let node = document.createElement(vnode.tag);\n  if(vnode.data) {\n    for (let key in vnode.data) {\n      node.setAttribute(key, vnode.data[key])\n    }\n  }\n  if(vnode.value) {\n    node.value = vnode.value;\n  }\n  return node;\n}\nconst e = createElement;//document.createElement.bind(document);\nconst t = document.createTextNode.bind(document);\n\nfunction createDOM(vnode) {\n  let dom = vnode.tag ? e(vnode) : t(vnode.text);\n  vnode.dom = dom;\n  if(vnode.children && vnode.children.length) {\n    vnode.children.forEach(child => {\n      dom.appendChild(createDOM(child))\n    });\n  }\n  return dom;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  createDOM\n});\n\n//# sourceURL=webpack://Vue/./src/helper.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

;
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Vue; });\n/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parser */ \"./src/parser.js\");\n/* harmony import */ var _optimizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./optimizer */ \"./src/optimizer.js\");\n/* harmony import */ var _generator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generator */ \"./src/generator.js\");\n/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vnode */ \"./src/vnode.js\");\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helper */ \"./src/helper.js\");\n/* harmony import */ var _Observer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Observer */ \"./src/Observer.js\");\n\n\n\n\n\n\n\n\nclass Vue {\n  constructor(options) {\n    let el;\n    if(options.el==undefined || (el = document.querySelector(options.el)) == null) {\n      throw new Error('el must be specified in Vue constructor');\n    }\n    this.el = el;\n    this.template = this.el.outerHTML;\n    this.options = options || {};\n    this.data = options.data || {};\n    \n    new _Observer__WEBPACK_IMPORTED_MODULE_5__[\"default\"](this.data);\n\n    this.context = Object.assign(this.data, _vnode__WEBPACK_IMPORTED_MODULE_3__);\n    \n    this.ast = null;\n    this.code = null;\n    this.vnode = null;\n    this.render = null;\n\n    this.main();\n    this.el.remove();\n  }\n\n  main() {\n    this.parseTemplate();\n    console.log(this.ast);\n    this.optimize(this.ast);\n    this.render = this.genCode();\n    this.vnode = this.render.call(this.context)\n    this.paint();\n  }\n\n  genCode() {\n    let code =  'with(this){return ' + Object(_generator__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this.ast) + ';}';\n    code = code.replace(/\\n/g, '');\n    console.log(code);\n    let func = new Function(code);\n    return func;\n  }\n\n  optimize() {\n    Object(_optimizer__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.ast); \n  }\n\n  parseTemplate() {\n    let parent, stack = [];\n    let _ = this;\n    \n    Object(_parser__WEBPACK_IMPORTED_MODULE_0__[\"parseHTML\"])(this.template, {\n      start(tag, attrs, unary, directives) {\n        var node = { type: 1, tag, attrs, unary, parent, children:[], directives };\n        if(parent && parent.children) {\n          parent.children.push(node);\n        }\n        if(stack.length == 0) {\n          node.isRoot = true;\n          _.ast = node;\n        }\n        if(!node.unary) {\n          stack.push(node);\n          parent =  node;\n        }\n      },\n      end() {\n        parent = parent.parent;\n        stack.pop();\n      },\n      chars(text) {\n        if(parent && parent.children) {\n          // var node = { type: 3, text, parent };\n          var expression;\n          if(expression=Object(_parser__WEBPACK_IMPORTED_MODULE_0__[\"parseText\"])(text)) {\n            parent.children.push({ type: 2, text, parent, expression })\n          } else {\n            parent.children.push({ type: 3, text, parent })\n          }\n        }\n      }\n    })\n  }\n\n  paint() {\n    var newNode = _helper__WEBPACK_IMPORTED_MODULE_4__[\"default\"].createDOM(this.vnode);\n    let parentNode = this.el.parentElement;\n   \n    parentNode.insertBefore(newNode, this.el)\n  }\n}\n\n// with(this){\n//   return _e(\"div\",\n//   {\"id\":\"app\"},\n//   [\n//     _t(\"\\n    \"),\n//     _e(\"h3\",{},\n//     [\n//       _t(\"hello \"+_v(name))\n//     ]\n//     ),\n//     _t(\"you wanna to goto \"+_v(companyName)+\" in \"+_v(city))\n//   ]\n// );\n// }\n// import Vue from './src/index';\n\n\n//# sourceURL=webpack://Vue/./src/index.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseHTML\", function() { return parseHTML; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseText\", function() { return parseText; });\nvar startTagOpen = /^<(\\w+)/;\nvar startTagClose = /^\\s*(\\/)?>/;\nvar attrTag = /^\\s*(([\\w_-]+)=\"([^\"]*)\")/;\nvar endTag = /^\\s*<\\/\\w+\\>\\s*/;\n\nvar advance = function(template, n) {\n  return template.substr(n);\n}\n\nfunction  parseStartTag(template){\n  var start = template.match(startTagOpen);\n  \n  if(start) {\n    let tagName = start[1];\n    var attr;\n    let end;\n    template = advance(template, start[0].length)\n  \n    var node = {\n      tagName,\n      attrs: [],\n      directives: []\n    };\n    while(\n      !(end = template.match(startTagClose)) && (attr = template.match(attrTag))\n    ) {\n      if(attr[2].startsWith('v-')) {\n        let [,type] = attr[2].split('-');\n        node.directives.push({raw: attr[1], type, expr:attr[3] })\n      } else {\n        node.attrs.push([attr[1],attr[2],attr[3]]);\n      }\n      template = advance(template, attr[0].length)\n    }\n    if(end) {\n      node.unarySlash = end[1];\n      template = advance(template, end[0].length);\n    }\n    return [node, template];\n  }\n  return [];\n}\n\nfunction parseEndTag(template) {\n  var end;\n  if(end = template.match(endTag)) {\n    template = advance(template, end[0].length);\n  }\n  return [end, template];\n}\n\n// let matchStartTag = parseStartTag();\n\n// var textEndPos = template.indexOf('<');\n// if(textEndPos > 0) {\n//   text = template.substr(0, textEndPos);\n//   advance(text.length);\n// } else {\n//   text = template;\n//   html = '';\n// }\n// console.log(text);\n\n\n// parseEndTag();\n\nfunction parseHTML(template, options) {\n  while(template) {\n    var text;\n    var textEndPos = template.indexOf('<');\n    if(textEndPos < 0) {\n      text = template;\n      template = '';\n      options.chars(text);\n      break;\n    }\n\n    if(textEndPos > 0) {\n      text = template.substr(0, textEndPos);\n      template = advance(template, text.length);\n      options.chars(text);\n    }\n\n    let [matchStartTag, newTemplate1] = parseStartTag(template);\n    if(matchStartTag) {\n      options.start(matchStartTag.tagName, matchStartTag.attrs, matchStartTag.unarySlash==='/', matchStartTag.directives)\n      template = newTemplate1;\n    }\n    \n    let [matchEndTag, newTemplate2] = parseEndTag(template);\n    if(matchEndTag) {\n      options.end();\n      template = newTemplate2;\n    } else if(matchStartTag.tagName=='input') {\n      // 直接从DOM中获取的模板，自闭标签是没有`/>`的，直接end\n      options.end();\n    }\n  }\n}\n\nfunction parseText(text) {\n  text = text.trim();\n\n  if(!text) return;\n\n  // expression regexp\n  var re = /\\{\\{\\w+(\\.{1}\\w+)*\\}\\}/g;\n  \n  if(re.test(text)) {\n    re.lastIndex = 0;\n    var match;\n    var tokens = [];\n    var lastIndex = 0;\n  \n    while((match = re.exec(text)) != null) {\n      if(match.index > 0) tokens.push('\"' + text.substring(lastIndex, match.index)  + '\"');\n      tokens.push('_v(' + match[0].substring(2,match[0].length-2) + ')')\n      lastIndex = re.lastIndex;\n      // console.log(lastIndex);\n    }\n    if(lastIndex < text.length) {\n      tokens.push('\"' + text.substring(lastIndex) + '\"');\n    }\n    // console.log(tokens);\n    return tokens.join('+')\n  }\n\n}\n// console.log(parseText('haha {{name}} receive offer worth {{amount}}'));\n// console.log(parseText(\"{{owner}}'s blog\"));\n\n\n\n\n\n//# sourceURL=webpack://Vue/./src/parser.js?");

/***/ }),

/***/ "./src/vnode.js":
/*!**********************!*\
  !*** ./src/vnode.js ***!
  \**********************/
/*! exports provided: default, createTextNode, createElementNode, toString, forEach, _t, _e, _v, _l */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

;
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return VNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createTextNode\", function() { return createTextNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElementNode\", function() { return createElementNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toString\", function() { return toString; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"forEach\", function() { return forEach; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"_t\", function() { return createTextNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"_e\", function() { return createElementNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"_v\", function() { return toString; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"_l\", function() { return forEach; });\n/* harmony import */ var _Watcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Watcher */ \"./src/Watcher.js\");\n\nclass VNode {\n  constructor(tag, data, children, text, value) {\n    this.tag = tag;\n    this.data = data;\n    this.children = children;\n    this.text = text;\n    this.value = value;\n  }\n\n  update(value) {\n    if(!this.tag) {\n      this.dom.textContent = value;\n    }\n  }\n}\n\nconst createTextNode = (text, expr, context) => {\n  let vnode = new VNode(null, null, null, text, null);\n  if(expr) {\n    new _Watcher__WEBPACK_IMPORTED_MODULE_0__[\"default\"](vnode, expr, context)\n  }\n  return vnode;\n}\n\nconst createElementNode = (tag, data, children, value) => {\n  return new VNode(tag, data, children, null, value);\n}\n\nconst toString = function(val) {\n  return val;\n}\n\nconst forEach = function(list, handler) {\n  return list.map((item,index) => {\n    return handler(item,index);\n  })\n}\n\n\n\n//# sourceURL=webpack://Vue/./src/vnode.js?");

/***/ })

/******/ })["default"];
});