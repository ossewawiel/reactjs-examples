import { FormattedNumber } from 'react-intl';
import { TableCell, Typography } from '@mui/material';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';

export const NumberTableCell = ({ columnProperties, rowData }) => {
  const theme = useTheme();
  const { id, align, properties } = columnProperties;
  const { decimals, dashIfZero, unit, alertIfNegative, mathFunc } = properties;
  const value = rowData && mathFunc ? mathFunc(rowData) : rowData[id];
  // console.log(`Sum of columns - ${value}`);
  // const data = dashIfEmpty(rowData);
  // console.log(`dash code: ${JSON.stringify(properties)}`);

  const color =
    alertIfNegative && value < 0
      ? theme.palette.error.main
      : theme.palette.text.primary;

  const number =
    dashIfZero && value === 0 ? (
      '-'
    ) : (
      <Typography sx={{ color }}>
        <FormattedNumber
          value={value}
          maximumFractionDigits={decimals || 0}
          minimumFractionDigits={decimals || 0}
        />
      </Typography>
    );

  const valueWithUnit = unit ? `${number} ${unit}` : number;

  return (
    <TableCell key={id} align={align}>
      {valueWithUnit}
    </TableCell>
  );
};
