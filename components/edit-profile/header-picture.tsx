import { ImageIcon, LoaderPinwheel } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { ImageData } from './edit-profile-form';
import { useUploadThing } from '@/lib/uploadthing';
import { toast } from 'sonner';

function HeaderPicture({
  headerImage,
  setHeaderImage,
}: {
  headerImage: ImageData | null;
  setHeaderImage: (headerImage: ImageData | null) => void;
}) {
  const { startUpload, isUploading } = useUploadThing('headerImage', {
    onClientUploadComplete: (res) => {
      setHeaderImage({
        fileUrl: res?.[0].ufsUrl,
        file: null,
        isUploaded: true,
      });
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
        <Button
          className="absolute bottom-6 right-2"
          size="sm"
          onClick={handleUploadHeaderImage}
          disabled={isUploading}
        >
          {isUploading ? (
            <LoaderPinwheel className="w-4 h-4 animate-spin" />
          ) : (
            'Save'
          )}
        </Button>
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
