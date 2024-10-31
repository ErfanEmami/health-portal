import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from "./schema"
import { getDatabaseUrl } from '@/lib/server_utils';

const queryClient = postgres(getDatabaseUrl())
export const db = drizzle(queryClient, { schema }); //singleton
