import { baseApi } from '../baseApi';
import { extractList } from '../../../utils/axios';
import { useContext } from 'react';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/item-search-service/v1`;

export const itemSearchServerApi = baseApi.injectEndpoints({
  tagTypes: ['budget'],
  endpoints: (builder) => ({
    getItemsList: builder.query({
      query: (params) => ({
        url: `${BASE_URL}/items`,
        params,
      }),
      transformResponse: (responseData) =>
        extractList(responseData, 'itemInfoList'),
    }),
    getItemList: builder.query({
      query: () => `${BASE_URL}/items`,
      transformResponse: (responseData) =>
        extractList(responseData, 'itemInfoList'),
    }),
    getMaterialsOutworkListDefaultSearchParams: builder.query({
      query: () => `${BASE_URL}/materials-outwork/default-search-params`,
      keepUnusedDataFor: 600,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetItemsListQuery,
  useGetItemListQuery,
  useGetMaterialsOutworkListDefaultSearchParamsQuery,
  useGetItemTypeQuery,
} = itemSearchServerApi;
