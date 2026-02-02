"use client";
import Modal from '@/app/_Compoenent/Modal';
import RoleTable from '@/app/_Compoenent/RoleTable';
import SectionHeader from '@/app/_Compoenent/SectionHeader';
import { getCookiesValue } from '@/app/_lib/getCookiesValue';
import { hasPermission } from '@/app/_lib/permission';
import { useEffect, useState } from 'react';
import { createRole, getRoles, updateRole } from './action';
import toast from 'react-hot-toast';

type Role = {
    role_id: number;
    name: string;
};

export default function Page() {
    const [permissions, setPermissions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [isOpen, setIsOpen] = useState(false);
    const [roleName, setRoleName] = useState("");
    const [editId, setEditId] = useState<number | null>(null);
    const [rolesData, setRolesData] = useState<Role[]>([]);

    async function fetchRoles() {
        const res = await getRoles();

        if (res?.status === 403) {
            setError(res.error as string);
            setLoading(false);
            return;
        }

        if (res?.status !== 200) {
            setError("Something went wrong while loading roles");
            setLoading(false);
            return;
        }

        setRolesData(res.data);
        setLoading(false);
    }

    useEffect(() => {
        const loadRoles = async () => {
            await fetchRoles();
        };
        loadRoles();
    }, []);

    useEffect(() => {
        async function load() {
            const { permissions, roles } = await getCookiesValue();
            setPermissions(permissions);
            setRoles(roles);
        }

        load();
    }, []);

    const openAdd = () => {
        setEditId(null);
        setRoleName("");
        setIsOpen(true);
    };

    const openEdit = (id: number, name: string) => {
        setEditId(id);
        setRoleName(name);
        setIsOpen(true);
    };

    const handleSave = async () => {
        try {
            if (!roleName.trim()) {
                toast.error("Role name is required");
                return;
            };
            let res;
            if (editId) {
                res = await updateRole(editId, roleName);
                if (!res?.success) {
                    throw new Error(res?.error || "Failed to update role");
                }
            } else {
                res = await createRole(roleName);
                if (!res?.success) {
                    throw new Error(res?.error || "Failed to create role");
                }
            }

            toast.success(editId ? "Role updated successfully" : "Role created successfully");

            setIsOpen(false);
            setRoleName("");
            setEditId(null);
            await fetchRoles();
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("An unexpected error occurred while saving the role.");
            }
        }
    };

    return (
        <div className="bg-[#020617] border border-gray-700 rounded-xl shadow-lg p-6">
            <SectionHeader
                title="Roles"
                buttonText="Add Roles"
                onAddClick={openAdd}
                showButton={hasPermission(permissions, "role", "add", roles)}
            />

            <RoleTable loading={loading} error={error} roles={rolesData} onEdit={openEdit} />

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editId ? "Edit Role" : "Add Role"}>
                <input
                    type="text"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    placeholder="Role Name"
                    className="w-full px-4 py-2 border border-gray-600 rounded-md bg-[#0f172a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />

                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 rounded-md border border-gray-600 text-gray-200 bg-[#020617] hover:bg-gray-600 hover:text-white transition-all duration-200"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded-md border border-blue-950 text-blue-900 hover:bg-blue-900 hover:text-white transition-all duration-200"
                    >
                        {editId ? "Update" : "Save"}
                    </button>
                </div>
            </Modal>
        </div>
    );
}
