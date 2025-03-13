import dayjs from 'dayjs';
import { blue } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import { getRandomArbitrary } from '../../utils/utility-functions';
import { defineMessages, useIntl } from 'react-intl';
import { useAuth } from '../../contexts/jwt-context';
import { LOCALE_CURRENCY } from '../../constants';
import {
  useGetOutworkExpenditureQuery,
  useGetPredictedMonthlyTurnoverQuery,
} from '../../store/api/dashboardServerApi';
import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { useRouter } from 'next/navigation';
import LineChart from "../charts/linechart";

const messages = defineMessages({
  graphDescription: {
    id: 'formatted.spent_on_outwork_from_x_to_x',
    defaultMessage: 'Spent on outwork the between {from} and {to}',
  },
});

export const OutworkExpenditureLineGraphWidget = () => {
  const intl = useIntl();
  const { details } = useAuth();
  const theme = useTheme();
  const router = useRouter();
  const [from, setFrom] = useState(
    dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
  );
  const [to, setTo] = useState(dayjs().format('YYYY-MM-DD'));
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);

  const currencyCode =
    details?.currencyCode || LOCALE_CURRENCY[intl.locale] || 'USD';

  const {
    data = {},
    isLoading,
    isError,
    error,
  } = useGetOutworkExpenditureQuery({ from, to });

  const graphData = Array.isArray(data.values)
    ? data?.values.map((item) => ({ x: item.x.date, y: item.y.decimal }))
    : [];

  const total = data.graphTotal
    ? intl.formatNumber(data.graphTotal.value, {
        style: 'currency',
        currency: currencyCode,
      })
    : '';

  const currentYear = dayjs().year();
  const fromYear = dayjs(from).year();
  const toYear = dayjs(to).year();

  const formatDate = (date) => {
    const day = intl.formatDate(date, { day: '2-digit' });
    const month = intl.formatDate(date, { month: 'short' });
    const year = dayjs(date).format('YY');
    return fromYear !== currentYear || toYear !== currentYear
      ? `${day} ${month} '${year}`
      : `${day} ${month}`;
  };

  const formattedFromDate = formatDate(from);
  const formattedToDate = formatDate(to);

  const handleMenuItemClicked = (value) => {
    if (value === 'last_month') {
      setFrom(dayjs().subtract(1, 'month').format('YYYY-MM-DD'));
      setTo(dayjs().format('YYYY-MM-DD'));
    } else if (value === 'last_quarter') {
      setFrom(dayjs().subtract(3, 'month').format('YYYY-MM-DD'));
      setTo(dayjs().format('YYYY-MM-DD'));
    } else if (value === 'custom_range') {
      setOpen(true); // Open the date range picker dialog
    } else if (value === 'view') {
      router.push(`receipts`);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setFrom(dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : null);
    setTo(dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : null);
    setOpen(false);
  };

  const graphInfo = {
    type: 'week-currency',
    heading: intl.formatMessage({ id: 'Spent on Outwork' }),
    description: intl.formatMessage(messages.graphDescription, {
      from: formattedFromDate,
      to: formattedToDate,
    }),
    total,
    menuSettings: {
      items: [
        { name: intl.formatMessage({ id: 'Last Month' }), value: 'last_month' },
        {
          name: intl.formatMessage({ id: 'Last Quarter' }),
          value: 'last_quarter',
        },
        {
          name: intl.formatMessage({ id: 'Custom Range' }),
          value: 'custom_range',
        },
        { name: '', value: 'separator' },
        { name: intl.formatMessage({ id: 'View Details' }), value: 'view' },
      ],
    },
    graphSettings: {
      type: 'line',
      color: theme.palette.secondary.main,
      xtype: 'datetime',
      variant: 'smooth',
      itemLabel: intl.formatMessage({ id: 'Amount' }),
      data: graphData,
    },
    error,
  };

  return (
    <>
      <LineChart
        isLoading={isLoading}
        graphInfo={graphInfo}
        isError={isError}
        onMenuItemClicked={handleMenuItemClicked}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select Date Range</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              startText="From"
              endText="To"
              value={dateRange}
              onChange={(newValue) => setDateRange(newValue)}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </>
              )}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
