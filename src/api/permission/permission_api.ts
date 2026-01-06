import { apiSlice } from '@/api/api-slice';

export const permissionsApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAllPermissions: build.query({
      query: () => `/permissions`,
      providesTags: ['permissions'],
    }),
    createPermissions: build.mutation({
      query: data => ({
        url: `/permissions`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['permissions'],
    }),
    getSingleaPermissions: build.query({
      query: ({ id }) => `/permissions/${id}`,
      providesTags: ['permissions'],
    }),
    restorePermissions: build.mutation({
      query: ({ id }) => {
        return {
          url: `/permissions/${id}/restore`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['permissions'],
    }),
    updatePermissions: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/permissions/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['permissions'],
    }),
    deletePermissions: build.mutation({
      query: ({ id, isTrash }) => ({
        url: isTrash ? `/permissions/${id}/permanent` : `/permissions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['permissions'],
    }),
  }),
});
export const {
  useCreatePermissionsMutation,
  useDeletePermissionsMutation,
  useGetAllPermissionsQuery,
  useGetSingleaPermissionsQuery,
  useRestorePermissionsMutation,
  useUpdatePermissionsMutation,
} = permissionsApi;
