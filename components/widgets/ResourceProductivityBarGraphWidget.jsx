'use client';
import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useConfig } from 'src/contexts/ConfigContext';
import { defineMessages, useIntl } from 'react-intl';
import { useLazyGetResourceProductivityQuery } from '../../store/api/dashboardServerApi';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { useGetDepartmentLookupQuery } from '../../store/api/codeLookupApi';
import BarChart, { getCategories, getSeries } from '../charts/barchart';

dayjs.extend(quarterOfYear);

const messages = defineMessages({
  graphDescription: {
    id: 'formatted.resource_productivity_from_x_to_y',
    defaultMessage: 'Resource Productivity between {from} and {to}',
  },
});

export const ResourceProductivityBarGraphWidget = () => {
  const theme = useTheme();
  const intl = useIntl();
  const { navType, rtlLayout } = useConfig();

  const [from, setFrom] = React.useState(
    dayjs().startOf('week').format('YYYY-MM-DD'),
  );
  const [to, setTo] = React.useState(
    dayjs().endOf('week').format('YYYY-MM-DD'),
  );
  const [department, setDepartment] = React.useState(null);

  // need to get a list of departments first
  const departmentLookupQuery = useGetDepartmentLookupQuery();

  const [dataTrigger, { data = {}, isLoading, isError, error }] =
    useLazyGetResourceProductivityQuery({ department, from, to });

  useEffect(() => {
    if (
      departmentLookupQuery.isSuccess &&
      departmentLookupQuery.data.length > 0
    ) {
      setDepartment(departmentLookupQuery.data[0].number);
    }
  }, [departmentLookupQuery.isSuccess, departmentLookupQuery.data]);

  useEffect(() => {
    if (department) {
      // console.log(`dataTrigger: ${from}, ${to}, ${department}`); // eslint-disable-line no-console
      dataTrigger({ from, to, department });
    }
  }, [from, to, department, dataTrigger]);

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

  const handleDepartmentSelected = (code) => {
    setDepartment(code);
  };
  //console.log(`dept lookup: ${JSON.stringify(departmentLookupQuery.data)}`);
  //console.log(`bargraphdata: ${JSON.stringify(data)}`);

  const graphInfo = {
    type: 'date-grouped',
    heading: intl.formatMessage(messages.graphDescription, {
      from: formattedFromDate,
      to: formattedToDate,
    }),
    total: data.total
      ? intl.formatNumber(data.total.value, {
          style: 'unit',
          unit: 'percent',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        })
      : '0 %',
    menuSettings: {
      items: [
        {
          name: intl.formatMessage({ id: 'This Week' }),
          value: 'current_week',
        },
        {
          name: intl.formatMessage({ id: 'This Month' }),
          value: 'current_month',
        },
        {
          name: intl.formatMessage({ id: 'Last Month' }),
          value: 'previous_month',
        },
        {
          name: intl.formatMessage({ id: 'This Quarter' }),
          value: 'current_quarter',
        },
        {
          name: intl.formatMessage({ id: 'Last Quarter' }),
          value: 'previous_quarter',
        },
        { name: '', value: 'separator' },
        { name: intl.formatMessage({ id: 'View Details' }), value: 'view' },
      ],
    },
    dropdownSettings: [
      {
        name: intl.formatMessage({ id: 'Department' }),
        codeField: 'number',
        nameField: 'name',
        selectedValue: department,
        onSelect: handleDepartmentSelected,
        data: departmentLookupQuery.data,
      },
    ],
    graphSettings: {
      type: 'grouped',
      horizontal: false,
      showDataLabels: false,
      color: theme.palette.secondary.main,
    },
    error,
  };

  const graphOptions = {
    xaxis: {
      type: 'datetime',
      labels: { rotate: -45 },
      categories: data.series ? getCategories(data, 'date') : [],
    },
    yaxis: {
      labels: {
        formatter: (val) => Math.round(val),
      },
      title: { text: intl.formatMessage({ id: 'Percentage' }) },
    },
    tooltip: {
      y: {
        formatter: (value) =>
          intl.formatNumber(value, {
            style: 'unit',
            unit: 'percent',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          }),
      },
    },
  };

  const graphSeries = data?.series
    ? getSeries({ data, xtype: 'string', ytype: 'decimal' })
    : [];

  return (
    <BarChart
      isLoading={departmentLookupQuery.isLoading || isLoading}
      graphInfo={graphInfo}
      graphOptions={graphOptions}
      graphSeries={graphSeries}
      isError={isError}
      onMenuItemClicked={handleMenuItemClicked}
    />
  );
};
