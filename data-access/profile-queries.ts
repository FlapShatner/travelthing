import db from '@/db';
import { userProfiles, UserProfile } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const userProfile = {
  getUserProfile: async (userId: string): Promise<UserProfile | null> => {
    const user = await db.query.userProfiles.findFirst({
      where: eq(userProfiles.userId, userId),
    });
    return user ?? null;
  },
  createUserProfile: async (userProfile: UserProfile): Promise<UserProfile> => {
    const user = await db.insert(userProfiles).values(userProfile).returning();
    return user[0];
  },
  updateUserProfile: async (userProfile: UserProfile): Promise<UserProfile> => {
    const user = await db
      .update(userProfiles)
      .set(userProfile)
      .where(eq(userProfiles.userId, userProfile.userId))
      .returning();
    return user[0];
  },
  deleteUserProfile: async (userId: string): Promise<void> => {
    await db.delete(userProfiles).where(eq(userProfiles.userId, userId));
  },
};
