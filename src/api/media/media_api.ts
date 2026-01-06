import { apiSlice } from '../api-slice';
import { mediaFolderParentInfo } from './media_slice';

export const mediaApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getMedias: build.query({
      query: (queryString) => {
        return `/medias${queryString}`;
      },
      providesTags: ['Media'],
    }),

    deleteMedia: build.mutation({
      query: ({ id }) => ({
        url: `/medias/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Media'],
    }),
    bulkDeleteMedia: build.mutation({
      query: ({ ids }) => ({
        url: `/medias/many/${ids}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Media'],
    }),
    getFolders: build.query({
      query: () => {
        return `/directory`;
      },
      providesTags: ['mediaFolders'],

      async onQueryStarted({ queryFulfilled, dispatch }) {
        try {
          const result: any = await queryFulfilled;
          if (result && result?.data?.length > 0) {
            dispatch(
              mediaFolderParentInfo({
                title: result?.data[0].title,
                parent: result?.data[0].key,
              }),
            );
          }
        } catch {}
      },
    }),
    addFolders: build.mutation({
      query: (data) => {
        return {
          url: '/directory',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['mediaFolders'],
    }),
    deleteFolders: build.mutation({
      query: ({ id }) => {
        return {
          url: `/directory/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['mediaFolders'],
    }),
    addFiles: build.mutation({
      query: (data) => {
        return {
          url: '/medias',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Media'],
    }),
  }),
});

export const {
  useGetMediasQuery,
  useGetFoldersQuery,
  useAddFoldersMutation,
  useAddFilesMutation,
  useDeleteMediaMutation,
  useBulkDeleteMediaMutation,
  useDeleteFoldersMutation,
} = mediaApi;
