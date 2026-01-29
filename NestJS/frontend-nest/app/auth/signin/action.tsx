"use server";

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
        return { error: data.message || "Login failed" };
    }

    return { success: true, role: data.role };
}