"use server"
import "server-only" // throw error not on server

import { providers } from "@/database/schema";
import { withAuth } from "./withAuth";

export const createProvider = withAuth(async (data: typeof providers.$inferInsert) => {

})

export const updateProvider = withAuth(async (data: typeof providers.$inferInsert) => {

})
