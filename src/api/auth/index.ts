import Cookies from 'js-cookie';

import { apiSlice } from '@/api/api-slice';
import { setCookie, setEncryptedCookie } from '@/utils/Helpers';

const baseURL = '/auth';

export const authApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    signIn: build.mutation({
      query: data => ({
        url: `${baseURL}/admin-signin`,
        method: 'POST',
        body: data,
        keepUnusedDataFor: 0,
      }),

      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result) {
            setEncryptedCookie('userToken', result.data.accessToken);
            setEncryptedCookie('refreshToken', result.data.refreshToken);
            setCookie('userType', 'ADMIN');
          }

          window.location.href = '/admin/dashboard';
        } catch {
          //
        }
      },
    }),

    subscriberSignIn: build.mutation({
      query: data => ({
        url: `${baseURL}/subscriber-signin`,
        method: 'POST',
        body: data,
        keepUnusedDataFor: 0,
      }),

      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result) {
            setEncryptedCookie('userToken', result.data.accessToken);
            setEncryptedCookie('refreshToken', result.data.refreshToken);
            setCookie('userType', 'SUBSCRIBER');
          }
          window.location.href = `/personal-info`;
        } catch {
          //
        }
      },
    }),

    reporterSignIn: build.mutation({
      query: data => ({
        url: `${baseURL}/reporter-signin`,
        method: 'POST',
        body: data,
        keepUnusedDataFor: 0,
      }),

      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result) {
            setEncryptedCookie('userToken', result.data.accessToken);
            setEncryptedCookie('refreshToken', result.data.refreshToken);
            setCookie('userType', 'REPORTER');
          }
          window.location.href = `/admin/dashboard`;
        } catch {
          //
        }
      },
    }),

    contributorSignIn: build.mutation({
      query: data => ({
        url: `${baseURL}/contributor-signin`,
        method: 'POST',
        body: data,
        keepUnusedDataFor: 0,
      }),

      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result) {
            setEncryptedCookie('userToken', result.data.accessToken);
            setEncryptedCookie('refreshToken', result.data.refreshToken);
            setCookie('userType', 'CONTRIBUTOR');
          }

          window.location.href = `/admin/dashboard`;
        } catch {
          //
        }
      },
    }),

    signUp: build.mutation({
      query: data => ({
        url: `${baseURL}`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result) {
            window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-otp`;
          }
        } catch {
          //
        }
      },
    }),

    changePassword: build.mutation({
      query: data => ({
        url: `${baseURL}/change-password`,
        method: 'PATCH',
        body: data,
      }),
    }),

    updateProfile: build.mutation({
      query: data => ({
        url: `${baseURL}/update-profile`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['ProfileData'],
    }),

    confirmOtp: build.query({
      query: (queryString) => {
        return `${baseURL}/confirm${queryString}`;
      },
    }),

    logout: build.query({
      query: () => `${baseURL}/logout`,
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result) {
            Cookies.remove('userToken');
            Cookies.remove('refreshToken');
          }

          window.location.href = `/auth/login`;
        } catch {
          //
        }
      },
    }),

    getProfile: build.query({
      query: () => `${baseURL}/profile`,
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
          //
        }
      },
      providesTags: ['Profile', 'ProfileData', 'bookmark'],
    }),

    getUserCount: build.query<
      {
        totalUsers: number;
        totalAdmin: number;
        totalSubscriber: number;
      },
      void
    >({
      query: () => `/auth/user-count`,
      providesTags: ['Profile'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useSignInMutation,
  useSignUpMutation,
  useLogoutQuery,
  useChangePasswordMutation,
  useConfirmOtpQuery,
  useUpdateProfileMutation,
  useGetUserCountQuery,
  useSubscriberSignInMutation,
  useReporterSignInMutation,
  useContributorSignInMutation,
} = authApi;
