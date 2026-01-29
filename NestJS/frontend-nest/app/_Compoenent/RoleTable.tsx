
export default function RoleTable() {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">

                <thead>
                    <tr className="bg-[#020617] border-b border-gray-700">
                        <th className="px-4 py-2 text-gray-300 font-medium">Role Id</th>
                        <th className="px-4 py-2 text-gray-300 font-medium">Role Name</th>
                        <th className="px-4 py-2 text-gray-300 font-medium">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr className="border-b border-gray-800 hover:bg-[#0f172a] transition">
                        <td className="px-4 py-2 text-gray-200">1</td>
                        <td className="px-4 py-2 text-gray-200 font-medium">User</td>
                        <td className="px-4 py-2">
                            <button className="px-4 py-1.5 text-sm rounded-md
                                 border border-blue-950 text-blue-900
                                 hover:bg-blue-900 hover:text-white
                                 transition-all duration-200">
                                Edit
                            </button>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    )
}
