import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../shared/schema';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create postgres client
const client = postgres(process.env.DATABASE_URL!);

// Create drizzle instance
export const db = drizzle(client, { schema });