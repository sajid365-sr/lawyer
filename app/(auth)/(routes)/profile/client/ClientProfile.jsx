"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientProfileSchema } from "@/lib/validations/client";

export default function ClientProfile({ initialProfile }) {
  const form = useForm({
    resolver: zodResolver(clientProfileSchema),
    defaultValues: {
      name: initialProfile.name || "",
      email: initialProfile.email || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/profile/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Profile updated successfully");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      alert("An error occurred while updating profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Edit Client Profile
        </h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...form.register("name")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {form.formState.errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...form.register("email")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
