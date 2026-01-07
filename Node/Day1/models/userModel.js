const fs = require('fs').promises;
const path = require('path');

const rootDir = path.dirname(require.main.filename);

const p = path.join(rootDir, 'data', 'user.json');

async function readUser() {
  try {
    const data = await fs.readFile(p, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("FILE READ ERROR:", err.message);
    return [];
  }
}


async function writeUser(data){
    const users = await readUser();
    users.push(data);
    await fs.writeFile(p, JSON.stringify(users));  
}

async function updateUser(id, data) {
  const users = await readUser();
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return null;  
  }

  users[userIndex] = { ...users[userIndex], ...data };

  await fs.writeFile(p, JSON.stringify(users, null, 2));

  return users[userIndex];
}

async function deleteUser(id) {
  const users = await readUser();

  const updatedUsers = users.filter(u => u.id !== id);

  if (updatedUsers.length === users.length) {
    return null;
  }

  await fs.writeFile(p, JSON.stringify(updatedUsers, null, 2));

  return true; 
}

module.exports = { readUser, writeUser, updateUser, deleteUser };