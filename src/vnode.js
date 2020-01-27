import Watcher from './Watcher';
export default class VNode {
  constructor(tag, data, children, text, value) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.value = value;
  }

  update(value) {
    if(!this.tag) {
      this.dom.textContent = value;
    }
  }
}

export const createTextNode = (text, expr, context) => {
  let vnode = new VNode(null, null, null, text, null);
  if(expr) {
    new Watcher(vnode, expr, context)
  }
  return vnode;
}

export const createElementNode = (tag, data, children, value) => {
  return new VNode(tag, data, children, null, value);
}

export const toString = function(val) {
  return val;
}

export const forEach = function(list, handler) {
  return list.map((item,index) => {
    return handler(item,index);
  })
}

export {
  createTextNode as _t,
  createElementNode as _e,
  toString as _v,
  forEach as _l
};