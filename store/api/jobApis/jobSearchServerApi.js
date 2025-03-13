import { baseApi } from '../baseApi';
import { extractList } from '../../../utils/axios';
import { useContext } from 'react';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/job-search-service/v1`;

export const jobSearchServerApi = baseApi.injectEndpoints({
  tagTypes: ['budget'],
  endpoints: (builder) => ({
    getJobSearchList: builder.query({
      query: (params) => ({
        url: `${BASE_URL}/jobs`,
        params,
      }),
      transformResponse: (responseData) =>
        extractList(responseData, 'jobSearchInfoList'),
    }),
    getWorkOrdersSearchList: builder.query({
      query: (params) => ({
        url: `${BASE_URL}/work-orders`,
        params,
      }),
      transformResponse: (responseData) =>
        extractList(responseData, 'worksOrderSearchInfoList'),
    }),
    getJobSearchListDefaultSearchParams: builder.query({
      query: () => `${BASE_URL}/jobs/default-search-params`,
    }),
    getJobStatusCode: builder.query({
      query: () => `${BASE_URL}/meta/job-status-code`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 600,
    }),
    getStatusGroupType: builder.query({
      query: () => `${BASE_URL}/meta/status-group-type`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 600,
    }),
    getChargeStatus: builder.query({
      query: () => `${BASE_URL}/meta/charge-status`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 600,
    }),
    getDepartments: builder.query({
      query: () => `${BASE_URL}/departments`,
      transformResponse: (responseData) => {
        console.log(`query: ${BASE_URL}/departments`);
        return extractList(responseData, 'intLookupListItemList');
      },
      keepUnusedDataFor: 600,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetJobSearchListQuery,
  useGetWorkOrdersSearchListQuery,
  useGetJobSearchListDefaultSearchParamsQuery,
  useGetJobStatusCodeQuery,
  useGetStatusGroupTypeQuery,
  useGetChargeStatusQuery,
  useGetDepartmentsQuery,
} = jobSearchServerApi;
