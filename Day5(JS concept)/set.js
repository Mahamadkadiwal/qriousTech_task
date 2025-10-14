const set = new Set();

set.add(1);
set.add("hello");
set.add({ name: "Asgar" });

console.log(set); // Set(3) {1, "hello", { name: "Asgar" }}
console.log(set.has("name")); // true

for (let item of set) {
  console.log(item);
}
