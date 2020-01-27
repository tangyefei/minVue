export default class Dep {
  constructor(){
    this.depends = [];
  }

  depend() {
    if(window.target) {
      if(this.depends.indexOf(window.target) === -1) {
        this.depends.push(window.target);
      }
    }
  }

  notify() {
    for (let i = 0; i < this.depends.length; i++) {
      const depend = this.depends[i];
      depend.update();
    }
  }
}
