import { FormattedNumber } from 'react-intl';
import { TableCell } from '@mui/material';
import * as React from 'react';
import { OptTextTableCell } from './OptTextTableCell';

export const OptNumberUnitTableCell = ({
  column,
  value,
  row,
  decimals,
  dashIfZero = true,
}) => {
  const unit = row.quantityUnit;
  const data = `${value} ${unit}`;
  const columnData = column;
  const a = OptTextTableCell({ column: columnData, value: unit });
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
      <div style={{ display: 'inline' }}> {number} </div>
      <div style={{ display: 'inline' }}> {unit} </div>
    </TableCell>
  );
};
