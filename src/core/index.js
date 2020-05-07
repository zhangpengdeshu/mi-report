function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  })
}

const Dep = function Dep() {
  this.uid = uid++
  this.subs = []
}

Dep.prototype.addSub = function(sub) {
  this.subs.push(sub);
}

Dep.prototype.removeSub = function(sub) {
  
}