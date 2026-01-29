import React from 'react'
import RoleTable from '../_Compoenent/RoleTable'
import PermissionTable from '../_Compoenent/PermissionTable'

export default function Page() {
    return (
        <div className="space-y-8">

            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold text-white tracking-wide">
                    Dashboard
                </h2>
            </div>

            <div className="bg-[#020617] border border-gray-700 rounded-xl shadow-lg p-6">
                <div className='flex justify-between px-4'>
                    <h3 className="text-xl font-semibold text-white mb-4">
                        Roles
                    </h3>
                    <button className='px-4 py-1.5 text-sm rounded-md border border-blue-950 text-blue-900
                    hover:bg-blue-900 hover:text-white
                    transition-all duration-200'>Add Roles</button>
                </div>
                <RoleTable />
            </div>

            <div className="bg-[#020617] border border-gray-700 rounded-xl shadow-lg p-6">
                <div className='flex justify-between px-4'>
                    <h3 className="text-xl font-semibold text-white mb-4">
                        Permission
                    </h3>
                    <button className='px-4 py-1.5 text-sm rounded-md border border-blue-950 text-blue-900
                    hover:bg-blue-900 hover:text-white
                    transition-all duration-200'>Add Permission</button>
                </div>
                <PermissionTable />
            </div>

        </div>
    )
}
