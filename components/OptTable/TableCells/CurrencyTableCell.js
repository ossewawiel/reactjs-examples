import { FormattedNumber, useIntl } from 'react-intl';
import { useAuth } from 'src/contexts/jwt-context';
import { LOCALE_CURRENCY } from '../../../constants';
import { TableCell } from '@mui/material';
import * as React from 'react';

export const CurrencyTableCell = ({ columnProperties, rowData }) => {
  const intl = useIntl();
  const { details } = useAuth();
  const { id, align, properties } = columnProperties;
  const { dashIfZero, currencyCode } = properties;
  const code =
    currencyCode ||
    details?.currencyCode ||
    LOCALE_CURRENCY[intl.locale] ||
    'USD';
  const value = rowData[id];

  const number =
    dashIfZero && value === 0 ? (
      '-'
    ) : (
      <FormattedNumber
        value={value}
        style="currency"
        currency={code || LOCALE_CURRENCY[intl.locale] || 'USD'}
      />
    );

  return (
    <TableCell key={id} align={align}>
      {number}
    </TableCell>
  );
};
