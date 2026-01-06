import { apiSlice } from '@/api/api-slice';
import type { Settings } from '@/api/lib/definitions';

export const settingsApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAllSystemSettings: build.query<Settings[], string>({
      query: queryString => `/system-setting${queryString}`,
      providesTags: ['Settings'],
    }),

    createSystemSettings: build.mutation<
      any,
      { settings: Array<{ key: string; value: string; type: string }> }
    >({
      query: data => ({
        url: '/system-setting',
        method: 'POST',
        body: data,
      }),

      invalidatesTags: ['Settings'],
    }),

    getSingleTypeSettings: build.query<Settings, { type: string; key: string }>(
      {
        query: ({ type, key }) => `/system-setting/${type}/${key}`,
      },
    ),

    deleteSystemSettings: build.mutation({
      query: ({ id }) => ({
        url: `/system-setting/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Settings'],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAllSystemSettingsQuery,
  useCreateSystemSettingsMutation,
  useGetSingleTypeSettingsQuery,
  useDeleteSystemSettingsMutation,
} = settingsApi;
