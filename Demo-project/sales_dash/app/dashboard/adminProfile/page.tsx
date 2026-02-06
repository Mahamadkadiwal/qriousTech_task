"use client";
import UserProfileCard from "@/app/_component/UserProfileCard";
import UserProfileForm from "@/app/_component/UserProfileForm";
import { getCurrentAdmin } from "@/app/_lib/localStorage";
import { ProfileFormData, profileSchema } from "@/app/_types/profile";
import { profileUpdate } from "@/app/actions/user.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PageHeader from "../../_component/PageHeader";

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const admin = getCurrentAdmin();
    if (!admin) return;

    reset({
      username: admin.username,
      email: admin.email,
    });
  }, [reset]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    try {
      const admin = getCurrentAdmin();
      if (!admin) throw new Error("No admin session");

      await profileUpdate(admin.userId as string, data);

      localStorage.setItem(
        "currentAdmin",
        JSON.stringify({ ...admin, ...data })
      );

      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    const admin = getCurrentAdmin();
    if (!admin) return;

    reset({
      username: admin.username,
      email: admin.email,
    });

    toast.success("Changes discarded");
  };

  const username = watch("username");
  const email = watch("email");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-full">
        <PageHeader title="Account Settings" />

        <div className="mt-6 grid md:grid-cols-3 gap-6">

          <div className="md:col-span-1 space-y-6">

            <UserProfileCard
              username={username}
              email={email}
              role="admin"
            />


          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-(--border-color) p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl text-(--font-color) mb-2">
                  Profile Information
                </h2>
                <p className="text-gray-600 text-sm">
                  Update your account information and email address
                </p>
              </div>

              <UserProfileForm
                register={register}
                errors={errors}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit(onSubmit)}
                onCancel={handleCancel}
              />
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}