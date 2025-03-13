import { Grid, TableCell, Typography } from "@mui/material";
import { FormattedMessage, FormattedNumber } from 'react-intl';
import * as React from 'react';
import PropTypes from "prop-types";

export const NumberProperty = ({ config, value = 0 }) => {
  const { properties } = config;
  const decimals = properties?.decimals ?? 0;

  return (
    <TableCell variant="head">
      {typeof value === 'number' ? (
        <FormattedNumber
          value={value}
          maximumFractionDigits={decimals}
          minimumFractionDigits={decimals}
        />
      ) : (
        '-'
      )}
    </TableCell>
  );
};

NumberProperty.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    properties: PropTypes.shape({
      decimals: PropTypes.number,
    }).isRequired,
  }).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
