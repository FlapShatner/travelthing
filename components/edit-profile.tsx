'use client';
import type React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, ImageIcon } from 'lucide-react';

function EditProfile() {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [headerImage, setHeaderImage] = useState<string | null>(null);

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

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
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
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter your location"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    placeholder="Enter your Twitter username"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    placeholder="Enter your LinkedIn profile URL"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    placeholder="Enter your GitHub username"
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default EditProfile;
