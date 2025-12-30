import { User, userSchema, usersSchema } from "./userSchema";

const API = 'https://jsonplaceholder.typicode.com/users';

export async function getUsers(): Promise<User[]>{
    const res = await fetch(API, { cache: "no-store" });
    const data = await res.json();
    return usersSchema.parse(data);
}

export async function createUser(newUser: Omit<User, 'id'>): Promise<User> {
    const res = await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)

    });
    if(!res.ok){
        throw new Error('Failed to create user');
    }
    const data = await res.json();
    return userSchema.parse({...data, id: Math.random()});
}

export async function updateUser(id: number, user: Partial<User>): Promise<User> {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const data = await res.json();
  return userSchema.parse({ ...data, id }); // Ensure correct shape
}

export async function deleteUser(id: number): Promise<{ success: true }> {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  return { success: true };
}