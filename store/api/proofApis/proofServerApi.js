import { baseApi } from '../baseApi';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/proof-service/v1`;

export const proofServerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProofDetails: builder.query({
      query: ({ proofId }) => `${BASE_URL}/proofs/proof-details/${proofId}`,
    }),
    getTaskDetails: builder.query({
      query: ({ taskId }) => `${BASE_URL}/tasks/task-details/${taskId}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetProofDetailsQuery, useGetTaskDetailsQuery } =
  proofServerApi;
