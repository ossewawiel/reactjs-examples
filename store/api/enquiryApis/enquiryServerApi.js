import { baseApi } from '../baseApi';
import { extractList } from '../../../utils/axios';
import { useContext } from 'react';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/enquiry-service/v1`;

export const enquiryServerApi = baseApi.injectEndpoints({
  tagTypes: ['budget'],
  endpoints: (builder) => ({
    getEnquiry: builder.query({
      query: ({ enqHdr }) => `${BASE_URL}/enquiries/enquiry-details/${enqHdr}`,
    }),
    getEnquiryLinesList: builder.query({
      query: ({ enqHdr }) =>
        `${BASE_URL}/enquiries/enquiry-details/${enqHdr}/lines`,
      transformResponse: (responseData) =>
        extractList(responseData, 'lineListList'),
    }),
    getEnquiryLine: builder.query({
      query: ({ lineId }) => `${BASE_URL}/enquiries/line-details/${lineId}`,
    }),
    getEnquiryLinePriceElements: builder.query({
      query: ({ lineId }) =>
        `${BASE_URL}/enquiries/line-details/${lineId}/price-elements`,
    }),
    getEnquiryLinePriceTypes: builder.query({
      query: ({ lineId }) =>
        `${BASE_URL}/enquiries/line-details/${lineId}/price-types`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetEnquiryQuery,
  useGetEnquiryLinesListQuery,
  useGetEnquiryLineQuery,
  useGetEnquiryLinePriceElementsQuery,
  useGetEnquiryLinePriceTypesQuery,
} = enquiryServerApi;
