import { styled, useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import SkeletonWeekMonthSummary from '../skeletons/SkeletonWeekMonthSummary';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { MenuOutlined, ReceiptOutlined } from '@mui/icons-material';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';
import Chart from 'react-apexcharts';
import MainCard from '../ui/component/cards/MainCard';
import ReactApexChart from 'react-apexcharts';
import en from 'apexcharts/dist/locales/en.json';
import de from 'apexcharts/dist/locales/de.json';
import fr from 'apexcharts/dist/locales/fr.json';
import es from 'apexcharts/dist/locales/es.json';
import nl from 'apexcharts/dist/locales/nl.json';

const localeMap = { en, de, fr, es, nl };

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

const MultiPeriodSummaryChart = (props) => {
  const {
    isLoading,
    graphOptions,
    graphSeries,
    graphInfo,
    isError,
    onMenuItemClicked,
    onPeriodChanged,
  } = props;
  const { heading, icon, total, menuSettings, periodSettings, graphSettings } =
    graphInfo;
  const intl = useIntl();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const Icon = icon;

  console.log(`graphInfo: ${JSON.stringify(graphInfo)}`); // eslint-disable-line no-console
  console.log(`graphOptions: ${JSON.stringify(graphOptions)}`); // eslint-disable-line no-console
  console.log(`graphSeries: ${JSON.stringify(graphSeries)}`); // eslint-disable-line no-console
  const options = {
    chart: {
      locales: [localeMap[intl.locale]],
      defaultLocale: intl.locale,
      height: 90,
      type: 'line', //graphSettings.type,
      zoom: { enabled: false },
      toolbar: { show: false },
      sparkline: {
        enabled: true,
      },
    },
    colors: ['#fff'],
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false,
      },
      x: {
        show: true,
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
    ...graphOptions,
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (value) => {
    setAnchorEl(null);
    onMenuItemClicked(value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePeriod = (value) => {
    onPeriodChanged(value);
  };

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
                      <Icon fontSize="inherit" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    {periodSettings.items &&
                      periodSettings.items.map((item, index) => (
                        <Button
                          key={index}
                          disableElevation
                          color="secondary"
                          variant={
                            item.value === periodSettings.selectedPeriod
                              ? 'contained'
                              : 'text'
                          }
                          size="small"
                          sx={{ color: 'inherit' }}
                          onClick={(e) => handleChangePeriod(item.value)}
                        >
                          {item.name}
                        </Button>
                      ))}
                    {menuSettings && (
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
                          onClick={handleClick}
                        />
                        <Menu
                          id="menu-popular-card"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                          variant="selectedMenu"
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                        >
                          {menuSettings.items.map((menu, index) =>
                            menu.value === 'separator' ? (
                              <Divider key={index} />
                            ) : (
                              <MenuItem
                                onClick={() => handleMenuItemClick(menu.value)}
                                key={index}
                              >
                                {menu.name}
                              </MenuItem>
                            ),
                          )}
                        </Menu>
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
                        <Typography
                          sx={{
                            fontSize: '2.125rem',
                            fontWeight: 500,
                            mr: 1,
                            mt: 1.75,
                            mb: 0.75,
                          }}
                        >
                          {total}
                        </Typography>
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
                          {heading}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <ReactApexChart
                      options={options}
                      series={graphSeries}
                      type={graphSettings.type}
                      height={90}
                    />
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

export default MultiPeriodSummaryChart;
