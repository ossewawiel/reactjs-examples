import { baseApi } from '../baseApi';
import { extractList } from '../../../utils/axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/purchase-order-service/v1`;

export const purchaseOrderSearchServer = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPurchaseOrderList: builder.query({
      query: (params) => ({
        url: `${BASE_URL}/purchase-orders`,
        params,
      }),
      transformResponse: (responseData) =>
        extractList(responseData, 'purchaseOrderInfoList'),
    }),
    getPurchaseOrderDefaultSearchParams: builder.query({
      query: () => `${BASE_URL}/purchase-orders/default-search-params`,
      keepUnusedDataFor: 600,
    }),
    getPurchaseOrderStatusType: builder.query({
      query: () => `${BASE_URL}/meta/purchase-order-status-type`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 6000,
    }),
    getPoStatus: builder.query({
      query: () => `${BASE_URL}/meta/po-status`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 6000,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPurchaseOrderListQuery,
  useGetPurchaseOrderDefaultSearchParamsQuery,
  useGetPurchaseOrderStatusTypeQuery,
  useGetPoStatusQuery,
} = purchaseOrderSearchServer;
