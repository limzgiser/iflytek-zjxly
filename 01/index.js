// 动物类
function Animal(name) {
  this.name = name || "Animal";
  this.sleep = function () {
    console.log(this.name + "正在睡觉！");
  };
}
// 原型方法
Animal.prototype.eat = function (food) {
  console.log(this.name + "正在吃：" + food);
};
// 一、 原型链继承
llog("方式一：原型链继承");
function Cat() {}
Cat.prototype = new Animal();
Cat.prototype.name = "cat";
var cat = new Cat();
console.log(cat.name);
console.log(cat.eat("fish"));
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // true

// 二、构造继承
llog("方式二：构造继承");
function Cat(name) {
  Animal.call(this);
  this.name = name || "Tom";
}
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true

// 三、实例继承
llog("方式三：实例继承");
function Cat(name) {
  var instance = new Animal();
  instance.name = name || "Tom";
  return instance;
}

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // false

// 拷贝继承
llog("方式四：拷贝继承");
function Cat(name) {
  var animal = new Animal();
  for (var p in animal) {
    Cat.prototype[p] = animal[p];
  }
  // 2020年10月10日21点36分：感谢 @baclt 的指出，如下实现修改了原型对象，会导致单个实例修改name，会影响所有实例的name值
  // Cat.prototype.name = name || 'Tom'; 错误的语句，下一句为正确的实现
  this.name = name || "Tom";
}

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true
// 组合继承
llog("方式五：组合继承");
function Cat(name) {
  Animal.call(this);
  this.name = name || "Tom";
}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // true
// 寄生组合继承
llog("方式六：寄生组合继承");
function Cat(name) {
  Animal.call(this);
  this.name = name || "Tom";
}
(function () {
  var Super = function () {};
  Super.prototype = Animal.prototype;
  Cat.prototype = new Super();
})();
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); //true

function llog(log) {
  console.log("%c" + log, "color: red;font-size: 16px;font-weight: bold;");
}
