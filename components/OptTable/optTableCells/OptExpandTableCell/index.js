import { IconButton, TableCell } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import * as React from 'react';

export const OptExpandTableCell = ({ open, onOpen }) => (
  <TableCell sx={{ pl: 3 }}>
    <IconButton aria-label="expand row" size="small" onClick={onOpen}>
      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </IconButton>
  </TableCell>
);
