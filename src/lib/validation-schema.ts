import { z } from "zod"

export const formSchema = z
  .object({
    // Step 1: Personal Information
    fullName: z.string().min(1, { message: "Full name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email format" }),
    phoneNumber: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" })
      .regex(/^\d+$/, { message: "Phone number must contain only digits" }),

    // Step 2: Address Details
    streetAddress: z.string().min(1, { message: "Street address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    zipCode: z
      .string()
      .min(5, { message: "Zip code must be at least 5 digits" })
      .regex(/^\d+$/, { message: "Zip code must contain only digits" }),

    // Step 3: Account Setup
    username: z.string().min(4, { message: "Username must be at least 4 characters" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
