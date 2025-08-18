import { z } from "zod";

export const lawyerSignupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  experienceYears: z.number().min(0, "Experience must be non-negative"),
  legalArea: z.string().min(1, "Legal area is required"),
  location: z.string().min(1, "Location is required"),
  hourlyRate: z.number().min(0, "Hourly rate must be non-negative"),
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
