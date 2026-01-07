"use client";
import { Users } from "@/app/_types/user";
import { RegisterFormInputs, registerSchema } from "@/app/Schema/SignUp";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import Input from "../../_component/Input";
import { saveUser } from "../../_lib/localStorage";

export default function SignUp() {
  const router = useRouter();

  const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<RegisterFormInputs>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
        username: '',
        email: '',
        password: '',
        role: 'user',
      },
    });

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    try {
      saveUser(data);
      toast.success('User registered successfully!');
      if(data.role === "admin"){
        localStorage.setItem("currentAdmin", JSON.stringify(data));
        router.push("/dashboard");
      } else{
        localStorage.setItem("currentUser", JSON.stringify(data));
        router.push("/userHome");
      }
    } catch (error: unknown) {
      if(error instanceof Error){
        toast.error(error.message);
        return;
      } else{
        toast.error("An unknown error occurred");
        return;
      }
    }
  }  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6">
       {/* <h1 className="text-3xl m-2 font-bold text-(--font-color)">Sales Dashboard</h1> */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 md:p-8 space-y-6">
        <h1 className="text-2xl font-bold text-(--font-color) ">
          Create Your Account
        </h1>
        <p className="text-(--font-color)">Get started with your free account today.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="text"
            {...register("username")}
            error={errors.username?.message}
            label="Username"
            id="username"
            placeholder="Enter your username"
            className="w-full border p-2 rounded"
            disabled={isSubmitting}
          />

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
            placeholder="Create a strong password"
            className="w-full border p-2 rounded"
            disabled={isSubmitting}
          />

          <label htmlFor="role">Role</label>
          <select
            id="role"
            {...register("role")}
            disabled={isSubmitting}
            className="input-field"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-(--primary-btn) hover:bg-(--secondary-btn) text-white p-2 rounded font-semibold transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>
         <div className="text-center pt-6 border-t border-(--border-color)">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link 
                    href="/auth/signIn" 
                    className="text-(--primary-btn) font-semibold hover:text-(--secondary-btn) transition-colors"
                  >
                    Sign In
                  </Link>
                </p>
              </div>

      </div>
    </div>
  );
}
