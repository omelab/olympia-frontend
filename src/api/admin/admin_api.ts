import { apiSlice } from '@/api/api-slice';

export const adminApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAllAdmin: build.query({
      query: queryString => `/admins${queryString}`,
      providesTags: ['admin'],
    }),
    createAdmin: build.mutation({
      query: data => ({
        url: `/admins`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['admin'],
    }),
    getSingleaAdmins: build.query({
      query: ({ id }) => `/admins/${id}`,
      transformResponse: (response: any) => {
        const roleIds = response?.roles
          ? response?.roles?.map(({ id }: { id: number }) => id)
          : [];

        const identityFiles: Array<string> = response?.profile?.identityFiles
          ? response?.profile?.identityFiles?.split(',')
          : [];

        const data = {
          fullName: response.fullName,
          displayName: response.displayName,
          picture: response?.profile?.picture,
          username: response.username,
          email: response.email,
          gender: response?.profile?.gender,
          bloodGroup: response?.profile?.bloodGroup,
          dateOfBirth: response?.dateOfBirth,
          profession: response?.profile?.profession,
          fatherName: response?.profile?.fatherName,
          motherName: response?.profile?.motherName,
          identityType: response?.profile?.identityType,
          mobile: response?.profile?.mobile,
          districtId: response?.districtId,
          divisionId: response?.divisionId,
          upazilaId: response?.upazilaId,
          roleIds,
          identityFiles,
        };

        return data;
      },
    }),
    restoreAdmin: build.mutation({
      query: ({ id }) => {
        return {
          url: `/admins/${id}/restore`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['admin'],
    }),
    updateAdmin: build.mutation({
      query: ({ data, id }) => ({
        url: `/admins/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['admin'],
    }),
    deleteAdmin: build.mutation({
      query: ({ id, isTrash }) => ({
        url: isTrash ? `/admins/${id}/permanent` : `/admins/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['admin'],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useGetSingleaAdminsQuery,
  useGetAllAdminQuery,
  useRestoreAdminMutation,
  useUpdateAdminMutation,
} = adminApi;
