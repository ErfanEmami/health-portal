// test connection to db
import { db } from "@/database/db";
import { providers } from "@/database/schema";
import { config } from 'dotenv';

// Load environment variables from .env
config();

async function testConnection() {
  try {
    // Insert a test row into the providers table
    const result = await db.insert(providers).values({
      id: '11111111-1111-1111-1111-111111111111', // Use a static UUID for testing
      name: 'Test Provider',
      email: 'test@provider.com',
    });

    console.log('Insert Result:', result);

    // Query the providers table
    const allProviders = await db.select().from(providers);
    console.log('All Providers:', allProviders);

    console.log('Database connection and operations successful!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

testConnection();
