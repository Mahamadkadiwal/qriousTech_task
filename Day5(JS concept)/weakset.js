const weakSet = new WeakSet();

let obj = { name: "Ali" };
weakSet.add(obj);
weakSet.add(obj);

console.log(weakSet.has(obj)); // true
obj = null; // object is now garbage collectible
// The WeakSet automatically removes it from memory

console.log(obj)