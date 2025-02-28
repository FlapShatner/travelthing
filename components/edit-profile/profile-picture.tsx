import { Camera, LoaderPinwheel } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ImageData } from './edit-profile-form';
import { useUploadThing } from '@/lib/uploadthing';
import { toast } from 'sonner';

function ProfilePicture({
  profilePicture,
  setProfilePicture,
}: {
  profilePicture: ImageData | null;
  setProfilePicture: (profilePicture: ImageData | null) => void;
}) {
  const { startUpload, isUploading } = useUploadThing('profilePicture', {
    onClientUploadComplete: (res) => {
      setProfilePicture({
        fileUrl: res?.[0].ufsUrl,
        file: null,
        isUploaded: true,
      });
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture({
          fileUrl: reader.result as string,
          file,
          isUploaded: false,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadProfilePicture = async () => {
    if (profilePicture?.file) {
      await startUpload([profilePicture.file]);
    }
  };
  return (
    <div className="flex relative items-center space-x-4 w-max">
      <div className="relative">
        <Avatar className="w-24 h-24">
          <AvatarImage src={profilePicture?.fileUrl || ''} />
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
        {profilePicture && !profilePicture.isUploaded ? (
          <Button
            className="mt-1"
            size="sm"
            onClick={handleUploadProfilePicture}
            disabled={isUploading}
          >
            {isUploading ? (
              <LoaderPinwheel className="w-4 h-4 animate-spin" />
            ) : (
              'Save'
            )}
          </Button>
        ) : profilePicture && profilePicture.isUploaded ? (
          <Badge
            className="mt-1 opacity-60"
            variant="default"
          >
            Saved
          </Badge>
        ) : null}
      </div>
    </div>
  );
}

export default ProfilePicture;
