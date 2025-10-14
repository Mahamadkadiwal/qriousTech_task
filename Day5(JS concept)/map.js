let lala = {name: "Asgar"}
const map = new Map();
map.set("user1", lala);
map.set(1, 'Number key');
console.log(map.size); // 2
console.log(map.get(1));

lala = null;

console.log(map.get("user1"))