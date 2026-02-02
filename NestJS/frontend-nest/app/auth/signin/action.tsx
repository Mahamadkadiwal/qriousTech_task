"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginAction(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
        return { response: data || "Login failed" };
    }

    (await cookies()).set("access_token", data.access_token, {
        httpOnly: true,
        secure: false,
    });

    (await cookies()).set("user", JSON.stringify(data.userId), {
        httpOnly: false,
        path: "/",
    });

    (await cookies()).set("permissions", JSON.stringify(data.permissions), {
        httpOnly: false,
        path: "/",
    });


    (await cookies()).set("roles", JSON.stringify(data.roles), {
        httpOnly: false,
        path: "/",
    });

    return { success: true };
}