"use client";
import { LoginFormInputs, loginSchema } from "@/app/Schema/SignIn";
import { zodResolver } from '@hookform/resolvers/zod';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import Input from "../../_component/Input";
import { authenticateUser } from "../../_lib/localStorage";

export default function SignIn(){
    const router = useRouter();

    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'user',
    },
  });   

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    try {
      const user = authenticateUser(data);

      toast.success("User logged in successfully!");

      if (user.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/userHome");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6">
              {/* <h1 className="text-3xl m-2 font-bold text-(--font-color)">Sales Dashboard</h1> */}
              <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 md:p-8 space-y-6">
                <h1 className="text-2xl font-bold text-(--font-color) ">
                  Welcome Back
                </h1>
                <p className="text-(--font-color)">Sign In to access your dashboard.</p>
        
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input
                    type="email"
                    {...register("email")}
                    error={errors.email?.message}
                    label="Email"
                    id="email"
                    placeholder="you@example.com"
                    className="w-full border p-2 rounded"
                    disabled={isSubmitting}
                  />
        
                  <Input
                    type="password"
                    {...register("password")}
                    error={errors.password?.message}
                    label="Password"
                    id="password"
                    placeholder="Enter Password"
                    className="w-full border p-2 rounded"
                    disabled={isSubmitting}
                  />
        
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    {...register("role")}
                    className="input-field"
                    disabled={isSubmitting}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
        
                  <button
                    type="submit"
                    className="w-full bg-(--primary-btn) hover:bg-(--secondary-btn) text-white p-2 rounded font-semibold transition"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </button>
                </form>

                <div className="text-center pt-6 border-t border-(--border-color)">
                <p className="text-gray-600">
                  Don&apos;t have an account?
                  <Link 
                    href="/auth/signUp" 
                    className="text-(--primary-btn) font-semibold hover:text-(--secondary-btn) transition-colors"
                  >
                    <span className="text-(--primary-btn)">Sign Up</span>
                    </Link>
                </p>
              </div>
              </div>
            </div>
    )
}