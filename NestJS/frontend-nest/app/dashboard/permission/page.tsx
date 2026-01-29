import PermissionTable from '@/app/_Compoenent/PermissionTable'
import React from 'react'

export default function page() {
    return (
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
    )
}
