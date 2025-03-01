import { createAuthClient } from 'better-auth/react';
import { env } from '@/utils/env';
import { inferAdditionalFields } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: env.BASE_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        hasProfile: { type: 'boolean' },
      },
    }),
  ],
});
