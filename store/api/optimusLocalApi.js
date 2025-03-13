import { extractList } from '../../utils/axios';
import { baseApi } from './baseApi';

const BASE_URL = process.env.NEXT_PUBLIC_OPTIMUS_LOCAL_URL;

export const optimusLocalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    pingLocalServer: builder.query({
      query: () => `${BASE_URL}/ping-optimus`,
    }),
    postOpenOptimus: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/open-optimus`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { usePingLocalServerQuery, usePostOpenOptimusMutation } = optimusLocalApi;
