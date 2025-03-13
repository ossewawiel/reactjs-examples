import {
  CurrencyInfoCardFooterItem,
  InfoCardFooterItem,
  NumberInfoCardFooterItem,
  RadioInfoCardFooterItem,
  DateTimeInfoCardFooterItem,
  DateTimeByInfoCardFooterItem,
  YesNoInfoCardFooterItem,
  ApiLookupInfoCardFooterItem,
} from './footer-items';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';

const FooterItem = ({ config, values, secondaryValues }) => {
  const { id, variant } = config;
  const propsValue = config.propsValue || false;
  const value = propsValue ? secondaryValues[id] : values[id] || '';

  switch (variant) {
    case 'radio':
      return <RadioInfoCardFooterItem config={config} value={value} />;
    case 'currency':
      return <CurrencyInfoCardFooterItem config={config} value={value} />;
    case 'number':
      return <NumberInfoCardFooterItem config={config} value={value} />;
    case 'date-time':
      return <DateTimeInfoCardFooterItem config={config} value={value} />;
    case 'date-time-by':
      return <DateTimeByInfoCardFooterItem config={config} values={values} />;
    case 'yes-no':
      return <YesNoInfoCardFooterItem config={config} value={value} />;
    case 'api-lookup':
      return <ApiLookupInfoCardFooterItem config={config} value={value} />;
    default:
      return <InfoCardFooterItem config={config} value={value} />;
  }
};

FooterItem.propTypes = {
  config: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  secondaryValues: PropTypes.object,
};

const InfoCardFooterItems = ({ footerItems, values, secondaryValues }) => {
  return (
    <Grid container justifyContent="center" spacing={10}>
      {footerItems.map((item) => (
        <FooterItem
          key={item.id}
          config={item}
          values={values}
          secondaryValues={secondaryValues}
        />
      ))}
    </Grid>
  );
};

InfoCardFooterItems.propTypes = {
  footerItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  values: PropTypes.object.isRequired,
  secondaryValues: PropTypes.object,
  gridSpacing: PropTypes.number.isRequired,
};

export default InfoCardFooterItems;
