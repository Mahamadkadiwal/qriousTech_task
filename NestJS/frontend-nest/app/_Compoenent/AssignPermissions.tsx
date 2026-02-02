"use client";

type assignPermission = {
    role_per_id: number;
    permission_id: number;
    Role: {
        role_id: number;
        name: string;
    }
    Permission: {
        permission_id: number;
        feature: string;
        name: string;
    }
}

export default function AssignPermissions({
    onEdit,
    permissions,
    loading,
    error
}: {
    onEdit?: (id: number, role: string, feature: string, permission: string) => void;
    permissions: assignPermission[];
    loading: boolean;
    error: string | null;
}) {

    if (loading) return <p className="text-gray-400 px-4 py-2">Loading permissions...</p>;

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
                        <th className="px-4 py-2 text-gray-300 font-medium">Feature Name</th>
                        <th className="px-4 py-2 text-gray-300 font-medium">Permission Name</th>
                        <th className="px-4 py-2 text-gray-300 font-medium">Actions</th>

                    </tr>
                </thead>

                <tbody>
                    {permissions.map((permission, index) => (
                        <tr
                            key={permission.role_per_id}
                            className="border-b border-gray-800 hover:bg-[#0f172a] transition"
                        >
                            <td className="px-4 py-2 text-gray-200">{index + 1}</td>
                            <td className="px-4 py-2 text-gray-200 font-medium">{permission.Role.name}</td>
                            <td className="px-4 py-2 text-gray-200 font-medium">{permission.Permission.feature}</td>
                            <td className="px-4 py-2">{permission.Permission.name}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() =>
                                        onEdit &&
                                        onEdit(
                                            permission.role_per_id,
                                            permission.Role.name,
                                            permission.Permission.feature,
                                            permission.Permission.name
                                        )
                                    }
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
