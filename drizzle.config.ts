import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { env } from './utils/env';

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
