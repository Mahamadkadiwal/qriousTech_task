"use server";

import { handleAccessToken } from "@/app/_lib/handleAccess";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllUsers() {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${API_URL}/auth/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    await handleAccessToken();
  }

  if (res.status === 403) {
    return { status: 403, error: "You are not authorized to access roles." };
  }

  if (!res.ok) {
    return { status: res.status, error: "Failed to fetch users" };
  }

  const data = await res.json();
  return { status: 200, data };
}
