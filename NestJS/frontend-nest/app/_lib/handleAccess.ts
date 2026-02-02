"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleAccessToken() {
  (await cookies()).delete("access_token");
  (await cookies()).delete("permissions");
  (await cookies()).delete("roles");
  (await cookies()).delete("user");

  redirect("/auth/signin");
}
