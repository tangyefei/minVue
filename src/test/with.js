export default function() {
  var context = {
    name: 'yefei', 
    age: 30,
    _e: function(tag){return document.createElement(tag)},
  };

  var code = `with(this) { console.log(this);return _e(name); }`
  var gen = new Function(code);
  gen = gen.bind(context);
  console.log(gen());
} 