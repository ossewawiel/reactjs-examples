import { Grid, TableCell } from '@mui/material';
import PhoneTwoToneIcon from '@mui/icons-material/PhoneTwoTone';
import PropTypes from 'prop-types';
import * as React from 'react';

export const OptPhoneTableCell = ({ column, value }) => (
  <TableCell key={column.id} align={column.align}>
    <Grid container direction="row" spacing={1}>
      <Grid item>
        <PhoneTwoToneIcon sx={{ fontSize: '0.9rem' }} />
      </Grid>
      <Grid item>{value}</Grid>
    </Grid>
  </TableCell>
);

OptPhoneTableCell.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    variant: PropTypes.oneOf(['phone']).isRequired,
    label: PropTypes.string,
    align: PropTypes.oneOf(['left', 'right', 'center']).isRequired,
  }),
  value: PropTypes.string.isRequired,
};
