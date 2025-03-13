import { TableCell } from '@mui/material';
import * as React from 'react';
import { FormattedNumber, useIntl } from 'react-intl';
import { LOCALE_CURRENCY } from '../../../constants';
import { useAuth } from 'src/contexts/jwt-context';

export const OptCurrencyTableCell = ({
  column,
  value,
  currencyCode,
  dashIfZero = true,
}) => {
  const intl = useIntl();
  const { currencyInfo } = useAuth();
  // console.log(`Currency info code: ${JSON.stringify(currencyInfo.currentData.currencyCode)}`);
  const code = currencyInfo.currentData.currencyCode;

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
    <TableCell key={column.id} align={column.align}>
      {number}
    </TableCell>
  );
};
