"use server";
import { cookies } from "next/headers";

export async function getCookiesValue() {
  const cookieStore = cookies();
  const permCookie = (await cookieStore).get("permissions")?.value;
  const roleCookie = (await cookieStore).get("roles")?.value;

  const permissions = permCookie ? JSON.parse(permCookie) : [];
  const roles = roleCookie ? JSON.parse(roleCookie) : [];

  return { permissions, roles };
}
