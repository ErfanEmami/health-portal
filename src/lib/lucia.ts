/**
 * Use Lucia Auth to
 * create session cookies
 * validate user tokens
 * validate session cookies
 */

import { Lucia } from "lucia"
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle"

import { db } from "@/database/db"
import { providers, providerSessions } from "@/database/schema"

const adapter  = new DrizzlePostgreSQLAdapter(db, providerSessions, providers)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "provider-auth-cookie",
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production"
    }
  }
})