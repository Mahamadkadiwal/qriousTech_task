"use server";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerAction(username: string, email: string, password: string, roleName: string) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ username, email, password, roleName }),
    });

    const data = await res.json();
    if (!res.ok) {
        return { error: data.message || "Register failed" };
    }

    return { success: true };
}