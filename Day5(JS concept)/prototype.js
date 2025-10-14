function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, I am ${this.name}`);
};


let p1 = {};
p1.__proto__ = Person.prototype;
console.log(p1.__proto__ === Person.prototype)
p1.sayHello(); // Hello, I am Asgar
