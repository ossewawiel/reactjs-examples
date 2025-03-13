import { baseApi } from '../baseApi';
import { extractList } from '../../../utils/axios';
import { useContext } from 'react';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/item-service/v1`;

export const itemServerApi = baseApi.injectEndpoints({
  tagTypes: ['budget'],
  endpoints: (builder) => ({
    getItemHandlingInfo: builder.query({
      query: ({ itemCode }) => `${BASE_URL}/item/${itemCode}/handling-info`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetItemHandlingInfoQuery } = itemServerApi;
