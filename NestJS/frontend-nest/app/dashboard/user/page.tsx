"use client";
import SectionHeader from '@/app/_Compoenent/SectionHeader';
import UserTable from '@/app/_Compoenent/UserTable';
import { useEffect, useState } from 'react';
import { getAllUsers } from './action';

type Role = {
    role_id: number;
    name: string;
}

type User = {
    user_id: number;
    username: string;
    email: string;
    roles: Role[]
}
export default function Page() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        const res = await getAllUsers();

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

        setUsers(res.data);
        setLoading(false);

    }
    useEffect(() => {
        const loadUsers = async () => {
            await fetchUsers();
        }
        loadUsers();
    }, []);

    return (
        <div className="bg-[#020617] border border-gray-700 rounded-xl shadow-lg p-6">
            <SectionHeader
                title="Users"
                buttonText="Add Users"
            />

            <UserTable loading={loading} error={error} users={users} />


        </div>
    )
}
