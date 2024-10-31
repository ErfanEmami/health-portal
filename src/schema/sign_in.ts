import {z} from "zod"

// form input schema
export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})