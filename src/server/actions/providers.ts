"use server"
import "server-only" // throw error not on server

import { z } from "zod"

import { providers } from "@/database/schema";
import { withAuth } from "./withAuth";
import { SignUpSchema } from "@/schema/sign_up"
import { SignInSchema } from "@/schema/sign_in";
import { db } from "@/database/db";
import { eq } from "drizzle-orm";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { hash } from "argon2";

export const signUp = async (data: z.infer<typeof SignUpSchema>) => {
  try {
    // check if user exists
    const existingUser = await db
      .select()
      .from(providers)
      .where(eq(providers.email, data.email))

    if (existingUser.length > 0) {
      return { error: "User already exists", success: false }
    }

    // create user
    const hashedPassword = await hash(data.password)

    const [user] = await db
    .insert(providers)
    .values({ 
      name: data.name,
      email: data.email.toLowerCase(),
      hashedPassword: hashedPassword
    })
    .returning()
    
    // create session cookie
    const session = await lucia.createSession(user.id, {})
    const sessionCookie = await lucia.createSessionCookie(session.id)
    
    // set cookie on user's browser via NextJS
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return { success: true }
  } catch (error) {
    return { error: `Unable to sign up: ${error}`, success: false }
  }
}

export const signIn = async (data: z.infer<typeof SignInSchema>) => {

}

export const createProvider = withAuth(async (data: typeof providers.$inferInsert) => {

})

export const updateProvider = withAuth(async (data: typeof providers.$inferInsert) => {

})
