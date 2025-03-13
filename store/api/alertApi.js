import { baseApi } from './baseApi';
import { environmentApi } from './environmentApi';
import { extractList } from '../../utils/axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/alert-service/v1`;

export const alertApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAlertData: builder.query({
      query: () => `${BASE_URL}/alert-data`,
      transformResponse: (responseData) =>
        extractList(responseData, 'alertDataList'),
      keepUnusedDataFor: 600,
    }),
    getAlertColumnInfoList: builder.query({
      query: (alertName) => `${BASE_URL}/alert/${alertName}/column-info`,
      transformResponse: (responseData) =>
        extractList(responseData, 'columnInfoList'),
      keepUnusedDataFor: 600,
      invalidatesTags: ['alert-data-list'],
    }),
    getAlertDataRowList: builder.query({
      query: (alertName) => `${BASE_URL}/alert/${alertName}/data-row`,
      transformResponse: (responseData) =>
        extractList(responseData, 'alertDataRowList'),
      providesTags: ['alert-data-list'],
    }),
    getAlertInfo: builder.query({
      query: (alertName) => `${BASE_URL}/alert/${alertName}/info`,
      keepUnusedDataFor: 600,
    }),
    getAlertSummaryData: builder.query({
      query: (alertName) => `${BASE_URL}/alert/${alertName}`,
      keepUnusedDataFor: 600,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAlertDataQuery,
  useGetAlertColumnInfoListQuery,
  useGetAlertDataRowListQuery,
  useLazyGetAlertDataRowListQuery,
  useGetAlertInfoQuery,
  useGetAlertSummaryDataQuery,
} = alertApi;
