import { defineConfig } from "drizzle-kit"
import { getDatabaseUrl } from "@/lib/server_utils"

export default defineConfig({
  schema: "./src/database/schema.ts",
  out: "./src/database/migrations",
  dialect: "postgresql",
  strict: true,
  verbose: true,
  dbCredentials: {
    url: getDatabaseUrl(),
  },
})