import { styled, useTheme } from '@mui/material/styles';
import MainCard from '../ui/component/cards/MainCard';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import React, { useState } from 'react';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Chart from 'react-apexcharts';
import ChartDataMonth from '../../views/dashboard/Default/chart-data/total-order-month-line-chart';
import ChartDataYear from '../../views/dashboard/Default/chart-data/total-order-year-line-chart';
import SkeletonWeekMonthSummary from '../skeletons/SkeletonWeekMonthSummary';
import { MenuOutlined, ReceiptOutlined } from '@mui/icons-material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.dark.dark
      : theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&>div': {
    position: 'relative',
    zIndex: 5,
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background:
      theme.palette.mode === 'dark'
        ? `linear-gradient(210.04deg, ${theme.palette.secondary.dark} -50.94%, rgba(144, 202, 249, 0) 95.49%)`
        : theme.palette.secondary[800],
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140,
    },
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background:
      theme.palette.mode === 'dark'
        ? `linear-gradient(140.9deg, ${theme.palette.secondary.dark} -14.02%, rgba(144, 202, 249, 0) 85.50%)`
        : theme.palette.secondary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70,
    },
  },
}));

const chartData = (data) => ({
  type: 'line',
  height: 90,
  options: {
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#fff'],
    fill: {
      type: 'solid',
      opacity: 1,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    yaxis: {
      min: 0,
      max: 100,
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: () => 'Total',
        },
      },
      marker: {
        show: false,
      },
    },
  },
  series: [
    {
      name: 'series1',
      data: data || [],
    },
  ],
});

const WeekMonthSummary = ({ isLoading, description, data, onClick, menu }) => {
  const theme = useTheme();
  const [timeValue, setTimeValue] = React.useState(false);

  // console.log(`Widget data: ${JSON.stringify(data)}`);
  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };

  const today = new Date('2018-02-22');
  const firstWeekDay = new Date(
    today.setDate(today.getDate() - today.getDay()),
  );
  const lastWeekDay = new Date(
    today.setDate(today.getDate() - today.getDay() + 6),
  );
  const getFirstMonthDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const getLastMonthDay = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  );

  // total for current month
  const totalForMonth = data.reduce((accumulator, item) => {
    if (item.date >= getFirstMonthDay && item.date <= getLastMonthDay) {
      return accumulator + item.value;
    }
    return accumulator;
  }, 0);

  const totalForWeek = data.reduce((accumulator, item) => {
    if (item.date >= firstWeekDay && item.date <= lastWeekDay) {
      return accumulator + item.value;
    }
    return accumulator;
  }, 0);
  // totals by day for current week

  const currentWeekTotals = data.reduce((totals, item) => {
    if (item.date >= firstWeekDay && item.date <= lastWeekDay) {
      const day = item.date.toLocaleDateString();
      totals[day] = (totals[day] || 0) + item.value;
    }
    return totals;
  }, {});

  const currentMonthTotals = data.reduce((totals, item) => {
    if (item.date >= getFirstMonthDay && item.date <= getLastMonthDay) {
      const day = item.date.toLocaleDateString();
      totals[day] = (totals[day] || 0) + item.value;
    }
    return totals;
  }, {});

  // console.log(`firstMonthDay: ${getFirstMonthDay} => ${getLastMonthDay}`);
  // console.log(`CurrentMonthTotals: ${JSON.stringify(currentMonthTotals)}`);
  // console.log(`Chartdata: ${JSON.stringify(chartData(Object.values(currentMonthTotals)))}`);
  // totals by day for current month

  return (
    <>
      {isLoading ? (
        <SkeletonWeekMonthSummary />
      ) : (
        <CardWrapper border={false} boxShadow content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor:
                          theme.palette.mode === 'dark'
                            ? theme.palette.dark.main
                            : theme.palette.secondary[800],
                        color: '#fff',
                        mt: 1,
                      }}
                    >
                      <ReceiptOutlined fontSize="inherit" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Button
                      disableElevation
                      color="secondary"
                      variant={timeValue ? 'contained' : 'text'}
                      size="small"
                      sx={{ color: 'inherit' }}
                      onClick={(e) => handleChangeTime(e, true)}
                    >
                      <FormattedMessage id="Week" />
                    </Button>
                    <Button
                      disableElevation
                      color="secondary"
                      variant={!timeValue ? 'contained' : 'text'}
                      size="small"
                      sx={{ color: 'inherit' }}
                      onClick={(e) => handleChangeTime(e, false)}
                    >
                      <FormattedMessage id="Month" />
                    </Button>
                    {menu && (
                      <>
                        <MenuOutlined
                          fontSize="medium"
                          sx={{
                            ml: 2,
                            color: 'inheret',
                            cursor: 'pointer',
                          }}
                          aria-controls="menu-popular-card"
                          aria-haspopup="true"
                          onClick={onClick}
                        />
                        {menu}
                      </>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 0.75 }}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item xs={6}>
                    <Grid container alignItems="center">
                      <Grid item>
                        {timeValue ? (
                          <Typography
                            sx={{
                              fontSize: '2.125rem',
                              fontWeight: 500,
                              mr: 1,
                              mt: 1.75,
                              mb: 0.75,
                            }}
                          >
                            <FormattedNumber
                              value={4523}
                              style="currency"
                              currency="GBP"
                            />
                          </Typography>
                        ) : (
                          <Typography
                            sx={{
                              fontSize: '2.125rem',
                              fontWeight: 500,
                              mr: 1,
                              mt: 1.75,
                              mb: 0.75,
                            }}
                          >
                            <FormattedNumber
                              value={65123}
                              style="currency"
                              currency="GBP"
                            />
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 500,
                            color:
                              theme.palette.mode === 'dark'
                                ? theme.palette.text.secondary
                                : theme.palette.secondary[200],
                          }}
                        >
                          <FormattedMessage id={description} />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    {timeValue ? (
                      <Chart
                        {...chartData(
                          [
                            45, 66, 41, 89, 25, 44, 9, 54,
                          ] /* Object.values(currentWeekTotals) */,
                        )}
                      />
                    ) : (
                      <Chart
                        {...chartData(
                          [
                            23, 55, 21, 77, 44, 22, 12, 66,
                          ] /* Object.values(currentMonthTotals) */,
                        )}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

export default WeekMonthSummary;
