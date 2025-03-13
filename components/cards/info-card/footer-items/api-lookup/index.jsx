import { Grid, Typography } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import * as React from 'react';
import PropTypes from 'prop-types';

export const ApiLookupInfoCardFooterItem = ({ config, value }) => {
  const intl = useIntl();
  const { id, label, properties } = config;
  const { lookupHook, keyId, valueId } = properties;
  console.error('Api value:', value);
  const { data: response = [], isSuccess, isError, error } = lookupHook();
  const code = value;
  let displayValue = code;
  if (isSuccess) {
    const matchingItem = response.find((item) => item[keyId] === code);
    if (matchingItem) {
      displayValue =
        keyId === 'code'
          ? `${intl.formatMessage({ id: matchingItem[valueId] })} (${code})`
          : `${intl.formatMessage({ id: matchingItem[valueId] })}`;
    }
  } else if (isError) {
    displayValue = intl.formatMessage({ id: 'error.fetchingData' });
    console.error('Error fetching data:', error);
  }

  return (
    <Grid item xs={3}>
      <Typography variant="caption">
        <FormattedMessage id={label} />
      </Typography>
      <Typography variant="h6">{displayValue}</Typography>
    </Grid>
  );
};

ApiLookupInfoCardFooterItem.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    properties: PropTypes.shape({
      lookupHook: PropTypes.func.isRequired,
      keyId: PropTypes.string.isRequired,
      valueId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  value: PropTypes.string.isRequired,
};
