import { TableCell } from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';

export const ConcatenatedProperty = ({ config, values = {} }) => {
  const { emptyDash, properties } = config;
  const { keys = [], separator = ' ' } = properties;

  const concatenated = keys
    .map((key) => values[key] || '')
    .filter((value) => value) // Filter out empty strings to avoid unnecessary separators
    .join(separator);

  return (
    <TableCell variant="head">
      {emptyDash ? concatenated || '-' : concatenated}
    </TableCell>
  );
};

ConcatenatedProperty.propTypes = {
  config: PropTypes.shape({
    emptyDash: PropTypes.bool,
    properties: PropTypes.shape({
      keys: PropTypes.arrayOf(PropTypes.string).isRequired,
      separator: PropTypes.string,
    }).isRequired,
  }).isRequired,
  values: PropTypes.objectOf(PropTypes.string).isRequired,
};
