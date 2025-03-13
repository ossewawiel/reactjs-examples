import React from 'react';
import { useTheme } from '@mui/material/styles';
import { useConfig } from 'src/contexts/ConfigContext';
import { useIntl } from 'react-intl';

import { useGetStockLevelsQuery } from '../../store/api/dashboardServerApi';
import dayjs from 'dayjs';
import BarChart, { getCategories, getSeries } from '../charts/barchart';

export const StockLevelsGaugeBarWidget = () => {
  const theme = useTheme();
  const intl = useIntl();
  const { navType, rtlLayout } = useConfig();
  const {
    data = {},
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStockLevelsQuery();

  const handleMenuItemClicked = (value) => {
    if (value === 'current_week') {
      setFrom(dayjs().startOf('week').format('YYYY-MM-DD'));
      setTo(dayjs().endOf('week').format('YYYY-MM-DD'));
    } else if (value === 'last_week') {
      setFrom(dayjs().startOf('month').format('YYYY-MM-DD'));
      setTo(dayjs().endOf('month').format('YYYY-MM-DD'));
    } else if (value === 'previous_month') {
      const previousMonth = dayjs().subtract(1, 'month');
      setFrom(previousMonth.startOf('month').format('YYYY-MM-DD'));
      setTo(previousMonth.endOf('month').format('YYYY-MM-DD'));
    } else if (value === 'current_quarter') {
      setFrom(dayjs().startOf('quarter').format('YYYY-MM-DD'));
      setTo(dayjs().endOf('quarter').format('YYYY-MM-DD'));
    } else if (value === 'previous_quarter') {
      const previousQuarter = dayjs().subtract(1, 'quarter');
      setFrom(previousQuarter.startOf('quarter').format('YYYY-MM-DD'));
      setTo(previousQuarter.endOf('quarter').format('YYYY-MM-DD'));
    } else if (value === 'custom_range') {
      setOpen(true); // Open the date range picker dialog
    } else if (value === 'view') {
      router.push(`receipts`);
    }
  };

  // React.useEffect(() => {
  const graphInfo = {
    type: 'date-grouped',
    heading: intl.formatMessage({ id: 'Stock Levels' }),
    menuSettings: {
      items: [
        { name: intl.formatMessage({ id: 'View Details' }), value: 'view' },
      ],
    },
    graphSettings: {
      type: 'stacked',
      horizontal: false,
      showDataLabels: false,
      color: theme.palette.secondary.main,
      error,
    },
  };

  const graphOptions = {
    xaxis: {
      type: 'category',
      categories: data.series ? getCategories(data, 'string') : [],
    },
    yaxis: {
      labels: {
        formatter: (val) =>
          intl.formatNumber(val, {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          }),
      },
      title: { text: intl.formatMessage({ id: 'Quantity' }) },
    },
  };

  const graphSeries = data?.series
    ? getSeries({
        data,
        xtype: 'string',
        ytype: 'decimal',
        translatex: true,
        intl,
      })
    : [];

  return (
    <BarChart
      isLoading={isLoading}
      graphInfo={graphInfo}
      graphOptions={graphOptions}
      graphSeries={graphSeries}
      isError={isError}
      onMenuItemClicked={handleMenuItemClicked}
    />
  );
};
