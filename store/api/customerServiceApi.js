import { baseApi } from './baseApi';
import { extractList } from '../../utils/axios';
import { Data } from '../../contexts/CustomerContext';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8585';
const { custCode } = Data;

export const customerServerApi = baseApi.injectEndpoints({
  tagTypes: ['budget'],
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: (filterParams) => ({
        url: `${BASE_URL}/customer-service/v1/customers`,
        params: filterParams,
      }),
      transformResponse: (responseData) =>
        extractList(responseData, 'customerInfoList'),
    }),
    getCustomer: builder.query({
      query: (cuCode) => `${BASE_URL}/customer-service/v1/customers/${cuCode}`,
    }),
    getCustomerInvoiceAddressesForJobSearch: builder.query({
      query: (filterParams) => ({
        url: `${BASE_URL}/customer-service/v1/customers/${custCode}/invoice-addresses`,
        params: filterParams,
      }),
      transformResponse: (responseData) => {
        // eslint-disable-next-line no-unused-expressions,no-sequences
        // console.log(`Addresses: ${JSON.stringify(custCode)}`);
        extractList(responseData, 'customerInfoList');
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCustomersQuery,
  useGetCustomerQuery,
  useGetCustomerInvoiceAddressesForJobSearchQuery,
} = customerServerApi;
