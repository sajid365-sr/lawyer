"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { lawyerProfileSchema } from "@/lib/schema/lawyer";

export default function LawyerProfile({ initialProfile }) {
  const form = useForm({
    resolver: zodResolver(lawyerProfileSchema),
    defaultValues: {
      name: initialProfile.name || "",
      email: initialProfile.email || "",
      experienceYears: initialProfile.experienceYears || "",
      legalArea: initialProfile.legalArea || "",
      location: initialProfile.location || "",
      hourlyRate: initialProfile.hourlyRate || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/profile/lawyer", {
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
          Edit Lawyer Profile
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
          <div>
            <label
              htmlFor="experienceYears"
              className="block text-sm font-medium text-gray-700"
            >
              Years of Experience
            </label>
            <input
              id="experienceYears"
              type="number"
              {...form.register("experienceYears", {
                setValueAs: (v) => (v === "" ? "" : parseFloat(v)),
              })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {form.formState.errors.experienceYears && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.experienceYears.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="legalArea"
              className="block text-sm font-medium text-gray-700"
            >
              Legal Area
            </label>
            <select
              id="legalArea"
              {...form.register("legalArea")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Select legal area</option>
              <option value="Criminal Law">Criminal Law</option>
              <option value="Family Law">Family Law</option>
              <option value="Corporate Law">Corporate Law</option>
              <option value="Personal Injury">Personal Injury</option>
              <option value="Intellectual Property">
                Intellectual Property
              </option>
              <option value="Other">Other</option>
            </select>
            {form.formState.errors.legalArea && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.legalArea.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              {...form.register("location")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {form.formState.errors.location && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.location.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="hourlyRate"
              className="block text-sm font-medium text-gray-700"
            >
              Hourly Rate (৳)
            </label>
            <input
              id="hourlyRate"
              type="number"
              {...form.register("hourlyRate", {
                setValueAs: (v) => (v === "" ? "" : parseFloat(v)),
              })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {form.formState.errors.hourlyRate && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.hourlyRate.message}
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
