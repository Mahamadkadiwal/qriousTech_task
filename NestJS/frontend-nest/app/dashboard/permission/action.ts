"use server";

import { cookies } from "next/headers";
import { handleAccessToken } from "@/app/_lib/handleAccess";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPermissions() {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${API_URL}/permission`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    await handleAccessToken();
  }
  if (res.status === 403) {
    return {
      error: "You are not authorized to access permissions.",
      status: 403,
    };
  }

  if (!res.ok) {
    return {
      error: "Failed to fetch permissions",
      status: res.status,
    };
  }

  const data = await res.json();
  return {
    data,
    status: 200,
  };
}

export async function createPermission(feature: string, name: string) {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${API_URL}/permission`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ feature, name }),
  });

  if (res.status === 401) {
    await handleAccessToken();
  }

  if (!res.ok) {
    return { success: false, error: "Failed to create permission" };
  }

  return { success: true };
}

export async function updatePermission(
  permission_id: number,
  feature: string,
  name: string,
) {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${API_URL}/permission/${permission_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ feature, name }),
  });

  if (res.status === 401) {
    await handleAccessToken();
  }

  if (!res.ok) {
    return { success: false, error: "Failed to update permission" };
  }

  return { success: true };
}
