export type ProfileFormData = {
  username: string;
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  city: string;
  bio: string;
  socialLinks: SocialLink[] | null;
};

export type SocialLink = {
  platform: string;
  url: string;
};
