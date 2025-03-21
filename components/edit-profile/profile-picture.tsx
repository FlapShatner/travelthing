import { useState } from 'react';
import { Camera, PencilIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ImageData } from './edit-profile-form';
import CropDialog from './crop-dialog';
import { useUploadThing } from '@/lib/uploadthing';
import { toast } from 'sonner';
import { MAX_FILE_SIZE } from '@/data/constants';
import { Progress } from '../ui/progress';
import { authClient } from '@/lib/auth-client';
import { updateUserProfileImage } from '@/server/profile-actions';
function ProfilePicture({
  profilePicture,
  setProfilePicture,
}: {
  profilePicture: ImageData | null;
  setProfilePicture: (profilePicture: ImageData | null) => void;
}) {
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const { data } = authClient.useSession();
  const userId = data?.user.id;
  const { startUpload, isUploading } = useUploadThing('profilePicture', {
    onClientUploadComplete: (res) => {
      setProfilePicture({
        fileUrl: res?.[0].ufsUrl,
        file: null,
        isUploaded: true,
      });
      if (userId) {
        updateUserProfileImage(userId, 'profilePicture', res?.[0].ufsUrl);
      }
    },
    uploadProgressGranularity: 'fine',
    onUploadProgress: (progress) => {
      setProgress(progress);
    },
    onUploadError: () => {
      toast.error('Failed to upload profile picture');
    },
  });

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error('Profile picture must be smaller than 6MB');
        event.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture({
          fileUrl: reader.result as string,
          file,
          isUploaded: false,
        });
        setOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadProfilePicture = async () => {
    if (profilePicture?.file) {
      await startUpload([profilePicture.file]);
    }
  };

  const handleCropComplete = (croppedImage: File) => {
    setProfilePicture({
      fileUrl: URL.createObjectURL(croppedImage),
      file: croppedImage,
      isUploaded: false,
    });
  };

  return (
    <div className="flex relative items-center space-x-4 w-max">
      <div className="relative pr-2">
        <Avatar className="w-24 h-24">
          <AvatarImage src={profilePicture?.fileUrl || ''} />
          <AvatarFallback>
            {profilePicture ? null : (
              <Camera className="w-8 h-8 text-gray-400" />
            )}
          </AvatarFallback>
        </Avatar>
        {profilePicture && profilePicture.isUploaded ? (
          <Badge className="mt-1 opacity-60 px-1 py-1 rounded-sm absolute bottom-0 right-0">
            <PencilIcon className="w-6 h-6" />
          </Badge>
        ) : null}
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
        {profilePicture && !profilePicture.isUploaded ? (
          <div>
            {isUploading ? (
              <Progress
                value={progress}
                className="h-4 w-[98%] mx-auto"
              />
            ) : (
              <Button
                className="mt-1"
                size="sm"
                onClick={handleUploadProfilePicture}
                disabled={isUploading}
              >
                Save
              </Button>
            )}
          </div>
        ) : null}
        <CropDialog
          image={profilePicture}
          open={open}
          aspectRatio={1}
          onOpenChange={setOpen}
          onCropComplete={handleCropComplete}
        />
      </div>
    </div>
  );
}

export default ProfilePicture;
