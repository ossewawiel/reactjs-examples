import en from 'apexcharts/dist/locales/en.json';
import de from 'apexcharts/dist/locales/de.json';
import fr from 'apexcharts/dist/locales/fr.json';
import es from 'apexcharts/dist/locales/es.json';
import nl from 'apexcharts/dist/locales/nl.json';
import PropTypes from 'prop-types';

const localeMap = { en, de, fr, es, nl };

const LineChartOptions = ({ intl, theme, graphSettings }) => {
  const colors = [graphSettings.color || theme.palette.primary.main];

  return {
    chart: {
      locales: [localeMap[intl.locale]],
      defaultLocale: intl.locale,
      height: 250,
      type: 'line',
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    colors,
    xaxis: { type: graphSettings.xtype, labels: { rotate: 0 } },
    yaxis: {
      forceNiceScale: true,
      labels: { formatter: (value) => intl.formatNumber(value) },
    },
    tooltip: {
      y: {
        formatter: (value) =>
          intl.formatNumber(value, { style: 'currency', currency: 'GBP' }),
      },
    },
  };
};

LineChartOptions.propTypes = {
  intl: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  graphSettings: PropTypes.shape({
    color: PropTypes.string,
    xtype: PropTypes.string,
    itemLabel: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.number),
    type: PropTypes.string,
  }).isRequired,
};

export default LineChartOptions;
