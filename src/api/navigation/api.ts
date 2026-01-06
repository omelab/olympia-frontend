import { apiSlice } from '@/api/api-slice';

export const navigationApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAllNav: build.query({
      query: () => `/navigations/locations`,
      providesTags: ['navigation'],
    }),

    getsingleNav: build.query({
      query: ({ name }) => `/navigations/location/${name}`,
    }),
  }),
});
export const { useGetAllNavQuery, useGetsingleNavQuery } = navigationApi;
