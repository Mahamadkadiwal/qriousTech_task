"use client";
import AssignPermissions from '@/app/_Compoenent/AssignPermissions';
import Modal from '@/app/_Compoenent/Modal';
import SectionHeader from '@/app/_Compoenent/SectionHeader';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getPermissions } from '../permission/action';
import { getRoles } from '../role/action';
import { assignPermission, editAssignedPermission, getAssignPermissions } from './action';
import { hasPermission } from '@/app/_lib/permission';
import { getCookiesValue } from '@/app/_lib/getCookiesValue';
import { Role } from '../role/page';
import { Permission } from '../permission/page';

export default function Page() {
  const [permissionAssignData, setPermissionAssignData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("");
  const [feature, setFeature] = useState("");
  const [permission, setPermission] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const [rolesData, setRolesData] = useState([]);
  const [permissionsData, setPermissionsData] = useState([]);

  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);

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

  async function fetchPermission() {
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

    setPermissionsData(res.data || []);
    setError(null);
    setLoading(false);
  }

  const openAdd = () => {
    setEditId(null);
    setRole("");
    setFeature("");
    setPermission("");
    setIsOpen(true);
  };

  const openEdit = (id: number, role: string, feature: string, permission: string) => {
    setEditId(id);
    setRole(role);
    setFeature(feature);
    setPermission(permission);
    setIsOpen(true);
  };

  async function fetchAssignedPermissions() {
    setLoading(true);

    const res = await getAssignPermissions();

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

    setPermissionAssignData(res.data || []);
    setError(null);
    setLoading(false);
  }

  useEffect(() => {
    const loadData = async () => {
      await fetchAssignedPermissions();
      await fetchRoles();
      await fetchPermission();
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

  const handleSave = async () => {
    try {
      if (!feature.trim() || !role.trim() || !permission.trim()) {
        toast.error("Feature, role, and permission name are required");
        return;
      }

      let res;

      if (editId) {
        res = await editAssignedPermission(editId, role, feature, permission);
        if (!res?.success) {
          throw new Error(res?.error || "Failed to update permission");
          return;
        }
      } else {
        res = await assignPermission(role, feature, permission);
        if (!res?.success) {
          throw new Error(res?.error || "Failed to assigned permission");
        }
      }

      toast.success(editId ? "Permission updated successfully" : "Permission Assigned successfully");

      setIsOpen(false);
      setRole("");
      setFeature("");
      setPermission("");
      setEditId(null);

      await fetchAssignedPermissions();

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
        title="Assign Permissions"
        buttonText="Add Permissions"
        onAddClick={openAdd}
        showButton={hasPermission(permissions, "assign", "add", roles)}
      />

      <AssignPermissions loading={loading} error={error} permissions={permissionAssignData} onEdit={openEdit} showEditButton={hasPermission(permissions, "assign", "update", roles)} />

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={editId ? "Edit Permission" : "Add Permission"}
      >
        <select className="w-full px-4 py-2 border border-gray-600 rounded-md bg-[#0f172a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" value={role} onChange={(e) => setRole(e.target.value)}>
          {rolesData.map((role: Role) => (
            <option key={role.role_id} value={role.name}>{role.name}</option>
          ))}
        </select>

        <select className='w-full px-4 py-2 border border-gray-600 rounded-md bg-[#0f172a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4' value={feature} onChange={(e) => setFeature(e.target.value)}>
          {permissionsData.map((perm: Permission) => (
            <option key={perm.permission_id} value={perm.feature}>{perm.feature}</option>
          ))}
        </select>

        <select className='w-full px-4 py-2 border border-gray-600 rounded-md bg-[#0f172a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4' value={permission} onChange={(e) => setPermission(e.target.value)}>
          {permissionsData.map((perm: Permission) => (
            <option key={perm.permission_id} value={perm.name}>{perm.name}</option>
          ))}
        </select>



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
  )
}
