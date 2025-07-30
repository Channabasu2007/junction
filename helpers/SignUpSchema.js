import {z} from 'zod'

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email must be provided." })
      .email("Please give a valid email"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password must be a maximum of 32 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),

    confirmPassword: z.string(),

    firstname: z.string().min(3, "First name should contain at least 3 letters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const OtpCodeSchema = z.object({
    otp : z.string().min(6, "OTP must be 6 digits long.")
})