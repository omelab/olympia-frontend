import { apiSlice } from '@/api/api-slice';
import type { Page } from '@/api/lib/definitions';

export type PageDashboardListProps = {
  data: Page[];
  totalCount: number;
  currentPage: number;
  perPage: number;
};

type CreatePageArgs = {
  title: string;
  subTitle: string;
  shortDescription: string;
  description: string;
  featuredImage: string;
  status: string;
  metaTitle: string;
  metaKeyword: string;
  metaDescription: string;
};

type TransformedPageResposne = Omit<Page, 'searchKeyword' | 'metaKeyword'> & {
  metaKeyword: string[];
};

type CategoryStatus = {
  status:
    | 'ACTIVE'
    | 'INACTIVE'
    | 'DRAFT'
    | 'PUBLISHED'
    | 'PENDING'
    | 'REJECTED'
    | 'COMPLETED'
    | 'ARCHIVED';
};

export const pageApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAllPages: build.query<PageDashboardListProps, string>({
      query: queryString => `/pages${queryString}`,
      providesTags: ['Page'],
    }),

    getAllPageCount: build.query<PageDashboardListProps, CategoryStatus>({
      query: ({ status }) => `/pages?status=${status}`,
      providesTags: ['Page'],
    }),

    createPage: build.mutation<void, CreatePageArgs>({
      query: data => ({
        url: '/pages',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Page'],
    }),

    singlePage: build.query<TransformedPageResposne, { id: string | undefined }>({
      query: ({ id }) => `/pages/${id}`,
      transformResponse: (response: Page) => {
        const metaKeyArray = response?.metaKeyword
          ? response?.metaKeyword.split(',')
          : [];

        const data = {
          ...response,
          metaKeyword: metaKeyArray,
        };

        return data;
      },
    }),

    updatePage: build.mutation({
      query: ({ data, id }) => ({
        url: `/pages/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Page'],
    }),

    deletePage: build.mutation({
      query: ({ id, isTrash }) => ({
        url: isTrash ? `/pages/${id}/force` : `/pages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Page'],
    }),

    restorePage: build.mutation({
      query: ({ id }) => {
        return {
          url: `/pages/${id}/restore`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['Page'],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAllPagesQuery,
  useGetAllPageCountQuery,
  useCreatePageMutation,
  useSinglePageQuery,
  useUpdatePageMutation,
  useDeletePageMutation,
  useRestorePageMutation,
} = pageApi;
