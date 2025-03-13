import { baseApi } from '../baseApi';
import { extractList } from '../../../utils/axios';
import { useContext } from 'react';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/purchase-order-service/v1`;

export const purchaseOrderServerApi = baseApi.injectEndpoints({
  tagTypes: ['budget'],
  endpoints: (builder) => ({
    getPurchaseOrderDetails: builder.query({
      query: ({ poNum }) => `${BASE_URL}/purchase-orders/po-details/${poNum}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetPurchaseOrderDetailsQuery } = purchaseOrderServerApi;
