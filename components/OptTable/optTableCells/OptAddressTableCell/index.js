import { TableCell } from '@mui/material';
import * as React from 'react';

export const OptAddressTableCell = ({
  column,
  line1,
  line2,
  line3,
  line4,
  code,
}) => (
  <TableCell key={column.id} id={column.id}>
    {line1}
    <br />
    {line2}
    <br />
    {line3}
    <br />
    {line4}
    <br />
    {code}
  </TableCell>
);
