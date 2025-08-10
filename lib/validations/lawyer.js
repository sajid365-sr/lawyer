import { z } from "zod";

export const lawyerSignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  specialization: z.string().min(2, "Specialization is required"),
  experience: z.number().min(0, "Experience must be a positive number"),
  barNumber: z.string().min(5, "Bar number is required"),
  hourlyRate: z.number().min(1, "Hourly rate must be greater than 0"),
  bio: z.string().min(50, "Bio must be at least 50 characters"),
});
