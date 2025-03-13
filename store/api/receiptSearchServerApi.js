import { baseApi } from './baseApi';
import { extractList } from '../../utils/axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/receipt-search-service/v1`;

export const receiptSearchServer = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReceiptsList: builder.query({
      query: (params) => ({
        url: `${BASE_URL}/receipts`,
        params,
      }),
      transformResponse: (responseData) =>
        extractList(responseData, 'receiptInfoList'),
    }),
    getReceiptsDefaultSearchParams: builder.query({
      query: () => `${BASE_URL}/receipts/default-search-params`,
      keepUnusedDataFor: 600,
    }),
    getReceiptType: builder.query({
      query: () => `${BASE_URL}/meta/receipt-type`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 6000,
    }),
    getReturnsStatus: builder.query({
      query: () => `${BASE_URL}/meta/returns-status`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 6000,
    }),
    getInvoicedStatus: builder.query({
      query: () => `${BASE_URL}/meta/invoiced-status`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 6000,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetReceiptsListQuery,
  useGetReceiptsDefaultSearchParamsQuery,
  useGetReturnsStatusQuery,
  useGetReceiptTypeQuery,
  useGetInvoicedStatusQuery,
} = receiptSearchServer;
