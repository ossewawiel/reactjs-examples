import { FormattedNumber, useIntl } from 'react-intl';
import { useAuth } from 'src/contexts/jwt-context';
import { TableCell } from '@mui/material';
import * as React from 'react';
import { LOCALE_CURRENCY } from '../../../../../constants';

export const CurrencyProperty = ({ config, value }) => {
  const intl = useIntl();
  const { id, emptyDash } = config;
  const { details } = useAuth();
  const code = details.currencyCode;
  console.log(`value - ${value} + code - ${code}`);

  const number =
    emptyDash && value === 0 ? (
      '-'
    ) : (
      <FormattedNumber
        value={value}
        style="currency"
        currency={code || LOCALE_CURRENCY[intl.locale] || 'USD'}
      />
    );

  return (
    <TableCell key={id} variant="head">
      {number}
    </TableCell>
  );
};
