import { Grid, Typography } from '@mui/material';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import * as React from 'react';
import PropTypes from 'prop-types';

export const NumberInfoCardFooterItem = ({
  config: { id, label, properties },
  value,
}) => {
  const decimals = properties?.decimals || 0;
  return (
    <Grid item>
      <Typography align="center" variant="subtitle2">
        <FormattedMessage id={label} />
      </Typography>
      <Typography align="center" variant="h3">
        <FormattedNumber
          value={value}
          maximumFractionDigits={decimals}
          minimumFractionDigits={decimals}
        />
      </Typography>
    </Grid>
  );
};

NumberInfoCardFooterItem.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    properties: PropTypes.shape({
      decimals: PropTypes.number,
    }),
  }).isRequired,
  value: PropTypes.number.isRequired,
};
