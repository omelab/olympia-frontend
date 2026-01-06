import { apiSlice } from '@/api/api-slice';

import type { Comment } from '../lib/definitions';

export type CommentsDashboardProps = {
  data: Comment[];
  totalCount: number;
  currentPage: number;
  perPage: number;
};

export const commentApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAllComment: build.query<CommentsDashboardProps, string>({
      query: queryString => `/comments${queryString}`,
      providesTags: ['comment'],
    }),
    getAllPublicComment: build.query<CommentsDashboardProps, string>({
      query: queryString => `/public/comments${queryString}`,
      providesTags: ['comment'],
    }),
    createComment: build.mutation({
      query: data => ({
        url: `/comments`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comment'],
    }),
    getSingleaComment: build.query({
      query: ({ id }) => `/comments/${id}`,
    }),
    restoreComment: build.mutation({
      query: ({ id }) => {
        return {
          url: `/comments/${id}/restore`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['comment'],
    }),
    updateComment: build.mutation({
      query: ({ data, id }) => ({
        url: `/comments/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['comment'],
    }),
    deleteComment: build.mutation({
      query: ({ id, isTrash }) => ({
        url: isTrash ? `/comments/${id}/force` : `/comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['comment'],
    }),

    getCommentsCount: build.query<
      {
        totalComments: number;
        todayComments: number;
      },
      void
    >({
      query: () => `/comments/comments-count`,
      providesTags: ['comment'],
    }),
  }),
});
export const {
  useGetAllCommentQuery,
  useGetAllPublicCommentQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useRestoreCommentMutation,
  useGetSingleaCommentQuery,
  useUpdateCommentMutation,
  useGetCommentsCountQuery,
} = commentApi;
