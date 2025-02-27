'use client';
import type React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, ImageIcon } from 'lucide-react';
import SocialLinks, { SocialLink } from './social-links';
import { useForm, FormProvider } from 'react-hook-form';

// Define the form data type
type ProfileFormData = {
  username: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  state: string;
  bio: string;
  socialLinks: SocialLink[];
};

function EditProfile() {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [headerImage, setHeaderImage] = useState<string | null>(null);

  // Initialize react-hook-form
  const methods = useForm<ProfileFormData>({
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
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeaderImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeaderImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: ProfileFormData) => {
    // Transform socialLinks to the format expected by the API
    const socialLinksData = data.socialLinks.reduce((acc, link) => {
      if (link.platform && link.url) {
        acc[link.platform] = link.url;
      }
      return acc;
    }, {} as Record<string, string>);

    // Combine all data
    const profileData = {
      ...data,
      profilePicture,
      headerImage,
      ...socialLinksData,
    };

    console.log('Profile data to submit:', profileData);
    // Here you would submit the data to your API
  };

  return (
    <div className="py-6 mx-2">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="space-y-4">
                  <Label>Header Image</Label>
                  <div className="relative aspect-[3/1] overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                    {headerImage ? (
                      <Image
                        src={headerImage || '/placeholder.svg'}
                        alt="Header"
                        width={1000}
                        height={1000}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <ImageIcon className="w-10 h-10 text-gray-400" />
                      </div>
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleHeaderImageChange}
                      className="absolute inset-0 opacity-0 h-full w-full cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex relative items-center space-x-4 w-max">
                  <div className="">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={profilePicture || ''} />
                      <AvatarFallback>
                        {profilePicture ? null : (
                          <Camera className="w-8 h-8 text-gray-400" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="absolute inset-0 opacity-0 h-full w-full cursor-pointer"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Profile Picture</h3>
                    <p className="text-sm text-gray-500">
                      Click to upload a new profile picture
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  {/* Basic Information */}
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="Enter your username"
                      {...register('username')}
                    />
                    {errors.username && (
                      <p className="text-sm text-red-500">
                        {errors.username.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        {...register('firstName')}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        {...register('lastName')}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-500">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself"
                      {...register('bio')}
                    />
                    {errors.bio && (
                      <p className="text-sm text-red-500">
                        {errors.bio.message}
                      </p>
                    )}
                  </div>

                  {/* Location Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        placeholder="Enter your country"
                        {...register('country')}
                      />
                      {errors.country && (
                        <p className="text-sm text-red-500">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        placeholder="Enter your state/province"
                        {...register('state')}
                      />
                      {errors.state && (
                        <p className="text-sm text-red-500">
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="Enter your city"
                        {...register('city')}
                      />
                      {errors.city && (
                        <p className="text-sm text-red-500">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Social Links */}
                  <SocialLinks />
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  className="ml-auto"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditProfile;
