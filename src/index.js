import {parseHTML, parseText} from './parser';
import optimize from './optimizer';
import generate from './generator'
import * as vnodeFuncs from './vnode';
import helper from './helper';


export default class Vue {
  constructor(options) {
    let el;
    if(options.el==undefined || (el = document.querySelector(options.el)) == null) {
      throw new Error('el must be specified in Vue constructor');
    }
    this.el = el;
    this.template = this.el.outerHTML;
    this.options = options || {};
    this.context = Object.assign(options.data || {}, vnodeFuncs);
    
    this.ast = null;
    this.code = null;
    this.vnode = null;
    this.render = null;

    this.main();
    this.el.remove();
  }

  main() {
    this.parseTemplate();
    console.log(this.ast);
    this.optimize(this.ast);
    this.render = this.genCode();
    this.vnode = this.render.call(this.context)
    debugger;
    this.paint();
  }

  genCode() {
    let code =  'with(this){return ' + generate(this.ast) + ';}';
    code = code.replace(/\n/g, '');
    console.log(code);
    let func = new Function(code);
    return func;
  }

  optimize() {
    optimize(this.ast); 
  }

  parseTemplate() {
    let parent, stack = [];
    let _ = this;
    
    parseHTML(this.template, {
      start(tag, attrs, unary, directives) {
        var node = { type: 1, tag, attrs, unary, parent, children:[], directives };
        if(parent && parent.children) {
          parent.children.push(node);
        }
        if(stack.length == 0) {
          node.isRoot = true;
          _.ast = node;
        }
        if(!node.unary) {
          stack.push(node);
          parent =  node;
        }
      },
      end() {
        parent = parent.parent;
        stack.pop();
      },
      chars(text) {
        if(parent && parent.children) {
          // var node = { type: 3, text, parent };
          var expression;
          if(expression=parseText(text)) {
            parent.children.push({ type: 2, text, parent, expression })
          } else {
            parent.children.push({ type: 3, text, parent })
          }
        }
      }
    })
  }

  paint() {
    var newNode = helper.createDOM(this.vnode);
    let parentNode = this.el.parentElement;
   
    parentNode.insertBefore(newNode, this.el)
  }
}

// with(this){
//   return _e("div",
//   {"id":"app"},
//   [
//     _t("\n    "),
//     _e("h3",{},
//     [
//       _t("hello "+_v(name))
//     ]
//     ),
//     _t("you wanna to goto "+_v(companyName)+" in "+_v(city))
//   ]
// );
// }
// import Vue from './src/index';
