"use client";

type Permission = {
  permission_id: number;
  feature: string;
  name: string;
};

export default function PermissionTable({
  onEdit,
  permissions,
  loading,
  error,
  showEditButton = true
}: {
  onEdit: (id: number, feature: string, name: string) => void;
  permissions: Permission[];
  loading: boolean;
  error: string | null;
  showEditButton?: boolean;
}) {

  if (loading) {
    return <p className="text-gray-400 px-4 py-2">Loading permissions...</p>;
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg mx-4 text-sm">
        {error}
      </div>
    );
  }

  if (permissions.length === 0) {
    return (
      <div className="p-4 rounded-lg mx-4 text-sm text-gray-400 border border-gray-700 bg-[#020617]">
        No permissions found.
      </div>
    );
  }


  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-[#020617] border-b border-gray-700">
            <th className="px-4 py-2 text-gray-300 font-medium">#</th>
            <th className="px-4 py-2 text-gray-300 font-medium">Feature</th>
            <th className="px-4 py-2 text-gray-300 font-medium">Permission</th>
            <th className="px-4 py-2 text-gray-300 font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {permissions.map((permission, index) => (
            <tr
              key={permission.permission_id}
              className="border-b border-gray-800 hover:bg-[#0f172a] transition"
            >
              <td className="px-4 py-2 text-gray-400">{index + 1}</td>

              <td className="px-4 py-2 text-gray-200 font-medium">
                {permission.feature}
              </td>

              <td className="px-4 py-2 text-gray-200 font-medium">
                {permission.name}
              </td>

              <td className="px-4 py-2">
                {showEditButton && (<button
                  onClick={() =>
                    onEdit(
                      permission.permission_id,
                      permission.feature,
                      permission.name
                    )
                  }
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
