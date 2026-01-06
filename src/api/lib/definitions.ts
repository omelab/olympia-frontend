export type Product = {
  id: number;
  uid: string;
  title: string;
  slug: string;
  subTitle: string;
  specification: Record<string, string>;
  brochure: string;
  description: string;
  shortDescription: string;
  featuredImage: string;
  imageCaption: string;
  galleries: Gallery[];
  categoryId: number;
  category: Category;
  tags: Tag[];
  status: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type Gallery = {
  id: number;
  caption: string;
  imageUrl: string;
  videoUrl: string;
  photoCredit: string;
  orderPosition: number;
  projectId: number;
};

export type Tag = {
  title: string;
  slug: string;
};

export type CreatedBy = {
  id: number;
  fullName: string;
};

export type Count = {
  comments: number;
};

export type Division = {
  id: number;
  name: string;
  slug: string;
  bn_name: string;
  latitude: string;
  longitude: string;
  title: string;
  subTitle: string;
  content: string;
  featuredImage: string;
  bannerImage: string;
  status: string;
  metaTitle: string;
  metaKeyword: string;
  metaDescription: string;
  createdById: string;
  updatedById: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type AdminDashboardNews = {
  data: Array<{
    id: number;
    title: string;
    fullName: string;
    slug: string;
    subTitle: string;
    shortDescription: string;
    contentType: string;
    newsFormat: string;
    videoUrl: string;
    liveUrl: string;
    audioUrl: string;
    featuredImage: string;
    posterImage: string;
    isFeatured: boolean;
    tags: Array<string[]>;
    publishedAt: string;
    viewCount: number;
    status: string;
    metaTitle: string;
    metaDescription: string;
    metaKeyword: string;
    initials: string;
    customReporterName: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    categories: Array<{
      id: number;
      title: string;
      slug: string;
    }>;
    _count: {
      comments: number;
    };
  }>;
  totalCount: number;
  currentPage: number;
  perPage: number;
  nextPage: number;
};

// Page Type Definitions

export type Page = {
  id: number;
  title: string;
  slug: string;
  subTitle: string;
  shortDescription: string;
  description: string;
  featuredImage: string;
  publishedAt: string;
  metaTitle: string;
  metaKeyword: string;
  metaDescription: string;
  status: string;
  createdById: any;
  updatedById: any;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
};

// Category Type Definitions

export type Category = {
  id: number;
  title: string;
  title_en: any;
  slug: string;
  parentId: any;
  featuredImage: string;
  content: string;
  positionOrder: number;
  isTop: boolean;
  status: string;
  searchKeyword: string;
  metaTitle: string;
  metaKeyword: string;
  metaDescription: string;
  createdById: number;
  updatedById: any;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  parent: any;
  _count: {
    project: number;
  };
};

// Contact Type Definitions

export type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

// Topics Type Definitions

export type Topic = {
  id: number;
  title: string;
  slug: string;
  featuredImage: string;
  content: string;
  status: string;
  searchKeyword: string;
  metaTitle: string;
  metaKeyword: string;
  metaDescription: string;
  createdById: number;
  updatedById: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  _count: {
    news: number;
  };
};

// Reporter Type Definitions

type ReporterProfileDetails = {
  mobile: string;
  gender: string;
  bloodGroup: string;
  dateOfBirth: string;
  profession: string;
  fatherName: string;
  motherName: string;
  identityType: string;
  identityFiles: string;
  picture: string;
};

type ReporterRole = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string | null;
};

export type Reporter = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  userType: string;
  displayName: string;
  status: string;
  divisionId: number;
  division: {
    name: string;
    slug: string;
  };
  districtId: number;
  district: {
    name: string;
    slug: string;
  };
  upazilaId: number;
  upazila: {
    name: string;
    slug: string;
  };
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  profile: ReporterProfileDetails;
  roles: ReporterRole[];
};

// Subscriber Type Definations

type SubscriberProfileDetails = {
  mobile: string;
  gender: string;
  bloodGroup: string;
  dateOfBirth: string;
  profession: string;
  fatherName: string;
  motherName: string;
  identityType: string;
  identityFiles: string;
  picture: string;
};

type SubscriberRole = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string | null;
};

export type Subscriber = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  userType: string;
  displayName: string;
  status: string;
  divisionId: number;
  division: {
    name: string;
    slug: string;
  };
  districtId: number;
  district: {
    name: string;
    slug: string;
  };
  upazilaId: number;
  upazila: {
    name: string;
    slug: string;
  };
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  profile: SubscriberProfileDetails;
  roles: SubscriberRole[];
};

// News Types

export type News = {
  id: number;
  uid: string;
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  featuredImage: string;
  imageCaption: string;
  status: string;
  metaTitle: string;
  metaKeyword: string;
  metaDescription: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

// Comment type Definitions

export type Comment = {
  id: number;
  featuredImage: string;
  content: string;
  guestName: string;
  createdAt: string;
  deletedAt: string | null;
  createdBy: {
    fullName: string;
  };
  news: {
    title: string;
    slug: string;
    featuredImage: string;
  };
};
export type Bookmark = {
  id: number;
  featuredImage: string;
  content: string;
  guestName: string;
  createdAt: string;
  deletedAt: string | null;
  createdBy: {
    fullName: string;
  };
  news: {
    title: string;
    slug: string;
  };
};

// Contributor Type Definitions

type ContributorRole = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string | null;
};

export type Contributor = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  userType: string;
  displayName: string;
  status: string;
  divisionId: number;
  division: {
    name: string;
    slug: string;
  };
  districtId: number;
  district: {
    name: string;
    slug: string;
  };
  upazilaId: number;
  upazila: {
    name: string;
    slug: string;
  };
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  profile: ReporterProfileDetails;
  roles: ContributorRole[];
};

// Navigation type Defination
export type NavigationItem = {
  id: number;
  title: string;
  icon: string;
  url: string;
  target: 'SELF';
  linkType: string;
  position?: number;
  parentId?: number | null;
  status: string;
  navigationId?: string | null;
  children: NavigationItem[];
};

export type MenuType = {
  id?: number;
  name: string;
  categories: Omit<NavigationItem, 'children'>[];
  tags: Omit<NavigationItem, 'id' | 'children'>[];
  link: {
    id: string;
    url: string;
    title: string;
  };
  navigationItems: NavigationItem[];
};

// Settings

export type Settings = {
  id: number;
  key: string;
  value: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type GalleryType = {
  id: number;
  imageUrl: string;
  caption: string;
  photoCredit: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};
