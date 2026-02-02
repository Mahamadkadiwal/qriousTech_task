"use server";

import { handleAccessToken } from "@/app/_lib/handleAccess";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getRoles() {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${API_URL}/roles`, {
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
    return { status: res.status, error: "Failed to fetch roles" };
  }

  const data = await res.json();
  return { status: 200, data };
}

export async function createRole(name: string) {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${API_URL}/roles/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  if (res.status === 401) {
    await handleAccessToken();
  }
  if (!res.ok) {
    return { success: false, error: "Failed to create role" };
  }

  return { success: true };
}

export async function updateRole(id: number, name: string) {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${API_URL}/roles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  if (res.status === 401) {
    await handleAccessToken();
  }
  if (!res.ok) {
    return { success: false, error: "Failed to update role" };
  }

  return { success: true };
}
