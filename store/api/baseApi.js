import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8585';
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: retry(
    fetchBaseQuery({
      timeout: 10000,
      prepareHeaders: (headers, { getState, endpoint }) => {
        const token = localStorage.getItem('accessToken');
        // console.log(`State: ${JSON.stringify(getState())}`)
        const exclude = [];
        // If we have a token set in state, let's assume that we should be passing it.
        if (token && !exclude.includes(endpoint)) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      },
    }),
    { maxRetries: 3 },
  ),
  tagTypes: ['alert-data-list'],
  endpoints: () => ({}),
});
