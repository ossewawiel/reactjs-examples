import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { extractList } from '../../utils/axios';
import useSession from '../../hooks/useSession';
import { baseApi } from './baseApi';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8585';
export const environmentApi = baseApi.injectEndpoints({
  tagTypes: ['budget'],
  endpoints: (builder) => ({
    getDatabases: builder.query({
      query: () => `${BASE_URL}/environment-service/v1/databases`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 600,
    }),
    getOptimusVersion: builder.query({
      query: () => `${BASE_URL}/environment-service/v1/version-number`,
      keepUnusedDataFor: 600,
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: `${BASE_URL}/environment-service/v1/login`,
        method: 'POST',
        body: credentials,
      }),
    }),
    getUserDetails: builder.query({
      query: () => `${BASE_URL}/environment-service/v1/user-details`,
    }),
    getCurrencyInfo: builder.query({
      query: () =>
        `${BASE_URL}/environment-service/v1/environment/currency-info`,
    }),
    getBusterJwt: builder.query({
      query: ({ lang = 'en' }) =>
        `${BASE_URL}/environment-service/v1/buster-jwt/${lang}`,
      keepUnusedDataFor: 1200,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDatabasesQuery,
  useGetOptimusVersionQuery,
  useLoginMutation,
  useGetUserDetailsQuery,
  useLazyGetUserDetailsQuery,
  useLazyGetCurrencyInfoQuery,
  useGetBusterJwtQuery,
  useGetJobSearchListQuery,
  useGetJobSearchListDefaultSearchParamsQuery,
  useGetJobStatusCodeQuery,
} = environmentApi;

export class useLogonMutation {}
