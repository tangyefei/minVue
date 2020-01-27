
// 生成元素节点代码
function generateElement(node) {
  const directives = node.directives;
  const data = genData(node);
  
  const children = genChildren(node);
  let code = `_e("${node.tag}"${data ? `,${data}` : ",{}"}${children ? `,${children}` : ",[]"}`
  let expr;

  if(directives && directives.length) {
    let dir = directives[0];
    if(dir.type == 'if') {
      expr = dir.expr;
      code = `${expr} ? ${code} : _t("")`;
    } else if(dir.type == 'for') {
      let [item, ,list] = dir.expr.trim().split(' ')
      code = `...(_l(${list},(${item}, index)=>{return ${code};}))`
    } else if(dir.type == 'model') {
      expr = dir.expr;
      code = `${expr?`${code},${expr}`:""}`;
    }
  }
  let result = `${code})`;
  // ,${expr?"${expr}":""}
  return result;
}
// 生成文本节点代码
function generateText(node) {
  if(node.type == 2) {
    // return `_t(${node.expression})`;
    let rawExpr = node.text.substring(2,node.text.length-2);
    let t =  `_t(${node.expression}, "${rawExpr}",this)`  
    return t;
  } else {
    return `_t(${JSON.stringify(node.text)})`
  }
  // let textNode = 
  // if(node.expression) {
  //   new 
  // }
  // return textNode;
}
function genData(node) {
  if(node.attrs) {
    let hash = {};
    for (let attr of node.attrs) {
      hash[attr[1]] = attr[2];
    }
    let data = JSON.stringify(hash);
    data = data.replace(/\"\{\{(.+)\}\}"/, "$1")
    return data;
  }
  return;
}
// 生成节点代码
function genNode(node) {
  if(node.type==1) {
    return generateElement(node);
  } else {
    return generateText(node);
  }
}
// 递归生成子节点的代码（子节点可能是元素，也可能是文本）
function genChildren(node) {
  const children = node.children;
  if(children && children.length) {
    return `[${children.map(c => genNode(c)).join(',')}]`
  }
}

export default generateElement
