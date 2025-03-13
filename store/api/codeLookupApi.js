import { extractList } from '../../utils/axios';
import { baseApi } from './baseApi';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/code-service/v1`;
const LOOKUP_URL = `${process.env.NEXT_PUBLIC_API_URL}/code-lookup-service/v1`;
export const codeLookupApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLookupOriginator: builder.query({
      query: () => `${BASE_URL}/originator`,
      transformResponse: (responseData) =>
        extractList(responseData, 'codeLookupListItemList'),
      keepUnusedDataFor: 600,
    }),
    getLookupJobType: builder.query({
      query: () => `${BASE_URL}/job-type`,
      transformResponse: (responseData) =>
        extractList(responseData, 'codeLookupListItemList'),
      keepUnusedDataFor: 600,
    }),
    getLookupSalesOrderType: builder.query({
      query: () => `${BASE_URL}/sales-order-type`,
      transformResponse: (responseData) =>
        extractList(responseData, 'codeLookupListItemList'),
      keepUnusedDataFor: 600,
    }),
    getLookupSellerType: builder.query({
      query: () => `${BASE_URL}/seller`,
      transformResponse: (responseData) =>
        extractList(responseData, 'codeLookupListItemList'),
      keepUnusedDataFor: 600,
    }),
    getLookupRepresentatives: builder.query({
      query: () => `${BASE_URL}/representatives`,
      transformResponse: (responseData) =>
        extractList(responseData, 'codeLookupListItemList'),
      keepUnusedDataFor: 600,
    }),
    getOriginatorLookup: builder.query({
      query: () => `${LOOKUP_URL}/originators`,
      transformResponse: (responseData) =>
        extractList(responseData, 'codeLookupListItemList'),
      keepUnusedDataFor: 600,
    }),
    getLookupItem: builder.query({
      query: () => `${BASE_URL}/item`,
      transformResponse: (responseData) =>
        extractList(responseData, 'classInfoList'),
    }),
    getItemClassLookup: builder.query({
      query: () => `${LOOKUP_URL}/item-class`,
      transformResponse: (responseData) =>
        extractList(responseData, 'codeLookupListItemList'),
    }),
    getCustomerLookup: builder.query({
      query: () => `${LOOKUP_URL}/customers`,
      transformResponse: (responseData) =>
        extractList(responseData, 'codeLookupListItemList'),
    }),
    getJobTypeLookup: builder.query({
      query: () => `${LOOKUP_URL}/job-types`,
      transformResponse: (responseData) =>
        extractList(responseData, 'codeLookupListItemList'),
    }),
    getLookupSlAnalysis: builder.query({
      query: () => `${BASE_URL}/slAnalysis`,
      transformResponse: (responseData) =>
        extractList(responseData, 'codeLookupListItemList'),
    }),
    getLookupPlAnalysis: builder.query({
      query: () => `${BASE_URL}/plAnalysis`,
      transformResponse: (responseData) => {
        console.log(`query: ${BASE_URL}/plAnalysis`);
        return extractList(responseData, 'codeLookupListItemList');
      },
    }),
    getDepartmentLookup: builder.query({
      query: () => `${LOOKUP_URL}/departments`,
      transformResponse: (responseData) =>
        extractList(responseData, 'intLookupListItemList'),
      keepUnusedDataFor: 600,
    }),
    getSupplierLookup: builder.query({
      query: () => `${BASE_URL}/supplier-code`,
      transformResponse: (responseData) =>
        extractList(responseData, 'codeLookupListItemList'),
      keepUnusedDataFor: 600,
    }),
    getBuyerLookup: builder.query({
      query: () => `${BASE_URL}/buyer-code`,
      transformResponse: (responseData) =>
        extractList(responseData, 'codeLookupListItemList'),
      keepUnusedDataFor: 600,
    }),
    getProductGroupLookup: builder.query({
      query: () => `${BASE_URL}/product-group`,
      transformResponse: (responseData) =>
        extractList(responseData, 'codeLookupListItemList'),
      keepUnusedDataFor: 600,
    }),
    getItemAnalysisLookup: builder.query({
      query: () => `${BASE_URL}/item-analysis`,
      transformResponse: (responseData) =>
        extractList(responseData, 'codeLookupListItemList'),
      keepUnusedDataFor: 600,
    }),
    getAddressLookup: builder.query({
      query: ({ key, type }) => ({
        url: `${LOOKUP_URL}/addresses`,
        params: { key, type },
      }),
      transformResponse: (responseData) =>
        extractList(responseData, 'intLookupListItemList'),
      keepUnusedDataFor: 600,
    }),
    getLocationLookup: builder.query({
      query: () => `${LOOKUP_URL}/locations`,
      transformResponse: (responseData) =>
        extractList(responseData, 'codeLookupListItemList'),
      keepUnusedDataFor: 600,
    }),
    getPOInvoicePrefixLookup: builder.query({
      query: () => `${BASE_URL}/po-invoice-prefix`,
      transformResponse: (responseData) =>
        extractList(responseData, 'codeLookupListItemList'),
      keepUnusedDataFor: 600,
    }),
    getActivityLookup: builder.query({
      query: () => `${LOOKUP_URL}/activities`,
      transformResponse: (responseData) => {
        console.log(`query: ${LOOKUP_URL}/activities`);
        return extractList(responseData, 'codeLookupListItemList');
      },
      keepUnusedDataFor: 600,
    }),
    getProofTypeLookup: builder.query({
      query: () => `${LOOKUP_URL}/proof-types`,
      transformResponse: (responseData) =>
        extractList(responseData, 'codeLookupListItemList'),
      keepUnusedDataFor: 600,
    }),
    getPriceTypeLookup: builder.query({
      query: () => `${LOOKUP_URL}/price-types`,
      transformResponse: (responseData) =>
        extractList(responseData, 'codeLookupListItemList'),
      keepUnusedDataFor: 600,
    }),
    getUserLookup: builder.query({
      query: () => `${LOOKUP_URL}/users`,
      transformResponse: (responseData) =>
        extractList(responseData, 'codeLookupListItemList'),
      keepUnusedDataFor: 600,
    }),
    getWoTypeLookup: builder.query({
      query: () => `${LOOKUP_URL}/work-order-types`,
      transformResponse: (responseData) =>
        extractList(responseData, 'codeLookupListItemList'),
      keepUnusedDataFor: 600,
    }),
    getUnitLookup: builder.query({
      query: ({ code }) => `${LOOKUP_URL}/unit-code/${code}`,
      transformResponse: (responseData) =>
        extractList(responseData, 'unitLookupListItemList'),
      keepUnusedDataFor: 600,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetItemClassLookupQuery,
  useGetLookupOriginatorQuery,
  useGetLookupSalesOrderTypeQuery,
  useGetLookupJobTypeQuery,
  useGetLookupRepresentativesQuery,
  useGetLookupItemQuery,
  useGetLookupSlAnalysisQuery,
  useGetCustomerLookupQuery,
  useGetJobTypeLookupQuery,
  useGetOriginatorLookupQuery,
  useGetDepartmentLookupQuery,
  useGetAddressLookupQuery,
  useGetLocationLookupQuery,
  useGetActivityLookupQuery,
  useGetProofTypeLookupQuery,
  useGetUserLookupQuery,
  useGetWoTypeLookupQuery,
  useGetSupplierLookupQuery,
  useGetProductGroupLookupQuery,
  useGetItemAnalysisLookupQuery,
  useGetLookupPlAnalysisQuery,
  useGetBuyerLookupQuery,
  useGetLookupSellerTypeQuery,
  useGetUnitLookupQuery,
  useGetPriceTypeLookupQuery,
  useGetPOInvoicePrefixLookupQuery,
} = codeLookupApi;
