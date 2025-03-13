import { TableCell, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';

export const TextTableCell = ({ columnProperties, rowData }) => {
  const theme = useTheme();
  const { id, align, properties } = columnProperties;
  const { isWarningFunc, dashIfEmpty } = properties;
  const isWarning = rowData && isWarningFunc ? isWarningFunc(rowData) : false;
  const colour = isWarning
    ? theme.palette.error.dark
    : theme.palette.text.primary;
  const value =
    rowData[id] === ' ' || rowData[id] === '0' || rowData[id] === 0
      ? ''
      : rowData[id];

  // console.log(`textcolumn value => ${rowData[id]} | ${value}`);

  return (
    <TableCell key={id} align={align}>
      <Typography noWrap sx={{ color: colour }}>
        {dashIfEmpty && value === '' ? '-' : value}
      </Typography>
    </TableCell>
  );
};
