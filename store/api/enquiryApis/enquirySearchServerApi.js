import { baseApi } from '../baseApi';
import { extractList } from '../../../utils/axios';
import { useContext } from 'react';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/enquiry-search-service/v1`;

export const enquirySearchServerApi = baseApi.injectEndpoints({
  tagTypes: ['budget'],
  endpoints: (builder) => ({
    getEnquirySearchList: builder.query({
      query: (params) => ({
        url: `${BASE_URL}/enquiry-headers`,
        params,
      }),
      transformResponse: (responseData) =>
        extractList(responseData, 'headerInfoList'),
    }),
    getEnquirySearchListDefaultSearchParams: builder.query({
      query: () => `${BASE_URL}/enquiry-headers/default-search-params`,
      keepUnusedDataFor: 600,
    }),
    getEnquiryStatus: builder.query({
      query: () => `${BASE_URL}/meta/enquiry-status`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 600,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetEnquirySearchListQuery,
  useGetEnquirySearchListDefaultSearchParamsQuery,
  useGetEnquiryStatusQuery,
} = enquirySearchServerApi;
