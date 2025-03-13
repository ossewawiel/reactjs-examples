import { Grid, TableCell, Typography } from '@mui/material';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import { FormattedDate, FormattedTime } from 'react-intl';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';

export const OptCodeLookupTableCell = ({ column, value }) => {
  const {
    data: response = [],
    isSuccess,
    isError,
    error,
  } = column.lookupHook();
  let val = value;
  if (isSuccess) {
    const tmp = response.filter((item) => item.code === value);
    val = tmp[0].name;
    // console.log(`lookup stuff ${value}, ${val}, ${JSON.stringify(tmp)}`);
  }

  return (
    <TableCell key={column.id} align={column.align}>
      {val}
    </TableCell>
  );
};

export const OptCodeLookupHeaderValueTableCell = ({
  key,
  column,
  header,
  value,
}) => {
  const theme = useTheme();

  const {
    data: response = [],
    isSuccess,
    isError,
    error,
  } = column.lookupHook();
  let val = '...';
  // console.log(`lookup stuff ${JSON.stringify(response)}`);
  if (isSuccess) {
    const tmp = response.filter((item) => item.code === header);
    val = tmp[0].name;
    // console.log(`lookup stuff ${value}, ${val}, ${JSON.stringify(tmp)}`);
  }

  return (
    <TableCell
      key={column.id}
      component="th"
      id={column.id}
      scope="row"
      sx={{ cursor: 'pointer' }}
    >
      <Typography
        variant="subtitle1"
        sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
      >
        {' '}
        {val}{' '}
      </Typography>
      <Typography variant="caption"> {value} </Typography>
    </TableCell>
  );
};

export const OptNameLookupHeaderValueTableCell = ({
  key,
  column,
  header,
  value,
}) => {
  const theme = useTheme();

  const {
    data: response = [],
    isSuccess,
    isError,
    error,
  } = column.lookupHook();
  let val = '...';
  // console.log(`lookup stuff ${JSON.stringify(response)}`);
  if (isSuccess) {
    const tmp = response.filter((item) => item.name === header);
    val = tmp[0].value;
    // console.log(`lookup stuff ${value}, ${val}, ${JSON.stringify(tmp)}`);
  }

  return (
    <TableCell
      key={column.id}
      component="th"
      id={column.id}
      scope="row"
      sx={{ cursor: 'pointer' }}
    >
      <Typography
        variant="subtitle1"
        sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
      >
        {' '}
        {val}{' '}
      </Typography>
      <Typography variant="caption"> {value} </Typography>
    </TableCell>
  );
};

export const OptNameLookupTableCell = ({ column, value }) => {
  const {
    data: response = [],
    isSuccess,
    isError,
    error,
  } = column.lookupHook();
  let val = value;
  if (isSuccess) {
    const tmp = response.filter((item) => item.name === value);
    val = tmp[0].value;
    // console.log(`lookup stuff ${JSON.stringify(tmp)}`);
  }

  return (
    <TableCell key={column.id} align={column.align}>
      {val}
    </TableCell>
  );
};

export const OptNameAndCodeTableCell = ({ column, value }) => {
  const {
    data: response = [],
    isSuccess,
    isError,
    error,
  } = column.lookupHook();
  let val = value;
  let code = '...';
  if (isSuccess) {
    const tmp = response.filter((item) => item.code === value);
    val = tmp[0].name;
    code = tmp[0].code;
    // console.log(`lookup stuff ${value}, ${val}, ${JSON.stringify(tmp)}`);
  }

  return (
    <TableCell key={column.id} align={column.align}>
      {`${val}(${code})`}
    </TableCell>
  );
};

OptCodeLookupTableCell.propTypes = {
  column: PropTypes.exact({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    variant: PropTypes.oneOf(['code-lookup']).isRequired,
    label: PropTypes.string,
    align: PropTypes.oneOf(['left', 'right', 'center']),
    decimals: PropTypes.number,
    canSort: PropTypes.bool,
    customProps: PropTypes.object,
    lookupHook: PropTypes.func.isRequired,
  }),
  value: PropTypes.string.isRequired,
};
