import { extractList } from '../../utils/axios';
import { baseApi } from './baseApi';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/common/v1`;

export const commonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMetaItemTypes: builder.query({
      query: () => `${BASE_URL}/meta/item-type`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 6000,
    }),
    getLookupInvoiceAddress: builder.query({
      query: ({ cuCode, addrNo }) =>
        `${BASE_URL}/${cuCode}/invoice-address/${addrNo}`,
    }),
    getLookupDeliveryAddress: builder.query({
      query: ({ cuCode, addrNo }) =>
        `${BASE_URL}/${cuCode}/delivery-address/${addrNo}`,
    }),
    getLookupQuoteAddress: builder.query({
      query: ({ cuCode, addrNo }) =>
        `${BASE_URL}/${cuCode}/quote-addresses/${addrNo}`,
    }),
    getCustomerAddressDetailInfo: builder.query({
      query: ({ cuCode, addrNo }) =>
        `${BASE_URL}/${cuCode}/addresses/${addrNo}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMetaItemTypesQuery,
  useGetLookupInvoiceAddressQuery,
  useGetLookupDeliveryAddressQuery,
  useGetCustomerAddressDetailInfoQuery,
  useGetLookupQuoteAddressQuery,
} = commonApi;
