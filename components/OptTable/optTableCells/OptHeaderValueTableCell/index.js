import { useTheme } from '@mui/material/styles';
import { TableCell, Typography } from '@mui/material';
import * as React from 'react';

export const OptHeaderValueTableCell = ({ column, header, value }) => {
  const theme = useTheme();
  return (
    <TableCell
      key={column.id}
      component="th"
      id={column.id}
      scope="row"
      sx={{ cursor: 'pointer' }}
    >
      <Typography
        variant="subtitle1"
        sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
      >
        {' '}
        {header}{' '}
      </Typography>
      <Typography variant="caption"> {value} </Typography>
    </TableCell>
  );
};
