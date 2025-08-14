"use client";
import { signIn } from "next-auth/react";

export function SignIn() {
  const credentialsAction = (formData) => {
    signIn("credentials", formData);
  };

  return (
    <form action={credentialsAction}>
      <label htmlFor="credentials-email">
        Email
        <input type="email" id="credentials-email" name="email" />
      </label>
      <label htmlFor="credentials-password">
        Password
        <input type="password" id="credentials-password" name="password" />
      </label>
      <input type="submit" value="Sign In" />
    </form>
  );
}
