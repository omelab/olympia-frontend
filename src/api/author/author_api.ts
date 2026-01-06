import { apiSlice } from '@/api/api-slice';

import type { Reporter } from '../lib/definitions';

export type ReportersDashboardProps = {
  data: Reporter[];
  totalCount: number;
  currentPage: number;
  perPage: number;
};

export const authorApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAllAuthor: build.query<ReportersDashboardProps, string>({
      query: queryString => `/reporters${queryString}`,
      providesTags: ['author'],
    }),
    createAuthor: build.mutation({
      query: data => ({
        url: `/reporters`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['author'],
    }),
    getSingleaAuthor: build.query({
      query: ({ id }) => `/reporters/${id}`,
      transformResponse: (response: any) => {
        const identityFiles: Array<string> = response?.profile?.identityFiles
          ? response?.profile?.identityFiles?.split(',')
          : [];

        const dateOfBirth
          = response?.profile?.dateOfBirth === null
            ? ''
            : response?.profile?.dateOfBirth;

        const data = {
          username: response?.username,
          fullName: response?.fullName,
          displayName: response?.displayName,
          email: response?.email,
          divisionId: response?.divisionId,
          districtId: response?.districtId,
          upazilaId: response?.upazilaId,
          bloodGroup: response?.profile.bloodGroup,
          dateOfBirth,
          profession: response?.profile.profession,
          identityType: response?.profile.identityType,
          identityFiles,
          mobile: response?.profile.mobile,
          gender: response?.profile.gender,
          fatherName: response.profile?.fatherName,
          motherName: response?.profile.motherName,
          picture: response?.profile.picture,
        };

        return data;
      },
    }),
    restoreAuthor: build.mutation({
      query: ({ id }) => {
        return {
          url: `/reporters/${id}/restore`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['author'],
    }),
    updateAuthor: build.mutation({
      query: ({ data, id }) => ({
        url: `/reporters/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['author'],
    }),
    deleteAuthor: build.mutation({
      query: ({ id, isTrash }) => ({
        url: isTrash ? `/reporters/${id}/permanent` : `/reporters/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['author'],
    }),
  }),
});
export const {
  useGetAllAuthorQuery,
  useCreateAuthorMutation,
  useDeleteAuthorMutation,
  useRestoreAuthorMutation,
  useGetSingleaAuthorQuery,
  useUpdateAuthorMutation,
} = authorApi;
