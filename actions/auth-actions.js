import { signIn } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

// Register new user (calls your Next.js API route)
export async function registerUser(data) {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Registration failed");
    }

    return result;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

// Sign in with credentials
export async function loginUser(email, password) {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return result;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

// Google OAuth login
export async function loginWithGoogle() {
  try {
    await signIn("google", { redirectTo: "/dashboard" });
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
}

// Facebook OAuth login
export async function loginWithFacebook() {
  try {
    await signIn("facebook", { redirectTo: "/dashboard" });
  } catch (error) {
    console.error("Facebook login error:", error);
    throw error;
  }
}

// Logout
export async function logoutUser() {
  try {
    await signIn("credentials", { redirect: false });
    redirect("/");
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}
