'use client';
import type React from 'react';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProfilePicture from './profile-picture';
import HeaderPicture from './header-picture';
import SocialLinks from './social-links';
import Location from './location';
import BasicInfo from './basic-info';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileFormSchema, ProfileFormData } from '@/lib/zod-schema';
import {
  createUserProfile,
  updateUserProfile,
} from '@/app/actions/profile-actions';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { UserProfile } from '@/db/schema';
import { v4 as uuidv4 } from 'uuid';
import { ActionResponse } from '@/data/types';
export type ImageData = {
  fileUrl: string;
  file: File | null;
  isUploaded: boolean;
};

function EditProfileForm({
  profile,
}: {
  profile: ActionResponse<UserProfile> | null;
}) {
  const [profilePicture, setProfilePicture] = useState<ImageData | null>(null);
  const [headerImage, setHeaderImage] = useState<ImageData | null>(null);
  const { data } = authClient.useSession();
  const userId = data?.user.id;

  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      state: '',
      bio: '',
      socialLinks: [{ id: '1', platform: '', url: '' }],
    },
    mode: 'onSubmit',
  });

  const { handleSubmit, formState } = methods;
  const { isSubmitting } = formState;

  if (!userId) {
    return <div>Loading...</div>;
  }

  if (profile && profile.data) {
    methods.setValue('username', profile.data.username ?? '');
    methods.setValue('firstName', profile.data.firstName ?? '');
    methods.setValue('lastName', profile.data.lastName ?? '');
    methods.setValue('country', profile.data.country ?? '');
    methods.setValue('city', profile.data.city ?? '');
    methods.setValue('state', profile.data.state ?? '');
    methods.setValue('bio', profile.data.bio ?? '');
  }

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const socialLinksData = data.socialLinks.reduce((acc, link) => {
        if (link.platform && link.url) {
          acc[link.platform] = link.url;
        }
        return acc;
      }, {} as Record<string, string>);

      const profileData = {
        ...data,
        id: profile?.data ? profile.data.id : uuidv4(),
        userId: userId,
        profilePicture: profilePicture?.fileUrl || null,
        headerImage: headerImage?.fileUrl || null,
        createdAt: new Date(),
        updatedAt: new Date(),
        username: data.username || null,
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        bio: data.bio || null,
        country: data.country || null,
        city: data.city || null,
        state: data.state || null,
        facebookLink: null,
        instagramLink: null,
        discordLink: null,
        twitterLink: null,
        youtubeLink: null,
        blueskyLink: null,
        ...socialLinksData,
      } as unknown as UserProfile;

      const createOrUpdateProfile = async () => {
        if (profile?.data) {
          const response = await updateUserProfile(profileData, userId);
          return response;
        } else {
          const response = await createUserProfile(profileData);
          return response;
        }
      };

      const response = await createOrUpdateProfile();
      const updatedUser = await authClient.updateUser({
        hasProfile: true,
      });

      if (response.success && !updatedUser.error) {
        toast.success('Profile updated', {
          description: 'Your profile has been successfully updated.',
        });
      } else {
        toast.error('Error', {
          description: 'There was a problem updating your profile.',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error', {
        description: 'There was a problem updating your profile.',
      });
    }
  };

  return (
    <div className="py-2 mx-2">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <HeaderPicture
                  headerImage={headerImage}
                  setHeaderImage={setHeaderImage}
                />
                <ProfilePicture
                  profilePicture={profilePicture}
                  setProfilePicture={setProfilePicture}
                />
                <div className="grid gap-4">
                  <BasicInfo />
                  <Location />
                  <SocialLinks profile={profile} />
                </div>
              </div>
              <div className="mt-6">
                <Button
                  type="submit"
                  className="ml-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditProfileForm;
