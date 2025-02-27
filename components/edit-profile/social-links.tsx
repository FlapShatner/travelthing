'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFieldArray, useFormContext, Controller } from 'react-hook-form';
import { useEffect } from 'react';

// Define social platform options
export const SOCIAL_PLATFORMS = [
  { value: 'facebookLink', label: 'Facebook' },
  { value: 'instagramLink', label: 'Instagram' },
  { value: 'discordLink', label: 'Discord' },
  { value: 'twitterLink', label: 'Twitter' },
  { value: 'threadsLink', label: 'Threads' },
  { value: 'blueskyLink', label: 'Bluesky' },
];

// Type for social link
export type SocialLink = {
  id: string;
  platform: string;
  url: string;
};

export default function SocialLinks() {
  const { control, watch } = useFormContext();

  // Use fieldArray to handle the dynamic social links
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialLinks',
  });

  // Watch social links to get current values for filtering
  const socialLinks = watch('socialLinks');

  // For debugging
  useEffect(() => {
    console.log('Current social links:', socialLinks);
  }, [socialLinks]);

  // Add new social link
  const addSocialLink = () => {
    if (fields.length < 6) {
      append({ id: String(Date.now()), platform: '', url: '' });
    }
  };

  // Get available platforms (not already selected)
  const getAvailablePlatforms = (currentIndex: number) => {
    const selectedPlatforms =
      socialLinks
        ?.filter(
          (link: SocialLink, idx: number) =>
            idx !== currentIndex && link.platform
        )
        .map((link: SocialLink) => link.platform) || [];

    return SOCIAL_PLATFORMS.filter(
      (platform) => !selectedPlatforms.includes(platform.value)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Social Links</Label>
        <span className="text-sm text-gray-500">
          {fields.length}/6 links added
        </span>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex items-center gap-2"
        >
          <div className="flex-1">
            <Controller
              control={control}
              name={`socialLinks.${index}.platform`}
              render={({ field }) => (
                <Select
                  value={field.value || ''}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailablePlatforms(index).map((platform) => (
                      <SelectItem
                        key={platform.value}
                        value={platform.value}
                      >
                        {platform.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex-[2]">
            <Controller
              control={control}
              name={`socialLinks.${index}.url`}
              render={({ field }) => (
                <Input
                  placeholder="Enter your profile URL"
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => remove(index)}
            className="flex-shrink-0"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      ))}

      {fields.length < 6 && (
        <Button
          type="button"
          variant="outline"
          onClick={addSocialLink}
          className="w-full"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Social Link
        </Button>
      )}
    </div>
  );
}
