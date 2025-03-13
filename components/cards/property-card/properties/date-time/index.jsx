import { FormattedDate, FormattedTime } from 'react-intl';
import * as React from 'react';
import { TableCell } from '@mui/material';
import PropTypes from 'prop-types';

export const DateTimeProperty = ({ config, value }) => {
  const { emptyDash = false, variant = 'date-time' } = config;

  if (emptyDash && value === '1900-01-01') {
    return <TableCell variant="head">-</TableCell>;
  }

  return (
    <TableCell variant="head">
      {variant === 'date' && (
        <FormattedDate
          value={value}
          year="numeric"
          month="short"
          day="2-digit"
        />
      )}
      {variant === 'time' && <FormattedTime value={value} />}
      {variant === 'date-time' && (
        <>
          <FormattedDate
            value={value}
            year="numeric"
            month="short"
            day="2-digit"
          />{' '}
          <FormattedTime value={value} />
        </>
      )}
    </TableCell>
  );
};

DateTimeProperty.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    emptyDash: PropTypes.bool,
    variant: PropTypes.oneOf(['date', 'time', 'date-time']).isRequired,
  }).isRequired,
  value: PropTypes.string.isRequired,
};

