import { apiSlice } from '@/api/api-slice';

import type { News } from '../lib/definitions';

export type BookmarksDashboardProps = {
  data: News[];
  totalCount: number;
  currentPage: number;
  perPage: number;
};

export const newsApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAllNews: build.query({
      query: queryString => `/news/all${queryString}`,
      providesTags: ['News'],
    }),

    getSingleNews: build.query({
      query: ({ id }) => `news/${id}`,
      transformResponse: (response: any) => {
        const metaKeyword = response?.metaKeyword
          ? response.metaKeyword.includes(',')
            ? response.metaKeyword.split(',')
            : [response.metaKeyword]
          : [];

        const data = {
          title: response.title,
          slug: response.slug,
          description: response.description,
          excerpt: response.excerpt,
          featuredImage: response.featuredImage,
          imageCaption: response.imageCaption,
          metaTitle: response.metaTitle,
          metaKeyword,
          metaDescription: response.metaDescription,
          status: response.status,
          publishedAt: response.publishedAt,
        };
        return data;
      },
      providesTags: ['News'],
    }),

    addNews: build.mutation({
      query: data => ({
        url: '/news',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['News'],
    }),

    restoreNews: build.mutation({
      query: ({ id }) => {
        return {
          url: `/news/${id}/restore`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['News'],
    }),

    updateNews: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/news/${id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),

    bulkNewsStatusChange: build.mutation<
      any,
      {
        newsId: Array<number>;
        status: 'PUBLISHED' | 'DRAFT' | 'REJECTED';
      }
    >({
      query: ({ newsId, status }) => ({
        url: '/news/bulk-status-change',
        method: 'PUT',
        body: { newsId, status },
      }),
    }),

    deleteNews: build.mutation({
      query: ({ id, trash }) => {
        const url = trash ? `/news/${id}/force` : `/news/${id}`;

        return {
          url,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['News'],
    }),
  }),
});

export const {
  useGetAllNewsQuery,
  useGetSingleNewsQuery,
  useAddNewsMutation,
  useRestoreNewsMutation,
  useUpdateNewsMutation,
  useBulkNewsStatusChangeMutation,
  useDeleteNewsMutation,
} = newsApi;
