import { useTheme } from '@mui/material/styles';
import { Grid, TableCell } from '@mui/material';
import * as React from 'react';

export const ConcatTableCell = ({ columnProperties, rowData }) => {
  const { id, properties } = columnProperties;
  const { items, direction } = properties;
  // console.log(`Items : ${JSON.stringify(items[0].id)}`);
  const theme = useTheme();

  return (
    <TableCell
      key={id}
      component="th"
      id={id}
      scope="row"
      sx={{ cursor: 'pointer' }}
    >
      <Grid container direction={direction || 'row'} spacing={1}>
        {items.map((item, index) => (
          <Grid item key={index}>
            {item.format ? item.format(rowData[item.id]) : rowData[item.id]}
          </Grid>
        ))}
      </Grid>
    </TableCell>
  );
};
