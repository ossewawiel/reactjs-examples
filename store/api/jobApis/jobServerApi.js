import { baseApi } from '../baseApi';
import { extractList } from '../../../utils/axios';
import { useContext } from 'react';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/job-service/v1`;

export const jobSearchServerApi = baseApi.injectEndpoints({
  tagTypes: ['budget'],
  endpoints: (builder) => ({
    getJob: builder.query({
      query: ({ jobNo }) => `${BASE_URL}/jobs/${jobNo}`,
    }),
    getDestinationType: builder.query({
      query: () => `${BASE_URL}/meta/destination-type`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 600,
    }),
    getSourceType: builder.query({
      query: () => `${BASE_URL}/meta/source-type`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 600,
    }),
    getJobDetails: builder.query({
      query: ({ jobNo }) => `${BASE_URL}/jobs/jobDetails/${jobNo}`,
    }),
    getJobData: builder.query({
      query: ({ jobNo }) => `${BASE_URL}/jobs/jobData/${jobNo}`,
    }),
    getJobDataEx: builder.query({
      query: ({ jobNo }) => `${BASE_URL}/jobs/jobDataEx/${jobNo}`,
    }),
    getWorksOrderData: builder.query({
      query: ({ woNo }) => `${BASE_URL}/jobs/woData/${woNo}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetJobQuery,
  useGetDestinationTypeQuery,
  useGetJobDetailsQuery,
  useGetSourceTypeQuery,
  useGetJobDataQuery,
  useGetJobDataExQuery,
  useGetWorksOrderDataQuery,
} = jobSearchServerApi;
