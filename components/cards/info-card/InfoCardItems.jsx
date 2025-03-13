import {
  ApiLookupInfoCardItem,
  DateTimeInfoCardItem,
  InfoCardItem,
  YesNoInfoCardItem,
  ConcatenatedInfoCardItem,
  CurrencyInfoCardItem,
} from './items';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';

const VariantItem = ({ config, values, secondaryValues }) => {
  const { id, variant } = config;
  const propsValue = config.propsValue || false;
  const value = propsValue ? secondaryValues[id] : values[id] || '';

  switch (variant) {
    case 'yes-no':
      return <YesNoInfoCardItem config={config} value={value} />;
    case 'date-time':
      return <DateTimeInfoCardItem config={config} value={value} />;
    case 'api-lookup':
      return <ApiLookupInfoCardItem config={config} value={value} />;
    case 'concatenated':
      return (
        <ConcatenatedInfoCardItem
          config={config}
          values={values}
          secondaryValues={secondaryValues}
        />
      );
    case 'currency':
      return <CurrencyInfoCardItem config={config} value={value} />;
    default:
      return <InfoCardItem config={config} value={value} />;
  }
};

VariantItem.propTypes = {
  config: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  secondaryValues: PropTypes.object,
};

const InfoCardItems = ({ items, values, gridSpacing, secondaryValues }) => {
  return (
    <Grid container spacing={gridSpacing}>
      {items.map((item) => (
        <VariantItem
          key={item.id}
          config={item}
          values={values}
          secondaryValues={secondaryValues}
        />
      ))}
    </Grid>
  );
};

InfoCardItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  values: PropTypes.object.isRequired,
  secondaryValues: PropTypes.object,
  gridSpacing: PropTypes.number.isRequired,
};

export default InfoCardItems;
