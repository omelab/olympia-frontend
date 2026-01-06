import { apiSlice } from '@/api/api-slice';
import type { Topic } from '@/api/lib/definitions';

export type TopicDashboardListProps = {
  data: Topic[];
  totalCount: number;
  currentPage: number;
  perPage: number;
};

type CreateTopicArgs = {
  title: string;
  featuredImage: string;
  content: string;
  status: string;
  searchKeyword: string;
  metaTitle: string;
  metaKeyword: string;
  metaDescription: string;
};

type UpdateTopicArgs = {
  title: string;
  featuredImage: string;
  content: string;
  status: string;
  searchKeyword: string;
  metaTitle: string;
  metaKeyword: string;
  metaDescription: string;
};

export const tagApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAllTag: build.query<
      TopicDashboardListProps,
      { queryString: string; isTrash: boolean }
    >({
      query: ({ queryString }) => `/tags${queryString}`,
      providesTags: ['Tag'],
    }),

    getAllTagCount: build.query<
      TopicDashboardListProps,
      {
        status:
          | 'ACTIVE'
          | 'INACTIVE'
          | 'DRAFT'
          | 'PUBLISHED'
          | 'PENDING'
          | 'REJECTED'
          | 'COMPLETED'
          | 'ARCHIVED';
      }
    >({
      query: ({ status }) => `/tags?status=${status}`,
      providesTags: ['Tag'],
    }),

    createTag: build.mutation<Topic, CreateTopicArgs>({
      query: data => ({
        url: '/tags',
        method: 'POST',
        body: data,
      }),
    }),
    restoreTags: build.mutation({
      query: ({ id }) => {
        return {
          url: `/tags/${id}/restore`,
          method: 'PATCH',
        };
      },
      invalidatesTags: ['Tag'],
    }),

    getSingleTag: build.query<
      { name: string; slug: string; content: string },
      { id: number }
    >({
      query: ({ id }) => `/tags/${id}`,
      transformResponse: (response: Topic) => {
        const data = {
          name: response.title,
          slug: response.slug,
          content: response.content,
        };
        return data;
      },
    }),
    getSingleTagslug: build.query({
      query: ({ slug }) => {
        return `/public/tags/${slug}`;
      },
    }),

    updateTag: build.mutation<Topic, { data: UpdateTopicArgs; id: number }>({
      query: ({ data, id }) => ({
        url: `/tags/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Tag'],
    }),

    deleteTag: build.mutation({
      query: ({ id, isTrash }) => ({
        url: isTrash ? `/tags/${id}/force` : `/tags/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tag'],
    }),
    tagBulkDelete: build.mutation({
      query: data => ({
        url: '/tags/bulk-destroy',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Tag'],
    }),
  }),

  overrideExisting: true,
});

export const {
  useRestoreTagsMutation,
  useGetAllTagQuery,
  useCreateTagMutation,
  useGetSingleTagQuery,
  useUpdateTagMutation,
  useDeleteTagMutation,
  useTagBulkDeleteMutation,
  useGetAllTagCountQuery,
  useGetSingleTagslugQuery,
} = tagApi;
