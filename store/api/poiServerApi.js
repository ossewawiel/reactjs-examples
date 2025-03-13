import { baseApi } from './baseApi';
import { extractList } from '../../utils/axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/purchase-order-invoice-service/v1`;

export const poiServer = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPOIList: builder.query({
      query: (params) => ({
        url: `${BASE_URL}/purchase-order-invoices`,
        params,
      }),
      transformResponse: (responseData) =>
        extractList(responseData, 'pOIInfoList'),
    }),
    getPOIDefaultSearchParams: builder.query({
      query: () => `${BASE_URL}/purchase-order-invoices/default-search-params`,
      keepUnusedDataFor: 600,
    }),
    getPOIStatusType: builder.query({
      query: () => `${BASE_URL}/meta/status`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 6000,
    }),
    getPOISearchStatusType: builder.query({
      query: () => `${BASE_URL}/meta/search-status`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 6000,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPOIListQuery,
  useGetPOIDefaultSearchParamsQuery,
  useGetPOIStatusTypeQuery,
  useGetPOISearchStatusTypeQuery,
} = poiServer;
