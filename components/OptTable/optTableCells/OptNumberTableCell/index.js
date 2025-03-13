import { TableCell } from '@mui/material';
import * as React from 'react';
import { FormattedNumber } from 'react-intl';

export const OptNumberTableCell = ({
  column,
  value,
  decimals,
  dashIfZero = true,
}) => {
  const number =
    dashIfZero && value === 0 ? (
      '-'
    ) : (
      <FormattedNumber
        value={value}
        maximumFractionDigits={decimals || 0}
        minimumFractionDigits={decimals || 0}
      />
    );

  return (
    <TableCell key={column.id} align={column.align}>
      {number}
    </TableCell>
  );
};
