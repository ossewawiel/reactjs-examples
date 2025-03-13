import { IconButton, TableCell, Tooltip } from '@mui/material';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import * as React from 'react';
import PropTypes from 'prop-types';

export const OptViewCardItem = ({ onView, size, sx }) => (
  <Tooltip title={'View details'}>
    <IconButton
      color="primary"
      size={size ? size : 'large'}
      aria-label="view"
      onClick={onView}
      sx={sx ? sx : null}
    >
      <VisibilityTwoToneIcon sx={{ fontSize: '1.3 rem' }} />
    </IconButton>
  </Tooltip>
);

OptViewCardItem.propTypes = {
  onView: PropTypes.func,
};
