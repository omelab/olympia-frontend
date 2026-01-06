import { apiSlice } from '@/api/api-slice';

export const RoleApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAllroles: build.query({
      query: () => `/roles`,
      providesTags: ['roles'],
    }),
    createroles: build.mutation({
      query: data => ({
        url: `/roles`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['roles'],
    }),
    getSinglearoles: build.query({
      query: ({ id }) => `/roles/${id}`,
      transformResponse: (response: any) => {
        const data = {
          name: response.name,
          description: response.description,
          permissions: response.permissions,
        };
        return data;
      },
    }),
    restoreroles: build.mutation({
      query: ({ id }) => {
        return {
          url: `/roles/${id}/restore`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['roles'],
    }),
    updateroles: build.mutation({
      query: ({ data, rolId }) => ({
        url: `/roles/${rolId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['roles'],
    }),
    deleteroles: build.mutation({
      query: ({ id, isTrash }) => ({
        url: isTrash ? `/roles/${id}/permanent` : `/roles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['roles'],
    }),
  }),
});
export const {
  useCreaterolesMutation,
  useDeleterolesMutation,
  useGetAllrolesQuery,
  useGetSinglearolesQuery,
  useRestorerolesMutation,
  useUpdaterolesMutation,
} = RoleApi;
