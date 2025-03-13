import { useIntl } from 'react-intl';
import { TableCell } from '@mui/material';
import Chip from '../../../ui/component/Chip';
import * as React from 'react';
import PropTypes from 'prop-types';

export const OptYesNoTableCell = ({ column, yes }) => {
  const intl = useIntl();
  return (
    <TableCell key={column.id} align={column.align}>
      {yes ? (
        <Chip
          label={intl.formatMessage({ id: 'Yes' })}
          size="small"
          chipcolor="orange"
        />
      ) : (
        <Chip
          label={intl.formatMessage({ id: 'No' })}
          size="small"
          chipcolor="success"
        />
      )}
    </TableCell>
  );
};

OptYesNoTableCell.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    variant: PropTypes.oneOf(['yes-no']).isRequired,
    label: PropTypes.string,
    align: PropTypes.oneOf(['left', 'right', 'center']).isRequired,
  }),
  yes: PropTypes.bool,
};
