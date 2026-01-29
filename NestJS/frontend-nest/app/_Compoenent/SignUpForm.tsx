"use client";
import Link from 'next/link'
import React, { useState } from 'react'

export default function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    
        const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
            e.preventDefault();
            console.log('Email:', email);
            console.log('Password:', password);
            console.log('Username:', username);
            console.log('Role:', role);
        }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input
                    className='w-full p-2 bg-[#020617] text-white border border-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-blue-900 transition'
                    type="text"
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                />
            </div>
            <div>
                <input
                    className='w-full p-2 bg-[#020617] text-white border border-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-blue-900 transition'
                    type="text"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <input
                    className='w-full p-2 bg-[#020617] text-white border border-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2
                            focus:ring-blue-950 focus:border-blue-900 transition'
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div>
                <select name="role" value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 bg-[#020617] text-white border border-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-blue-900 transition">
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                </select>
            </div>

            <button
                className='w-full p-2 rounded-lg bg-blue-950 text-white font-semibold hover:bg-blue-900'
                type="submit"
            >
                Sign Up
            </button>
            <div>
                <p className='text-center text-white'>
                    Already have an account? <Link href="/auth/signin" className='text-blue-800 hover:underline'>Sign In</Link>
                </p>
            </div>

        </form>
    )
}
