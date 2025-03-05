/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from 'react';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ImageData } from './edit-profile-form';

function CropDialog({
  image,
  open,
  onOpenChange,
  aspectRatio,
  onCropComplete,
}: {
  image: ImageData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  aspectRatio: number;
  onCropComplete: (croppedImage: File) => void;
}) {
  const [crop, setCrop] = useState<Crop>();
  const imageRef = useRef<HTMLImageElement>(null);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
    const crop = centerCrop(
      makeAspectCrop(
        { unit: '%', width: 100, height: 100 },
        aspectRatio,
        width,
        height
      ),
      width,
      height
    );
    setCrop(crop);
  }

  const handleChange = (newCrop: Crop) => {
    setCrop(newCrop);
  };

  const handleCropComplete = async () => {
    if (!imageRef.current || !crop || !image?.fileUrl) return;

    const canvas = document.createElement('canvas');
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(
      imageRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
        },
        'image/jpeg',
        0.95
      );
    });

    // Create a File object from the blob
    const croppedFile = new File([blob], 'cropped-image.jpg', {
      type: 'image/jpeg',
    });
    onCropComplete(croppedFile);
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] w-auto sm:max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
          <DialogDescription>
            Crop the image to the desired size
          </DialogDescription>
        </DialogHeader>
        <div className="relative flex items-center justify-center">
          <ReactCrop
            className="max-h-[70vh] max-w-[80vw] relative w-max object-contain"
            aspect={aspectRatio}
            circularCrop={aspectRatio === 1}
            crop={crop}
            onChange={handleChange}
          >
            <img
              ref={imageRef}
              src={image?.fileUrl ?? ''}
              alt="Crop"
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>
        <DialogFooter>
          <Button onClick={handleCropComplete}>Confirm Crop</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CropDialog;
