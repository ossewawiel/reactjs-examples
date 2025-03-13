import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';
import { Grid, Typography } from '@mui/material';
import * as React from 'react';
import PropTypes from "prop-types";

export const CurrencyInfoCardItem = ({ config, value }) => {
  const intl = useIntl();
  const { id, label, properties } = config;

  const number =
    value === 0 ? (
      '-'
    ) : (
      <FormattedNumber
        value={value}
        style="currency"
        currency={properties.currencyCode}
      />
    );

  return (
    <Grid item xs={3}>
      <Typography variant="caption">
        <FormattedMessage id={label} />
      </Typography>
      <Typography variant="h6">{number ? number : '-'}</Typography>
    </Grid>
  );
};

CurrencyInfoCardItem.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    properties: PropTypes.shape({
      currencyCode: PropTypes.string,
    }),
  }).isRequired,
  value: PropTypes.number.isRequired,
};
