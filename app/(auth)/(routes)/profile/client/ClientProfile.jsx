"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientProfileSchema } from "@/lib/schema/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCloudinarySingleUpload } from "@/hooks/useCloudinary";

export default function ClientProfile({ initialProfile }) {
  const [imagePreview, setImagePreview] = useState(
    initialProfile.profileImage || ""
  );
  const { uploadImage, uploading, error } = useCloudinarySingleUpload();
  const form = useForm({
    resolver: zodResolver(clientProfileSchema),
    defaultValues: {
      name: initialProfile.name || "",
      email: initialProfile.email || "",
      mobileNumber: initialProfile.mobileNumber || "",
      profileImage: initialProfile.profileImage || "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    try {
      const response = await fetch("/api/profile/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Profile updated successfully");
      } else {
        const result = await response.json();
        alert(result.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      alert("An error occurred while updating profile");
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const secureUrl = await uploadImage(file);
    if (secureUrl) {
      setImagePreview(secureUrl);
      form.setValue("profileImage", secureUrl);
      console.log("Image uploaded, URL:", secureUrl);
    } else if (error) {
      alert(`Image upload failed: ${error}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Edit Client Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex gap-6">
                {/* Left Column - Profile Image (40%) */}
                <div className="w-[40%]">
                  <FormField
                    control={form.control}
                    name="profileImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Image</FormLabel>
                        <FormControl>
                          <div className="flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                              <img
                                src={imagePreview || "/user.jpg"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              disabled={uploading}
                              className="mt-2"
                            />
                            {uploading && (
                              <p className="text-sm text-gray-500">
                                Uploading...
                              </p>
                            )}
                            {error && (
                              <p className="text-sm text-red-600">{error}</p>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Right Column - Other Fields (60%) */}
                <div className="w-[60%] space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="you@example.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your mobile number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
