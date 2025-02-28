import { z } from 'zod';

// Create a schema for social links
const socialLinkSchema = z.object({
  id: z.string(),
  platform: z.string().min(1, 'Platform is required'),
  url: z.string().url('Please enter a valid URL').min(1, 'URL is required'),
});

// Create the profile form schema
export const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),

  firstName: z
    .string()
    .max(50, 'First name must be less than 50 characters')
    .optional(),

  lastName: z
    .string()
    .max(50, 'Last name must be less than 50 characters')
    .optional(),

  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),

  country: z
    .string()
    .max(50, 'Country must be less than 50 characters')
    .optional(),

  state: z.string().max(50, 'State must be less than 50 characters').optional(),

  city: z.string().max(50, 'City must be less than 50 characters').optional(),

  socialLinks: z
    .array(socialLinkSchema)
    .max(6, 'You can add up to 6 social links'),
});

// Export the type
export type ProfileFormData = z.infer<typeof profileFormSchema>;
