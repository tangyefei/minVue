function parsePath(exp) {
  const segments = exp.split('.');
  return function(obj) {
    for (let i = 0; i < segments.length; i++) {
      const key = segments[i];
      if(!obj) return;
      obj = obj[key];
    }
    return obj;
  }
}

export default class Watcher {
  constructor(vnode, exp, obj) {
    this.vnode = vnode;
    this.obj = obj;
    this.getter = parsePath(exp);
    this.value = this.get();
    // this.render();
  }

  get() {
    window.target = this;
    let value = this.getter.call(this.vnode, this.obj);
    return value;
  }

  render() {
    // console.log('watcher render:' + this.value)
    // debugger;
    this.vnode.update(this.value);
    // this.vm.innerHTML = this.value;
  }

  update() {
    // const oldValue = this.value;
    this.value = this.get();
    this.render();
  }
}