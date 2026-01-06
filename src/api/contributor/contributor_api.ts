import { apiSlice } from '@/api/api-slice';

export const contributorApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAllContributor: build.query({
      query: queryString => `/contributors${queryString}`,
      providesTags: ['contributor'],
    }),
    createContributor: build.mutation({
      query: data => ({
        url: `/contributors`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['contributor'],
    }),
    getSingleContributor: build.query({
      query: ({ id }) => `/contributors/${id}`,
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
          bloodGroup:
            response?.profile.bloodGroup === 'null'
              ? ''
              : response?.profile.bloodGroup,
          dateOfBirth,
          profession: response?.profile.profession,
          identityType:
            response?.profile.identityType === 'null'
              ? ''
              : response?.profile.identityType,
          identityFiles,
          mobile:
            response?.profile.mobile === 'null' ? '' : response?.profile.mobile,
          gender: response?.profile.gender,
          fatherName:
            response.profile?.fatherName === 'null'
              ? ''
              : response.profile?.fatherName,
          motherName:
            response?.profile.motherName === 'null'
              ? ''
              : response?.profile.motherName,
          picture: response?.profile.picture,
        };

        return data;
      },
    }),
    restoreContributor: build.mutation({
      query: ({ id }) => {
        return {
          url: `/contributors/${id}/restore`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['contributor'],
    }),
    updateContributor: build.mutation({
      query: ({ data, id }) => ({
        url: `/contributors/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['contributor'],
    }),
    deleteContributor: build.mutation({
      query: ({ id, isTrash }) => ({
        url: isTrash ? `/contributors/${id}/permanent` : `/contributors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['contributor'],
    }),
    getAllReporter: build.query({
      query: () => `/public/reporter/dropdown`,
    }),
  }),
});
export const {
  useGetAllContributorQuery,
  useCreateContributorMutation,
  useDeleteContributorMutation,
  useRestoreContributorMutation,
  useGetSingleContributorQuery,
  useUpdateContributorMutation,
  useGetAllReporterQuery,
} = contributorApi;
