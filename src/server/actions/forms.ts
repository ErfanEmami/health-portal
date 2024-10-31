"use server"
import "server-only" // throw error not on server

import { forms, contacts } from "@/database/schema";
import { withAuth } from "./withAuth";

export const createForm = withAuth(async (data: typeof forms.$inferInsert & typeof contacts.$inferInsert) => {

})