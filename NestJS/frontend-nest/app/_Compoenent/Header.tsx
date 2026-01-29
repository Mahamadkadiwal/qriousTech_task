import Link from 'next/link'

export default function Header() {
    return (
        <header className="w-full px-6 py-4 bg-[#020617] border-b border-gray-700 flex justify-between items-center shadow-sm">

            <h1 className="text-2xl font-semibold text-white tracking-wide">
                <Link href="/dashboard"> Roles Management</Link>
            </h1>
            <div className='space-x-6'>
                <Link className='text-xl' href="/dashboard/role">Roles</Link>
                <Link className='text-xl' href="/dashboard/permission">Permissions</Link>
            </div>
            <button
                className="px-5 py-2 rounded-lg border border-gray-600 text-gray-200
                   bg-[#020617] hover:bg-red-800 hover:border-red-800
                   hover:text-white transition-all duration-200
                   active:scale-[0.97]"
            >
                Logout
            </button>

        </header>
    )
}
