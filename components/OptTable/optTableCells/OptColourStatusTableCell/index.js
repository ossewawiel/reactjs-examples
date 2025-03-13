import { TableCell } from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';
import Chip from '../../../ui/component/Chip';
import { dispatch } from 'src/store';
import { openSnackbar } from 'src/store/slices/snackbar';
import { useIntl } from 'react-intl';

export const OptColourStatusTableCell = ({ columnProperties, rowData }) => {
  const intl = useIntl();
  const l10n = (value) => {
    const tmp = intl.formatMessage({ id: value });
    return tmp;
  };
  const { id, align, properties } = columnProperties;
  const {
    lookupHook,
    translateValue = false,
    keyId,
    valueId,
    display = 'value',
    codeIconMap,
    customProps,
  } = properties;
  // console.log(`api lookup data: ${JSON.stringify(columnProperties)} + ${JSON.stringify(rowData[id])}`);
  const { data: response = [], isSuccess, isError, error } = lookupHook();
  // console.log(`color response data: ${JSON.stringify(customProps)}`);

  const code = rowData[id];
  const Icon = codeIconMap && codeIconMap[code].icon;
  const value = rowData[id];
  let val = value;

  if (isSuccess) {
    const tmp = response.filter((item) => item.name === value);

    val = l10n(tmp[0].value);
  }
  if (isError) {
    dispatch(
      openSnackbar({
        open: true,
        message: error.data.apiexception.message,
        variant: 'alert',
        close: false,
      }),
    );
  }

  const chipColour = customProps[value] ?? 'grey';
  // console.log(`Value - ${value} ------ chip cololor: ${JSON.stringify(customProps)} ---- result: ${JSON.stringify(chipColour)} `);

  return (
    <TableCell key={code.id} align={code.align}>
      <Chip label={val} size="small" chipcolor={chipColour} />
    </TableCell>
  );
};

OptColourStatusTableCell.propTypes = {
  column: PropTypes.exact({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    variant: PropTypes.oneOf(['colour-status']).isRequired,
    label: PropTypes.string,
    align: PropTypes.oneOf(['left', 'right', 'center']),
    decimals: PropTypes.number,
    canSort: PropTypes.bool,
    customProps: PropTypes.object,
    lookupHook: PropTypes.func.isRequired,
  }),
  // eslint-disable-next-line react/no-unused-prop-types
  value: PropTypes.string,
};
