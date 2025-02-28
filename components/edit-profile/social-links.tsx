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
import { ProfileFormData } from '@/lib/zod-schema';

const maxLinks = 8;

export const SOCIAL_PLATFORMS = [
  { value: 'facebookLink', label: 'Facebook' },
  { value: 'instagramLink', label: 'Instagram' },
  { value: 'discordLink', label: 'Discord' },
  { value: 'twitterLink', label: 'Twitter / X' },
  { value: 'threadsLink', label: 'Threads' },
  { value: 'blueskyLink', label: 'Bluesky' },
  { value: 'otherLink', label: 'Website' },
];

export type SocialLink = {
  id: string;
  platform: string;
  url: string;
};

export default function SocialLinks() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<ProfileFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialLinks',
  });

  const socialLinks = watch('socialLinks');

  useEffect(() => {
    console.log('Current social links:', socialLinks);
  }, [socialLinks]);

  const addSocialLink = () => {
    if (fields.length < maxLinks) {
      append({ id: String(Date.now()), platform: '', url: '' });
    }
  };

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
          {fields.length}/{maxLinks} links added
        </span>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex items-center gap-2"
        >
          <div className="flex-1 relative">
            <Controller
              control={control}
              name={`socialLinks.${index}.platform`}
              render={({ field }) => (
                <Select
                  value={field.value || ''}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full mb-2">
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
            {errors.socialLinks?.[index]?.platform && (
              <p className="text-sm text-red-500 absolute top-9">
                {errors.socialLinks[index]?.platform?.message}
              </p>
            )}
          </div>
          <div className="flex-[2] relative">
            <Controller
              control={control}
              name={`socialLinks.${index}.url`}
              render={({ field }) => (
                <Input
                  className="mb-2"
                  placeholder="Enter your profile URL"
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.socialLinks?.[index]?.url && (
              <p className="text-sm text-red-500 absolute top-9">
                {errors.socialLinks[index]?.url?.message}
              </p>
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => remove(index)}
            className="flex-shrink-0 mb-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      ))}

      {errors.socialLinks?.message && (
        <p className="text-sm text-red-500">{errors.socialLinks.message}</p>
      )}

      {fields.length < maxLinks && (
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
