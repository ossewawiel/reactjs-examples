import { FormattedMessage, useIntl } from 'react-intl';
import { Grid, TableCell, Typography } from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';

export const ApiLookupProperty = ({ config, value }) => {
  const { formatMessage } = useIntl();
  const { properties } = config;
  const { lookupHook, keyId, valueId } = properties;

  const lookupType = keyId === 'name' ? 'name' : 'code';
  const { data: response = [], isSuccess, isError, error } = lookupHook();
  const code = value;
  
  const getDisplayValue = () => {
    if (isError) {
      console.error('Error fetching data:', error);
      return formatMessage({ id: 'error.fetchingData' });
    }

    if (isSuccess) {
      const matchingItem = response.find((item) => item[keyId] === code);
      if (matchingItem) {
        
        return lookupType === 'code'
          ? `${formatMessage({ id: matchingItem[valueId] })} (${code})`
          : `${formatMessage({ id: matchingItem[valueId] })}`;
      }
    }

    return code;
  };

  const displayValue = getDisplayValue();

  return <TableCell variant="head">{displayValue}</TableCell>;
};

ApiLookupProperty.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    properties: PropTypes.shape({
      lookupHook: PropTypes.func.isRequired,
      keyId: PropTypes.string.isRequired,
      valueId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  value: PropTypes.string.isRequired,
};
