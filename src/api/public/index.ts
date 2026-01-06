import { apiSlice } from '../api-slice';
import type {
  Category,
  GalleryType,
  News,
  Page,
  Product,
} from '../lib/definitions';

type CountServiceForDashboard = {
  _count: number;
  status: string;
};

type PublicCategoryResponse = {
  data: Category[];
  totalCount: number;
  currentPage: number;
  perPage: number;
};

type PublicProductsResponse = {
  data: Product[];
  totalCount: number;
  currentPage: number;
  perPage: number;
};

type PublicNewsResponse = {
  data: News[];
  totalCount: number;
  currentPage: number;
  perPage: number;
};

type PublicGalleryResponse = {
  data: GalleryType[];
  totalCount: number;
  currentPage: number;
  perPage: number;
};

export const postsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllPublicCategetories: build.query<PublicCategoryResponse, void>({
      query: () => `/public/categories?status=ACTIVE`,
      providesTags: ['Category'],
      keepUnusedDataFor: Infinity,
    }),

    getAllPublicProducts: build.query<PublicProductsResponse, string>({
      query: (queryString) => `/public/products${queryString}`,
      providesTags: ['Products'],
    }),

    getPublicProject: build.query<Product, string>({
      query: (slug) => `/public/products/${slug}`,
      providesTags: ['Products'],
    }),

    getAllPublicNews: build.query<PublicNewsResponse, string>({
      query: (queryString) => `/public/news${queryString}`,
      providesTags: ['News'],
    }),

    getSinglePublicNews: build.query<News, string>({
      query: (slug) => `public/newss/${slug}`,
      providesTags: ['News'],
    }),

    getPublicTagsDropdown: build.query<
      Array<{ id: number; title: string; slug: string; status: string }>,
      void
    >({
      query: () => `/public/tags/dropdown`,
      providesTags: ['Tag'],
    }),

    getCountServiceQuery: build.query<[CountServiceForDashboard], string>({
      query: (queryString) => `/public/get-record-count${queryString}`,
    }),

    getProjectCountForAdminDashboard: build.query<
      [CountServiceForDashboard],
      void
    >({
      query: () => `/public/get-project-count`,
    }),

    getPublicSettings: build.query<any, string>({
      query: (queryString) => `/public/settings${queryString}`,
    }),

    getAllPublicGallery: build.query<PublicGalleryResponse, string>({
      query: (queryString) => `/public/galleries${queryString}`,
      providesTags: ['Gallery'],
    }),

    getSinglePublicPage: build.query<Page, string>({
      query: (slug) => `public/pages/${slug}`,
      providesTags: ['Page'],
    }),
  }),
});

export const {
  useGetAllPublicProductsQuery,
  useGetAllPublicCategetoriesQuery,
  useGetPublicTagsDropdownQuery,
  useGetCountServiceQueryQuery,
  useGetProjectCountForAdminDashboardQuery,
  useGetPublicSettingsQuery,
  useGetAllPublicNewsQuery,
  useGetSinglePublicNewsQuery,
  useGetSinglePublicPageQuery,
  useGetPublicProjectQuery,
  useGetAllPublicGalleryQuery,
} = postsApi;



 