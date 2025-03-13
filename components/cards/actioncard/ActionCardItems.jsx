import {
  ApiLookupInfoCardItem,
  DateTimeInfoCardItem,
  InfoCardItem,
  YesNoInfoCardItem,
} from './infocarditemcontrols';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { EmailActionCardItem } from './actioncontrols/EmailActionCardItem';

const VariantActionItem = ({ config, values }) => {
  const { id, variant } = config;
  const value = values[id] || '';

  switch (variant) {
    case 'email':
      return <EmailActionCardItem config={config} value={value} />;
    case 'date-time':
      return <DateTimeInfoCardItem config={config} value={value} />;
    case 'api-lookup':
      return <ApiLookupInfoCardItem config={config} value={value} />;
    default:
      return <InfoCardItem config={config} value={value} />;
  }
};

VariantActionItem.propTypes = {
  config: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

const ActionCardItems = ({ items, values }) => {
  console.log(
    `ActionCardItems: items: ${JSON.stringify(items)}, values: ${JSON.stringify(values)}`,
  );
  return items.map((item) => (
    <VariantActionItem key={item.id} config={item} values={values} />
  ));
};

ActionCardItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  values: PropTypes.object.isRequired,
};

export default ActionCardItems;
