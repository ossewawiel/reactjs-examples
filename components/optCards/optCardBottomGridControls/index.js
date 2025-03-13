import { Grid, Typography } from '@mui/material';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';
import {
  RadioButtonCheckedTwoTone,
  RadioButtonUncheckedTwoTone,
} from '@mui/icons-material';
import * as React from 'react';
import { LOCALE_CURRENCY } from '../../../constants';

export const RadioGridItem = ({ label, value, xs }) => (
  <Grid item xs={xs}>
    <Typography align="center" variant="subtitle1">
      <FormattedMessage id={label} />
    </Typography>
    <Typography align="center" variant="subtitle2">
      {value ? (
        <RadioButtonCheckedTwoTone sx={{ fontSize: '1.3rem' }} />
      ) : (
        <RadioButtonUncheckedTwoTone sx={{ fontSize: '1.3rem' }} />
      )}
    </Typography>
  </Grid>
);

export const NumberGridItem = ({ label, value, decimals, xs }) => (
  <Grid item xs={xs}>
    <Typography align="center" variant="subtitle2">
      <FormattedMessage id={label} />
    </Typography>
    <Typography align="center" variant="h3">
      <FormattedNumber
        value={value}
        maximumFractionDigits={decimals || 0}
        minimumFractionDigits={decimals || 0}
      />
    </Typography>
  </Grid>
);

export const TextGridItem = ({ label, value, xs }) => (
  <Grid item xs={xs}>
    <Typography align="center" variant="subtitle2">
      <FormattedMessage id={label} />
    </Typography>
    <Typography align="center" variant="h3">
      {value}
    </Typography>
  </Grid>
);

export const CurrencyGridItem = ({ label, value, currencyCode, xs }) => {
  const intl = useIntl();

  return (
    <Grid item xs={xs}>
      <Typography align="center" variant="subtitle2">
        <FormattedMessage id={label} />
      </Typography>
      <Typography align="center" variant="h3">
        <FormattedNumber
          value={value}
          style="currency"
          currency={currencyCode || LOCALE_CURRENCY[intl.locale] || 'USD'}
        />
      </Typography>
    </Grid>
  );
};
