import { getServerSession } from '@/server/auth-actions';
import EditProfileForm from '@/components/edit-profile/edit-profile-form';
import { getUserProfile } from '@/server/profile-actions';
import { UserProfile } from '@/db/schema';
import { ActionResponse } from '@/data/types';

async function Page() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    return <div>Not logged in</div>;
  }
  let profile: ActionResponse<UserProfile> | null = null;
  if (user.hasProfile) {
    profile = await getUserProfile(user.id);
    if (profile.error) {
      return <div>Error fetching profile</div>;
    }
  }

  return <EditProfileForm profile={profile} />;
}

export default Page;
