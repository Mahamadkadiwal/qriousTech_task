"use client";

type Role = {
    role_id: number;
    name: string;
};

export default function RoleTable({
    onEdit,
    roles,
    loading,
    error,
    showEditButton = true
}: {
    onEdit: (id: number, name: string) => void;
    roles: Role[];
    loading: boolean;
    error: string | null;
    showEditButton?: boolean;
}) {

    if (loading) return <p className="text-gray-400 px-4 py-2">Loading roles...</p>;

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
                        <th className="px-4 py-2 text-gray-300 font-medium">Role Name</th>
                        <th className="px-4 py-2 text-gray-300 font-medium">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {roles.map((role, index) => (
                        <tr
                            key={role.role_id}
                            className="border-b border-gray-800 hover:bg-[#0f172a] transition"
                        >
                            <td className="px-4 py-2 text-gray-200">{index + 1}</td>
                            <td className="px-4 py-2 text-gray-200 font-medium">{role.name}</td>
                            <td className="px-4 py-2">
                                {showEditButton && (<button
                                    onClick={() => onEdit(role.role_id, role.name)}
                                    className="px-4 py-1.5 text-sm rounded-md
                    border border-blue-950 text-blue-900
                    hover:bg-blue-900 hover:text-white
                    transition-all duration-200"
                                >
                                    Edit
                                </button>)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
