import { baseApi } from './baseApi';
import { extractList } from '../../utils/axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/requisition-search-service/v1`;

export const reqSearchServer = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRequisitionsList: builder.query({
      query: (params) => ({
        url: `${BASE_URL}/requisitions`,
        params,
      }),
      transformResponse: (responseData) =>
        extractList(responseData, 'requisitionInfoList'),
    }),
    getRequisitionsDefaultSearchParams: builder.query({
      query: () => `${BASE_URL}/requisitions/default-search-params`,
      keepUnusedDataFor: 600,
    }),
    getRequisitionsStatusType: builder.query({
      query: () => `${BASE_URL}/meta/requisitions-status-type`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 6000,
    }),
    getRequisitionsSearchType: builder.query({
      query: () => `${BASE_URL}/meta/requisitions-search-type`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 6000,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRequisitionsListQuery,
  useGetRequisitionsDefaultSearchParamsQuery,
  useGetRequisitionsStatusTypeQuery,
  useGetRequisitionsSearchTypeQuery,
} = reqSearchServer;
