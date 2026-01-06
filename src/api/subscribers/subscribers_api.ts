import { apiSlice } from '@/api/api-slice';

import type { Subscriber } from '../lib/definitions';

export type SubscriberDashboardProps = {
  data: Subscriber[];
  totalCount: number;
  currentPage: number;
  perPage: number;
};

export const SubscriberApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAllSubscriber: build.query<SubscriberDashboardProps, string>({
      query: queryString => `/subscribers${queryString}`,
      providesTags: ['subscribers'],
    }),
    createSubscriber: build.mutation({
      query: data => ({
        url: `public/subscribers/register`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['subscribers'],
    }),
    getSingleaSubscriber: build.query({
      query: ({ id }) => `/subscribers/${id}`,
      transformResponse: (response: any) => {
        const identityFiles: Array<string>
          = response.profile.identityFiles.split(',') || [];

        const data = {
          username: response.username,
          fullName: response.fullName,
          displayName: response.displayName,
          email: response.email,
          divisionId: response.divisionId,
          districtId: response.districtId,
          upazilaId: response.upazilaId,
          bloodGroup: response.profile.bloodGroup,
          dateOfBirth: response.profile.dateOfBirth,
          profession: response.profile.profession,
          identityType: response.profile.identityType,
          identityFiles,
          mobile: response.profile.mobile,
          gender: response.profile.gender,
          fatherName: response.profile.fatherName,
          motherName: response.profile.motherName,
          picture: response.profile.picture,
        };

        return data;
      },
    }),
    restoreSubscriber: build.mutation({
      query: ({ id }) => {
        return {
          url: `/subscribers/${id}/restore`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['subscribers'],
    }),
    updateSubscriber: build.mutation({
      query: ({ data, id }) => ({
        url: `/subscribers/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['subscribers'],
    }),
    deleteSubscriber: build.mutation({
      query: ({ id, isTrash }) => ({
        url: isTrash ? `/subscribers/${id}/permanent` : `/subscribers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['subscribers'],
    }),
  }),
});
export const {
  useGetAllSubscriberQuery,
  useCreateSubscriberMutation,
  useDeleteSubscriberMutation,
  useGetSingleaSubscriberQuery,
  useRestoreSubscriberMutation,
  useUpdateSubscriberMutation,
} = SubscriberApi;
