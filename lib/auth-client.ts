import { createAuthClient } from 'better-auth/react';
import { env } from '@/utils/env';
export const authClient = createAuthClient({
  baseURL: env.BASE_URL,
});
