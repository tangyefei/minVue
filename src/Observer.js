import Dep from './Dep';

var arrayMethods = Object.create(Array.prototype);

['push', 'pop','shift', 'unshift'].forEach(d => {
  var method = arrayMethods[d];
  Object.defineProperty(arrayMethods, d, {
    value: function(...args) {
      const ob = this.__ob__;
      method.call(this, ...args);
      ob.dep.notify();
    }
  });
});

function defineReactive(data, key, val){
  let childOb;
  let dep = new Dep();

  if(typeof val === 'object') {
    // 处理重复调用Observer，自己没重现出来会有什么问题，只是出于效率考虑？
    if(val.__ob__ && val.__ob__ instanceof Observer) {
      childOb = val.__ob__;
    } else {
      /** 
      Dep和Observer的理解是整个逻辑中最费脑的

      1. Dep可以理解为任何一个结构上都有它自己的dep
      
      举例：

      o = {s: 'halo', a: [1,2,3]}，对象o、属性s、属性a、对象[1,2,3]都有自己的dep

      对于s属性的更改，直接在defineProperty中通过dep.notify通知即可

      对于数组对象的操作，是无法在defineProperty感知到的

      2. 我们通过修改了数组的操作方法，让数组进行了操作时候，能感知到，但是如何通知使用到数组的界面呢？

      在上例中，其实 [1,2,3] 在方法的defineProperty中能拿到dep即可， Vue的设计是

      在对象（包含普通对象、数组对象）上都提供了 Observer 的实例，包括a和[1,2,3]

      为了让数组的操作方法上拿到dep，我们吧 Observer 的实例直接挂在对象上，即存在 a.ob [1,2,3].ob

      而ob下又有dep，因此在数组操作方法中，通过 this.ob.dep即可进行通知
      */
      childOb = new Observer(val);
    }
  }

  Object.defineProperty(data, key, {
    get: function(){
      dep.depend();

      if(childOb) {
        childOb.dep.depend();
      }

      console.log('get:' + val);
      return val;
    },
    set: function(newval){
      if(newval != val) {
        console.log('change happen from:`' + val + '` to `' + newval + '`');
        val = newval;
        // ob.
        dep.notify();
      }
    }
  })
}

export default class Observer {
  constructor(value) {
    this.dep = new Dep();

    value.__ob__ = this;

    if(Array.isArray(value)) {
      value.__proto__ = arrayMethods;
    } else if(typeof value == 'object'){
      this.walk(value);
    }
  }

  walk(obj) {
    const keys = Object.keys(obj);
    for (let key of keys) {
      if(key!='__ob__') {
        defineReactive(obj, key, obj[key]) 
      }
    }
  }
}
