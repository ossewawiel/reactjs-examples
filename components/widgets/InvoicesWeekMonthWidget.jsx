import React from 'react';
import { useGetInvoiceDataQuery } from '../../store/api/dataflexApi';
import exportToExcel from '../../utils/excel-export';
import WeekMonthSummary from './WeekMonthSummary';
import { Menu, MenuItem } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { useAuth } from '../../contexts/jwt-context';
import { LOCALE_CURRENCY } from '../../constants';
import {
  useGetInvoiceTotalsForPeriodQuery,
  useGetPredictedMonthlyTurnoverQuery,
} from '../../store/api/dashboardServerApi';
import dayjs from 'dayjs';
import { blue } from '@mui/material/colors';
import { ReceiptOutlined } from '@mui/icons-material';
import { BarChart, getCategories } from '../charts/BarChart';
import MultiPeriodSummaryChart from '../charts/MultiPeriodSummaryChart';

const InvoicedWeekMonthWidget = () => {
  // const navigate = useNavigate();

  const intl = useIntl();
  const { details } = useAuth();
  const currencyCode =
    details?.currencyCode || LOCALE_CURRENCY[intl.locale] || 'USD';

  const [from, setFrom] = React.useState(
    dayjs().startOf('year').format('YYYY-MM-DD'),
  );
  const [to, setTo] = React.useState(
    dayjs().endOf('week').format('YYYY-MM-DD'),
  );

  const [period, setPeriod] = React.useState('week');

  const {
    data = {},
    isLoading,
    isError,
    error,
  } = useGetInvoiceTotalsForPeriodQuery({ from, to });

  const graphData = Array.isArray(data.values)
    ? data?.values.map((item) => ({ x: item.x.date, y: item.y.decimal }))
    : [];

  const total = data.graphTotal
    ? intl.formatNumber(data.graphTotal.value, {
        style: 'currency',
        currency: currencyCode,
      })
    : '';

  console.log(`data: ${JSON.stringify(graphData)}`); // eslint-disable-line no-console

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

  const handlePeriodChanged = (code) => {
    if (code === 'week') {
      setFrom(dayjs().startOf('week').format('YYYY-MM-DD'));
      setTo(dayjs().endOf('week').format('YYYY-MM-DD'));
      setPeriod('week');
    } else {
      setFrom(dayjs().startOf('month').format('YYYY-MM-DD'));
      setTo(dayjs().endOf('month').format('YYYY-MM-DD'));
      setPeriod('month');
    }
  };

  const graphInfo = {
    type: 'day-currency',
    heading: intl.formatMessage({ id: 'Total Invoices' }),
    icon: ReceiptOutlined,
    total,
    menuSettings: {
      items: [
        { name: intl.formatMessage({ id: 'View Details' }), value: 'view' },
        {
          name: intl.formatMessage({ id: 'Export to Excel' }),
          value: 'export',
        },
      ],
    },
    periodSettings: {
      selectedPeriod: period,
      items: [
        { name: intl.formatMessage({ id: 'Week' }), value: 'week' },
        { name: intl.formatMessage({ id: 'Month' }), value: 'month' },
      ],
    },
    graphSettings: {
      type: 'line',
      variant: 'smooth',
      itemLabel: intl.formatMessage({ id: 'Amount' }),
    },
    error,
  };

  const graphOptions = {
    xaxis: {
      type: 'datetime',
    },
  };

  const graphSeries = [
    { name: intl.formatMessage({ id: 'Total' }), data: graphData },
  ];

  return (
    <MultiPeriodSummaryChart
      isLoading={isLoading}
      graphInfo={graphInfo}
      graphOptions={graphOptions}
      graphSeries={graphSeries}
      isError={isError}
      onMenuItemClicked={handleMenuItemClicked}
      onPeriodChanged={handlePeriodChanged}
    />
  );
};

export default InvoicedWeekMonthWidget;
