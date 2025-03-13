import { baseApi } from '../baseApi';
import { extractList } from '../../../utils/axios';
import { useContext } from 'react';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/sales-order-service/v1`;

export const salesOrderServerApi = baseApi.injectEndpoints({
  tagTypes: ['budget'],
  endpoints: (builder) => ({
    getSalesOrderDetails: builder.query({
      query: ({ soNum }) => `${BASE_URL}/sales-orders/so-details/${soNum}`,
    }),
    getSalesOrderLineStatus: builder.query({
      query: () => `${BASE_URL}/meta/so-line-status`,
      transformResponse: (responseData) =>
      extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 600,
    }),
    getRequisitionStatus: builder.query({
      query: () => `${BASE_URL}/meta/requisition-status`,
      transformResponse: (responseData) =>
      extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 600,
    }),
    getDelReqStatus: builder.query({
      query: () => `${BASE_URL}/meta/del-req-status`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 600,
    }),
    getSalesOrderLineDetails: builder.query({
      query: ({ soNum, lineNum }) => `${BASE_URL}/sales-orders/so-details/${soNum}/line-details/${lineNum}`,
    }),
    getSalesOrderIssueDetails: builder.query({
      query: ({ issueNum }) => `${BASE_URL}/sales-order-issue/${issueNum}`,
    }),
    getSOLIssueStatus: builder.query({
      query: () => `${BASE_URL}/meta/sol-issue-status`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 600,
    }),
    getCustomerOwned: builder.query({
      query: () => `${BASE_URL}/meta/customer-owned`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 600,
    }),
    overrideExisting: false,
  })
});

export const { useGetSalesOrderDetailsQuery,
  useGetSalesOrderLineStatusQuery,
  useGetRequisitionStatusQuery,
  useGetSalesOrderLineDetailsQuery,
  useGetDelReqStatusQuery,
  useGetSalesOrderIssueDetailsQuery,
  useGetSOLIssueStatusQuery,
  useGetCustomerOwnedQuery,
} = salesOrderServerApi;
