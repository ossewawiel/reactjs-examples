import { useIntl } from 'react-intl';
import { TableCell } from '@mui/material';
import Chip from '../../ui/component/Chip';
import * as React from 'react';
import PropTypes from 'prop-types';
import { OptYesNoTableCell } from '../optTableCells';

export const YesNoTableCell = ({ columnProperties, rowData }) => {
  const { id, align, invertedColors } = columnProperties;
  const yes = rowData[id];
  const intl = useIntl();
  return (
    <TableCell key={id} align={align}>
      {yes ? (
        <Chip
          label={intl.formatMessage({ id: 'Yes' })}
          size="small"
          chipcolor={invertedColors ? 'orange' : 'success'}
        />
      ) : (
        <Chip
          label={intl.formatMessage({ id: 'No' })}
          size="small"
          chipcolor={invertedColors ? 'success' : 'orange'}
        />
      )}
    </TableCell>
  );
};

YesNoTableCell.propTypes = {
  columnProperties: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    variant: PropTypes.oneOf(['yes-no']).isRequired,
    label: PropTypes.string,
    align: PropTypes.oneOf(['left', 'right', 'center']).isRequired,
  }),
  rowData: PropTypes.object,
};
