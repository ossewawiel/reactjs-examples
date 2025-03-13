import { baseApi } from '../baseApi';
import { extractList } from '../../../utils/axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/sales-order-search-service/v1`;

export const salesOrderSearchServer = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSalesOrderList: builder.query({
      query: (params) => ({
        url: `${BASE_URL}/sales-orders`,
        params,
      }),
      transformResponse: (responseData) =>
        extractList(responseData, 'salesOrderInfoList'),
    }),
    getSalesOrderDefaultSearchParams: builder.query({
      query: () => `${BASE_URL}/sales-orders/default-search-params`,
      keepUnusedDataFor: 600,
    }),
    getSalesOrderStatusType: builder.query({
      query: () => `${BASE_URL}/meta/sales-order-status-type`,
      transformResponse: (responseData) => {
        console.log(`Status type : ${JSON.stringify(responseData)}`);
        return extractList(responseData, 'nameValueModelList');
      },
      keepUnusedDataFor: 6000,
    }),
    getSalesOrderSearchStatus: builder.query({
      query: () => `${BASE_URL}/meta/sales-order-search-status`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 6000,
    }),
    getSalesOrderAccountType: builder.query({
      query: () => `${BASE_URL}/meta/sales-order-account-type`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 6000,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSalesOrderListQuery,
  useGetSalesOrderDefaultSearchParamsQuery,
  useGetSalesOrderStatusTypeQuery,
  useGetSalesOrderSearchStatusQuery,
  useGetSalesOrderAccountTypeQuery,
} = salesOrderSearchServer;
