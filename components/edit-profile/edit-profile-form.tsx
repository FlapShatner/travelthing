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
import { toast } from 'sonner';

export type ImageData = {
  fileUrl: string;
  file: File | null;
  isUploaded: boolean;
};

function EditProfileForm() {
  const [profilePicture, setProfilePicture] = useState<ImageData | null>(null);
  const [headerImage, setHeaderImage] = useState<ImageData | null>(null);

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
        profilePicture,
        headerImage,
        ...socialLinksData,
      };

      console.log('Profile data to submit:', profileData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Profile updated', {
        description: 'Your profile has been successfully updated.',
      });
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
                  <SocialLinks />
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
