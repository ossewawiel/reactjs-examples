import { baseApi } from '../baseApi';
import { extractList } from '../../../utils/axios';
import { useContext } from 'react';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/issue-service/v1`;

export const issueServerApi = baseApi.injectEndpoints({
  tagTypes: ['budget'],
  endpoints: (builder) => ({
    getWorksOrderIssueDetails: builder.query({
      query: ({ issueNum }) => `${BASE_URL}/issues/${issueNum}/wo-issue`,
      keepUnusedDataFor: 600,
    }),
    overrideExisting: false,
  }),
});

export const { useGetWorksOrderIssueDetailsQuery } = issueServerApi;
