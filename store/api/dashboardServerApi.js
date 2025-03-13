import { baseApi } from './baseApi';
import { extractList } from '../../utils/axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/dashboard-service/v1`;
// console.log(`DATAFLEX_URL: ${BASE_URL}`);
export const dashboardServiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPredictedMonthlyTurnover: builder.query({
      query: () => {
        return {
          url: `${BASE_URL}/predicted-monthly-turnover`,
        };
      },
      keepUnusedDataFor: 600,
    }),
    getOutworkExpenditure: builder.query({
      query: ({ from, to }) => {
        return {
          url: `${BASE_URL}/outwork-expenditure`,
          params: { from, to },
        };
      },
      keepUnusedDataFor: 600,
    }),
    getAlertWidgetData: builder.query({
      query: (code) => {
        return {
          url: `${BASE_URL}/alert-widget/${code}`,
        };
      },
      keepUnusedDataFor: 600,
    }),
    getResourceProductivity: builder.query({
      query: ({ department, from, to }) => {
        return {
          url: `${BASE_URL}/resource-productivity`,
          params: { department, from, to },
        };
      },
      keepUnusedDataFor: 600,
    }),
    getStockLevels: builder.query({
      query: () => {
        return {
          url: `${BASE_URL}/stock-levels`,
        };
      },
      keepUnusedDataFor: 600,
    }),
    getInvoiceTotalsForPeriod: builder.query({
      query: ({ from, to }) => {
        return {
          url: `${BASE_URL}/invoices`,
          params: { from, to },
        };
      },
      keepUnusedDataFor: 600,
    }),
    getTopItemForInterval: builder.query({
      query: ({ topItem, interval }) => {
        return {
          url: `${BASE_URL}/top-item/${topItem}`,
          params: { interval },
        };
      },
      keepUnusedDataFor: 600,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPredictedMonthlyTurnoverQuery,
  useGetOutworkExpenditureQuery,
  useGetAlertWidgetDataQuery,
  useLazyGetResourceProductivityQuery,
  useGetStockLevelsQuery,
  useGetInvoiceTotalsForPeriodQuery,
  useGetTopItemForIntervalQuery,
} = dashboardServiceApi;
