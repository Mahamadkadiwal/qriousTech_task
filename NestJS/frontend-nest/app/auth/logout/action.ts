"use server";
import { cookies } from "next/headers";

export async function logoutAction() {
  (await cookies()).delete("access_token");
  (await cookies()).delete("permissions");
  (await cookies()).delete("roles");
  (await cookies()).delete("user");
  return { success: true };
}
