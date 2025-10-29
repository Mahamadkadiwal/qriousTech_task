'use strict';

const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never to this!
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);



Person.prototype.calcAge = function () { 
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
console.log(Person.prototype);
console.log(jonas.__proto__ === Person.prototype);

console.log(jonas.__proto__.__proto__)

console.log(Person.prototype === Object.prototype)
console.log(Object.prototype)