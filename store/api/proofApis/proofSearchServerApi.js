import { baseApi } from '../baseApi';
import { extractList } from '../../../utils/axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/proof-search-service/v1`;

export const proofSearchServerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProofSearchList: builder.query({
      query: (params) => ({
        url: `${BASE_URL}/proofs`,
        params,
      }),
      transformResponse: (responseData) =>
        extractList(responseData, 'proofInfoList'),
    }),
    getProofSearchDefaultSearchParams: builder.query({
      query: () => `${BASE_URL}/proofs/default-search-params`,
      keepUnusedDataFor: 600,
    }),
    getProofStatuses: builder.query({
      query: () => `${BASE_URL}/meta/proof-statuses`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 6000,
    }),
    getStatusGroupTypes: builder.query({
      query: () => `${BASE_URL}/meta/status-group-types`,
      transformResponse: (responseData) =>
        extractList(responseData, 'nameValueModelList'),
      keepUnusedDataFor: 6000,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProofSearchListQuery,
  useGetProofSearchDefaultSearchParamsQuery,
  useGetProofStatusesQuery,
  useGetStatusGroupTypesQuery,
} = proofSearchServerApi;
