import SignInForm from "@/app/_Compoenent/SignInForm";

export default function Page() {
    return (
        <div className='min-h-screen flex items-center justify-center bg-[#0f172a]'>

            <div className='w-full max-w-md p-8 space-y-6 bg-[#020617] border border-gray-700 rounded-xl'>

                <h1 className='text-3xl font-bold text-center text-white'>
                    Sign In
                </h1>
                <SignInForm />
            </div>
        </div>
    )
}
