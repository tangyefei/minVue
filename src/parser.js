var startTagOpen = /^<(\w+)/;
var startTagClose = /^\s*(\/)?>/;
var attrTag = /^\s*(([\w_-]+)="([^"]*)")/;
var endTag = /^\s*<\/\w+\>\s*/;

var advance = function(template, n) {
  return template.substr(n);
}

function  parseStartTag(template){
  var start = template.match(startTagOpen);
  
  if(start) {
    let tagName = start[1];
    var attr;
    let end;
    template = advance(template, start[0].length)
  
    var node = {
      tagName,
      attrs: [],
      directives: []
    };
  
    while(
      !(end = template.match(startTagClose)) && (attr = template.match(attrTag))
    ) {
      if(attr[2].startsWith('v-')) {
        let [,type] = attr[2].split('-');
        node.directives.push({raw: attr[1], type, expr:attr[3] })
      } else {
        node.attrs.push([attr[1],attr[2],attr[3]]);
      }
      template = advance(template, attr[0].length)
    }
    if(end) {
      node.unarySlash = end[1];
      template = advance(template, end[0].length);
    }
    return [node, template];
  }
  return [];
}

function parseEndTag(template) {
  var end;
  if(end = template.match(endTag)) {
    template = advance(template, end[0].length);
  }
  return [end, template];
}

// let matchStartTag = parseStartTag();

// var textEndPos = template.indexOf('<');
// if(textEndPos > 0) {
//   text = template.substr(0, textEndPos);
//   advance(text.length);
// } else {
//   text = template;
//   html = '';
// }
// console.log(text);


// parseEndTag();

export function parseHTML(template, options) {
  while(template) {
    var text;
    var textEndPos = template.indexOf('<');
    if(textEndPos < 0) {
      text = template;
      template = '';
      options.chars(text);
      break;
    }

    if(textEndPos > 0) {
      text = template.substr(0, textEndPos);
      template = advance(template, text.length);
      options.chars(text);
    }

    let [matchStartTag, newTemplate1] = parseStartTag(template);
    if(matchStartTag) {
      options.start(matchStartTag.tagName, matchStartTag.attrs, matchStartTag.unarySlash==='/', matchStartTag.directives)
      template = newTemplate1;
    }

    let [matchEndTag, newTemplate2] = parseEndTag(template);
    if(matchEndTag) {
      options.end();
      template = newTemplate2;
    }
  }
}

export function parseText(text) {
  text = text.trim();

  if(!text) return;

  // expression regexp
  var re = /\{\{\w+(\.{1}\w+)*\}\}/g;
  
  if(re.test(text)) {
    re.lastIndex = 0;
    var match;
    var tokens = [];
    var lastIndex = 0;
  
    while((match = re.exec(text)) != null) {
      if(match.index > 0) tokens.push('"' + text.substring(lastIndex, match.index)  + '"');
      tokens.push('_v(' + match[0].substring(2,match[0].length-2) + ')')
      lastIndex = re.lastIndex;
      // console.log(lastIndex);
    }
    if(lastIndex < text.length) {
      tokens.push('"' + text.substring(lastIndex) + '"');
    }
    // console.log(tokens);
    return tokens.join('+')
  }

}
// console.log(parseText('haha {{name}} receive offer worth {{amount}}'));
// console.log(parseText("{{owner}}'s blog"));



