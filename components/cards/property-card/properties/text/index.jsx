import { TableCell } from "@mui/material";
import { FormattedDate, FormattedTime } from "react-intl";
import * as React from "react";
import PropTypes from "prop-types";

export const TextProperty = ({ config, value = '' }) => {
  console.log(`properties - ${JSON.stringify(config)}`);
  const { emptyDash = false, extenstion, hasExtension = false } = config;
  const extendedValue = `${extenstion}`;
  console.log(`ext val - ${JSON.stringify(extenstion)}`);
  const result = hasExtension ? `${value} ${extenstion}` : value;

  return (
    <TableCell variant="head">{emptyDash ? value || "-" : value}</TableCell>
  );
};

TextProperty.propTypes = {
  config: PropTypes.shape({
    emptyDash: PropTypes.bool
  }).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
