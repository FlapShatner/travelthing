'use client';
import { authClient } from '@/lib/auth-client';
// import Image from "next/image";
import EditProfile from '@/components/edit-profile/edit-profile';
function Page() {
  const { data } = authClient.useSession();
  if (!data) {
    console.log('No session');
    // redirect("/")
  }
  const user = data?.user;
  if (!user) {
    console.log('No user');
    // redirect("/")
  }
  console.log(user);
  return (
    <div>
      <EditProfile />
    </div>
  );
}

export default Page;
