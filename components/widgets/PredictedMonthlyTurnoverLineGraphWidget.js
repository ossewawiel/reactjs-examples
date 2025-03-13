'use client';

import { blue } from '@mui/material/colors';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/es';
import 'dayjs/locale/fr';
import 'dayjs/locale/de';
import 'dayjs/locale/nl';
import { defineMessages, useIntl } from 'react-intl';
import { useGetPredictedMonthlyTurnoverQuery } from '../../store/api/dashboardServerApi';
import { useAuth } from '../../contexts/jwt-context';
import { LOCALE_CURRENCY } from '../../constants';
import LineChart from '../charts/linechart';

const messages = defineMessages({
  graphDescription: {
    id: 'formatted.predicted_monthly_turnover_for_x',
    defaultMessage: 'The predicted monthly turnover for {month}',
  },
});

export const PredictedMonthlyTurnoverLineGraphWidget = () => {
  const intl = useIntl();
  const { details } = useAuth();
  const currencyCode =
    details?.currencyCode || LOCALE_CURRENCY[intl.locale] || 'USD';

  const {
    data = {},
    isLoading,
    isError,
    error,
  } = useGetPredictedMonthlyTurnoverQuery();
  const graphData = Array.isArray(data.values)
    ? data?.values.map((item) => ({ x: item.x.date, y: item.y.decimal }))
    : [];
  const total = data.graphTotal
    ? intl.formatNumber(data.graphTotal.value, {
        style: 'currency',
        currency: currencyCode,
      })
    : '';

  const graphInfo = {
    type: 'day-currency',
    heading: intl.formatMessage({ id: 'Predicted Monthly Turnover' }),
    description: intl.formatMessage(messages.graphDescription, {
      month: dayjs().locale(intl.locale).format('MMMM'),
    }),
    total,
    graphSettings: {
      type: 'line',
      xtype: 'datetime',
      color: blue[300],
      variant: 'smooth',
      itemLabel: intl.formatMessage({ id: 'Amount' }),
      data: graphData,
    },
    error,
  };

  return (
    <LineChart isLoading={isLoading} graphInfo={graphInfo} isError={isError} />
  );
};
