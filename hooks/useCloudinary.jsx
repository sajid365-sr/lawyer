"use client";

import { useState } from "react";

export function useCloudinarySingleUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    const uploadPreset =
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "default_preset";
    console.log("Using upload preset:", uploadPreset); // Debug log
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to upload image");
      }

      const data = await response.json();
      setUploading(false);
      return data.secure_url;
    } catch (err) {
      setError(err.message);
      setUploading(false);
      return null;
    }
  };

  return { uploadImage, uploading, error };
}
