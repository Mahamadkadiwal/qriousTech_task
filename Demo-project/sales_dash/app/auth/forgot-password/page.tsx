"use client";

import Input from "@/app/_component/Input";
import { forgotPassword } from "@/app/actions/user.action";
import {
    forgotPasswordSchema,
    ForgotPasswordSchema,
} from "@/app/Schema/forgot-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ForgotPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit: SubmitHandler<ForgotPasswordSchema> = async (data) => {
        try {
            await forgotPassword(data.email);
            toast.success("Reset link sent to your email!");
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Something went wrong";
            toast.error(message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6"
            >
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Forgot Password
                    </h1>
                    <p className="text-sm text-gray-500">
                        Enter your email and we’ll send you a reset link.
                    </p>
                </div>

                <Input
                    type="email"
                    label="Email Address"
                    {...register("email")}
                    placeholder="you@example.com"
                    className="w-full"
                    disabled={isSubmitting}
                    error={errors.email?.message}
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full primary-btn text-white p-3 rounded-lg font-semibold transition disabled:opacity-50"
                >
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
        </div>
    );
}
