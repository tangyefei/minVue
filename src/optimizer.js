
function isStatic(node) {
  if(node.type == 2) {
    return false;
  } else if(node.type == 3) {
    return true;
  } else {
    // node.type == 1 需要区分普通个元素还是有 v-if v-pre 等各种directive的元素，这里先都统一返回为true，因为还没实现directive
    return true;
  }
}

function markStatic(parent) {
  parent.static = isStatic(parent);
  if(parent.type == 1 && parent.children) {
    for (let i = 0; i < parent.children.length; i++) {
      const child = parent.children[i];
      child.static = isStatic(child);
      markStatic(child);
      if(!child.static) {
        parent.static = false;
      }
    }
  }
}

function markRootStatic(parent) {
  if(parent.static) {
    parent.staticRoot = true;
    return;
  } else {
    parent.staticRoot = false;
  }
  if(parent.children) {
    for (let i = 0; i < parent.children.length; i++) {
      const child = parent.children[i];
      markRootStatic(child);
    }
  }
}

export default function optimize(root) {
  if(!root) return;

  markStatic(root);
  markRootStatic(root);
}
