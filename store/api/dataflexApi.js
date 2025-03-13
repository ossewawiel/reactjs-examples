import { extractList } from '../../utils/axios';
import { baseApi } from './baseApi';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/dataflex-service/v1`;
// console.log(`DATAFLEX_URL: ${BASE_URL}`);
export const dataFlexApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobList: builder.query({
      query: ({ v = 1.5 }) => ({
        url: `${BASE_URL}/jobs/jobData`,
        params: { v },
      }),
      transformResponse: (responseData) => {
        // console.log(`Job Data: ${JSON.stringify(responseData)}`);
        extractList(responseData, 'nameValueModelList');
      },
      keepUnusedDataFor: 600,
    }),
    getInvoiceData: builder.query({
      query: (queryParams) => ({
        url: `${BASE_URL}/invoices`,
        params: queryParams,
      }),
      transformResponse: (responseData) =>
        extractList(responseData, 'invDataList'),
      keepUnusedDataFor: 1200,
    }),
  }),
  overrideExisting: false,
});

export const { useGetJobListQuery, useGetInvoiceDataQuery } = dataFlexApi;
