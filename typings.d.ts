export type UnsplashImage = {
  total: number;
  totalPages: number;
  results: Result[];
};

export type Result = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  promotedAt: Date | null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: null | string;
  altDescription: string;
  urls: Urls;
  links: ResultLinks;
  likes: number;
  likedByUser: boolean;
  currentUserCollections: unknown[];
  sponsorship: null;
  topicSubmissions: ResultTopicSubmissions;
  user: User;
  tags: Tag[];
};

export type ResultLinks = {
  self: string;
  html: string;
  download: string;
  downloadLocation: string;
};

export type Tag = {
  type: Type;
  title: string;
  source?: Source;
};

export type Source = {
  ancestry: Ancestry;
  title: string;
  subtitle: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  coverPhoto: CoverPhoto;
};

export type Ancestry = {
  type: Category;
  category?: Category;
  subcategory?: Category;
};

export type Category = {
  slug: string;
  prettySlug: string;
};

export type CoverPhoto = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  promotedAt: Date | null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: null | string;
  altDescription: null | string;
  urls: Urls;
  links: ResultLinks;
  likes: number;
  likedByUser: boolean;
  currentUserCollections: unknown[];
  sponsorship: null;
  topicSubmissions: CoverPhotoTopicSubmissions;
  premium?: boolean;
  user: User;
};

export type CoverPhotoTopicSubmissions = {
  nature?: Nature;
  wallpapers?: Nature;
  architectureInterior?: Nature;
  colorOfWater?: Nature;
  texturesPatterns?: Nature;
  currentEvents?: Nature;
};

export type Nature = {
  status: Status;
  approvedOn: Date;
};

export type Status = "approved";

export type Urls = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  smallS3: string;
};

export type User = {
  id: string;
  updatedAt: Date;
  username: string;
  name: string;
  firstName: string;
  lastName: string;
  twitterUsername: null | string;
  portfolioURL: null | string;
  bio: null | string;
  location: null | string;
  links: UserLinks;
  profileImage: ProfileImage;
  instagramUsername: null | string;
  totalCollections: number;
  totalLikes: number;
  totalPhotos: number;
  acceptedTos: boolean;
  forHire: boolean;
  social: Social;
};

export type UserLinks = {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
};

export type ProfileImage = {
  small: string;
  medium: string;
  large: string;
};

export type Social = {
  instagramUsername: null | string;
  portfolioURL: null | string;
  twitterUsername: null | string;
  paypalEmail: null;
};

export type Type = "landing_page" | "search";

export type ResultTopicSubmissions = {
  nature?: Nature;
  wallpapers?: Nature;
  spirituality?: Nature;
  texturesPatterns?: Nature;
};

export type TDrink = {
  id?: string;
  title?: string;
  price?: string;
  volume?: string;
  type?: string;
  tag?: string;
  categoryID?: number;
  createdDate?: Date;
  description?: string;
  updatedAt?: Date;
};
