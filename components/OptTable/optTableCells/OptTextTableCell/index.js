import { TableCell } from '@mui/material';
import * as React from 'react';

export const OptTextTableCell = ({ column, value }) => (
  <TableCell key={column.id} align={column.align}>
    {value}
  </TableCell>
);
