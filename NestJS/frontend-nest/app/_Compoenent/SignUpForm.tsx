"use client";
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { registerAction } from '../auth/signup/action';
import toast from 'react-hot-toast';

export default function SignUpForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const result = await registerAction(username, email, password, role);

        setLoading(false);

        if (result?.success) {
            toast.success("Registration successful! Please sign in.");
            router.push("/auth/signin");
        } else {
            toast.error(result?.error || "Registration failed");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <div>
                <input
                    className='w-full p-2 bg-[#020617] text-white border border-gray-700 rounded-lg'
                    type="text"
                    placeholder='Username'
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                />
            </div>

            <div>
                <input
                    className='w-full p-2 bg-[#020617] text-white border border-gray-700 rounded-lg'
                    type="text"
                    placeholder='Email'
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />
            </div>

            <div>
                <input
                    className='w-full p-2 bg-[#020617] text-white border border-gray-700 rounded-lg'
                    type="password"
                    placeholder='Password'
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />
            </div>

            <div>
                <select
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-2 bg-[#020617] text-white border border-gray-700 rounded-lg"
                    required
                    disabled={loading}
                >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                </select>
            </div>

            <button
                className={`w-full p-2 rounded-lg font-semibold transition
                    ${loading
                        ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                        : "bg-blue-950 text-white hover:bg-blue-900"
                    }`}
                type="submit"
                disabled={loading}
            >
                {loading ? "Signing up..." : "Sign Up"}
            </button>

            <div>
                <p className='text-center text-white'>
                    Already have an account?{" "}
                    <Link href="/auth/signin" className='text-blue-800 hover:underline'>
                        Sign In
                    </Link>
                </p>
            </div>

        </form>
    )
}
