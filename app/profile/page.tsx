'use client';
import { authClient } from '@/lib/auth-client';
import EditProfileForm from '@/components/edit-profile/edit-profile-form';
function Page() {
  const { data } = authClient.useSession();
  if (!data) {
    console.log('No session');
  }
  const user = data?.user;
  if (!user) {
    console.log('No user');
  }
  console.log(user);
  return <EditProfileForm />;
}

export default Page;
