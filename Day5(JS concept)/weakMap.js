// const privateData = new WeakMap();
// class User {
//   constructor(name, age) {
//     privateData.set(this, { name, age });
//   }

//   getName() {
//     return privateData.get(this).name;
//   }

  
// }

// const u1 = new User("Asgar", 25);
// console.log(u1.getName()); // Asgar
// console.log(u1.age); 
// console.log(privateData.get(u1).age);

const weakMap = new WeakMap();
let user = { name: 'Asgar' };

weakMap.set(user, { age: 25 });
console.log(weakMap.get(user)); // { age: 25 }

user = null; // remove the only strong reference
// Now the object and its data are automatically garbage collected

console.log(weakMap.get(user));