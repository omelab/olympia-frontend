import { apiSlice } from '@/api/api-slice';

export const featuresApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAllFeatures: build.query({
      query: () => `/Features`,
      providesTags: ['features'],
    }),
    createfeatures: build.mutation({
      query: data => ({
        url: `/features`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['features'],
    }),
    getSingleafeatures: build.query({
      query: ({ id }) => `/features/${id}`,
      transformResponse: (response: any) => {
        const data = {
          title: response.title,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
          firstName: response.firstName,
          lastName: response.lastName,
        };

        return data;
      },
    }),
    restorefeatures: build.mutation({
      query: ({ id }) => {
        return {
          url: `/features/${id}/restore`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['features'],
    }),
    updatefeatures: build.mutation({
      query: ({ data, id }) => ({
        url: `/features/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['features'],
    }),
    deletefeatures: build.mutation({
      query: ({ id, isTrash }) => ({
        url: isTrash ? `/features/${id}/permanent` : `/features/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['features'],
    }),
  }),
});
export const {
  useGetAllFeaturesQuery,
  useCreatefeaturesMutation,
  useDeletefeaturesMutation,
  useGetSingleafeaturesQuery,
  useRestorefeaturesMutation,
  useUpdatefeaturesMutation,
} = featuresApi;
