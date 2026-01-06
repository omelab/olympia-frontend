import { apiSlice } from '../api-slice';
import type { GalleryType } from '../lib/definitions';

export type Root = {
  data: GalleryType[];
  totalCount: number;
  currentPage: number;
  perPage: number;
};

export const galleryApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllGallery: build.mutation({
      query: (queryString) => ({
        url: `/photo-gallery${queryString}`,
        method: 'GET',
      }),
    }),

    getSingleGallery: build.query({
      query: ({ id }) => `/photo-gallery/${id}`,
      transformResponse: (response: any) => {
        return response;
      },
    }),

    addGallery: build.mutation({
      query: (data) => ({
        url: '/photo-gallery',
        method: 'POST',
        body: data,
      }),
    }),

    updateGallery: build.mutation({
      query: ({ payload, id }) => ({
        url: `/photo-gallery/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Gallery'],
    }),

    softDeleteGallery: build.mutation({
      query: ({ id }) => ({
        url: `/photo-gallery/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Gallery'],
    }),

    restoreGallery: build.mutation({
      query: ({ id }) => {
        return {
          url: `/photo-gallery/${id}/restore`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['Gallery'],
    }),

    hardDeleteGallery: build.mutation({
      query: ({ id }) => ({
        url: `/photo-gallery/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Gallery'],
    }),

    bulkStatusChange: build.mutation({
      query: ({ payload }) => ({
        url: '/photo-gallery/bulk-status-change',
        body: payload,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllGalleryMutation,
  useGetSingleGalleryQuery,
  useAddGalleryMutation,
  useUpdateGalleryMutation,
  useSoftDeleteGalleryMutation,
  useRestoreGalleryMutation,
  useHardDeleteGalleryMutation,
  useBulkStatusChangeMutation,
} = galleryApi;
