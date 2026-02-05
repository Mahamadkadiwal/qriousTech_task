"use server";

import { cookies } from "next/headers";
import { api } from "../_lib/api";

export async function createUser(data: any) {
  const user = await api("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

  (await cookies()).set("access_token", user.access_token, {
    httpOnly: true,
    secure: false,
  });

  (await cookies()).set("role", user.role, {
    httpOnly: true,
    secure: false,
  });

  return user;
}

export async function loginUser(data: any) {
  const user = await api("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  (await cookies()).set("access_token", user.access_token, {
    httpOnly: true,
    secure: false,
  });

  (await cookies()).set("role", user.role, {
    httpOnly: true,
    secure: false,
  });

  return user;
}

export async function forgotPassword(email: string) {
  return api("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(data: {
  token: string;
  newPassword: string;
}) {
  return api("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
