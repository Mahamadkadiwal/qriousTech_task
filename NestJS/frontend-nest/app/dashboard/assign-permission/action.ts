"use server";

import { cookies } from "next/headers";
import { handleAccessToken } from "@/app/_lib/handleAccess";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAssignPermissions() {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${API_URL}/roles/getAssign`, {
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

export async function assignPermission(
  role: string,
  feature: string,
  permission: string,
) {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${API_URL}/roles/assign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role, feature, permission }),
    cache: "no-store",
  });

  if (res.status === 401) {
    await handleAccessToken();
  }
  if (!res.ok) {
    return {
      success: false,
      error: "Failed to assign permission",
    };
  }

  return { success: true };
}

export async function editAssignedPermission(
  id: number,
  role: string,
  feature: string,
  permission: string,
) {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${API_URL}/roles/assign/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role, feature, permission }),
    cache: "no-store",
  });

  if (res.status === 401) {
    await handleAccessToken();
  }
  if (!res.ok) {
    return {
      success: false,
      error: "Failed to assign permission",
    };
  }

  return { success: true };
}
