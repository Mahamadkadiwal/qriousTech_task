"use client";

type Role = {
    role_id: number;
    name: string;
}

type User = {
    user_id: number;
    username: string;
    email: string;
    roles: Role[]
}

export default function UserTable({
    users,
    loading,
    error
}: {
    users: User[];
    loading: boolean;
    error: string | null;
}) {

    if (loading) return <p className="text-gray-400 px-4 py-2">Loading users...</p>;

    if (error) {
        return (
            <div className="p-4 rounded-lg mx-4 text-sm">
                {error}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
                <thead>
                    <tr className="bg-[#020617] border-b border-gray-700">
                        <th className="px-4 py-2 text-gray-300 font-medium">#</th>
                        <th className="px-4 py-2 text-gray-300 font-medium">Username</th>
                        <th className="px-4 py-2 text-gray-300 font-medium">Email</th>
                        <th className="px-4 py-2 text-gray-300 font-medium">Role</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user, index) => (
                        <tr
                            key={user.user_id}
                            className="border-b border-gray-800 hover:bg-[#0f172a] transition"
                        >
                            <td className="px-4 py-2 text-gray-200">{index + 1}</td>
                            <td className="px-4 py-2 text-gray-200 font-medium">{user.username}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">{user.roles.map((role) => role.name).join(", ")}</td>
                            <td className="px-4 py-2">
                                <button

                                    className="px-4 py-1.5 text-sm rounded-md
                    border border-blue-950 text-blue-900
                    hover:bg-blue-900 hover:text-white
                    transition-all duration-200"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
