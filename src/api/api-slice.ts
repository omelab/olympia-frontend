import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

import { getDecryptedCookie } from '@/utils/Helpers';

// Constants
const REDUCER_PATH = 'api';

const API_URI = process.env.NEXT_PUBLIC_API_URI;

// Base query configuration
const baseQuery = fetchBaseQuery({
  baseUrl: API_URI,
  prepareHeaders: async (headers) => {
    const userToken = getDecryptedCookie('userToken');
    if (userToken) {
      headers.set('Authorization', `Bearer ${userToken}`);
    }
    return headers;
  },
});

// Custom base query with reauthentication logic
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // Handle reauthentication for a 401 status
  if (result.error && result.error.status === 401) {
    Cookies.remove('userToken');
    Cookies.remove('refreshToken');
    Cookies.remove('userType');
    // window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/login`;
  }

  return result;
};

// Create the API slice
export const apiSlice = createApi({
  reducerPath: REDUCER_PATH,
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Media',
    'mediaFolders',
    'blog',
    'ProfileData',
    'Profile',
    'Category',
    'Products',
    'Tag',
    'author',
    'admin',
    'features',
    'subscribers',
    'permissions',
    'roles',
    'Page',
    'Contacts',
    'public',
    'Division',
    'District',
    'Upazila',
    'Settings',
    'comment',
    'News',
    'navigation',
    'bookmark',
    'contributor',
    'Gallery',
  ],
  keepUnusedDataFor: 0,
  endpoints: () => ({}), // You can define your endpoints here
});
