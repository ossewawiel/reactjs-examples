import { baseApi } from '../baseApi';
import { extractList } from '../../../utils/axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/purchase-order-line-service/v1`;

export const purchaseOrderLineSearchServer = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPurchaseOrderLineList: builder.query({
      query: (params) => ({
        url: `${BASE_URL}/purchase-order-lines`,
        params,
      }),
      transformResponse: (responseData) =>
        extractList(responseData, 'purchaseOrderLineInfoList'),
    }),
    getPurchaseOrderLineDefaultSearchParams: builder.query({
      query: () => `${BASE_URL}/purchase-order-lines/default-search-params`,
      keepUnusedDataFor: 600,
    }),
    getPolStatus: builder.query({
      query: () => `${BASE_URL}/meta/pol-status`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 6000,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPurchaseOrderLineListQuery,
  useGetPolStatusQuery,
  useGetPurchaseOrderLineDefaultSearchParamsQuery,
} = purchaseOrderLineSearchServer;
