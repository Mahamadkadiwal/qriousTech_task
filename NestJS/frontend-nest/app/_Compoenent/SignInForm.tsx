"use client";
import Link from 'next/link'
import { useState } from 'react';
import { loginAction } from '../auth/signin/action';
import { useRouter } from 'next/navigation';

export default function SignInForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        const result = await loginAction(email, password);
        setLoading(false);

        if (result?.success) {
            router.push("/dashboard");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <div>
                <input
                    className='w-full p-2 bg-[#020617] text-white border border-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-blue-900 transition'
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
                    className='w-full p-2 bg-[#020617] text-white border border-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2
                            focus:ring-blue-950 focus:border-blue-900 transition'
                    type="password"
                    placeholder='Password'
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />
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
                {loading ? "Signing in..." : "Sign In"}
            </button>

            <div>
                <p className='text-center text-white'>
                    Don&apos;t have an account? <Link href="/auth/signup" className='text-blue-800 hover:underline'>Sign Up</Link>
                </p>
            </div>

        </form>
    )
}
