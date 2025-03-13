import { baseApi } from './baseApi';
import { extractList } from '../../utils/axios';
import { useContext } from 'react';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/invoice-search-service/v1`;

export const invoiceSearchServerApi = baseApi.injectEndpoints({
  tagTypes: ['budget'],
  endpoints: (builder) => ({
    getInvoiceSearchList: builder.query({
      query: (params) => ({
        url: `${BASE_URL}/invoices`,
        params,
      }),
      transformResponse: (responseData) =>
        extractList(responseData, 'invoiceListInfoList'),
    }),
    getInvoiceSearchListDefaultSearchParams: builder.query({
      query: () => `${BASE_URL}/invoices/default-search-params`,
      keepUnusedDataFor: 600,
    }),
    getInvoiceFrequency: builder.query({
      query: () => `${BASE_URL}/meta/invoice-frequency`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 600,
    }),
    getInvoiceStatus: builder.query({
      query: () => `${BASE_URL}/meta/invoice-status`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 600,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetInvoiceSearchListQuery,
  useGetInvoiceSearchListDefaultSearchParamsQuery,
  useGetInvoiceFrequencyQuery,
  useGetInvoiceStatusQuery,
} = invoiceSearchServerApi;
