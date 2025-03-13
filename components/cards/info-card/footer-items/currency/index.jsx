import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';
import { Grid, Typography } from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';

export const CurrencyInfoCardFooterItem = ({
  config: { id, label, properties },
  value,
}) => {
  const currencyCode = properties?.currencyCode;

  return (
    <Grid item>
      <Typography align="center" variant="subtitle2">
        <FormattedMessage id={label} />
      </Typography>
      <Typography align="center" variant="h3">
        <FormattedNumber
          value={value}
          style="currency"
          currency={currencyCode}
        />
      </Typography>
    </Grid>
  );
};

CurrencyInfoCardFooterItem.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    properties: PropTypes.shape({
      currencyCode: PropTypes.string,
    }),
  }).isRequired,
  value: PropTypes.number.isRequired,
};
