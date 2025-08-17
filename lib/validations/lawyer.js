import { z } from "zod";

export const lawyerSignupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
    experienceYears: z
      .number()
      .min(0, "Experience years cannot be negative")
      .optional()
      .or(z.literal("")),
    legalArea: z.string().optional(),
    location: z.string().optional(),
    hourlyRate: z
      .number()
      .min(0, "Hourly rate cannot be negative")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const lawyerProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  experienceYears: z
    .number()
    .min(0, "Experience years cannot be negative")
    .optional()
    .or(z.literal("")),
  legalArea: z.string().optional(),
  location: z.string().optional(),
  hourlyRate: z
    .number()
    .min(0, "Hourly rate cannot be negative")
    .optional()
    .or(z.literal("")),
  profileImage: z.string().url("Invalid image URL").optional(),
});
