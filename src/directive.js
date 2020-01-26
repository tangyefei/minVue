const directivePrefix = 'v-';

function Directive(name, expression, node) {
  this.name = name;
  this.expression = expression;
  this.el = node;
  console.log(this);
}

function cloneAttributes(node) {
  return Array.prototype.map.call(node.attributes, a => {
    return { 'name': a.name, 'value': a.value }
  });
}

function processDirective(attribute, node) {
  if(attribute.name.startsWith(directivePrefix)) {
    let attributeSplits = attribute.name.split('-');
    let directiveName = attributeSplits[1];
    let directiveExpression = attribute.value;
    new Directive(directiveName, directiveExpression, node);
  }
}

function parseNode(node) {
  let attributes = cloneAttributes(node);
  // console.log(attributes)
  attributes.forEach(a => {
    processDirective(a, node);
  })
  if(node.children && node.children.length) {
    Array.prototype.forEach.call(node.children, (child) => {
      parseNode(child);
    });
  }
}

function Vue(options) {
  this.options = options;
  this.root = document.querySelector(options.root)
  this.scope = options.data;

  parseNode(this.root);
  // loop dom attributes, if find v- type attribute
  // if v-text,
  //   render text, defineProperty set to rerender text
  // if v-click
  //   addListener 
  // if v-for
  //   loop handler logic
}



export default Vue;