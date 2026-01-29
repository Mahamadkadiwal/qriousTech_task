"use client";
import Modal from '@/app/_Compoenent/Modal';
import RoleTable from '@/app/_Compoenent/RoleTable'
import { useState } from 'react';

export default function page() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-[#020617] border border-gray-700 rounded-xl shadow-lg p-6">
            <div className='flex justify-between px-4'>
                <h3 className="text-xl font-semibold text-white mb-4">
                    Roles
                </h3>
                <button onClick={() => setIsOpen(!isOpen)} className='px-4 py-1.5 text-sm rounded-md border border-blue-950 text-blue-900
                hover:bg-blue-900 hover:text-white
                transition-all duration-200'>Add Roles</button>
            </div>
            <RoleTable />

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Role">
                <input type="text" placeholder="Role Name" className="w-full px-4 py-2 border border-gray-600 rounded-md bg-[#0f172a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" />
                <div className="flex justify-end space-x-4">
                    <button className="px-4 py-2 rounded-md border border-gray-600 text-gray-200 bg-[#020617] hover:bg-gray-600 hover:text-white transition-all duration-200" onClick={() => setIsOpen(false)}>Cancel</button>
                    <button className="px-4 py-2 rounded-md border border-blue-950 text-blue-900 hover:bg-blue-900 hover:text-white transition-all duration-200">Save</button>
                </div>
            </Modal>
        </div >
    )
}
