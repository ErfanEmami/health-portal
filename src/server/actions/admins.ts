"use server"
import "server-only" // throw error not on server

import { admins } from "@/database/schema";
import { withAuth } from "./withAuth";

export const createAdmin = withAuth(async (data: typeof admins.$inferInsert) => {

})
