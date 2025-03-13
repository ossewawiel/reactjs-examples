import { IconButton, TableCell } from '@mui/material';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import * as React from 'react';
import PropTypes from 'prop-types';

export const OptViewTableCell = ({ onView }) => (
  <TableCell>
    <IconButton color="primary" size="large" aria-label="view" onClick={onView}>
      <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    </IconButton>
  </TableCell>
);

OptViewTableCell.propTypes = {
  onView: PropTypes.func,
};
