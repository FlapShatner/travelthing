import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import db from '../db';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import * as schema from '../db/schema';
import { env } from '@/utils/env';

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schema,
      user: schema.users,
    },
    usePlural: true,
  }),
  plugins: [nextCookies()],
  user: {
    additionalFields: {
      hasProfile: {
        type: 'boolean',
        required: true,
        defaultValue: false,
      },
    },
  },
});
