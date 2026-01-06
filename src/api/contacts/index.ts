import { apiSlice } from '@/api/api-slice';
import type { Contact } from '@/api/lib/definitions';

export type ContactDashboardListProps = {
  data: Contact[];
  totalCount: number;
  currentPage: number;
  perPage: number;
};

export const contactApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAllContacts: build.query<
      ContactDashboardListProps,
      { queryString: string }
    >({
      query: ({ queryString }) => `/contact${queryString}`,
      providesTags: ['Contacts'],
    }),

    getSingleContact: build.query<Contact, { id: number }>({
      query: ({ id }) => `/contact/${id}`,
    }),

    deleteContact: build.mutation({
      query: ({ id }) => ({
        url: `/contact/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAllContactsQuery,
  useGetSingleContactQuery,
  useDeleteContactMutation,
} = contactApi;
