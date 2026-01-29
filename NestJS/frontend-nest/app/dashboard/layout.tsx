import { ReactNode } from 'react'
import Header from '../_Compoenent/Header'

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[#020617]">
            <Header />
            <main className="bg-[#020617] min-h-screen pt-6 px-6">
                {children}
            </main>
        </div>
    )
}
