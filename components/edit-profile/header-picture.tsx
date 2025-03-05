import { useState } from 'react';

import { ImageIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import Image from 'next/image';
import { ImageData } from './edit-profile-form';
import { useUploadThing } from '@/lib/uploadthing';
import { toast } from 'sonner';
import { MAX_FILE_SIZE } from '@/data/constants';
import { authClient } from '@/lib/auth-client';
import { updateUserProfileImage } from '@/app/actions/profile-actions';
function HeaderPicture({
  headerImage,
  setHeaderImage,
}: {
  headerImage: ImageData | null;
  setHeaderImage: (headerImage: ImageData | null) => void;
}) {
  const [progress, setProgress] = useState(0);

  const { data } = authClient.useSession();
  const userId = data?.user.id;

  const { startUpload, isUploading } = useUploadThing('headerImage', {
    onClientUploadComplete: (res) => {
      setHeaderImage({
        fileUrl: res?.[0].ufsUrl,
        file: null,
        isUploaded: true,
      });
      if (userId) {
        updateUserProfileImage(userId, 'headerImage', res?.[0].ufsUrl);
      }
    },
    uploadProgressGranularity: 'fine',
    onUploadProgress: (progress) => {
      setProgress(progress);
    },
    onUploadError: () => {
      toast.error('Failed to upload header image');
    },
  });

  const handleHeaderImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error('Profile picture must be smaller than 6MB');
        // Reset the input field
        event.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeaderImage({
          fileUrl: reader.result as string,
          file,
          isUploaded: false,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadHeaderImage = async () => {
    if (headerImage?.file) {
      await startUpload([headerImage.file]);
    }
  };

  return (
    <div className="space-y-4 relative">
      <Label>Header Image</Label>
      <div className="relative aspect-[3/1] overflow-hidden rounded-lg border border-input">
        {headerImage ? (
          <Image
            src={headerImage.fileUrl ?? '/placeholder.svg'}
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
      {headerImage && !headerImage.isUploaded ? (
        <div>
          {isUploading ? (
            <div className="absolute bottom-6 w-full">
              <Progress
                value={progress}
                className="h-4 w-[98%] mx-auto"
              />
            </div>
          ) : (
            <Button
              className="absolute bottom-6 right-2"
              size="sm"
              onClick={handleUploadHeaderImage}
              disabled={isUploading}
            >
              Save
            </Button>
          )}
        </div>
      ) : headerImage && headerImage.isUploaded ? (
        <Badge
          className="absolute bottom-6 right-2 opacity-60"
          variant="default"
        >
          Saved
        </Badge>
      ) : null}
    </div>
  );
}

export default HeaderPicture;
