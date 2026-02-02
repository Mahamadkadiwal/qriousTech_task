"use client";
import Modal from '@/app/_Compoenent/Modal';
import PermissionTable from '@/app/_Compoenent/PermissionTable';
import SectionHeader from '@/app/_Compoenent/SectionHeader';
import { getCookiesValue } from '@/app/_lib/getCookiesValue';
import { useEffect, useState } from 'react';
import { createPermission, getPermissions, updatePermission } from './action';
import { hasPermission } from '@/app/_lib/permission';
import toast from 'react-hot-toast';

export type Permission = {
    permission_id: number;
    feature: string;
    name: string;
};

export default function Page() {
    const [permissions, setPermissions] = useState([]);
    const [roles, setRoles] = useState([]);

    const [permissionData, setPermissionData] = useState<Permission[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [isOpen, setIsOpen] = useState(false);
    const [feature, setFeature] = useState("");
    const [name, setName] = useState("");
    const [editId, setEditId] = useState<number | null>(null);

    async function fetchPermissions() {
        setLoading(true);

        const res = await getPermissions();

        if (res?.status === 403) {
            setError(res.error as string);
            setLoading(false);
            return;
        }

        if (res?.status !== 200) {
            setError("Something went wrong while loading permissions");
            setLoading(false);
            return;
        }

        setPermissionData(res.data || []);
        setError(null);
        setLoading(false);
    }

    useEffect(() => {
        const loadData = async () => {
            await fetchPermissions();
        }
        loadData();
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
        setFeature("");
        setName("");
        setIsOpen(true);
    };

    const openEdit = (id: number, feature: string, name: string) => {
        setEditId(id);
        setFeature(feature);
        setName(name);
        setIsOpen(true);
    };

    const handleSave = async () => {
        try {
            if (!feature.trim() || !name.trim()) {
                toast.error("Feature and permission name are required");
                return;
            }

            let res;

            if (editId) {
                res = await updatePermission(editId, feature, name);
                if (!res?.success) {
                    throw new Error(res?.error || "Failed to update permission");
                    return;
                }
            } else {
                res = await createPermission(feature, name);
                if (!res?.success) {
                    throw new Error(res?.error || "Failed to create permission");
                }
            }

            toast.success(editId ? "Permission updated successfully" : "Permission created successfully");

            setIsOpen(false);
            setFeature("");
            setName("");
            setEditId(null);

            await fetchPermissions();

        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("An unexpected error occurred while saving the permission.");
            }
        }
    };


    return (
        <div className="bg-[#020617] border border-gray-700 rounded-xl shadow-lg p-6">
            <SectionHeader
                title="Permissions"
                buttonText="Add Permissions"
                onAddClick={openAdd}
                showButton={hasPermission(permissions, "role", "add", roles)}
            />

            <PermissionTable loading={loading} error={error} permissions={permissionData} onEdit={openEdit} showEditButton={hasPermission(permissions, "permission", "update", roles )} />

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={editId ? "Edit Permission" : "Add Permission"}
            >
                <input
                    type="text"
                    value={feature}
                    onChange={(e) => setFeature(e.target.value)}
                    placeholder="feature (e.g. user, role, product)"
                    className="w-full px-4 py-2 border border-gray-600 rounded-md bg-[#0f172a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="permission (e.g. add, view, delete)"
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
