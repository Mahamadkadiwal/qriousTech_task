
"use client";
import { useQuery } from "@tanstack/react-query";
import { usersQueryOptions } from "./_component/query-options";
import CreateUser from "./_component/CreateUser";
import EditUser from "./_component/EditUser";
import DeleteUser from "./_component/DeleteUser";

export default function UsersPage() {
  const { data, isPending, error } = useQuery(usersQueryOptions());

  if (isPending) return <h1>Loading...</h1>;
  if (error) return <h1>Error loading users</h1>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Users</h1>

      <CreateUser />

      <div className="grid grid-cols-3 gap-4">
        {data?.map((user) => (
          <div key={user.id} className="p-4 border rounded shadow">
            <h2 className="font-bold">{user.name}</h2>
            <p>{user.email}</p>

            <EditUser user={user} />
            <DeleteUser id={user.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
