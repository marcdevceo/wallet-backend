import { neon } from '@neondatabase/serverless';

import "dotenv/config";

// Create a connection to the Neon database using the connection string from environment variables
export const sql = neon(process.env.DATABASE_URL);

export async function connectToDatabase() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions (
        ID SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )`;
    console.log("Connected to the database successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // status code 1 indicates an error, 0 means success
  }
}
