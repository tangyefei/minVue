function createElement(vnode) {
  let node = document.createElement(vnode.tag);
  if(vnode.data) {
    for (let key in vnode.data) {
      node.setAttribute(key, vnode.data[key])
    }
  }
  if(vnode.value) {
    node.value = vnode.value;
  }
  return node;
}
const e = createElement;//document.createElement.bind(document);
const t = document.createTextNode.bind(document);

function createDOM(vnode) {
  let dom = vnode.tag ? e(vnode) : t(vnode.text);
  vnode.dom = dom;
  if(vnode.children && vnode.children.length) {
    vnode.children.forEach(child => {
      dom.appendChild(createDOM(child))
    });
  }
  return dom;
}

export default {
  createDOM
}