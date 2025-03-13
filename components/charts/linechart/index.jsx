import PropTypes from 'prop-types';
import MainCard from '../../ui/component/cards/MainCard';
import { Box, Grid, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import LineChartOptions from './LineChartOptions';
import LineChartMenu from './LineChartMenu';
import ReactApexChart from 'react-apexcharts';

const LoadingSkeleton = () => (
  <MainCard border boxShadow sx={{ '&>div': { p: 0, pb: '0px !important' } }}>
    <Box sx={{ p: 3 }}>
      <Grid container direction="column" spacing={3}>
        <Grid item container spacing={1} alignItems="center">
          <Grid item>
            <Typography variant="h4">
              <Skeleton width={150} height={30} />
            </Typography>
          </Grid>
          <Grid item xs zeroMinWidth />
          <Grid item>
            <Typography variant="h4">
              <Skeleton width={100} height={30} />
            </Typography>
          </Grid>
          <Grid item>
            <Skeleton width={24} height={24} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{ mt: -2.5, fontWeight: 400 }}
            color="inherit"
            variant="h5"
          >
            <Skeleton width="80%" height={20} />
          </Typography>
        </Grid>
      </Grid>
    </Box>
    <Skeleton variant="rectangular" height={150} />
  </MainCard>
);

const ErrorDisplay = ({ error }) => (
  <MainCard border boxShadow sx={{ '&>div': { p: 0, pb: '0px !important' } }}>
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" color="error">
        {error.message}
      </Typography>
    </Box>
  </MainCard>
);

const LineChart = ({ isLoading, graphInfo, isError, onMenuItemClicked }) => {
  const intl = useIntl();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorDisplay error={graphInfo.error} />;

  const { heading, total, description, menuSettings, graphSettings } =
    graphInfo;
  const options = LineChartOptions({ intl, theme, graphSettings });
  const series = [{ name: graphSettings.itemLabel, data: graphSettings.data }];

  const handleMenuItemClick = (value) => {
    setAnchorEl(null);
    onMenuItemClicked(value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MainCard border boxShadow sx={{ '&>div': { p: 0, pb: '0px !important' } }}>
      <Box sx={{ p: 3 }}>
        <Grid container direction="column" spacing={3}>
          <Grid item container spacing={1} alignItems="center">
            <Grid item>
              <Typography variant="h4">{heading}</Typography>
            </Grid>
            <Grid item xs zeroMinWidth />
            <Grid item>
              <Typography variant="h4">{total}</Typography>
            </Grid>
            <Grid item>
              {menuSettings && (
                <LineChartMenu
                  anchorEl={anchorEl}
                  menuSettings={menuSettings}
                  handleClick={handleClick}
                  handleClose={handleClose}
                  handleMenuItemClick={handleMenuItemClick}
                />
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ mt: -2.5, fontWeight: 400 }}
              color="inherit"
              variant="h5"
            >
              {description}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <ReactApexChart
        options={options}
        series={series}
        type={graphSettings.type}
        height={150}
      />
    </MainCard>
  );
};

LineChart.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  graphInfo: PropTypes.shape({
    heading: PropTypes.string,
    total: PropTypes.string,
    description: PropTypes.string,
    menuSettings: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          value: PropTypes.string,
        }),
      ),
    }),
    graphSettings: PropTypes.shape({
      color: PropTypes.string,
      xtype: PropTypes.string,
      itemLabel: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.number),
      type: PropTypes.string,
    }),
    error: PropTypes.string,
  }).isRequired,
  isError: PropTypes.bool.isRequired,
  onMenuItemClicked: PropTypes.func.isRequired,
};

export default LineChart;
