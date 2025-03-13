import MainCard from '../../ui/component/cards/MainCard';
import { Grid } from '@mui/material';
import * as PropTypes from 'prop-types';
import Skeleton from '@mui/material/Skeleton';
import ReactApexChart from 'react-apexcharts';
import { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import en from 'apexcharts/dist/locales/en.json';
import de from 'apexcharts/dist/locales/de.json';
import fr from 'apexcharts/dist/locales/fr.json';
import es from 'apexcharts/dist/locales/es.json';
import nl from 'apexcharts/dist/locales/nl.json';
import { gridSpacing } from '../../../store/constant';
import BarChartMenu from './BarChartMenu';
import BarChartDropdowns from './BarChartDropdowns';
import BarChartHeader from './BarChartHeader';

const localeMap = { en, de, fr, es, nl };

export const getCategories = (data, type) => {
  let uniqueCategories = [];
  let dataSet = new Set();

  data.series.forEach((item) => {
    let category = item.value.value[type];
    if (category && !dataSet.has(category)) {
      dataSet.add(category);
      uniqueCategories.push(category);
    }
  });

  // console.log(`categories: ${JSON.stringify(uniqueCategories)}`); // eslint-disable-line no-console
  return uniqueCategories;
};

export const getSeries = ({ data, xtype, ytype, translatex = false, intl }) => {
  // Initialize a Set to store all unique 'x' values
  let allXValues = new Set();

  // First pass to collect all unique 'x' values
  data.series.forEach((item) => {
    item.columnValues.forEach((column) => {
      allXValues.add(column.x.value[xtype]);
    });
  });

  // Convert the Set to an Array
  allXValues = Array.from(allXValues);

  // Initialize a Map to store 'x' values and their corresponding 'y' arrays
  let seriesMap = new Map();
  allXValues.forEach((x) => {
    seriesMap.set(x, new Array(data.series.length).fill(0));
  });

  // Second pass to populate 'y' values
  data.series.forEach((item, index) => {
    item.columnValues.forEach((column) => {
      let x = column.x.value[xtype];
      let y = column.y.value[ytype];
      seriesMap.get(x)[index] = y;
    });
  });

  console.log(`seriesMap: ${JSON.stringify(seriesMap)}`); // eslint-disable-line no-console
  // Transform the Map into the desired format
  let seriesArray = [];
  seriesMap.forEach((data, name) => {
    if (translatex) {
      const translatedName = intl.formatMessage({
        id: name,
        defaultMessage: name,
      });
      seriesArray.push({ name: translatedName, data });
    } else {
      seriesArray.push({ name, data });
    }
  });

  console.log(`seriesArray: ${JSON.stringify(seriesArray)}`); // eslint-disable-line no-console

  // Create the final result object
  // console.log(`series: ${JSON.stringify(seriesArray)}`); // eslint-disable-line no-console
  return seriesArray;
};

const BarChart = ({
  isLoading,
  graphOptions,
  graphSeries,
  graphInfo,
  isError,
  onMenuItemClicked,
}) => {
  const intl = useIntl();
  const { heading, total, menuSettings, dropdownSettings, graphSettings } =
    graphInfo;
  const [anchorEl, setAnchorEl] = useState(null);

  const options = useMemo(
    () => ({
      chart: {
        id: 'bar-chart',
        type: 'bar',
        locales: [localeMap[intl.locale]],
        defaultLocale: intl.locale,
        stacked: graphSettings.type === 'stacked',
        toolbar: {
          show: true,
          tools: {
            download: false,
          },
        },
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      ...graphOptions,
      legend: {
        show: true,
        fontFamily: `'Roboto', sans-serif`,
        position: 'bottom',
        offsetX: 20,
        labels: {
          useSeriesColors: false,
        },
        markers: {
          width: 16,
          height: 16,
          radius: 5,
        },
        itemMargin: {
          horizontal: 15,
          vertical: 8,
        },
      },
      fill: {
        type: 'solid',
      },
      grid: {
        show: true,
      },
    }),
    [intl.locale, graphSettings.type, graphOptions],
  );

  const handleMenuItemClick = useCallback(
    (value) => {
      setAnchorEl(null);
      onMenuItemClicked(value);
    },
    [onMenuItemClicked],
  );

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <MainCard border boxShadow>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm>
              <BarChartHeader
                isLoading={isLoading}
                heading={heading}
                total={total}
              />
            </Grid>
            <Grid item xs={12} sm="auto" container justifyContent="flex-end">
              <Grid item>
                <BarChartDropdowns
                  isLoading={isLoading}
                  dropdownSettings={dropdownSettings}
                />
              </Grid>
              <Grid item>
                <BarChartMenu
                  menuSettings={menuSettings}
                  anchorEl={anchorEl}
                  handleClick={handleClick}
                  handleClose={handleClose}
                  handleMenuItemClick={handleMenuItemClick}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {isLoading ? (
            <Skeleton variant="rectangular" width="100%" height={480} />
          ) : (
            <ReactApexChart
              options={options}
              series={graphSeries}
              type="bar"
              height={480}
            />
          )}
        </Grid>
      </Grid>
    </MainCard>
  );
};

BarChart.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  graphOptions: PropTypes.object.isRequired,
  graphSeries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.number).isRequired,
    }),
  ).isRequired,
  graphInfo: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    menuSettings: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
    dropdownSettings: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        selectedValue: PropTypes.string.isRequired,
        onSelect: PropTypes.func.isRequired,
        data: PropTypes.arrayOf(
          PropTypes.shape({
            codeField: PropTypes.string.isRequired,
            nameField: PropTypes.string.isRequired,
          }),
        ),
      }),
    ),
    graphSettings: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isError: PropTypes.bool,
  onMenuItemClicked: PropTypes.func.isRequired,
};

export default BarChart;
