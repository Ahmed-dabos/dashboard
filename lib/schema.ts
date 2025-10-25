import z from "zod"

export const userSchema = z.object({
        username: z.string().min(3, "Username must be at least 3 characters long"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters long"),
        confirmPassword: z.string("confirm password must be filled").min(8, "Passwords do not match")
     }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], 
     })
export type UserSchema = z.infer<typeof userSchema>;

export const loginSchema = userSchema.pick({
   email: true,
   password: true,
});
export type LoginSchema = z.infer<typeof loginSchema>;