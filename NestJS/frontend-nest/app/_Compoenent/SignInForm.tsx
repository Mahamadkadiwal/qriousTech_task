"use client";
import Link from 'next/link'
import { useState } from 'react';
import { loginAction } from '../auth/signin/action';

export default function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);

        const result = await loginAction(email, password);
        console.log(result);
    }


    return (
        <form onSubmit={handleSubmit} className="space-y-4">

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

            <button
                className='w-full p-2 rounded-lg bg-blue-950 text-white font-semibold hover:bg-blue-900'
                type="submit"
            >
                Sign In
            </button>
            <div>
                <p className='text-center text-white'>
                    Don&apos;t have an account? <Link href="/auth/signup" className='text-blue-800 hover:underline'>Sign Up</Link>
                </p>
            </div>

        </form>
    )
}
