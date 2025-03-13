import { useTheme } from '@mui/material/styles';
import { Grid, TableCell, Typography } from '@mui/material';
import * as React from 'react';

export const OptConcatTableCell = ({ column, values }) => {
  const theme = useTheme();
  return (
    <TableCell
      key={column.id}
      component="th"
      id={column.id}
      scope="row"
      sx={{ cursor: 'pointer' }}
    >
      <Grid container direction="row" spacing={1}>
        {column.items.map((item, index) => (
          <Grid item key={index}>
            {item.format ? item.format(values[item.id]) : values[item.id]}
          </Grid>
        ))}
      </Grid>
    </TableCell>
  );
};

export const concatColumnObject = ({ id, label, items }) => ({
  id,
  variant: 'concat',
  label,
  align: 'left',
  items,
});
