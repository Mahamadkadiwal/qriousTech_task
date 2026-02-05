"use client";
import Input from "@/app/_component/Input";
import { resetPassword } from "@/app/actions/user.action";
import { resetPasswordSchema, ResetPasswordSchema } from "@/app/Schema/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordSchema> = async (data) => {
    try {
      await resetPassword({ token: token!, newPassword: data.password });
      toast.success("Password updated!");
      router.push("/auth/signIn");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Reset Password
          </h1>
          <p className="text-sm text-gray-500">
            Enter your new password.
          </p>
        </div>

        <Input
          type="password"
          {...register('password')}
          placeholder="New password"
          className="w-full "
          disabled={isSubmitting}
          error={errors.password?.message}
        />

        <button type="submit"
          disabled={isSubmitting}
          className="w-full primary-btn text-white p-3 rounded-lg font-semibold transition disabled:opacity-50">

          {isSubmitting ? "Reseting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
