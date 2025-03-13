import { extractList } from '../../../utils/axios';
import { baseApi } from '../baseApi';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/issue-search-service/v1`;

export const issueSearchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDefaultIssueSearchParams: builder.query({
      query: () => `${BASE_URL}/issues/default-search-params`,
      keepUnusedDataFor: 6000,
    }),
    getIssues: builder.query({
      query: (params) => ({
        url: `${BASE_URL}/issues`,
        params,
      }),
      transformResponse: (responseData) =>
        extractList(responseData, 'issueInfoList'),
    }),
    getMetaIssueTypes: builder.query({
      query: () => `${BASE_URL}/meta/issue-type`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 6000,
    }),
    getMetaIssueSearchTo: builder.query({
      query: () => `${BASE_URL}/meta/issue-search-to`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 6000,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDefaultIssueSearchParamsQuery,
  useGetIssuesQuery,
  useGetMetaIssueTypesQuery,
  useGetMetaIssueSearchToQuery,
} = issueSearchApi;
