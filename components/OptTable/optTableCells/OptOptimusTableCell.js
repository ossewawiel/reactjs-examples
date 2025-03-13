import { IconButton, TableCell } from '@mui/material';
import TerminalTwoToneIcon from '@mui/icons-material/TerminalTwoTone';
import PropTypes from 'prop-types';
import * as React from 'react';

export const OptOptimusTableCell = ({ onOpen }) => (
  <TableCell align="center" sx={{ pl: 3 }}>
    <IconButton color="primary" size="large" aria-label="view" onClick={onOpen}>
      <TerminalTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    </IconButton>
  </TableCell>
);

OptOptimusTableCell.propTypes = {
  onOpen: PropTypes.func,
};
